# 🚀 Deployment Guide

## Quick Start (5 minutes)

### 1. Push to GitHub
```bash
git add .
git commit -m "Initial commit: Spotify Analytics site"
git push origin main
```

### 2. Enable GitHub Pages
- Go to your repository on GitHub
- Click **Settings** tab
- Scroll down to **GitHub Pages** section
- Select **Deploy from a branch**
- Choose **main** branch and **/ (root)** folder
- Click **Save**

### 3. Wait for Deployment
- GitHub will automatically build and deploy your site
- This usually takes 2-5 minutes
- You'll see a green checkmark when deployment is complete

### 4. Access Your Site
Your site will be available at: `https://yourusername.github.io/spotify/`

## 🔧 Manual Setup (if needed)

### Option A: Using GitHub Actions (Recommended)
The `.github/workflows/deploy.yml` file will automatically deploy your site on every push to main.

### Option B: Manual GitHub Pages
1. Go to repository **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** / **/ (root)**
4. Click **Save**

## 📁 File Structure Check
Ensure your repository has these files:
```
spotify/
├── index.html              ✅ Main site
├── script.js               ✅ JavaScript logic
├── READify.md              ✅ Documentation
├── .github/workflows/      ✅ Auto-deployment
├── _config.yml             ✅ Jekyll config
└── spotify_data/           ✅ Your data
    └── StreamingHistory_music_0.json
```

## 🧪 Testing

### Local Testing
```bash
# Start local server
python3 -m http.server 8000

# Open in browser
open http://localhost:8000
```

### Test Page
Open `test.html` in your browser to verify:
- ✅ Data loading works
- ✅ Charts render correctly
- ✅ No JavaScript errors

## 🐛 Common Issues

### Site Not Loading
- Check GitHub Pages settings
- Ensure repository is public
- Wait 5-10 minutes for deployment

### Charts Not Showing
- Open browser console (F12)
- Check for JavaScript errors
- Verify JSON file path

### Data Not Displaying
- Check file permissions
- Verify JSON format
- Ensure file is in `spotify_data/` folder

## 📊 Performance Tips

- **Large datasets**: The app handles 45k+ streams efficiently
- **Mobile**: Responsive design works on all devices
- **Caching**: Charts are optimized for smooth interactions

## 🔒 Security Notes

- All data processing is client-side
- No data leaves your browser
- GitHub Pages provides HTTPS by default

## 📞 Need Help?

1. Check browser console for errors
2. Verify file paths and permissions
3. Test with the `test.html` page
4. Open an issue on GitHub

---

**Your Spotify Analytics site should be live in 5 minutes! 🎉**
