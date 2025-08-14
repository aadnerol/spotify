// Global variables to store processed data
let streamingData = [];
let artistStats = {};
let songStats = {};
let artistChart = null;
let songChart = null;
let artistSongChart = null;

// Chart view states
let artistChartView = 'time'; // 'time' or 'streams'
let songChartView = 'time'; // 'time' or 'streams'

// Common compact chart options to keep charts short
const compactChartOptions = {
    responsive: true,
    maintainAspectRatio: false, // honor CSS height
    layout: { padding: { top: 5, bottom: 5, left: 5, right: 5 } },
    elements: {
        bar: {
            borderRadius: 4,
            borderSkipped: false,
            maxBarThickness: 16
        }
    },
    plugins: {
        legend: { display: false },
        tooltip: {
            callbacks: {
                label: function(context) {
                    // Check if this is a time-based chart or stream count
                    const chartId = context.chart.canvas.id;
                    if (chartId === 'artistChart' && artistChartView === 'time') {
                        return formatTime(context.parsed.y * 60 * 1000);
                    } else if (chartId === 'songChart' && songChartView === 'time') {
                        return formatTime(context.parsed.y * 60 * 1000);
                    } else {
                        return context.parsed.y + ' streams';
                    }
                }
            }
        }
    },
    scales: {
        x: {
            grid: { display: false },
            ticks: { font: { size: 9 }, maxRotation: 45 },
            border: { display: false }
        },
        y: {
            beginAtZero: true,
            grid: { display: false },
            border: { display: false },
            ticks: {
                font: { size: 9 },
                maxTicksLimit: 5,
                callback: function(value) {
                    // Check if this is a time-based chart or stream count
                    const chartId = this.chart.canvas.id;
                    if (chartId === 'artistChart' && artistChartView === 'time') {
                        return formatTime(value * 60 * 1000);
                    } else if (chartId === 'songChart' && songChartView === 'time') {
                        return formatTime(value * 60 * 1000);
                    } else {
                        return value;
                    }
                }
            }
        }
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadData();
});

// Load and process the streaming data
async function loadData() {
    try {
        const response = await fetch('spotify_data/StreamingHistory_music_0.json');
        streamingData = await response.json();
        
        processData();
        updateStats();
        createCharts();
        populateArtistSelect();
        setupChartToggles();
        
    } catch (error) {
        console.error('Error loading data:', error);
        showError('Failed to load streaming data');
    }
}

// Process the streaming data to calculate statistics
function processData() {
    // Reset stats
    artistStats = {};
    songStats = {};
    
    streamingData.forEach(stream => {
        // Validate record structure matches JSON: endTime, artistName, trackName, msPlayed
        if (!stream || typeof stream.msPlayed !== 'number' || stream.msPlayed <= 0 || !stream.artistName || !stream.trackName) {
            return;
        }
        const artist = stream.artistName;
        const song = stream.trackName;
        const msPlayed = stream.msPlayed;
        
        // Artist statistics
        if (!artistStats[artist]) {
            artistStats[artist] = {
                totalMs: 0,
                totalStreams: 0,
                songs: new Set(),
                songStats: {}
            };
        }
        
        artistStats[artist].totalMs += msPlayed;
        artistStats[artist].totalStreams += 1;
        artistStats[artist].songs.add(song);
        
        // Song statistics for this artist
        if (!artistStats[artist].songStats[song]) {
            artistStats[artist].songStats[song] = {
                totalMs: 0,
                totalStreams: 0
            };
        }
        artistStats[artist].songStats[song].totalMs += msPlayed;
        artistStats[artist].songStats[song].totalStreams += 1;
        
        // Global song statistics
        const songKey = `${song} - ${artist}`;
        if (!songStats[songKey]) {
            songStats[songKey] = {
                totalMs: 0,
                totalStreams: 0,
                artist: artist
            };
        }
        songStats[songKey].totalMs += msPlayed;
        songStats[songKey].totalStreams += 1;
    });
}

// Update the statistics display
function updateStats() {
    const totalStreams = streamingData.length;
    const totalMs = streamingData.reduce((sum, stream) => sum + stream.msPlayed, 0);
    const uniqueArtists = Object.keys(artistStats).length;
    const uniqueTracks = Object.keys(songStats).length;
    
    document.getElementById('totalStreams').textContent = totalStreams.toLocaleString();
    document.getElementById('totalTime').textContent = formatTime(totalMs);
    document.getElementById('uniqueArtists').textContent = uniqueArtists.toLocaleString();
    document.getElementById('uniqueTracks').textContent = uniqueTracks.toLocaleString();
}

// Create the main charts
function createCharts() {
    createArtistChart();
    createSongChart();
}

