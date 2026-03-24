#!/usr/bin/env python3
"""
Cloudflare Pages Deployment Script
Uses API Token to deploy the built dist folder
"""

import os
import sys
import json
import zipfile
import requests

API_TOKEN = os.environ.get('CLOUDFLARE_API_TOKEN', 'cfut_5eoK1JYJvX90LQsNhSxDCOv6PzO8FEI09UYG9RjH3c8024a4')
PROJECT_NAME = 'strivana-website'
DIST_DIR = 'dist'

def get_account_id():
    """Try to get account ID from various sources"""
    # First check environment
    account_id = os.environ.get('CLOUDFLARE_ACCOUNT_ID')
    if account_id:
        return account_id
    
    # Try to get from API
    headers = {'Authorization': f'Bearer {API_TOKEN}'}
    r = requests.get('https://api.cloudflare.com/client/v4/accounts', headers=headers)
    data = r.json()
    
    if data.get('success') and data.get('result'):
        return data['result'][0]['id']
    
    print("ERROR: Could not determine Account ID")
    print("Please set CLOUDFLARE_ACCOUNT_ID environment variable")
    print("Or ensure your API token has 'Account:Read' permission")
    return None

def create_zip():
    """Create a zip file of the dist directory"""
    zip_path = 'deploy.zip'
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zf:
        for root, dirs, files in os.walk(DIST_DIR):
            for file in files:
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, DIST_DIR)
                zf.write(file_path, arcname)
    return zip_path

def create_project(account_id):
    """Create Pages project if it doesn't exist"""
    headers = {
        'Authorization': f'Bearer {API_TOKEN}',
        'Content-Type': 'application/json'
    }
    url = f'https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects'
    
    # Check if project exists
    r = requests.get(f'{url}/{PROJECT_NAME}', headers=headers)
    if r.status_code == 200:
        print(f"Project '{PROJECT_NAME}' already exists")
        return True
    
    # Create project
    data = {
        'name': PROJECT_NAME,
        'production_branch': 'main'
    }
    r = requests.post(url, headers=headers, json=data)
    if r.json().get('success'):
        print(f"Created project '{PROJECT_NAME}'")
        return True
    else:
        print(f"Failed to create project: {r.json()}")
        return False

def deploy(account_id, zip_path):
    """Deploy the zip file to Cloudflare Pages"""
    headers = {'Authorization': f'Bearer {API_TOKEN}'}
    url = f'https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects/{PROJECT_NAME}/deployments'
    
    with open(zip_path, 'rb') as f:
        files = {'file': f}
        r = requests.post(url, headers=headers, files=files)
    
    data = r.json()
    if data.get('success'):
        deployment = data['result']
        print(f"\n✅ Deployment successful!")
        print(f"URL: {deployment['url']}")
        print(f"Environment: {deployment['environment']}")
        return True
    else:
        print(f"\n❌ Deployment failed:")
        print(json.dumps(data, indent=2))
        return False

def main():
    print("🚀 Cloudflare Pages Deployment\n")
    
    # Check dist exists
    if not os.path.exists(DIST_DIR):
        print(f"ERROR: {DIST_DIR} directory not found")
        print("Run 'npm run build' first")
        sys.exit(1)
    
    # Get account ID
    account_id = get_account_id()
    if not account_id:
        sys.exit(1)
    
    print(f"Account ID: {account_id}")
    
    # Create project
    if not create_project(account_id):
        sys.exit(1)
    
    # Create zip
    print(f"\nCreating deployment zip...")
    zip_path = create_zip()
    print(f"Created: {zip_path}")
    
    # Deploy
    print(f"\nDeploying to Cloudflare Pages...")
    if deploy(account_id, zip_path):
        # Clean up
        os.remove(zip_path)
        print(f"\n✨ Done! Your site should be live shortly.")
    else:
        sys.exit(1)

if __name__ == '__main__':
    main()
