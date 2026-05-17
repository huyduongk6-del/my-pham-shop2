@echo off
title Beauty Luxe - Khoi Chay Website
echo.
echo ===========================================================
echo              BEAUTY LUXE - KOREAN PREMIUM STYLE
echo ===========================================================
echo.
echo [+] Dang khoi chay server phat trien cua ban...
echo [+] Dia chi truy cap mac dinh: http://localhost:5173/
echo.
echo Chu y: Vui long khong tat cua so nay trong luc xem website.
echo -----------------------------------------------------------
echo.
call npm.cmd run dev
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [!] Phat hien loi khoi chay bang npm. Dang thu bang npx...
    call npx.cmd vite
)
pause
