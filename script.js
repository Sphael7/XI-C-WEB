document.addEventListener('DOMContentLoaded', () => {
    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;
    const modeIcon = modeToggle.querySelector('.mode-icon');
    const currentDateElement = document.getElementById('current-date');

    const mainView = document.getElementById('main-view');
    const jadwalView = document.getElementById('jadwal-view');
    const jadwalBox = document.getElementById('jadwal-box');
    const globalBackButton = document.getElementById('global-back-button');

    const dayDisplayBubble = document.getElementById('day-display-bubble');
    const currentDayDisplay = document.getElementById('current-day-display');
    const dropdownArrow = document.querySelector('.dropdown-arrow'); // Select the arrow for rotation
    const customDayDropdown = document.getElementById('custom-day-dropdown'); // The new custom dropdown div
    const prevDayArrow = document.getElementById('prev-day');
    const nextDayArrow = document.getElementById('next-day');
    const jadwalList = document.getElementById('jadwal-list');

    const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
    let currentDayIndex = 0; // Initialize to Senin

    const jadwalData = {
        "Senin": [
            { jam: "1-2", mapel: "PJOK", guru: "Pak Bagas" },
            { jam: "3-4", mapel: "MTK", guru: "Bu Suci/Fitri" },
            { jam: "5-6", mapel: "TIK", guru: "Pak Ojo" },
            { jam: "7-9", mapel: "Kimia", guru: "Bu Rossy" }
        ],
        "Selasa": [
            { jam: "1-3", mapel: "TIK", guru: "Pak Ojo" },
            { jam: "4-6", mapel: "MTK", guru: "Pak Wawan" },
            { jam: "7-8", mapel: "B.Indo", guru: "Bu Niken" },
            { jam: "9-10", mapel: "PKWU", guru: "Bu Eva" }
        ],
        "Rabu": [
            { jam: "1-2", mapel: "Agama", guru: "Bu Rumada dan Pak Abdul Salim" },
            { jam: "3", mapel: "BK", guru: "Pak Tris" },
            { jam: "4-6", mapel: "B.Ing", guru: "Pak Fajar" },
            { jam: "7", mapel: "Agama", guru: "Bu Rum, Pak Abdul Salim" },
            { jam: "8-10", mapel: "Fisika", guru: "Bu Ida" }
        ],
        "Kamis": [
            { jam: "1-2", mapel: "B.Indo", guru: "Bu Niken" },
            { jam: "3-4", mapel: "MTK", guru: "Pak Wawan" },
            { jam: "5-6", mapel: "Sejarah", guru: "Pak Ari" },
            { jam: "7-8", mapel: "PKN", guru: "Bu Icha" },
            { jam: "9-10", mapel: "MTK", guru: "Bu Fitri/Suci" }
        ],
        "Jumat": [
            { jam: "1-2", mapel: "SenBud", guru: "Pak Reza" },
            { jam: "3-4", mapel: "Fisika", guru: "Bu Ida" },
            { jam: "5-6", mapel: "Kimia", guru: "Bu Rossy" }
        ]
    };

    const savedMode = localStorage.getItem('theme');
    if (savedMode) {
        body.classList.add(savedMode);
        if (savedMode === 'light-mode') {
            modeIcon.classList.remove('fa-moon');
            modeIcon.classList.add('fa-sun');
        }
    } else {
        body.classList.add('dark-mode');
    }

    modeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            modeIcon.classList.remove('fa-moon');
            modeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light-mode');
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            modeIcon.classList.remove('fa-sun');
            modeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark-mode');
        }
    });

    function updateJakartaDate() {
        const now = new Date();
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'Asia/Jakarta'
        };
        const formattedDate = now.toLocaleDateString('en-US', options);
        currentDateElement.textContent = `XI-C — ${formattedDate}`;
    }

    updateJakartaDate();
    setInterval(updateJakartaDate, 60 * 1000);

    // Function to generate custom dropdown items
    function populateDayDropdown() {
        customDayDropdown.innerHTML = ''; // Clear previous items
        days.forEach((day, index) => {
            const item = document.createElement('div');
            item.classList.add('custom-dropdown-item');
            item.textContent = day;
            item.dataset.dayIndex = index;
            if (index === currentDayIndex) {
                item.classList.add('selected'); // Mark current day as selected
            }
            item.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent bubble click from closing immediately
                currentDayIndex = parseInt(event.target.dataset.dayIndex);
                currentDayDisplay.textContent = days[currentDayIndex];
                displayJadwal(days[currentDayIndex]);
                toggleDayDropdown(false); // Hide dropdown after selection
                updateSelectedDayClass();
            });
            customDayDropdown.appendChild(item);
        });
    }

    // Function to update selected class in custom dropdown
    function updateSelectedDayClass() {
        document.querySelectorAll('.custom-dropdown-item').forEach((item, index) => {
            if (index === currentDayIndex) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
    }


    function displayJadwal(day) {
        jadwalList.innerHTML = '';
        const jadwalToday = jadwalData[day];
        if (jadwalToday && jadwalToday.length > 0) {
            jadwalToday.forEach(item => {
                const jadwalItemDiv = document.createElement('div');
                jadwalItemDiv.classList.add('jadwal-item');
                jadwalItemDiv.innerHTML = `
                    <div class="jam">Jam: ${item.jam}</div>
                    <div class="mapel">${item.mapel}</div>
                    <div class="guru">${item.guru}</div>
                `;
                jadwalList.appendChild(jadwalItemDiv);
            });
        } else {
            jadwalList.innerHTML = '<p style="text-align: center; opacity: 0.7;">Jadwal tidak tersedia untuk hari ini.</p>';
        }
    }

    function toggleDayDropdown(show) {
        if (show === true) {
            dayDisplayBubble.classList.add('open');
            customDayDropdown.classList.add('show');
            dropdownArrow.classList.add('rotated'); // Rotate arrow
        } else if (show === false) {
            dayDisplayBubble.classList.remove('open');
            customDayDropdown.classList.remove('show');
            dropdownArrow.classList.remove('rotated'); // Reset arrow rotation
        } else { // Toggle
            dayDisplayBubble.classList.toggle('open');
            customDayDropdown.classList.toggle('show');
            dropdownArrow.classList.toggle('rotated');
        }
        updateSelectedDayClass(); // Update selected state when dropdown opens/closes
    }

    function showJadwalView() {
        mainView.classList.remove('active-view');
        mainView.classList.add('hidden-view');
        jadwalView.classList.remove('hidden-view');
        jadwalView.classList.add('active-view');
        
        // Initialize day for jadwal view
        // Optional: set to current real-world day if within Monday-Friday, otherwise Monday
        const todayReal = new Date().getDay(); // 0=Sunday, 1=Monday...
        if (todayReal >= 1 && todayReal <= 5) { // Monday to Friday
            currentDayIndex = todayReal - 1; // Adjust for 0-indexed array
        } else {
            currentDayIndex = 0; // Default to Monday
        }

        currentDayDisplay.textContent = days[currentDayIndex];
        displayJadwal(days[currentDayIndex]);
        populateDayDropdown(); // Populate dropdown when entering jadwal view
    }

    function showMainView() {
        jadwalView.classList.remove('active-view');
        jadwalView.classList.add('hidden-view');
        mainView.classList.remove('hidden-view');
        mainView.classList.add('active-view');
        toggleDayDropdown(false); // Ensure dropdown is closed when leaving view
    }

    // Event Listeners
    jadwalBox.addEventListener('click', showJadwalView);
    globalBackButton.addEventListener('click', showMainView);

    // Day navigation arrows
    prevDayArrow.addEventListener('click', () => {
        currentDayIndex = (currentDayIndex - 1 + days.length) % days.length;
        currentDayDisplay.textContent = days[currentDayIndex];
        displayJadwal(days[currentDayIndex]);
        updateSelectedDayClass(); // Update selected class
    });

    nextDayArrow.addEventListener('click', () => {
        currentDayIndex = (currentDayIndex + 1) % days.length;
        currentDayDisplay.textContent = days[currentDayIndex];
        displayJadwal(days[currentDayIndex]);
        updateSelectedDayClass(); // Update selected class
    });

    // Custom dropdown toggle
    dayDisplayBubble.addEventListener('click', (event) => {
        // Only toggle if the click isn't on a dropdown item itself (handled by item's click listener)
        if (!event.target.classList.contains('custom-dropdown-item')) {
            toggleDayDropdown();
        }
    });

    // Hide dropdown if clicked outside
    document.addEventListener('click', (event) => {
        if (!dayDisplayBubble.contains(event.target) && !customDayDropdown.contains(event.target)) {
            toggleDayDropdown(false);
        }
    });
});