// Create the top artists chart
function createArtistChart() {
    const ctx = document.getElementById('artistChart').getContext('2d');
    
    // Get top 10 artists by current view
    let topArtists, data, label;
    
    if (artistChartView === 'time') {
        topArtists = Object.entries(artistStats)
            .sort(([,a], [,b]) => b.totalMs - a.totalMs)
            .slice(0, 10);
        data = topArtists.map(([,stats]) => stats.totalMs / 1000 / 60); // Convert to minutes
        label = 'Total Minutes Streamed';
    } else {
        topArtists = Object.entries(artistStats)
            .sort(([,a], [,b]) => b.totalStreams - a.totalStreams)
            .slice(0, 10);
        data = topArtists.map(([,stats]) => stats.totalStreams);
        label = 'Number of Streams';
    }
    
    const labels = topArtists.map(([artist]) => artist);
    
    artistChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                backgroundColor: 'rgba(29, 185, 84, 0.8)',
                borderColor: 'rgba(29, 185, 84, 1)',
                borderWidth: 1
            }]
        },
        options: compactChartOptions
    });
}

// Create the top songs chart
function createSongChart() {
    const ctx = document.getElementById('songChart').getContext('2d');
    
    // Get top 10 songs by current view
    let topSongs, data, label;
    
    if (songChartView === 'time') {
        topSongs = Object.entries(songStats)
            .sort(([,a], [,b]) => b.totalMs - a.totalMs)
            .slice(0, 10);
        data = topSongs.map(([,stats]) => stats.totalMs / 1000 / 60); // Convert to minutes
        label = 'Total Minutes Streamed';
    } else {
        topSongs = Object.entries(songStats)
            .sort(([,a], [,b]) => b.totalStreams - a.totalStreams)
            .slice(0, 10);
        data = topSongs.map(([,stats]) => stats.totalStreams);
        label = 'Number of Streams';
    }
    
    const labels = topSongs.map(([song]) => song.split(' - ')[0]);
    
    songChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                backgroundColor: 'rgba(30, 215, 96, 0.8)',
                borderColor: 'rgba(30, 215, 96, 1)',
                borderWidth: 1
            }]
        },
        options: compactChartOptions
    });
}

// Populate the artist selection dropdown
function populateArtistSelect() {
    const select = document.getElementById('artistSelect');
    const artists = Object.keys(artistStats).sort();
    
    artists.forEach(artist => {
        const option = document.createElement('option');
        option.value = artist;
        option.textContent = artist;
        select.appendChild(option);
    });
    
    // Add event listener for artist selection
    select.addEventListener('change', function() {
        if (this.value) {
            showArtistInfo(this.value);
        } else {
            hideArtistInfo();
        }
    });
}

// Show detailed information for a selected artist
function showArtistInfo(artistName) {
    const artistInfo = document.getElementById('artistInfo');
    const artist = artistStats[artistName];
    
    if (!artist) return;
    
    // Update artist name
    document.getElementById('selectedArtistName').textContent = artistName;
    
    // Update statistics
    document.getElementById('artistTotalTime').textContent = formatTime(artist.totalMs);
    document.getElementById('artistTotalStreams').textContent = artist.totalStreams.toLocaleString();
    document.getElementById('artistUniqueTracks').textContent = artist.songs.size;
    
    // Create artist songs chart
    createArtistSongChart(artist);
    
    // Show the artist info section
    artistInfo.style.display = 'block';
    
    // Scroll to the artist info section
    artistInfo.scrollIntoView({ behavior: 'smooth' });
}

// Hide the artist information section
function hideArtistInfo() {
    document.getElementById('artistInfo').style.display = 'none';
}

// Create chart showing top songs for a specific artist
function createArtistSongChart(artist) {
    const ctx = document.getElementById('artistSongChart').getContext('2d');
    
    // Get top songs for this artist
    const topSongs = Object.entries(artist.songStats)
        .sort(([,a], [,b]) => b.totalMs - a.totalMs)
        .slice(0, 10);
    
    const labels = topSongs.map(([song]) => song);
    const data = topSongs.map(([,stats]) => stats.totalMs / 1000 / 60); // Convert to minutes
    
    // Destroy existing chart if it exists
    if (artistSongChart) {
        artistSongChart.destroy();
    }
    
    artistSongChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Minutes Streamed',
                data: data,
                backgroundColor: 'rgba(29, 185, 84, 0.6)',
                borderColor: 'rgba(29, 185, 84, 1)',
                borderWidth: 1
            }]
        },
        options: compactChartOptions
    });
}

// Format milliseconds to human-readable time
function formatTime(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
        return `${days}d ${hours % 24}h ${minutes % 60}m`;
    } else if (hours > 0) {
        return `${hours}h ${minutes % 60}m`;
    } else if (minutes > 0) {
        return `${minutes}m ${seconds % 60}s`;
    } else {
        return `${seconds}s`;
    }
}

// Setup chart toggle functionality
function setupChartToggles() {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const chartType = this.dataset.chart;
            const metric = this.dataset.metric;
            
            // Update active state
            const chartToggles = this.parentElement.querySelectorAll('.toggle-btn');
            chartToggles.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update chart view state
            if (chartType === 'artist') {
                artistChartView = metric;
                updateArtistChart();
            } else if (chartType === 'song') {
                songChartView = metric;
                updateSongChart();
            }
        });
    });
}

// Update artist chart with new view
function updateArtistChart() {
    if (artistChart) {
        artistChart.destroy();
    }
    createArtistChart();
}

// Update song chart with new view
function updateSongChart() {
    if (songChart) {
        songChart.destroy();
    }
    createSongChart();
}

// Show error message
function showError(message) {
    console.error(message);
    // You could add a more user-friendly error display here
}
