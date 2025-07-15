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
    const studentView = document.getElementById('student-view');
    const announcementView = document.getElementById('announcement-view');
    const addAnnouncementView = document.getElementById('add-announcement-view');

    const jadwalBox = document.getElementById('jadwal-box');
    const studentBox = document.getElementById('student-box');
    const othersBox = document.getElementById('others-box');
    const teacherBox = document.getElementById('teacher-box');
    const announcementBox = document.getElementById('announcement-box');
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
    const errorNama = document.getElementById('error-nama');
    const errorKelas = document.getElementById('error-kelas');
    const errorAbsen = document.getElementById('error-absen');
    const errorNISN = document.getElementById('error-nisn');
    const errorNIS = document.getElementById('error-nis');


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

    const searchResultsModalOverlay = document.getElementById('search-results-modal-overlay');
    const searchResultsTeacherTableBody = document.getElementById('search-results-teacher-table-body');
    const closeSearchModalButton = document.getElementById('close-search-modal');
    const noSearchResultsMessage = document.getElementById('no-search-results-message');

    const studentTableBody = document.getElementById('student-table-body');
    const prevStudentPageArrow = document.getElementById('prev-student-page');
    const nextStudentPageArrow = document.getElementById('next-student-page');
    const currentStudentPageDisplay = document.getElementById('current-student-page-display');
    const totalStudentPagesDisplay = document.getElementById('total-student-pages-display');

    const announcementTableBody = document.getElementById('announcement-table-body');
    const prevAnnouncementPageArrow = document.getElementById('prev-announcement-page');
    const nextAnnouncementPageArrow = document.getElementById('next-announcement-page');
    const currentAnnouncementPageDisplay = document.getElementById('current-announcement-page-display');
    const totalAnnouncementPagesDisplay = document.getElementById('total-announcement-pages-display');
    const addAnnouncementButton = document.getElementById('add-announcement-button');

    const addAnnouncementBackButton = document.getElementById('add-announcement-back-button');
    const addAnnouncementForm = document.getElementById('add-announcement-form');
    const announcementTitleInput = document.getElementById('announcement-title-input');
    const announcementSubjectInput = document.getElementById('announcement-subject-input');
    const announcementDeadlineInput = document.getElementById('announcement-deadline-input');
    const announcementContentInput = document.getElementById('announcement-content-input');
    const publishAnnouncementButton = document.getElementById('publish-announcement-button');
    const errorAnnouncementTitle = document.getElementById('error-announcement-title');
    const errorAnnouncementSubject = document.getElementById('error-announcement-subject');
    const errorAnnouncementDeadline = document.getElementById('error-announcement-deadline');
    const errorAnnouncementContent = document.getElementById('error-announcement-content');

    const announcementDetailModalOverlay = document.getElementById('announcement-detail-modal-overlay');
    const announcementDetailModalTitle = document.getElementById('announcement-detail-modal-title');
    const announcementDetailSubject = document.getElementById('announcement-detail-subject');
    const announcementDetailDeadline = document.getElementById('announcement-detail-deadline');
    const announcementDetailContent = document.getElementById('announcement-detail-content');
    const closeAnnouncementDetailModal = document.getElementById('close-announcement-detail-modal');


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

    const studentData = [
        { no: 1, nis: 27963, nisn: "0093214922", nama: "Anjani Raisya Nabila" },
        { no: 2, nis: 27966, nisn: "0104384756", nama: "Aqil Rizqulloh" },
        { no: 3, nis: 27974, nisn: "0096876249", nama: "Arkan Azka Priambodo" },
        { no: 4, nis: 27978, nisn: "0096192684", nama: "Athaya Kirani Ajie" },
        { no: 5, nis: 27987, nisn: "0081199376", nama: "Azahra Deska Khairunnisah" },
        { no: 6, nis: 27998, nisn: "0088084821", nama: "Callysta Neshya Putrikeanu" },
        { no: 7, nis: 28298, nisn: "0094335829", nama: "Christian N Bonardo Panjaitan" },
        { no: 8, nis: 28005, nisn: "0093618811", nama: "Christopher Alberto Hamonangan" },
        { no: 9, nis: 28015, nisn: "0098775974", nama: "Delvina Kiara Yusuf" },
        { no: 10, nis: 28032, nisn: "0082956447", nama: "Faiz Ramadhan" },
        { no: 11, nis: 28033, nisn: "0098426683", nama: "Faiz Syawaludin Wibowo" },
        { no: 12, nis: 28035, nisn: "0099175218", nama: "Fanya Juniarisha" },
        { no: 13, nis: 28042, nisn: "0089311924", nama: "Fatya Afifah" },
        { no: 14, nis: 28045, nisn: "0096589165", nama: "Fide Cristo Hasiholan Tambunan" },
        { no: 15, nis: 28067, nisn: "0084013445", nama: "Hidayatullah Ahmad Dharmawan" },
        { no: 16, nis: 28077, nisn: "0091921781", nama: "Ivander Jeremy Siahaan" },
        { no: 17, nis: 28094, nisn: "0091145472", nama: "Kenzie Aldwara Teddy" },
        { no: 18, nis: 28122, nisn: "0098041597", nama: "Marvel Bay Haafiz" },
        { no: 19, nis: 28130, nisn: "0095364965", nama: "Mohammad Rayendra Darmasta Kuntoadji" },
        { no: 20, nis: 28161, nisn: "0089584725", nama: "Muhammad Rahman Hadi" },
        { no: 21, nis: 28163, nisn: "0096512743", nama: "Muhammad Razan Putra Priantrisatria" },
        { no: 22, nis: 28168, nisn: "0089179147", nama: "Muhammad Syafiq" },
        { no: 23, nis: 28171, nisn: "0095676052", nama: "Muhammad Zidni Mubarok" },
        { no: 24, nis: 28305, nisn: "0102519501", nama: "Muhammad Syahmi Trihandoko" },
        { no: 25, nis: 28178, nisn: "0095570149", nama: "Najwa Sabrina" },
        { no: 26, nis: 28212, nisn: "0081101647", nama: "Raja Farrel Ardan" },
        { no: 27, nis: 28308, nisn: "0095865121", nama: "Razan Muhammad Ikhsan" },
        { no: 28, nis: 28226, nisn: "0075196295", nama: "Reza Aditya Lasoma" },
        { no: 29, nis: 28309, nisn: "0101667068", nama: "Sarah Adelia Zahra" },
        { no: 30, nis: 28247, nisn: "0081894450", nama: "Sayyid Muhammad Bagir" },
        { no: 31, nis: 28240, nisn: "0092277663", nama: "Salman Raqib Aliwidodo" },
        { no: 32, nis: 28251, nisn: "0098011639", nama: "Shafiya Hana Almeira" },
        { no: 33, nis: 28256, nisn: "0097893672", nama: "Silvester Justin Sebastian Santoso" },
        { no: 34, nis: 28260, nisn: "0092078337", nama: "Teger Immanuel Pindonta Bangun" },
        { no: 35, nis: 28268, nisn: "0096163810", nama: "Umairah Bilqisth" },
        { no: 36, nis: 28274, nisn: "0083578483", nama: "Wahyunda Lurinta Syabani" }
    ];

    const studentsPerPage = 9;
    let currentStudentPage = 0;
    const totalStudentPages = Math.ceil(studentData.length / studentsPerPage);

    let announcementData = JSON.parse(localStorage.getItem('announcementData')) || []; 
    const announcementsPerPage = 7;
    let currentAnnouncementPage = 0;
    let totalAnnouncementPages = Math.ceil(announcementData.length / announcementsPerPage);

    const subjectDatabase = [
        "Fisika", "Kimia", "Agama Islam", "Agama Kristen", "Sejarah", "Matematika Wajib", 
        "Matematika Lanjut", "Bahasa Inggris", "Bahasa Indonesia", "Informatika", "PPKn", 
        "Seni Budaya", "PKWU", "PJOK", "BK"
    ];

    function populateTeacherTable(tableBodyElement, teachers) {
        tableBodyElement.innerHTML = '';
        if (teachers && teachers.length > 0) {
            teachers.forEach(teacher => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${teacher.kode}</td>
                    <td>${teacher.nama}</td>
                    <td>${teacher.mapel}</td>
                `;
                tableBodyElement.appendChild(row);
            });
            if (tableBodyElement === searchResultsTeacherTableBody) {
                noSearchResultsMessage.classList.add('hidden');
            }
        } else {
            tableBodyElement.innerHTML = '<tr><td colspan="3" style="text-align: center; opacity: 0.7;">Tidak ada guru untuk mata pelajaran ini.</td></tr>';
            if (tableBodyElement === searchResultsTeacherTableBody) {
                noSearchResultsMessage.classList.remove('hidden');
            }
        }
    }

    function renderSubjectBoxes(page) {
        const start = page * itemsPerPage;
        const end = start + itemsPerPage;
        const subjectsToDisplay = subjectNames.slice(start, end);

        subjectGridContainer.innerHTML = '';

        if (subjectsToDisplay.length === 0 && subjectNames.length > 0) {
            currentTeacherPage = 0;
            renderSubjectBoxes(currentTeacherPage);
            return;
        } else if (subjectsToDisplay.length === 0 && subjectNames.length === 0) {
            subjectGridContainer.innerHTML = '<p style="text-align: center; opacity: 0.7; padding-top: 20px;">Tidak ada data guru yang tersedia.</p>';
        }

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
        totalPagesDisplay.textContent = totalPages > 0 ? totalPages : 1;
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
        if (viewToShow === currentActiveView) {
            return;
        }

        const previousView = currentActiveView;

        if (previousView) {
            previousView.classList.add('view-exit');
            setTimeout(() => {
                previousView.classList.remove('active-view', 'view-exit');
                previousView.classList.add('hidden-view');
                previousView.style.pointerEvents = 'none'; 
            }, ANIMATION_DURATION);
        }

        viewToShow.classList.remove('hidden-view');
        viewToShow.classList.add('view-enter');
        viewToShow.style.pointerEvents = 'auto';

        requestAnimationFrame(() => {
            viewToShow.classList.remove('view-enter');
            viewToShow.classList.add('active-view', 'view-enter-active');
            currentActiveView = viewToShow;

            setTimeout(() => {
                viewToShow.classList.remove('view-enter-active');
            }, ANIMATION_DURATION);
        });

        if (viewToShow === loginView || viewToShow === addAnnouncementView) {
            globalTopBar.classList.add('login-specific-top-bar');
            headerSearchSection.style.display = 'none';
            headerModeToggle.style.display = 'none';
            globalTopBar.style.justifyContent = 'flex-start';
        } else {
            globalTopBar.classList.remove('login-specific-top-bar');
            headerSearchSection.style.display = 'flex';
            headerModeToggle.style.display = 'flex';
            globalTopBar.style.justifyContent = 'space-between';
        }

        toggleDayDropdown(false);
        hideSearchResultsModal(); 

        if (viewToShow === teacherView) {
            renderSubjectBoxes(currentTeacherPage);
        } else if (viewToShow === studentView) {
            renderStudentTable(currentStudentPage);
        } else if (viewToShow === announcementView) {
            renderAnnouncementTable(currentAnnouncementPage);
        }
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
        clearErrorMessages();
    }

    function showOtherView() {
        showView(otherView);
    }

    function showTeacherView() {
        showView(teacherView);
    }

    function showStudentView() {
        showView(studentView);
    }

    function showAnnouncementView() {
        showView(announcementView);
    }

    function showAddAnnouncementView() {
        showView(addAnnouncementView);
        // Clear form and errors when entering this view
        addAnnouncementForm.reset();
        clearAnnouncementErrorMessages();
    }

    function showTeacherModal(subject) {
        modalSubjectTitle.textContent = subject;
        populateTeacherTable(modalTeacherTableBody, groupedTeacherData[subject]);
        teacherDetailModalOverlay.classList.add('visible');
        body.style.overflow = 'hidden';
    }

    function hideTeacherModal() {
        teacherDetailModalOverlay.classList.remove('visible');
        body.style.overflow = '';
    }

    function displayErrorMessage(element, message) {
        element.textContent = message;
        element.classList.add('visible');
    }

    function clearErrorMessage(element) {
        element.textContent = '';
        element.classList.remove('visible');
    }

    function clearErrorMessages() {
        clearErrorMessage(errorNama);
        clearErrorMessage(errorKelas);
        clearErrorMessage(errorAbsen);
        clearErrorMessage(errorNISN);
        clearErrorMessage(errorNIS);
    }

    function clearAnnouncementErrorMessages() {
        clearErrorMessage(errorAnnouncementTitle);
        clearErrorMessage(errorAnnouncementSubject);
        clearErrorMessage(errorAnnouncementDeadline);
        clearErrorMessage(errorAnnouncementContent);
    }

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        clearErrorMessages();

        let isValid = true;

        const nama = inputNama.value.trim();
        const kelas = inputKelas.value.trim();
        const absen = inputAbsen.value.trim();
        const nisn = inputNISN.value.trim();
        const nis = inputNIS.value.trim();

        if (nama === "") {
            displayErrorMessage(errorNama, "Nama tidak boleh kosong.");
            isValid = false;
        }
        if (kelas === "") {
            displayErrorMessage(errorKelas, "Kelas tidak boleh kosong.");
            isValid = false;
        }
        if (absen === "" || isNaN(absen) || parseInt(absen) <= 0) {
            displayErrorMessage(errorAbsen, "No. Absen harus angka positif.");
            isValid = false;
        }
        if (nisn === "" || isNaN(nisn) || parseInt(nisn) <= 0) {
            displayErrorMessage(errorNISN, "NISN harus angka positif.");
            isValid = false;
        }
        if (nis === "" || isNaN(nis) || parseInt(nis) <= 0) {
            displayErrorMessage(errorNIS, "NIS harus angka positif.");
            isValid = false;
        }

        if (isValid) {
            currentUserProfile.nama = nama;
            currentUserProfile.kelas = kelas;
            currentUserProfile.absen = absen;
            currentUserProfile.nisn = nisn;
            currentUserProfile.nis = nis;
            saveUserProfile();
            showProfileView();
        }
    });

    uploadPhotoIcon.addEventListener('click', () => {
        profilePhotoUpload.click();
    });

    profilePhotoUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('File yang dipilih bukan gambar. Harap pilih file gambar.');
                profilePhotoUpload.value = '';
                return;
            }
            const MAX_FILE_SIZE = 2 * 1024 * 1024;
            if (file.size > MAX_FILE_SIZE) {
                alert('Ukuran gambar terlalu besar. Maksimum 2MB.');
                profilePhotoUpload.value = '';
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                currentUserProfile.photo = e.target.result;
                saveUserProfile();
            };
            reader.onerror = () => {
                alert('Gagal membaca file gambar. Coba lagi.');
                profilePhotoUpload.value = '';
            };
            reader.readAsDataURL(file);
        }
    });

    function showSearchResultsModal() {
        body.style.overflow = 'hidden'; 
        searchResultsModalOverlay.classList.add('visible'); 
    }

    function hideSearchResultsModal() {
        searchResultsModalOverlay.classList.remove('visible'); 
        setTimeout(() => {
            body.style.overflow = '';
            searchResultsTeacherTableBody.innerHTML = '';
            noSearchResultsMessage.classList.add('hidden');
        }, ANIMATION_DURATION);
        headerSearchInput.value = '';
    }

    function handleSearch() {
        const searchTerm = headerSearchInput.value.toLowerCase().trim();

        if (searchTerm.length > 0) {
            const filteredTeachers = rawTeacherData.filter(teacher =>
                teacher.nama.toLowerCase().includes(searchTerm)
            );
            populateTeacherTable(searchResultsTeacherTableBody, filteredTeachers);
            showSearchResultsModal();
        } else {
            hideSearchResultsModal();
        }
    }

    function renderStudentTable(page) {
        const start = page * studentsPerPage;
        const end = start + studentsPerPage;
        const studentsToDisplay = studentData.slice(start, end);

        studentTableBody.innerHTML = '';

        if (studentsToDisplay.length > 0) {
            studentsToDisplay.forEach(student => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.no}</td>
                    <td>${student.nis}</td>
                    <td>${student.nisn}</td>
                    <td>${student.nama}</td>
                `;
                studentTableBody.appendChild(row);
            });
        } else {
            studentTableBody.innerHTML = '<tr><td colspan="4" style="text-align: center; opacity: 0.7; padding: 20px;">Tidak ada data murid yang tersedia.</td></tr>';
        }

        currentStudentPageDisplay.textContent = page + 1;
        totalStudentPagesDisplay.textContent = totalStudentPages > 0 ? totalStudentPages : 1;
    }

    function renderAnnouncementTable(page) {
        const start = page * announcementsPerPage;
        const end = start + announcementsPerPage;
        const announcementsToDisplay = announcementData.slice(start, end);

        announcementTableBody.innerHTML = '';

        if (announcementsToDisplay.length > 0) {
            announcementsToDisplay.forEach(announcement => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${announcement.no}</td>
                    <td>${announcement.judul}</td>
                    <td>${announcement.mapel}</td>
                    <td><a href="#" class="view-details-link" data-id="${announcement.id}">Lihat selengkapnya</a></td>
                `;
                announcementTableBody.appendChild(row);
            });
        } else {
            announcementTableBody.innerHTML = '<tr><td colspan="4" style="text-align: center; opacity: 0.7; padding: 20px;">Belum ada pengumuman.</td></tr>';
        }

        currentAnnouncementPageDisplay.textContent = page + 1;
        totalAnnouncementPages = Math.ceil(announcementData.length / announcementsPerPage);
        totalAnnouncementPagesDisplay.textContent = totalAnnouncementPages > 0 ? totalAnnouncementPages : 1;

        document.querySelectorAll('.view-details-link').forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const announcementId = event.target.dataset.id;
                showAnnouncementDetailModal(announcementId);
            });
        });
    }

    function showAnnouncementDetailModal(id) {
        const announcement = announcementData.find(ann => ann.id == id);
        if (announcement) {
            announcementDetailModalTitle.textContent = announcement.judul;
            announcementDetailSubject.textContent = announcement.mapel;
            announcementDetailDeadline.textContent = announcement.deadline;
            announcementDetailContent.textContent = announcement.isi;

            announcementDetailModalOverlay.classList.add('visible');
            body.style.overflow = 'hidden';
        }
    }

    function hideAnnouncementDetailModal() {
        announcementDetailModalOverlay.classList.remove('visible');
        body.style.overflow = '';
    }

    addAnnouncementForm.addEventListener('submit', (event) => {
        event.preventDefault();
        clearAnnouncementErrorMessages();

        let isValid = true;

        const title = announcementTitleInput.value.trim();
        const subject = announcementSubjectInput.value.trim();
        const deadline = announcementDeadlineInput.value; // Date input value is 'YYYY-MM-DD'
        const content = announcementContentInput.value.trim();

        if (title === "") {
            displayErrorMessage(errorAnnouncementTitle, "Judul pengumuman tidak boleh kosong.");
            isValid = false;
        }
        if (subject === "") {
            displayErrorMessage(errorAnnouncementSubject, "Mata Pelajaran tidak boleh kosong.");
            isValid = false;
        } else if (!subjectDatabase.includes(subject)) {
            displayErrorMessage(errorAnnouncementSubject, "Mata Pelajaran tidak valid.");
            isValid = false;
        }
        if (deadline === "") {
            displayErrorMessage(errorAnnouncementDeadline, "Deadline tidak boleh kosong.");
            isValid = false;
        }
        if (content === "") {
            displayErrorMessage(errorAnnouncementContent, "Isi pengumuman tidak boleh kosong.");
            isValid = false;
        }

        if (isValid) {
            const newAnnouncement = {
                id: Date.now(), // Unique ID based on timestamp
                no: announcementData.length + 1, // Simple sequential numbering
                judul: title,
                mapel: subject,
                deadline: deadline,
                isi: content
            };
            announcementData.push(newAnnouncement);
            localStorage.setItem('announcementData', JSON.stringify(announcementData));
            
            // Go back to announcement list and refresh
            showAnnouncementView();
            // Reset current page to 0 to show the new announcement easily
            currentAnnouncementPage = 0; 
            renderAnnouncementTable(currentAnnouncementPage);
            // Optionally, show a success message
            // alert('Pengumuman berhasil dipublikasikan!');
        }
    });

    jadwalBox.addEventListener('click', showJadwalView);
    studentBox.addEventListener('click', showStudentView);
    othersBox.addEventListener('click', showOtherView);
    teacherBox.addEventListener('click', showTeacherView);
    announcementBox.addEventListener('click', showAnnouncementView);
    settingsButtonFooter.addEventListener('click', showSettingsView);
    profileSettingsItem.addEventListener('click', showProfileView);
    profileLoginButton.addEventListener('click', showLoginView);
    loginBackButton.addEventListener('click', showProfileView);

    globalHomeButtonFooter.addEventListener('click', () => {
        showMainView();
    });

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

    prevStudentPageArrow.addEventListener('click', () => {
        currentStudentPage = (currentStudentPage - 1 + totalStudentPages) % totalStudentPages;
        renderStudentTable(currentStudentPage);
    });

    nextStudentPageArrow.addEventListener('click', () => {
        currentStudentPage = (currentStudentPage + 1) % totalStudentPages;
        renderStudentTable(currentStudentPage);
    });

    prevAnnouncementPageArrow.addEventListener('click', () => {
        currentAnnouncementPage = (currentAnnouncementPage - 1 + totalAnnouncementPages) % totalAnnouncementPages;
        renderAnnouncementTable(currentAnnouncementPage);
    });

    nextAnnouncementPageArrow.addEventListener('click', () => {
        currentAnnouncementPage = (currentAnnouncementPage + 1) % totalAnnouncementPages;
        renderAnnouncementTable(currentAnnouncementPage);
    });

    addAnnouncementButton.addEventListener('click', showAddAnnouncementView);
    addAnnouncementBackButton.addEventListener('click', showAnnouncementView);

    closeTeacherModalButton.addEventListener('click', hideTeacherModal);
    teacherDetailModalOverlay.addEventListener('click', (event) => {
        if (event.target === teacherDetailModalOverlay) {
            hideTeacherModal();
        }
    });

    closeAnnouncementDetailModal.addEventListener('click', hideAnnouncementDetailModal);
    announcementDetailModalOverlay.addEventListener('click', (event) => {
        if (event.target === announcementDetailModalOverlay) {
            hideAnnouncementDetailModal();
        }
    });

    headerSearchInput.addEventListener('input', handleSearch);
    closeSearchModalButton.addEventListener('click', hideSearchResultsModal);
    searchResultsModalOverlay.addEventListener('click', (event) => {
        if (event.target === searchResultsModalOverlay) {
            hideSearchResultsModal();
        }
    });

    dayDisplayBubble.addEventListener('click', (event) => {
        if (!event.target.classList.contains('custom-dropdown-item') && !event.target.closest('.custom-dropdown-content')) {
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
