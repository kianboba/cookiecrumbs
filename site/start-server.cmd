@echo off
rem Starts the CookieCrumbs landing page preview server on http://127.0.0.1:8710
rem Safe to run multiple times - a second copy exits quietly.
start "CookieCrumbs server" /min powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0serve.ps1"
