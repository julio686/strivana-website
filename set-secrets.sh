#!/bin/bash
# Script to set GitHub Secrets for Cloudflare deployment
# Requires GitHub CLI (gh) to be installed and authenticated

echo "Setting GitHub Secrets for Cloudflare Pages deployment..."

# Set Cloudflare API Token
gh secret set CLOUDFLARE_API_TOKEN -b"cfut_5eoK1JYJvX90LQsNhSxDCOv6PzO8FEI09UYG9RjH3c8024a4" --repo julio686/strivana-website

# Set Cloudflare Account ID
gh secret set CLOUDFLARE_ACCOUNT_ID -b"4842b07d5ba6edab24a8af323451b535" --repo julio686/strivana-website

echo "✅ Secrets set successfully!"
echo ""
echo "Next: Trigger deployment with:"
echo "  git commit --allow-empty -m 'Trigger deployment'"
echo "  git push"
