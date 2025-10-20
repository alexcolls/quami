# Phantom Wallet Connection Troubleshooting

## The Error You're Experiencing

```
Connection error: Oe: Unexpected error
    at #n (solana.js:3:416169)
    at async r.connect (solana.js:3:417204)
```

This is an internal Phantom Wallet error that occurs during the connection attempt. Here are step-by-step solutions to fix it:

---

## Quick Fixes (Try These First)

### 1. **Refresh the Page**
Simply reload your browser page (Ctrl+R or Cmd+R) and try connecting again.

### 2. **Restart Phantom**
1. Click the Phantom extension icon
2. Click the settings icon (⚙️) in the bottom right
3. Click "Lock Wallet"
4. Unlock your wallet again
5. Try connecting

### 3. **Clear Site Permissions**
1. Click the Phantom extension icon
2. Go to Settings → Trusted Apps
3. Find your site (`localhost:3000` or your domain)
4. Click "Revoke" to remove permissions
5. Try connecting again (it will ask for permission fresh)

---

## Advanced Troubleshooting

### 4. **Check for Multiple Wallet Extensions**
If you have multiple Solana wallet extensions installed (Phantom, Solflare, Backpack, etc.):

1. **Disable other wallet extensions temporarily:**
   - Go to `chrome://extensions/` (Chrome) or `about:addons` (Firefox)
   - Disable all Solana wallets except Phantom
   - Refresh your page
   - Try connecting

2. **Or modify the code to specifically target Phantom:**
   ```javascript
   // This is already implemented in your updated code
   // It checks for provider.isPhantom
   ```

### 5. **Update Phantom**
1. Go to the extension store:
   - [Chrome Web Store - Phantom](https://chrome.google.com/webstore/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa)
   - [Firefox Add-ons - Phantom](https://addons.mozilla.org/en-US/firefox/addon/phantom-app/)
2. Check if there's an update available
3. Update if needed
4. Restart your browser
5. Try connecting again

### 6. **Clear Browser Cache & Extension Data**

**For Chrome/Edge:**
1. Open DevTools (F12)
2. Go to Application tab
3. Click "Clear storage"
4. Check "Local storage", "Session storage", "IndexedDB"
5. Click "Clear site data"
6. Go to `chrome://extensions/`
7. Find Phantom → Click "Details" → "Remove extension data"
8. Refresh and try again

**For Firefox:**
1. Press F12 → Go to Storage tab
2. Clear Local Storage and Session Storage
3. Refresh and try again

### 7. **Check Phantom's RPC Connection**
Sometimes Phantom's own RPC connection fails:

1. Open Phantom
2. Go to Settings → Network
3. Try switching to a different network (Devnet → Mainnet or vice versa)
4. Switch back to Mainnet
5. Try connecting

### 8. **Reinstall Phantom (Last Resort)**

**⚠️ WARNING: Back up your seed phrase before doing this!**

1. Open Phantom
2. Go to Settings → Security & Privacy
3. Write down your secret recovery phrase (12/24 words)
4. Remove the Phantom extension completely
5. Reinstall Phantom from the official site
6. Restore using your seed phrase
7. Try connecting

---

## Using the Built-in Diagnostics

Our updated code includes a diagnostic tool:

1. Try to connect to Phantom
2. When the error appears, click **"Run Diagnostics"**
3. Open your browser console (F12 → Console tab)
4. Look for the diagnostic output
5. Share the output if you need further help

The diagnostics will show:
- Whether Phantom is detected
- Connection status
- Public key (if available)
- Store state

---

## Alternative: Test with a Simple Page

Create a simple HTML file to test if the issue is with Phantom or your app:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Phantom Test</title>
</head>
<body>
    <button id="connect">Connect Phantom</button>
    <div id="status"></div>

    <script>
        const button = document.getElementById('connect');
        const status = document.getElementById('status');

        button.addEventListener('click', async () => {
            try {
                status.textContent = 'Connecting...';
                
                if (!window.solana?.isPhantom) {
                    throw new Error('Phantom not found');
                }

                const response = await window.solana.connect();
                status.textContent = 'Connected: ' + response.publicKey.toString();
                console.log('Success!', response);
            } catch (error) {
                status.textContent = 'Error: ' + error.message;
                console.error('Error:', error);
            }
        });
    </script>
</body>
</html>
```

Save this as `test.html` and open it in your browser. If this works but your app doesn't, the issue is with your app configuration.

---

## Check for Known Issues

1. **Go to Phantom's Status Page:**
   - [https://status.phantom.app/](https://status.phantom.app/)
   - Check if there are any ongoing issues

2. **Check Phantom's Discord:**
   - [Phantom Discord](https://discord.gg/phantom)
   - See if others are experiencing similar issues

---

## If Nothing Works

If you've tried everything above:

1. **Try a different browser** (Chrome, Firefox, Brave, Edge)
2. **Try incognito/private mode** (to rule out other extensions)
3. **Check your internet connection** (some corporate networks block WebSocket connections)
4. **Disable VPN/Proxy** temporarily
5. **Check browser console for other errors** that might give more clues

---

## Common Causes We've Ruled Out

✅ **Automatic message signing** - We removed this from the connection flow  
✅ **Missing RPC URL** - Now configured with fallback  
✅ **No error handling** - Added comprehensive error handling  
✅ **No event listeners** - Added listeners for account changes and disconnects  

---

## Getting More Help

If you're still stuck, gather this information:

1. Browser and version (e.g., Chrome 120.0.6099.199)
2. Phantom version (Settings → About)
3. Operating system
4. Console output from the diagnostic tool
5. Full error stack trace
6. Whether the simple test.html works

Then:
- Post on Phantom Discord
- Or create an issue on the project repository
- Or contact Phantom support: [https://help.phantom.app/](https://help.phantom.app/)

---

## Quick Reference Commands

**Check Phantom in Console:**
```javascript
console.log('Phantom detected:', window.solana?.isPhantom);
console.log('Provider:', window.solana);
```

**Force Disconnect:**
```javascript
window.solana?.disconnect();
```

**Check Connection Status:**
```javascript
console.log('Connected:', window.solana?.isConnected);
console.log('Public Key:', window.solana?.publicKey?.toString());
```

---

## Prevention Tips

Once you get it working:

1. **Don't have multiple wallet extensions enabled simultaneously**
2. **Keep Phantom updated**
3. **Don't clear browser data while connected** (disconnect first)
4. **Use the disconnect button** instead of just closing the popup
5. **Add your development URL to Phantom's trusted apps**

---

## Still Having Issues?

The error you're experiencing appears to be coming from Phantom's internal code, not our application code. The most common fixes are:

1. 🔄 Restart Phantom
2. 🗑️ Clear site permissions
3. 🔌 Disable other wallet extensions
4. 🆕 Update Phantom
5. 🔧 Try incognito mode

Good luck! 🎉

