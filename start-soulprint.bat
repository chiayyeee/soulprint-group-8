@echo off
cd /d "%~dp0"
echo Starting SOULPRINT at http://127.0.0.1:5173/
start "" "http://127.0.0.1:5173/"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0serve.ps1"
