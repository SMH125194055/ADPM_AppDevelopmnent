@echo off

REM Define the base directory for the app
set baseDir=%cd%\src

REM Create folders
mkdir %baseDir%
mkdir %baseDir%\navigation
mkdir %baseDir%\screens
mkdir %baseDir%\components
mkdir %baseDir%\utils

REM Create navigation files
echo // Main navigation >> %baseDir%\navigation\AppNavigator.tsx
echo // Patient navigation >> %baseDir%\navigation\PatientNavigator.tsx
echo // Doctor navigation >> %baseDir%\navigation\DoctorNavigator.tsx

REM Create screen files
echo // Authentication screen >> %baseDir%\screens\AuthScreen.tsx
echo // Patient Dashboard >> %baseDir%\screens\PatientDashboard.tsx
echo // Doctor Dashboard >> %baseDir%\screens\DoctorDashboard.tsx
echo // Upload Image screen >> %baseDir%\screens\UploadImageScreen.tsx
echo // Compare Image screen >> %baseDir%\screens\CompareImageScreen.tsx

REM Create component files
echo // Reusable Image Card >> %baseDir%\components\ImageCard.tsx
echo // Reusable Chart component >> %baseDir%\components\Chart.tsx

REM Create utility files
echo // Supabase Client Setup >> %baseDir%\utils\supabaseClient.ts

REM Notify user
echo Files and folders created successfully!
