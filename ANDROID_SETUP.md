# Android Emulator Setup Guide

## Quick Start
Your app is now configured to run with AVD Android Emulator Extension!

### Current Configuration
- **Local URL**: `http://localhost:5173/`
- **Network URL**: `http://192.168.1.108:5173/` (for Android emulator)

### How to Access from Android Emulator

1. **Start your AVD Android Emulator**
   - Use VSCode's Android Emulator extension
   - Or start from Android Studio

2. **Open Browser in Emulator**
   - Open Chrome browser (or any browser) in the emulator
   - Navigate to: `http://192.168.1.108:5173`

3. **Alternative - Use Host IP**
   - If the above doesn't work, try your actual host IP
   - Find your IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
   - Navigate to: `http://YOUR_IP_ADDRESS:5173`

### Troubleshooting

**If you can't connect:**
1. Check that the development server is running
2. Verify your firewall allows port 5173
3. Try using `http://10.0.2.2:5173` (Android emulator special localhost)
4. Make sure your antivirus isn't blocking the connection

**Common Issues:**
- Some corporate networks block direct access
- VPN connections might interfere
- Ensure emulator has internet access

### Features Available
- ✅ Full React app functionality
- ✅ Dark/Light mode toggle
- ✅ All components and screens
- ✅ Firebase authentication
- ✅ Local storage and state management
- ✅ Hot Module Replacement (HMR)

### Development Tips
- Changes auto-reload in the emulator
- Use Chrome DevTools for debugging
- Test responsive design on different emulator screen sizes