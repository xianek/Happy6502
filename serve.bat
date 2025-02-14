@echo off
setlocal EnableDelayedExpansion

rem Check if Node.js is installed 

where node >nul 2>&1
if errorlevel 1 (
    echo Node.js is not installed.
    echo Please install Node.js from https://nodejs.org/ and then re-run this script.
    pause
    exit /B 1
) else (
    for /f "delims=" %%v in ('node --version') do (
        set "nodeVersion=%%v"
    )
    echo Node.js is installed: !nodeVersion!
)

rem Check if http-server is installed

where http-server >nul 2>&1
if errorlevel 1 (
    echo http-server is not installed.
    echo Installing http-server via npm...
    npm install -g http-server
    where http-server >nul 2>&1
    if errorlevel 1 (
        echo http-server installation failed. Please install it manually.
        pause
        exit /B 1
    ) else (
        echo http-server installed successfully.
    )
) else (
    echo http-server is installed.
)

echo Starting web server on port 8000...
start http-server -p 8000
echo Launching the demo in your browser...
start http://localhost:8000
type info.txt
pause