document.addEventListener('DOMContentLoaded', () => {
    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;
    const modeIcon = modeToggle.querySelector('.mode-icon');
    const currentDateElement = document.getElementById('current-date');

    // Global Header elements
    const globalTopBar = document.getElementById('global-top-bar');
    const headerSearchSection = globalTopBar.querySelector('.search-section');
    const headerSearchInput = globalTopBar.querySelector('.search-input');
    const headerModeToggle = globalTopBar.querySelector('.mode-toggle');

    // Views
    const mainView = document.getElementById('main-view');
    const jadwalView = document.getElementById('jadwal-view');
    const settingsView = document.getElementById('settings-view');
    const profileView = document.getElementById('profile-view');
    const loginView = document.getElementById('login-view');

    // Main Page elements
    const jadwalBox = document.getElementById('jadwal-box');
    const settingsButtonFooter = document.getElementById('settings-button-footer-main');
    const globalHomeButtonFooter = document.getElementById('global-home-button-footer'); // Home button reference

    // Jadwal View elements
    const dayDisplayBubble = document.getElementById('day-display-bubble');
    const currentDayDisplay = document.getElementById('current-day-display');
    const dropdownArrow = document.querySelector('.dropdown-arrow');
    const customDayDropdown = document.getElementById('custom-day-dropdown');
    const prevDayArrow = document.getElementById('prev-day');
    const nextDayArrow = document.getElementById('next-day');
    const jadwalList = document.getElementById('jadwal-list');
    const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
    let currentDayIndex = 0;

    // Settings View elements
    const profileSettingsItem = document.getElementById('profile-settings-item');

    // Profile View elements
    const profilePhoto = document.getElementById('profile-photo');
    const profilePhotoUpload = document.getElementById('profile-photo-upload');
    const uploadPhotoIcon = document.getElementById('upload-photo-icon');
    const profileNama = document.getElementById('profile-nama');
    const profileKelas = document.getElementById('profile-kelas');
    const profileAbsen = document.getElementById('profile-absen');
    const profileNISN = document.getElementById('profile-nisn');
    const profileNIS = document.getElementById('profile-nis');
    const profileLoginButton = document.getElementById('profile-login-button');

    // Login View elements
    const loginBackButton = document.getElementById('login-back-button'); // The ONLY back button left
    const loginForm = document.getElementById('login-form');
    const inputNama = document.getElementById('input-nama');
    const inputKelas = document.getElementById('input-kelas');
    const inputAbsen = document.getElementById('input-absen');
    const inputNISN = document.getElementById('input-nisn');
    const inputNIS = document.getElementById('input-nis');

    // --- State and Data Management ---
    let currentUserProfile = {
        nama: "Belum diisi",
        kelas: "Belum diisi",
        absen: "Belum diisi",
        nisn: "Belum diisi",
        nis: "Belum diisi",
        photo: "https://via.placeholder.com/100"
    };

    // --- Navigation State (simplified as history is not tracked for Home button) ---
    let currentActiveView = null; // To track the currently displayed view element

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

    // --- Theme Toggle Logic ---
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

    // --- Date Display Logic ---
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

    // --- Jadwal View Logic ---
    function populateDayDropdown() {
        customDayDropdown.innerHTML = '';
        days.forEach((day, index) => {
            const item = document.createElement('div');
            item.classList.add('custom-dropdown-item');
            item.textContent = day;
            item.dataset.dayIndex = index;
            if (index === currentDayIndex) {
                item.classList.add('selected');
            }
            item.addEventListener('click', (event) => {
                event.stopPropagation();
                currentDayIndex = parseInt(event.target.dataset.dayIndex);
                currentDayDisplay.textContent = days[currentDayIndex];
                displayJadwal(days[currentDayIndex]);
                toggleDayDropdown(false);
                updateSelectedDayClass();
            });
            customDayDropdown.appendChild(item);
        });
    }

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
            dropdownArrow.classList.add('rotated');
        } else if (show === false) {
            dayDisplayBubble.classList.remove('open');
            customDayDropdown.classList.remove('show');
            dropdownArrow.classList.remove('rotated');
        } else {
            dayDisplayBubble.classList.toggle('open');
            customDayDropdown.classList.toggle('show');
            dropdownArrow.classList.toggle('rotated');
        }
        updateSelectedDayClass();
    }

    // --- User Profile Management ---
    function loadUserProfile() {
        const storedProfile = localStorage.getItem('userProfile');
        if (storedProfile) {
            currentUserProfile = JSON.parse(storedProfile);
        }
        updateProfileDisplay();
    }

    function saveUserProfile() {
        localStorage.setItem('userProfile', JSON.stringify(currentUserProfile));
        updateProfileDisplay();
    }

    function updateProfileDisplay() {
        profileNama.textContent = currentUserProfile.nama || "Belum diisi";
        profileKelas.textContent = currentUserProfile.kelas || "Belum diisi";
        profileAbsen.textContent = currentUserProfile.absen || "Belum diisi";
        profileNISN.textContent = currentUserProfile.nisn || "Belum diisi";
        profileNIS.textContent = currentUserProfile.nis || "Belum diisi";
        profilePhoto.src = currentUserProfile.photo || "https://via.placeholder.com/100";
    }

    // --- View Management with Animations ---
    const allViews = [mainView, jadwalView, settingsView, profileView, loginView];
    const ANIMATION_DURATION = 300; // ms, matches CSS transition duration

    function showView(viewToShow) {
        if (viewToShow === currentActiveView) return; // Prevent transition to same view

        const previousView = currentActiveView;

        // Step 1: Animate out the current view (if any)
        if (previousView) {
            previousView.classList.add('view-exit'); // Start exit animation
            previousView.style.pointerEvents = 'none'; // Disable clicks during exit
            previousView.style.position = 'absolute'; // Take out of flow to prevent reflow issues
            previousView.style.zIndex = 1; // Ensure it's above new view during exit
        }

        // Step 2: Prepare the new view for entrance animation
        viewToShow.classList.add('view-enter'); // Apply initial state for entrance
        viewToShow.classList.remove('hidden-view'); // Make it visible (but opaque/transformed)
        viewToShow.style.position = 'static'; // Allow it to take up space
        viewToShow.style.zIndex = 2; // Ensure it's above old view

        // Step 3: Wait for current view to animate out, then animate new view in
        setTimeout(() => {
            if (previousView) {
                previousView.classList.remove('active-view', 'view-exit');
                previousView.classList.add('hidden-view'); // Fully hide after exit
                previousView.style.pointerEvents = ''; // Reset
                previousView.style.position = ''; // Reset
                previousView.style.zIndex = ''; // Reset
            }

            viewToShow.classList.remove('view-enter'); // Remove initial entrance state
            viewToShow.classList.add('active-view', 'view-enter-active'); // Start entrance animation
            currentActiveView = viewToShow; // Update active view

            // After entrance animation completes, remove active state and reset transforms
            // This is important for smooth re-transitions and avoiding lingering transform states
            setTimeout(() => {
                viewToShow.classList.remove('view-enter-active');
                viewToShow.style.opacity = ''; // Reset inline styles
                viewToShow.style.transform = ''; // Reset inline styles
            }, ANIMATION_DURATION);


            // --- Update Top Bar Visibility ---
            headerSearchSection.style.display = 'flex';
            headerModeToggle.style.display = 'flex';
            globalTopBar.style.justifyContent = 'space-between';

            if (viewToShow === loginView) {
                headerSearchSection.style.display = 'none';
                headerModeToggle.style.display = 'none';
                // Justify-content is handled by .login-specific-top-bar in HTML for this view
            } else {
                // Default visibility
            }

            toggleDayDropdown(false); // Always close custom dropdown
            headerSearchInput.value = ''; // Clear search input
        }, ANIMATION_DURATION);
    }

    // --- Navigation Functions ---
    function showMainView() {
        showView(mainView);
    }

    function showJadwalView() {
        showView(jadwalView);
        const todayReal = new Date().getDay();
        if (todayReal >= 1 && todayReal <= 5) {
            currentDayIndex = todayReal - 1;
        } else {
            currentDayIndex = 0;
        }
        currentDayDisplay.textContent = days[currentDayIndex];
        displayJadwal(days[currentDayIndex]);
        populateDayDropdown();
    }

    function showSettingsView() {
        showView(settingsView);
    }

    function showProfileView() {
        showView(profileView);
        loadUserProfile();
    }

    function showLoginView() {
        showView(loginView);
        inputNama.value = currentUserProfile.nama !== "Belum diisi" ? currentUserProfile.nama : "";
        inputKelas.value = currentUserProfile.kelas !== "Belum diisi" ? currentUserProfile.kelas : "";
        inputAbsen.value = currentUserProfile.absen !== "Belum diisi" ? currentUserProfile.absen : "";
        inputNISN.value = currentUserProfile.nisn !== "Belum diisi" ? currentUserProfile.nisn : "";
        inputNIS.value = currentUserProfile.nis !== "Belum diisi" ? currentUserProfile.nis : "";
    }

    // --- Event Listeners ---
    jadwalBox.addEventListener('click', showJadwalView);
    settingsButtonFooter.addEventListener('click', showSettingsView);
    profileSettingsItem.addEventListener('click', showProfileView);
    profileLoginButton.addEventListener('click', showLoginView);
    
    // Login Back button (only back button that exists in the HTML for login)
    loginBackButton.addEventListener('click', showProfileView); // Back from Login always goes to Profile

    // Global Home button (in footer)
    globalHomeButtonFooter.addEventListener('click', showMainView); // Always navigate to main view

    // Day navigation arrows (in Jadwal view)
    prevDayArrow.addEventListener('click', () => {
        currentDayIndex = (currentDayIndex - 1 + days.length) % days.length; // Ensure cyclic
        currentDayDisplay.textContent = days[currentDayIndex];
        displayJadwal(days[currentDayIndex]);
        updateSelectedDayClass();
    });

    nextDayArrow.addEventListener('click', () => {
        currentDayIndex = (currentDayIndex + 1) % days.length; // Ensure cyclic
        currentDayDisplay.textContent = days[currentDayIndex];
        displayJadwal(days[currentDayIndex]);
        updateSelectedDayClass();
    });

    // --- Login Form Submission ---
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        currentUserProfile.nama = inputNama.value.trim() || "Belum diisi";
        currentUserProfile.kelas = inputKelas.value.trim() || "Belum diisi";
        currentUserProfile.absen = inputAbsen.value.trim() || "Belum diisi";
        currentUserProfile.nisn = inputNISN.value.trim() || "Belum diisi";
        currentUserProfile.nis = inputNIS.value.trim() || "Belum diisi";

        saveUserProfile();
        showProfileView(); // Go back to profile view after login
    });

    // --- Profile Photo Upload ---
    uploadPhotoIcon.addEventListener('click', () => {
        profilePhotoUpload.click();
    });

    profilePhotoUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                currentUserProfile.photo = e.target.result;
                saveUserProfile();
            };
            reader.readAsDataURL(file);
        }
    });

    // --- General Dropdown & Navigation Click Handlers ---
    dayDisplayBubble.addEventListener('click', (event) => {
        if (!event.target.classList.contains('custom-dropdown-item')) {
            toggleDayDropdown();
        }
    });

    document.addEventListener('click', (event) => {
        if (!dayDisplayBubble.contains(event.target) && !customDayDropdown.contains(event.target)) {
            toggleDayDropdown(false);
        }
    });

    // Initial load for profile data and set initial view
    loadUserProfile();
    showMainView(); // Start with main view
});
