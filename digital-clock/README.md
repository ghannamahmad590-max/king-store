# ⏰ Digital Clock with Multiple Time Zones

A beautiful, responsive digital clock application that displays current time in different time zones around the world.

## 🌟 Features

✨ **Multiple Time Zones**
- Display time in 25+ cities across the world
- Add and remove time zones dynamically
- Persistent storage using localStorage

🎨 **Beautiful Design**
- Modern gradient background
- Smooth animations and transitions
- Responsive grid layout
- Works on desktop and mobile devices

⏱️ **Time Format Options**
- Toggle between 24-hour and 12-hour format
- Real-time clock updates (every second)
- Display date information

🛠️ **Easy to Use**
- Add new time zones with a single click
- Remove time zones easily
- Reset to default time zones
- Intuitive modal interface

## 📍 Supported Time Zones

The app includes the following time zones:

**Americas:**
- New York (EST/EDT)
- Los Angeles (PST/PDT)
- Chicago (CST/CDT)
- Denver (MST/MDT)
- Toronto (EST/EDT)
- Mexico City (CST/CDT)
- São Paulo (BRT)
- Buenos Aires (ART)

**Europe:**
- London (GMT/BST)
- Paris (CET/CEST)
- Berlin (CET/CEST)
- Moscow (MSK)
- Istanbul (EET/EEST)

**Asia:**
- Dubai (GST)
- Delhi (IST)
- Bangkok (ICT)
- Singapore (SGT)
- Hong Kong (HKT)
- Tokyo (JST)
- Seoul (KST)
- Shanghai (CST)
- Manila (PHT)

**Oceania:**
- Sydney (AEDT/AEST)
- Melbourne (AEDT/AEST)
- Auckland (NZDT/NZST)

**Africa:**
- Cairo (EET)
- Lagos (WAT)
- Johannesburg (SAST)

## 🚀 How to Use

1. **Open the Application**
   - Open `index.html` in your web browser

2. **Add Time Zones**
   - Click the "➕ Add Time Zone" button
   - Select a city from the dropdown
   - Optionally add a custom label
   - Click "Add" button

3. **Remove Time Zones**
   - Click the "✕ Remove" button on any clock card

4. **Toggle Time Format**
   - Check/uncheck "24-Hour Format" checkbox
   - The display will switch between 24-hour and 12-hour format

5. **Reset to Default**
   - Click "🔄 Reset to Default" button
   - Returns to the 4 default cities

## 📂 File Structure

```
digital-clock/
├── index.html          # Main HTML file
├── style.css           # Styling and animations
├── script.js           # JavaScript logic
└── README.md           # Documentation
```

## 🎯 Technical Details

### Technologies Used
- **HTML5** - Semantic markup
- **CSS3** - Animations and responsive design
- **Vanilla JavaScript** - No dependencies
- **localStorage API** - Data persistence
- **Intl API** - Timezone conversion

### Key Features
- Real-time updates every second
- Automatic timezone detection
- Responsive grid layout (1-4 columns based on screen size)
- Modal for adding new timezones
- Smooth animations and transitions

## 🎨 Customization

### Add More Time Zones
Edit the `ALL_TIMEZONES` array in `script.js`:

```javascript
{ name: 'City Name', tz: 'Continent/City', offset: '+/-00:00' }
```

### Change Default Time Zones
Edit the `DEFAULT_TIMEZONES` array:

```javascript
const DEFAULT_TIMEZONES = [
    'Continent/City1',
    'Continent/City2',
    // ...
];
```

### Modify Colors
Edit CSS variables in `style.css`:
- Background gradient colors
- Text colors
- Button colors

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 🔧 Installation

No installation required! Just download the files and open `index.html` in your browser.

## 💡 Features to Consider

- Alarm functionality
- Time zone search
- World map with timezone markers
- Multiple theme colors
- Voice announcement of time
- Export/import timezone preferences

## 📄 License

Free to use for personal and commercial projects.

## 👨‍💻 Author

Created with ❤️ by GitHub Copilot

---

**Enjoy your global timekeeper! ⏰🌍**
