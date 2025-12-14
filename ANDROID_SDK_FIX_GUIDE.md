# Android SDK Setup Guide - Fix "SDKManager path not specified!" Error

## Problem Diagnosis
The error "SDKManager path not specified!" occurs because:
- Android SDK is not installed or not configured
- ANDROID_HOME environment variable is missing
- VSCode AVD Manager extension cannot locate the Android SDK

## Solution Steps

### Step 1: Install Android Studio (Recommended)

1. **Download Android Studio**
   - Visit: https://developer.android.com/studio
   - Download the latest version for Windows

2. **Install Android Studio**
   - Run the installer as Administrator
   - Follow the setup wizard
   - Install with default settings

3. **Android SDK Location**
   - Default location: `C:\Users\[Username]\AppData\Local\Android\Sdk`
   - This will be your ANDROID_HOME path

### Step 2: Install Android SDK Command Line Tools

If you prefer command-line only setup:

1. **Download Command Line Tools**
   - Visit: https://developer.android.com/studio/command-line
   - Download "commandlinetools-win" for Windows

2. **Install Command Line Tools**
   ```cmd
   # Create directory for Android SDK
   mkdir C:\Android
   mkdir C:\Android\cmdline-tools
   
   # Extract command line tools to:
   # C:\Android\cmdline-tools\latest\
   ```

### Step 3: Set Environment Variables

**Option A: Using System Properties (GUI)**
1. Right-click "This PC" → Properties → Advanced system settings
2. Click "Environment Variables"
3. Add new system variables:

```
ANDROID_HOME = C:\Users\[Username]\AppData\Local\Android\Sdk
ANDROID_SDK_ROOT = C:\Users\[Username]\AppData\Local\Android\Sdk
```

4. Update PATH variable:
   - Add: `%ANDROID_HOME%\tools`
   - Add: `%ANDROID_HOME%\tools\bin`
   - Add: `%ANDROID_HOME%\platform-tools`

**Option B: Using Command Line**
```cmd
# Open Command Prompt as Administrator
setx ANDROID_HOME "C:\Users\%USERNAME%\AppData\Local\Android\Sdk" /M
setx ANDROID_SDK_ROOT "C:\Users\%USERNAME%\AppData\Local\Android\Sdk" /M
setx PATH "%PATH%;%ANDROID_HOME%\tools;%ANDROID_HOME%\tools\bin;%ANDROID_HOME%\platform-tools" /M
```

### Step 4: Verify Installation

1. **Restart Command Prompt** (to load new environment variables)
2. **Check SDK Installation**
   ```cmd
   echo %ANDROID_HOME%
   dir %ANDROID_HOME%
   ```

3. **Test SDK Manager**
   ```cmd
   sdkmanager --version
   sdkmanager --list
   ```

4. **Test AVD Manager**
   ```cmd
   avdmanager list avd
   ```

### Step 5: Configure VSCode AVD Manager Extension

1. **Update VSCode Settings**
   - Open VSCode Settings (Ctrl+,)
   - Search for "avdmanager"
   - Set Android SDK path:
     ```
     "avdmanager.sdkPath": "C:\\Users\\[Username]\\AppData\\Local\\Android\\Sdk"
     ```

2. **Alternative: Use workspace settings**
   - Create `.vscode/settings.json`:
   ```json
   {
     "avdmanager.sdkPath": "C:\\Users\\[Username]\\AppData\\Local\\Android\\Sdk"
   }
   ```

### Step 6: Install Required SDK Components

Using SDK Manager:
```cmd
# Install essential packages
sdkmanager "platform-tools"
sdkmanager "platforms;android-33"
sdkmanager "system-images;android-33;google_apis;x86_64"
sdkmanager "build-tools;33.0.2"
```

### Step 7: Create Android Virtual Device (AVD)

```cmd
# Create AVD
avdmanager create avd -n "TestDevice" -k "system-images;android-33;google_apis;x86_64"
```

## Quick Fix for VSCode AVD Manager

If you just want to quickly fix the VSCode extension error:

1. **Install Android Studio** (fastest solution)
2. **Set environment variable**: ANDROID_HOME = [your Android Studio SDK path]
3. **Restart VSCode**
4. **Try AVD Manager again**

## Alternative: Use Android Studio's AVD Manager

If VSCode AVD Manager continues to have issues:
1. Open Android Studio
2. Go to Tools → AVD Manager
3. Create and manage virtual devices from there
4. Your web app will still work on the emulator

## Troubleshooting

**"SDK not found" error after setup:**
- Restart computer to refresh environment variables
- Verify ANDROID_HOME path exists and contains SDK files
- Check PATH includes SDK bin directories

**Permission denied errors:**
- Run Command Prompt as Administrator
- Ensure user has write access to SDK directories

**VSCode extension still not working:**
- Check VSCode output panel for AVD Manager logs
- Verify settings.json has correct SDK path
- Try reinstalling the AVD Manager extension

## Environment Variable Summary

For your system (based on current setup):
```cmd
ANDROID_HOME = C:\Users\MOH.KINDAWI\AppData\Local\Android\Sdk
ANDROID_SDK_ROOT = C:\Users\MOH.KINDAWI\AppData\Local\Android\Sdk
PATH += %ANDROID_HOME%\tools;%ANDROID_HOME%\tools\bin;%ANDROID_HOME%\platform-tools
```

After setting these variables and restarting your terminal/VSCode, the AVD Manager extension should work properly.