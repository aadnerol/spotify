# 🎵 Spotify Streaming Analytics

A beautiful, interactive web application that visualizes your Spotify streaming data with charts, statistics, and detailed artist insights.

## ✨ Features

- **📊 Overview Statistics**: Total streams, listening time, unique artists, and tracks
- **🏆 Top Artists Chart**: Visual representation of your most streamed artists
- **🎵 Top Songs Chart**: Your most played tracks with streaming time
- **🔍 Artist Explorer**: Select any artist to see detailed statistics and their top songs
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **🎨 Modern UI**: Beautiful Spotify-inspired design with smooth animations

## 🚀 Getting Started

### Prerequisites

- A GitHub account
- Your Spotify streaming data (exported from Spotify)

### Setup Instructions

1. **Fork or Clone this Repository**
   ```bash
   git clone https://github.com/yourusername/spotify.git
   cd spotify
   ```

2. **Add Your Spotify Data**
   - Place your `StreamingHistory_music_0.json` file in the `spotify_data/` folder
   - The file should contain your streaming history in the format:
     ```json
     [
       {
         "endTime": "2024-04-07 20:36",
         "artistName": "Artist Name",
         "trackName": "Song Title",
         "msPlayed": 193813
       }
     ]
     ```

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click on "Settings"
   - Scroll down to "GitHub Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

4. **Access Your Site**
   - Your site will be available at: `https://yourusername.github.io/spotify/`
   - It may take a few minutes to deploy

## 📁 File Structure

```
spotify/
├── index.html          # Main HTML file
├── script.js           # JavaScript logic and charts
├── README.md           # This file
└── spotify_data/       # Your Spotify data folder
    └── StreamingHistory_music_0.json
```

## 🎯 How to Use

1. **View Overview**: The main page shows your streaming statistics and top charts
2. **Explore Artists**: Use the dropdown menu to select any artist
3. **Artist Details**: See total streaming time, number of streams, and unique tracks for each artist
4. **Artist Songs**: View a chart of the most streamed songs by your selected artist

## 🛠️ Customization

### Changing Colors
The app uses Spotify's brand colors. You can customize them in the CSS:
- Primary: `#1db954` (Spotify Green)
- Secondary: `#1ed760` (Spotify Light Green)

### Adding More Data
To include additional streaming data files:
1. Add them to the `spotify_data/` folder
2. Modify the `loadData()` function in `script.js` to load multiple files
3. Update the data processing logic accordingly

### Chart Modifications
All charts are created using Chart.js. You can customize:
- Chart types (bar, line, pie, etc.)
- Colors and styling
- Number of items displayed
- Chart options and interactions

## 🔧 Technical Details

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Charts**: Chart.js with date-fns adapter
- **Data Processing**: Client-side JSON processing
- **Responsive Design**: CSS Grid and Flexbox
- **Performance**: Efficient data processing with optimized algorithms

## 📊 Data Privacy

- All data processing happens locally in your browser
- No data is sent to external servers
- Your streaming data remains private and secure

## 🐛 Troubleshooting

### Common Issues

1. **Charts Not Loading**
   - Check browser console for errors
   - Ensure your JSON file is valid
   - Verify the file path in `script.js`

2. **Page Not Deploying**
   - Check GitHub Pages settings
   - Ensure the repository is public
   - Wait a few minutes for deployment

3. **Data Not Displaying**
   - Verify your JSON file structure
   - Check that the file is in the correct folder
   - Ensure the file name matches what's in `script.js`

### Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🤝 Contributing

Feel free to contribute to this project by:
- Reporting bugs
- Suggesting new features
- Improving the design
- Adding new chart types
- Optimizing performance

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Spotify for providing the data export feature
- Chart.js for the excellent charting library
- GitHub for hosting and GitHub Pages

## 📞 Support

If you need help or have questions:
1. Check the troubleshooting section above
2. Open an issue on GitHub
3. Review the code comments for implementation details

---

**Enjoy exploring your Spotify listening habits! 🎧**