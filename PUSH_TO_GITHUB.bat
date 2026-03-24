@echo off
echo ===================================
echo Strivana Website - GitHub Push
echo ===================================
echo.
echo This will push the website code to GitHub.
echo You may be prompted for your GitHub credentials.
echo.
echo If you have 2FA enabled, use a Personal Access Token instead of password.
echo Create one at: https://github.com/settings/tokens
echo.
pause
echo.
git push -u origin main
echo.
if %errorlevel% == 0 (
    echo ===================================
    echo SUCCESS! Code pushed to GitHub.
    echo ===================================
    echo.
    echo Next steps:
    echo 1. Go to https://github.com/julio686/strivana-website
    echo 2. Enable GitHub Pages in Settings ^> Pages
    echo 3. Configure your custom domain: strivanallc.com
    echo 4. Update DNS records with your domain provider
    echo.
    echo See DEPLOYMENT_GUIDE.md for full instructions.
) else (
    echo ===================================
    echo ERROR: Push failed.
    echo ===================================
    echo.
    echo Common solutions:
    echo - Make sure the GitHub repository exists
    echo - Check your username and password/token
    echo - See DEPLOYMENT_GUIDE.md for detailed help
)
echo.
pause
