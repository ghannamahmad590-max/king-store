// ===== Digital Clock with Multiple Time Zones =====

// All available time zones
const ALL_TIMEZONES = [
    // Americas
    { name: 'New York', tz: 'America/New_York', offset: '-5:00' },
    { name: 'Los Angeles', tz: 'America/Los_Angeles', offset: '-8:00' },
    { name: 'Chicago', tz: 'America/Chicago', offset: '-6:00' },
    { name: 'Denver', tz: 'America/Denver', offset: '-7:00' },
    { name: 'Toronto', tz: 'America/Toronto', offset: '-5:00' },
    { name: 'Mexico City', tz: 'America/Mexico_City', offset: '-6:00' },
    { name: 'São Paulo', tz: 'America/Sao_Paulo', offset: '-3:00' },
    { name: 'Buenos Aires', tz: 'America/Argentina/Buenos_Aires', offset: '-3:00' },
    
    // Europe
    { name: 'London', tz: 'Europe/London', offset: '0:00' },
    { name: 'Paris', tz: 'Europe/Paris', offset: '+1:00' },
    { name: 'Berlin', tz: 'Europe/Berlin', offset: '+1:00' },
    { name: 'Moscow', tz: 'Europe/Moscow', offset: '+3:00' },
    { name: 'Istanbul', tz: 'Europe/Istanbul', offset: '+3:00' },
    { name: 'Dubai', tz: 'Asia/Dubai', offset: '+4:00' },
    
    // Asia
    { name: 'Delhi', tz: 'Asia/Kolkata', offset: '+5:30' },
    { name: 'Bangkok', tz: 'Asia/Bangkok', offset: '+7:00' },
    { name: 'Singapore', tz: 'Asia/Singapore', offset: '+8:00' },
    { name: 'Hong Kong', tz: 'Asia/Hong_Kong', offset: '+8:00' },
    { name: 'Tokyo', tz: 'Asia/Tokyo', offset: '+9:00' },
    { name: 'Seoul', tz: 'Asia/Seoul', offset: '+9:00' },
    { name: 'Shanghai', tz: 'Asia/Shanghai', offset: '+8:00' },
    { name: 'Manila', tz: 'Asia/Manila', offset: '+8:00' },
    
    // Oceania
    { name: 'Sydney', tz: 'Australia/Sydney', offset: '+10:00' },
    { name: 'Melbourne', tz: 'Australia/Melbourne', offset: '+10:00' },
    { name: 'Auckland', tz: 'Pacific/Auckland', offset: '+12:00' },
    
    // Africa
    { name: 'Cairo', tz: 'Africa/Cairo', offset: '+2:00' },
    { name: 'Lagos', tz: 'Africa/Lagos', offset: '+1:00' },
    { name: 'Johannesburg', tz: 'Africa/Johannesburg', offset: '+2:00' },
];

// Default time zones to display
const DEFAULT_TIMEZONES = [
    'America/New_York',
    'Europe/London',
    'Asia/Tokyo',
    'Australia/Sydney'
];

let selectedTimezones = [];
let use24HourFormat = true;

// ===== Initialization =====
function initialize() {
    loadTimezones();
    populateTimezoneSelect();
    setupEventListeners();
    updateAllClocks();
    setInterval(updateAllClocks, 1000);
}

// ===== Load Timezones from localStorage =====
function loadTimezones() {
    const saved = localStorage.getItem('selectedTimezones');
    selectedTimezones = saved ? JSON.parse(saved) : DEFAULT_TIMEZONES;
    renderClocks();
}

// ===== Save Timezones to localStorage =====
function saveTimezones() {
    localStorage.setItem('selectedTimezones', JSON.stringify(selectedTimezones));
}

// ===== Populate Timezone Select Dropdown =====
function populateTimezoneSelect() {
    const select = document.getElementById('timezone-select');
    ALL_TIMEZONES.forEach(tz => {
        const option = document.createElement('option');
        option.value = tz.tz;
        option.textContent = `${tz.name} (${tz.offset})`;
        select.appendChild(option);
    });
}

