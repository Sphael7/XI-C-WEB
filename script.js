document.addEventListener('DOMContentLoaded', () => {
    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;
    const modeIcon = modeToggle.querySelector('.mode-icon');
    const currentDateElement = document.getElementById('current-date');

    const globalTopBar = document.getElementById('global-top-bar');
    const headerSearchSection = globalTopBar.querySelector('.search-section');
    const headerSearchInput = globalTopBar.querySelector('.search-input');
    const headerModeToggle = globalTopBar.querySelector('.mode-toggle');

    const mainView = document.getElementById('main-view');
    const jadwalView = document.getElementById('jadwal-view');
    const settingsView = document.getElementById('settings-view');
    const profileView = document.getElementById('profile-view');
    const loginView = document.getElementById('login-view');
    const otherView = document.getElementById('other-view');
    const teacherView = document.getElementById('teacher-view');

    const jadwalBox = document.getElementById('jadwal-box');
    const othersBox = document.getElementById('others-box');
    const teacherBox = document.getElementById('teacher-box');
    const settingsButtonFooter = document.getElementById('settings-button-footer-main');
    const globalHomeButtonFooter = document.getElementById('global-home-button-footer');

    const dayDisplayBubble = document.getElementById('day-display-bubble');
    const currentDayDisplay = document.getElementById('current-day-display');
    const dropdownArrow = document.querySelector('.dropdown-arrow');
    const customDayDropdown = document.getElementById('custom-day-dropdown');
    const prevDayArrow = document.getElementById('prev-day');
    const nextDayArrow = document.getElementById('next-day');
    const jadwalList = document.getElementById('jadwal-list');
    const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
    let currentDayIndex = 0;

    const profileSettingsItem = document.getElementById('profile-settings-item');

    const profilePhoto = document.getElementById('profile-photo');
    const profilePhotoUpload = document.getElementById('profile-photo-upload');
    const uploadPhotoIcon = document.getElementById('upload-photo-icon');
    const profileNama = document.getElementById('profile-nama');
    const profileKelas = document.getElementById('profile-kelas');
    const profileAbsen = document.getElementById('profile-absen');
    const profileNISN = document.getElementById('profile-nisn');
    const profileNIS = document.getElementById('profile-nis');
    const profileLoginButton = document.getElementById('profile-login-button');

    const loginBackButton = document.getElementById('login-back-button');
    const loginForm = document.getElementById('login-form');
    const inputNama = document.getElementById('input-nama');
    const inputKelas = document.getElementById('input-kelas');
    const inputAbsen = document.getElementById('input-absen');
    const inputNISN = document.getElementById('input-nisn');
    const inputNIS = document.getElementById('input-nis');

    const realTimeWIB = document.getElementById('real-time-wib');

    const subjectGridContainer = teacherView.querySelector('.subject-grid-container');
    const prevSubjectPageArrow = document.getElementById('prev-subject-page');
    const nextSubjectPageArrow = document.getElementById('next-subject-page');
    const currentPageDisplay = document.getElementById('current-page-display');
    const totalPagesDisplay = document.getElementById('total-pages-display');

    const teacherDetailModalOverlay = document.getElementById('teacher-detail-modal-overlay');
    const modalSubjectTitle = document.getElementById('modal-subject-title');
    const modalTeacherTableBody = document.getElementById('modal-teacher-table-body');
    const closeTeacherModalButton = document.getElementById('close-teacher-modal');

    let currentUserProfile = {
        nama: "Belum diisi",
        kelas: "Belum diisi",
        absen: "Belum diisi",
        nisn: "Belum diisi",
        nis: "Belum diisi",
        photo: "https://via.placeholder.com/100"
    };

    let currentActiveView = null;

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

    // Raw Teacher Data
    const rawTeacherData = [
        { kode: "A1", nama: "MUSLICHA, M.Pd.", mapel: "PPKN" },
        { kode: "A2", nama: "BIBIT PURWANTINI, M.Pd.", mapel: "PPKN" },
        { kode: "B0", nama: "Drs. UBAIDILLAH, M.Pd. PEND. AGAMA ISLAM", mapel: "PEND. AGAMA" },
        { kode: "B1", nama: "RUMADA, S.PAK., M.Pd. PEND. AGAMA KRISTEN", mapel: "PEND. AGAMA" },
        { kode: "B2", nama: "HENNY BIBINUR BANIAH, M.Pd.", mapel: "PEND. AGAMA" },
        { kode: "B3", nama: "SAIFUDIN, S.SI, M.Pd.", mapel: "PEND. AGAMA" },
        { kode: "B4", nama: "ABDUL SALIM, M.Pd.", mapel: "PEND. AGAMA" },
        { kode: "B5", nama: "OKTAVIANUS, S.S. PEND. AGAMA KATOLIK", mapel: "PEND. AGAMA" },
        { kode: "C1", nama: "H. EDY PRAMONO, S.Pd.", mapel: "BAHASA INDONESIA" },
        { kode: "C2", nama: "NURSITI KAMSIATI, S.Pd.", mapel: "BAHASA INDONESIA" },
        { kode: "C3", nama: "ROULINA PURBA, S.Pd", mapel: "BAHASA INDONESIA" },
        { kode: "C4", nama: "NIKEN MEILINA PUTRI, S.Pd.", mapel: "BAHASA INDONESIA" },
        { kode: "D1", nama: "USWATUN HASANAH, S.Pd.", mapel: "SEJARAH" },
        { kode: "D2", nama: "ARI SULASTRI, S.Pd.", mapel: "SEJARAH" },
        { kode: "E1", nama: "Drs. EKO RAHARDJO, M.M.", mapel: "BAHASA INGGRIS" },
        { kode: "E2", nama: "MUHAMMAD FAJAR, S.Pd.", mapel: "BAHASA INGGRIS" },
        { kode: "E3", nama: "AULIA BELFA MUTHIA, S.Pd.", mapel: "BAHASA INGGRIS" },
        { kode: "F1", nama: "Dr. GATOT HANDOKO, M.Pd.", mapel: "PJOK" },
        { kode: "F2", nama: "BAGUS CIPTA ASMAULI, S.Pd.", mapel: "PJOK" },
        { kode: "F3", nama: "BAMBANG TRIAJI ASNOTO, M.Pd.", mapel: "PJOK" },
        { kode: "G1", nama: "SWISMA, S.Pd.", mapel: "MATEMATIKA" },
        { kode: "G2", nama: "HARI WAHYONO, S.Pd.", mapel: "MATEMATIKA" },
        { kode: "G3", nama: "FRONIKA MUNTHE, S.Pd.", mapel: "MATEMATIKA" },
        { kode: "G4", nama: "ANGGRAINI PRATIWI, S.Pd.", mapel: "MATEMATIKA" },
        { kode: "G5", nama: "AHMAD SYAUQI, S.Si, M.Pd.", mapel: "MATEMATIKA" },
        { kode: "G6", nama: "WAWAN SETIAWAN, S.Si, M.Stat.", mapel: "MATEMATIKA" },
        { kode: "G7", nama: "SUCI FITRIA, S.Pd.", mapel: "MATEMATIKA" },
        { kode: "H1", nama: "Drs. H. YANI BAYANI, M,Pd.", mapel: "FISIKA" },
        { kode: "H2", nama: "JOKO UNTORO, S.Pd.", mapel: "FISIKA" },
        { kode: "H3", nama: "FAKHRIZAL ARSI, S.Pd.", mapel: "FISIKA" },
        { kode: "H4", nama: "HIDAYATUN NIKMAH, S.Pd.", mapel: "FISIKA" },
        { kode: "I1", nama: "YUSTRIDA MAISA, S.Pd, M.Si.", mapel: "BIOLOGI" },
        { kode: "I2", nama: "ETI SUGIARTI, S.Pd.", mapel: "BIOLOGI" },
        { kode: "I3", nama: "DIVA RARA VIDYANI MAISA, S.Pd.", mapel: "BIOLOGI" },
        { kode: "J1", nama: "HJ. RINA GUSTINI, M.Pd.", mapel: "KIMIA" },
        { kode: "J2", nama: "DWI AMELIA SAVITRI, M.Pd.", mapel: "KIMIA" },
        { kode: "J3", nama: "JERY ANDERSON SITORUS, S.Pd", mapel: "KIMIA" },
        { kode: "J4", nama: "ROSSY LANASARI, S.Pd.", mapel: "KIMIA" },
        { kode: "K1", nama: "EVAWATI, S.Pd.", mapel: "EKONOMI" },
        { kode: "K2", nama: "NUH HUDAWI, S.Pd.", mapel: "EKONOMI" },
        { kode: "K3", nama: "FAUZIYAH FITRIYANI, M.Pd.", mapel: "EKONOMI" },
        { kode: "L1", nama: "HARYONO, S.Pd.", mapel: "SOSIOLOGI" },
        { kode: "L2", nama: "ERZA HERMAWAN, S.Pd.", mapel: "SOSIOLOGI" },
        { kode: "N1", nama: "WANGSA JAYA, M.Si.", mapel: "GEOGRAFI" },
        { kode: "N2", nama: "ERZA HERMAWAN, S.Pd.", mapel: "GEOGRAFI" },
        { kode: "O1", nama: "AHMAD JATI, M.Pd.", mapel: "SENI BUDAYA" },
        { kode: "O2", nama: "REZA FAJRIN WIJAYA KUSUMA, S.Pd.", mapel: "SENI BUDAYA" },
        { kode: "Q1", nama: "IKA BUDIANINGSIH, S.Pd.", mapel: "BIMBINGAN KONSELING" },
        { kode: "Q2", nama: "CATUR RAHMI SETIAWATI, S.Pd.", mapel: "BIMBINGAN KONSELING" },
        { kode: "Q3", nama: "DINA APRILIYATI, S.Pd.", mapel: "BIMBINGAN KONSELING" },
        { kode: "Q4", nama: "MUHAMMAD SUTRISNO, S.Pd.", mapel: "BIMBINGAN KONSELING" },
        { kode: "S1", nama: "ROCMULJATI EKASARI DAWAM, S.Pd.", mapel: "BAHASA JERMAN" },
        { kode: "S2", nama: "SRI REJEKI, S.Pd.", mapel: "BAHASA JERMAN" },
        { kode: "S3", nama: "WURHANDAYANI, S.Pd.", mapel: "BAHASA JERMAN" },
        { kode: "T1", nama: "KHAIRUNISSA, S.T.", mapel: "INFORMATIKA" },
        { kode: "T2", nama: "HAERUDI YANSHAH, S.Kom, M.Pd.", mapel: "INFORMATIKA" },
        { kode: "T3", nama: "PRASOJO, M.M.S.I.", mapel: "INFORMATIKA" },
        { kode: "PK1", nama: "EVAWATI, S.Pd.", mapel: "PKWU" },
        { kode: "PK2", nama: "NUH HUDAWI, S.Pd.", mapel: "PKWU" },
        { kode: "PK3", nama: "DWI AMELIA SAVITRI, M.Pd.", mapel: "PKWU" },
        { kode: "PK4", nama: "HIDAYATUN NIKMAH, S.Pd.", mapel: "PKWU" },
        { kode: "PK5", nama: "ROSSY LANASARI, S.Pd", mapel: "PKWU" }
    ];

    const groupedTeacherData = rawTeacherData.reduce((acc, teacher) => {
        if (!acc[teacher.mapel]) {
            acc[teacher.mapel] = [];
        }
        acc[teacher.mapel].push(teacher);
        return acc;
    }, {});

    const subjectNames = Object.keys(groupedTeacherData);
    const itemsPerPage = 6;
    let currentTeacherPage = 0;
    const totalPages = Math.ceil(subjectNames.length / itemsPerPage);


    function populateTeacherTable(subject) {
        modalTeacherTableBody.innerHTML = '';
        const teachersForSubject = groupedTeacherData[subject];
        if (teachersForSubject && teachersForSubject.length > 0) {
            teachersForSubject.forEach(teacher => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${teacher.kode}</td>
                    <td>${teacher.nama}</td>
                    <td>${teacher.mapel}</td>
                `;
                modalTeacherTableBody.appendChild(row);
            });
        } else {
            modalTeacherTableBody.innerHTML = '<tr><td colspan="3" style="text-align: center; opacity: 0.7;">Tidak ada guru untuk mata pelajaran ini.</td></tr>';
        }
    }

    function renderSubjectBoxes(page) {
        const start = page * itemsPerPage;
        const end = start + itemsPerPage;
        const subjectsToDisplay = subjectNames.slice(start, end);

        subjectGridContainer.innerHTML = '';

        subjectsToDisplay.forEach(subjectName => {
            const subjectBox = document.createElement('div');
            subjectBox.classList.add('subject-box');
            subjectBox.innerHTML = `<h3>${subjectName}</h3>`;
            subjectBox.dataset.subject = subjectName;

            subjectBox.addEventListener('click', () => {
                showTeacherModal(subjectName);
            });
            subjectGridContainer.appendChild(subjectBox);
        });

        currentPageDisplay.textContent = page + 1;
        totalPagesDisplay.textContent = totalPages;
    }

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

    function updateRealTimeWIB() {
        const now = new Date();
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'Asia/Jakarta'
        };
        const formattedTime = now.toLocaleTimeString('en-US', options);
        if (realTimeWIB) {
            realTimeWIB.textContent = formattedTime;
        }
    }
    updateRealTimeWIB();
    setInterval(updateRealTimeWIB, 1000);


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

    const ANIMATION_DURATION = 300;

    function showView(viewToShow) {
        if (viewToShow === currentActiveView) return;

        const previousView = currentActiveView;

        if (previousView) {
            previousView.classList.add('view-exit');
            previousView.style.pointerEvents = 'none';
            previousView.style.position = 'absolute';
            previousView.style.zIndex = 1;
        }

        viewToShow.classList.add('view-enter');
        viewToShow.classList.remove('hidden-view');
        viewToShow.style.position = 'static';
        viewToShow.style.zIndex = 2;

        setTimeout(() => {
            if (previousView) {
                previousView.classList.remove('active-view', 'view-exit');
                previousView.classList.add('hidden-view');
                previousView.style.pointerEvents = '';
                previousView.style.position = '';
                previousView.style.zIndex = '';
            }

            viewToShow.classList.remove('view-enter');
            viewToShow.classList.add('active-view', 'view-enter-active');
            currentActiveView = viewToShow;

            setTimeout(() => {
                viewToShow.classList.remove('view-enter-active');
                viewToShow.style.opacity = '';
                viewToShow.style.transform = '';
            }, ANIMATION_DURATION);

            headerSearchSection.style.display = 'flex';
            headerModeToggle.style.display = 'flex';
            globalTopBar.style.justifyContent = 'space-between';

            if (viewToShow === loginView) {
                headerSearchSection.style.display = 'none';
                headerModeToggle.style.display = 'none';
            } else {
            }

            toggleDayDropdown(false);
            headerSearchInput.value = '';

            if (viewToShow === teacherView) {
                renderSubjectBoxes(currentTeacherPage);
            }
        }, ANIMATION_DURATION);
    }

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

    function showOtherView() {
        showView(otherView);
    }

    function showTeacherView() {
        showView(teacherView);
    }

    function showTeacherModal(subject) {
        modalSubjectTitle.textContent = subject;
        populateTeacherTable(subject);
        teacherDetailModalOverlay.classList.add('visible');
        body.style.overflow = 'hidden';
    }

    function hideTeacherModal() {
        teacherDetailModalOverlay.classList.remove('visible');
        body.style.overflow = '';
    }

    jadwalBox.addEventListener('click', showJadwalView);
    othersBox.addEventListener('click', showOtherView);
    teacherBox.addEventListener('click', showTeacherView);
    settingsButtonFooter.addEventListener('click', showSettingsView);
    profileSettingsItem.addEventListener('click', showProfileView);
    profileLoginButton.addEventListener('click', showLoginView);
    
    loginBackButton.addEventListener('click', showProfileView);

    globalHomeButtonFooter.addEventListener('click', showMainView);

    prevDayArrow.addEventListener('click', () => {
        currentDayIndex = (currentDayIndex - 1 + days.length) % days.length;
        currentDayDisplay.textContent = days[currentDayIndex];
        displayJadwal(days[currentDayIndex]);
        updateSelectedDayClass();
    });

    nextDayArrow.addEventListener('click', () => {
        currentDayIndex = (currentDayIndex + 1) % days.length;
        currentDayDisplay.textContent = days[currentDayIndex];
        displayJadwal(days[currentDayIndex]);
        updateSelectedDayClass();
    });

    prevSubjectPageArrow.addEventListener('click', () => {
        currentTeacherPage = (currentTeacherPage - 1 + totalPages) % totalPages;
        renderSubjectBoxes(currentTeacherPage);
    });

    nextSubjectPageArrow.addEventListener('click', () => {
        currentTeacherPage = (currentTeacherPage + 1) % totalPages;
        renderSubjectBoxes(currentTeacherPage);
    });

    closeTeacherModalButton.addEventListener('click', hideTeacherModal);
    teacherDetailModalOverlay.addEventListener('click', (event) => {
        if (event.target === teacherDetailModalOverlay) {
            hideTeacherModal();
        }
    });

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        currentUserProfile.nama = inputNama.value.trim() || "Belum diisi";
        currentUserProfile.kelas = inputKelas.value.trim() || "Belum diisi";
        currentUserProfile.absen = inputAbsen.value.trim() || "Belum diisi";
        currentUserProfile.nisn = inputNISN.value.trim() || "Belum diisi";
        currentUserProfile.nis = inputNIS.value.trim() || "Belum diisi";

        saveUserProfile();
        showProfileView();
    });

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

    loadUserProfile();
    showMainView();
});
