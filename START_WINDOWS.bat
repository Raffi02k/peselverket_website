@echo off
cd /d "%~dp0"
where py >nul 2>&1
if %errorlevel%==0 (
  py start_preview.py
) else (
  python start_preview.py
)
pause