// ===== Setup Event Listeners =====
function setupEventListeners() {
    const modal = document.getElementById('modal');
    const addBtn = document.getElementById('add-timezone-btn');
    const closeBtn = document.querySelector('.close');
    const submitBtn = document.getElementById('add-btn');
    const resetBtn = document.getElementById('reset-btn');
    const formatCheckbox = document.getElementById('format-24h');

    // Open modal
    addBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        document.getElementById('timezone-select').focus();
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Add timezone
    submitBtn.addEventListener('click', addTimezone);
    document.getElementById('timezone-select').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTimezone();
    });

    // Reset to default
    resetBtn.addEventListener('click', resetToDefault);

    // Toggle 24-hour format
    formatCheckbox.addEventListener('change', (e) => {
        use24HourFormat = e.target.checked;
        updateAllClocks();
    });
}

// ===== Add Timezone =====
function addTimezone() {
    const select = document.getElementById('timezone-select');
    const label = document.getElementById('timezone-label');
    const tz = select.value;

    if (!tz) {
        alert('Please select a time zone');
        return;
    }

    if (selectedTimezones.includes(tz)) {
        alert('This time zone is already added!');
        return;
    }

    selectedTimezones.push(tz);
    saveTimezones();
    renderClocks();

    // Reset form
    select.value = '';
    label.value = '';

    // Close modal
    document.getElementById('modal').style.display = 'none';
}

// ===== Remove Timezone =====
function removeTimezone(tz) {
    selectedTimezones = selectedTimezones.filter(t => t !== tz);
    saveTimezones();
    renderClocks();
}

// ===== Reset to Default =====
function resetToDefault() {
    selectedTimezones = [...DEFAULT_TIMEZONES];
    saveTimezones();
    renderClocks();
}

// ===== Render Clock Cards =====
function renderClocks() {
    const grid = document.getElementById('timezonesGrid');

    if (selectedTimezones.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <h2>No Time Zones Selected</h2>
                <p>Click "Add Time Zone" to get started</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = selectedTimezones.map(tz => {
        const tzData = ALL_TIMEZONES.find(t => t.tz === tz);
        return `
            <div class="timezone-card">
                <button class="remove-btn" onclick="removeTimezone('${tz}')">✕ Remove</button>
                <div class="timezone-location">${tzData.name}</div>
                <div class="timezone-label">${tzData.name}</div>
                <div class="clock-display" data-tz="${tz}">--:--:--</div>
                <div class="timezone-info">
                    <div class="timezone-offset">${tzData.offset}</div>
                    <div class="timezone-date" data-date-tz="${tz}">...</div>
                </div>
            </div>
        `;
    }).join('');
}

// ===== Update All Clocks =====
function updateAllClocks() {
    const now = new Date();

    selectedTimezones.forEach(tz => {
        const clockElement = document.querySelector(`[data-tz="${tz}"]`);
        const dateElement = document.querySelector(`[data-date-tz="${tz}"]`);

        if (clockElement) {
            const time = getTimeInTimezone(now, tz);
            clockElement.textContent = formatTime(time);
        }

        if (dateElement) {
            const time = getTimeInTimezone(now, tz);
            dateElement.textContent = formatDate(time);
        }
    });
}

// ===== Get Time in Specific Timezone =====
function getTimeInTimezone(date, timezone) {
    try {
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        const parts = formatter.formatToParts(date);
        const result = {};

        parts.forEach(({ type, value }) => {
            result[type] = value;
        });

        return {
            year: result.year,
            month: result.month,
            day: result.day,
            hour: result.hour,
            minute: result.minute,
            second: result.second
        };
    } catch (e) {
        console.error('Invalid timezone:', timezone);
        return { hour: '--', minute: '--', second: '--', day: '--', month: '--', year: '--' };
    }
}

// ===== Format Time Display =====
function formatTime(time) {
    const hour = use24HourFormat ? time.hour : formatTo12Hour(time.hour);
    const ampm = use24HourFormat ? '' : getAMPM(time.hour);
    return `${hour}:${time.minute}:${time.second}${ampm ? ' ' + ampm : ''}`;
}

// ===== Format to 12-Hour =====
function formatTo12Hour(hour) {
    hour = parseInt(hour);
    if (hour === 0) return '12';
    if (hour > 12) return String(hour - 12).padStart(2, '0');
    return String(hour).padStart(2, '0');
}

// ===== Get AM/PM =====
function getAMPM(hour) {
    return parseInt(hour) >= 12 ? 'PM' : 'AM';
}

// ===== Format Date Display =====
function formatDate(time) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthName = months[parseInt(time.month) - 1];
    return `${monthName} ${time.day}, ${time.year}`;
}

// ===== Initialize on Load =====
document.addEventListener('DOMContentLoaded', initialize);
