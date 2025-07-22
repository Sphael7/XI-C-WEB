document.addEventListener('DOMContentLoaded', () => {
    const backendUrl = 'http://localhost:3000';

    const body = document.body;
    const modeToggle = document.getElementById('mode-toggle');
    const themeButtons = document.querySelectorAll('.theme-button');
    
    const themes = ['theme-1', 'theme-2', 'theme-3', 'theme-4', 'theme-5', 'theme-6']; // Added theme-6
    const themeNames = {
        'theme-1': 'Noble Theme',
        'theme-2': 'Light Theme',
        'theme-3': 'Forest Theme',
        'theme-4': 'German Theme',
        'theme-5': 'Beach Theme',
        'theme-6': 'Sunset Theme' // Added theme-6 name
    };
    let currentTheme = 'theme-1';

    const currentDateElement = document.getElementById('current-date');

    const globalTopBar = document.getElementById('global-top-bar');
    const globalSearchInput = document.getElementById('global-search-input');

    const searchFilterButton = document.getElementById('search-filter-button');
    const currentSearchFilterDisplay = document.getElementById('current-search-filter');
    const searchFilterDropdownContent = document.getElementById('search-filter-dropdown-content');
    let currentSearchFilter = 'teacher';

    const mainView = document.getElementById('main-view');
    const jadwalView = document.getElementById('jadwal-view');
    const settingsView = document.getElementById('settings-view');
    const profileView = document.getElementById('profile-view');
    const loginView = document.getElementById('login-view');
    const otherView = document.getElementById('other-view');
    const teacherView = document.getElementById('teacher-view');
    const studentView = document.getElementById('student-view');
    const taskView = document.getElementById('task-view');
    const manageTaskView = document.getElementById('manage-task-view');
    const coverView = document.getElementById('cover-view');
    const creditView = document.getElementById('credit-view');

    const jadwalBox = document.getElementById('jadwal-box');
    const studentBox = document.getElementById('student-box');
    const ebookBox = document.getElementById('ebook-box');
    const teacherBox = document.getElementById('teacher-box');
    const taskBox = document.getElementById('task-main-box');
    const settingsButtonFooter = document.getElementById('settings-button-footer-main');
    const globalHomeButtonFooter = document.getElementById('global-home-button-footer');

    const dayDisplayBubble = document.getElementById('day-display-bubble');
    const currentDayDisplay = document.getElementById('current-day-display');
    const dropdownArrow = document.querySelector('.dropdown-arrow');
    const customDayDropdown = document.getElementById('custom-day-dropdown');
    const prevDayArrow = document.getElementById('prev-day');
    const nextDayArrow = document.getElementById('next-day');
    const jadwalList = document.getElementById('jadwal-list');
    const jadwalSearchInput = document.getElementById('jadwal-search-input');
    const jadwalLoadingOverlay = document.getElementById('jadwal-loading-overlay'); // New
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
    const letsGoButtonLogin = document.getElementById('lets-go-button-login');

    const realTimeWIB = document.getElementById('real-time-wib');

    const subjectGridContainer = teacherView.querySelector('.subject-grid-container');
    const teacherLoadingOverlay = document.getElementById('teacher-loading-overlay'); // New
    const prevSubjectPageArrow = document.getElementById('prev-subject-page');
    const nextSubjectPageArrow = document.getElementById('next-subject-page');
    const currentPageDisplay = document.getElementById('current-page-display');
    const totalPagesDisplay = document.getElementById('total-pages-display');

    const teacherDetailModalOverlay = document.getElementById('teacher-detail-modal-overlay');
    const modalSubjectTitle = document.getElementById('modal-subject-title');
    const modalTeacherTableBody = document.getElementById('modal-teacher-table-body');
    const closeTeacherModalButton = document.getElementById('close-teacher-modal');

    const searchResultsModalOverlay = document.getElementById('search-results-modal-overlay');
    const searchResultsModalTitle = document.getElementById('search-results-modal-title');
    const searchResultsTableContainer = document.getElementById('search-results-table-container');
    const closeSearchModalButton = document.getElementById('close-search-modal');
    const noSearchResultsMessage = document.getElementById('no-search-results-message');

    const studentTableBody = document.getElementById('student-table-body');
    const studentLoadingOverlay = document.getElementById('student-loading-overlay'); // New
    const studentSearchInput = document.getElementById('student-search-input');
    const prevStudentPageArrow = document.getElementById('prev-student-page');
    const nextStudentPageArrow = document.getElementById('next-student-page');
    const currentStudentPageDisplay = document.getElementById('current-student-page-display');
    const totalStudentPagesDisplay = document.getElementById('total-student-pages-display');

    const taskTableBody = document.getElementById('task-table-body');
    const taskLoadingOverlay = document.getElementById('task-loading-overlay'); // New
    const prevTaskPageArrow = document.getElementById('prev-task-page');
    const nextTaskPageArrow = document.getElementById('next-task-page');
    const currentTaskPageDisplay = document.getElementById('current-task-page-display');
    const totalTaskPagesDisplay = document.getElementById('total-task-pages-display');
    const addTaskButton = document.getElementById('add-task-button');

    const manageTaskBackButton = document.getElementById('manage-task-back-button');
    const manageTaskTitle = document.getElementById('manage-task-title');
    const manageTaskForm = document.getElementById('manage-task-form');
    const taskIdInput = document.getElementById('task-id-input');
    const taskTitleInput = document.getElementById('task-title-input');
    const taskSubjectInput = document.getElementById('task-subject-input');
    const subjectDatalist = document.getElementById('subject-list');
    const taskDeadlineInput = document.getElementById('task-deadline-input');
    const taskContentInput = document.getElementById('task-content-input');
    const submitTaskButton = document.getElementById('submit-task-button');
    const errorTaskTitle = document.getElementById('error-task-title');
    const errorTaskSubject = document.getElementById('error-task-subject');
    const errorTaskDeadline = document.getElementById('error-task-deadline');
    const errorTaskContent = document.getElementById('error-task-content');

    const taskDetailModalOverlay = document.getElementById('task-detail-modal-overlay');
    const taskDetailModalTitle = document.getElementById('task-detail-modal-title');
    const taskDetailSubject = document.getElementById('task-detail-subject');
    const taskDetailDeadline = document.getElementById('task-detail-deadline');
    const taskDetailContent = document.getElementById('task-detail-content');
    const closeTaskDetailModal = document.getElementById('close-task-detail-modal');

    const coverDateDisplay = document.getElementById('cover-date-display');
    const coverTimeDisplay = document.getElementById('cover-time-display');
    const goToHomepageButton = document.getElementById('go-to-homepage-button');
    const goToCreditButton = document.getElementById('go-to-credit-button');

    const creditBackButton = document.getElementById('credit-back-button');

    const snackbar = document.getElementById('snackbar');

    const passwordConfirmModalOverlay = document.getElementById('password-confirm-modal-overlay');
    const closePasswordConfirmModal = document.getElementById('close-password-confirm-modal');
    const passwordInput = document.getElementById('password-input');
    const errorPassword = document.getElementById('error-password');
    const cancelPasswordDeleteButton = document.getElementById('cancel-password-delete');
    const confirmPasswordDeleteButton = document.getElementById('confirm-password-delete');

    const deleteTaskFromDetailButton = document.getElementById('delete-task-from-detail-button');
    let taskToDeleteId = null;

    let taskData = [];

    let currentUserProfile = {
        nama: "Belum diisi",
        kelas: "Belum diisi",
        absen: "Belum diisi",
        nisn: "Belum diisi",
        nis: "Belum diisi",
        photo: "https://via.placeholder.com/100"
    };

    let currentActiveView = null;

    const rawTeacherData = [
        { kode: "A1", nama: "MUSLICHA, M.Pd.", mapel: "PPKN" },
        { kode: "A2", nama: "BIBIT PURWANTINI, M.Pd.", mapel: "PPKN" },
        { kode: "B0", nama: "Drs. UBAIDILLAH, M.Pd.", mapel: "PEND. AGAMA ISLAM" },
        { kode: "B1", nama: "RUMADA, S.PAK., M.Pd.", mapel: "PEND. AGAMA KRISTEN" },
        { kode: "B2", nama: "HENNY BINBUR BANIAH, M.Pd.", mapel: "PEND. AGAMA KRISTEN" },
        { kode: "B3", nama: "SAIFUDIN, S.Si, M.Pd.", mapel: "PEND. AGAMA ISLAM" },
        { kode: "B4", nama: "ABDUL SALIM, M.Pd.", mapel: "PEND. AGAMA ISLAM" },
        { kode: "B5", nama: "OKTAVIANUS, S.S.", mapel: "PEND. AGAMA KATOLIK" },
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

    function getTeacherName(searchTerm, mapel = null) {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        let foundTeachers = rawTeacherData.filter(teacher =>
            teacher.nama.toLowerCase().includes(lowerCaseSearchTerm) ||
            teacher.kode.toLowerCase().includes(lowerCaseSearchTerm)
        );

        if (mapel) {
            const lowerCaseMapel = mapel.toLowerCase();
            const teachersInSubject = foundTeachers.filter(teacher =>
                teacher.mapel.toLowerCase().includes(lowerCaseMapel)
            );
            if (teachersInSubject.length > 0) {
                return teachersInSubject.map(t => t.nama).join(' / ');
            }
        }
        
        if (foundTeachers.length > 0) {
            return foundTeachers.map(t => t.nama).join(' / ');
        }
        return searchTerm;
    }

    const jadwalData = {
        "Senin": [
            { jam: "1-2", mapel: "PJOK", guru: getTeacherName("Bagus", "PJOK") },
            { jam: "3-4", mapel: "MATEMATIKA", guru: `${getTeacherName("Suci", "MATEMATIKA")} / ${getTeacherName("Fitria", "MATEMATIKA")}` },
            { jam: "5-6", mapel: "INFORMATIKA", guru: getTeacherName("Prasojo", "INFORMATIKA") },
            { jam: "7-9", mapel: "KIMIA", guru: getTeacherName("Rossy", "KIMIA") }
        ],
        "Selasa": [
            { jam: "1-3", mapel: "INFORMATIKA", guru: getTeacherName("Prasojo", "INFORMATIKA") },
            { jam: "4-6", mapel: "MATEMATIKA", guru: getTeacherName("Wawan", "MATEMATIKA") },
            { jam: "7-8", mapel: "BAHASA INDONESIA", guru: getTeacherName("Niken", "BAHASA INDONESIA") },
            { jam: "9-10", mapel: "PKWU", guru: getTeacherName("Eva", "PKWU") }
        ],
        "Rabu": [
            { jam: "1-2", mapel: "PENDIDIKAN AGAMA KRISTEN", guru: `${getTeacherName("Rumada", "PEND. AGAMA KRISTEN")} dan ${getTeacherName("Abdul Salim", "PEND. AGAMA ISLAM")}` },
            { jam: "3", mapel: "BIMBINGAN KONSELING", guru: getTeacherName("Muhammad Sutrisno", "BIMBINGAN KONSELING") },
            { jam: "4-6", mapel: "BAHASA INGGRIS", guru: getTeacherName("Fajar", "BAHASA INGGRIS") },
            { jam: "7", mapel: "PENDIDIKAN AGAMA KRISTEN", guru: `${getTeacherName("Rumada", "PEND. AGAMA KRISTEN")}, ${getTeacherName("Abdul Salim", "PEND. AGAMA ISLAM")}` },
            { jam: "8-10", mapel: "FISIKA", guru: getTeacherName("Hidayatun Nikmah", "FISIKA") }
        ],
        "Kamis": [
            { jam: "1-2", mapel: "BAHASA INDONESIA", guru: getTeacherName("Niken", "BAHASA INDONESIA") },
            { jam: "3-4", mapel: "MATEMATIKA", guru: getTeacherName("Wawan", "MATEMATIKA") },
            { jam: "5-6", mapel: "SEJARAH", guru: getTeacherName("Ari Sulastri", "SEJARAH") },
            { jam: "7-8", mapel: "PPKN", guru: getTeacherName("Muslicha", "PPKN") },
            { jam: "9-10", mapel: "MATEMATIKA", guru: `${getTeacherName("Fauziyah Fitriyani", "EKONOMI")} / ${getTeacherName("Suci Fitria", "MATEMATIKA")}` }
        ],
        "Jumat": [
            { jam: "1-2", mapel: "SENI BUDAYA", guru: getTeacherName("Reza", "SENI BUDAYA") },
            { jam: "3-4", mapel: "FISIKA", guru: getTeacherName("Hidayatun Nikmah", "FISIKA") },
            { jam: "5-6", mapel: "KIMIA", guru: getTeacherName("Rossy", "KIMIA") }
        ]
    };

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
    let totalPages = Math.ceil(subjectNames.length / itemsPerPage);

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
    let totalStudentPages = Math.ceil(studentData.length / studentsPerPage);

    const tasksPerPage = 7;
    let currentTaskPage = 0;
    let totalTaskPages = 0;

    const subjectDatabase = [
        "PPKN",
        "Pendidikan Agama Islam",
        "Pendidikan Agama Kristen",
        "Pendidikan Agama Katolik",
        "Bahasa Indonesia",
        "Sejarah",
        "Bahasa Inggris",
        "PJOK",
        "Matematika Wajib",
        "Matematika Lanjut",
        "Fisika",
        "Kimia",
        "Seni Budaya",
        "BK",
        "Informatika",
        "PKWU"
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
        }
    }

    function populateStudentSearchResultsTable(tableBodyElement, students) {
        tableBodyElement.innerHTML = '';
        if (students && students.length > 0) {
            students.forEach(student => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.no}</td>
                    <td>${student.nis}</td>
                    <td>${student.nisn}</td>
                    <td>${student.nama}</td>
                `;
                tableBodyElement.appendChild(row);
            });
        }
    }

    function showLoading(overlayElement) {
        overlayElement.classList.remove('hidden');
    }

    function hideLoading(overlayElement) {
        overlayElement.classList.add('hidden');
    }

    async function renderSubjectBoxes(page) {
        showLoading(teacherLoadingOverlay);
        await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
        
        const start = page * itemsPerPage;
        const end = start + itemsPerPage;
        const subjectsToDisplay = subjectNames.slice(start, end);

        subjectGridContainer.innerHTML = '';

        totalPages = Math.ceil(subjectNames.length / itemsPerPage);

        if (subjectsToDisplay.length === 0 && subjectNames.length > 0) {
            currentTeacherPage = 0;
            renderSubjectBoxes(currentTeacherPage);
            hideLoading(teacherLoadingOverlay);
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

        prevSubjectPageArrow.style.opacity = currentTeacherPage === 0 ? '0.5' : '1';
        prevSubjectPageArrow.style.pointerEvents = currentTeacherPage === 0 ? 'none' : 'auto';
        nextSubjectPageArrow.style.opacity = (currentTeacherPage >= totalPages - 1 && totalPages > 0) ? '0.5' : '1';
        nextSubjectPageArrow.style.pointerEvents = (currentTeacherPage >= totalPages - 1 && totalPages > 0) ? 'none' : 'auto';

        hideLoading(teacherLoadingOverlay);
    }

    function applyTheme(themeName) {
        themes.forEach(theme => body.classList.remove(theme));
        body.classList.add(themeName);
        localStorage.setItem('selectedTheme', themeName);
        currentTheme = themeName;
        updateActiveThemeButton(themeName);
    }

    function loadSavedTheme() {
        const savedTheme = localStorage.getItem('selectedTheme');
        if (savedTheme && themes.includes(savedTheme)) {
            applyTheme(savedTheme);
        } else {
            applyTheme(currentTheme);
        }
    }

    function updateActiveThemeButton(activeThemeName) {
        themeButtons.forEach(button => {
            if (button.dataset.theme === activeThemeName) {
                button.classList.add('active-theme');
            } else {
                button.classList.remove('active-theme');
            }
        });
    }

    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const themeName = button.dataset.theme;
            applyTheme(themeName);
            showSnackbar(`Tema berhasil diganti ke ${themeNames[themeName]}!`, 'info');
        });
    });

    loadSavedTheme();

    modeToggle.addEventListener('click', () => {
        const currentIndex = themes.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        applyTheme(themes[nextIndex]);
        showSnackbar(`Tema diganti ke ${themeNames[themes[nextIndex]]}!`, 'info');
    });

    function updateJakartaDate() {
        const now = new Date();
        const optionsDate = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'Asia/Jakarta'
        };
        const optionsTime = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'Asia/Jakarta'
        };
        const formattedDate = now.toLocaleDateString('id-ID', optionsDate);
        const formattedTime = now.toLocaleTimeString('id-ID', optionsTime);

        if (currentDateElement) {
            currentDateElement.textContent = `XI-C — ${formattedDate}`;
        }
        if (realTimeWIB) {
            realTimeWIB.textContent = formattedTime;
        }
        if (coverDateDisplay) {
            coverDateDisplay.textContent = formattedDate;
        }
        if (coverTimeDisplay) {
            coverTimeDisplay.textContent = formattedTime;
        }
    }
    updateJakartaDate();
    setInterval(updateJakartaDate, 1000);

    function toggleDayDropdown(show) {
        if (typeof show === 'boolean') {
            if (show) {
                customDayDropdown.classList.add('show');
                dayDisplayBubble.classList.add('open');
            } else {
                customDayDropdown.classList.remove('show');
                dayDisplayBubble.classList.remove('open');
            }
        } else {
            customDayDropdown.classList.toggle('show');
            dayDisplayBubble.classList.toggle('open');
        }
    }

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
                displayJadwal(days[currentDayIndex], jadwalSearchInput.value.trim());
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

    async function displayJadwal(day, searchTerm = '') {
        showLoading(jadwalLoadingOverlay);
        await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay

        jadwalList.innerHTML = '';
        const jadwalToday = jadwalData[day];
        let filteredJadwal = jadwalToday;

        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            filteredJadwal = jadwalToday.filter(item =>
                item.mapel.toLowerCase().includes(lowerCaseSearchTerm) ||
                item.guru.toLowerCase().includes(lowerCaseSearchTerm)
            );
        }

        if (filteredJadwal && filteredJadwal.length > 0) {
            filteredJadwal.forEach(item => {
                const jadwalItemDiv = document.createElement('div');
                jadwalItemDiv.classList.add('jadwal-item');
                jadwalItemDiv.innerHTML = `
                    <div class="jam">Jam: ${item.jam}</div>
                    <div class="mapel">${item.mapel}</div>
                    <div class="guru">${item.guru}</div>
                `;
                jadwalItemDiv.style.opacity = '0';
                jadwalItemDiv.style.transform = 'translateY(20px)';
                jadwalList.appendChild(jadwalItemDiv);

                setTimeout(() => {
                    jadwalItemDiv.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
                    jadwalItemDiv.style.opacity = '1';
                    jadwalItemDiv.style.transform = 'translateY(0)';
                }, 50);
            });
        } else {
            jadwalList.innerHTML = '<p style="text-align: center; opacity: 0.7;">Tidak ada jadwal atau tidak ditemukan untuk pencarian ini.</p>';
        }
        hideLoading(jadwalLoadingOverlay);
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

    const ANIMATION_DURATION = 500;
    const FAST_ANIMATION_DURATION = 200;

    function showView(viewToShow, fastTransition = false) {
        if (viewToShow === currentActiveView) {
            return;
        }

        const previousView = currentActiveView;
        const mainContainer = document.querySelector('.container');
        const globalBottomBar = document.getElementById('global-bottom-bar');
        const globalTopBar = document.getElementById('global-top-bar');

        hideTeacherModal();
        hideSearchResultsModal();
        hideTaskDetailModal();
        hidePasswordConfirmModal();

        const transitionDuration = fastTransition ? FAST_ANIMATION_DURATION : ANIMATION_DURATION;

        const allViewsInContainer = document.querySelectorAll('.container > div[id$="-view"]');
        allViewsInContainer.forEach(view => {
            view.style.transition = 'none';
        });
        if (coverView) coverView.style.transition = 'none';
        if (creditView) creditView.style.transition = 'none';
        if (globalBottomBar) globalBottomBar.style.transition = 'none';


        if (previousView) {
            previousView.classList.remove('active-view');
            previousView.classList.add('view-exit');
            previousView.style.pointerEvents = 'none';
            previousView.style.transition = `opacity ${transitionDuration}ms ease-in, transform ${transitionDuration}ms ease-in`;

            setTimeout(() => {
                previousView.classList.remove('view-exit');
                previousView.classList.add('hidden-view');
                previousView.style.transition = '';
            }, transitionDuration);
        }

        if (viewToShow === coverView || viewToShow === creditView) {
            mainContainer.classList.add('hidden-view');
            globalTopBar.classList.add('hidden-view');
            globalBottomBar.classList.add('hidden-view');
            globalBottomBar.style.transition = '';
            viewToShow.style.position = 'fixed';
        } else {
            mainContainer.classList.remove('hidden-view');
            globalTopBar.classList.remove('hidden-view');
            globalBottomBar.classList.remove('hidden-view');
            globalBottomBar.style.transition = `opacity ${transitionDuration}ms ease-out, transform ${transitionDuration}ms ease-out`;
            viewToShow.style.position = 'relative';
            
            if (viewToShow !== mainView) {
                mainView.classList.remove('active-view');
                mainView.classList.add('hidden-view');
                mainView.style.pointerEvents = 'none';
            }
        }
        
        viewToShow.classList.remove('hidden-view');
        viewToShow.classList.add('view-entering');
        viewToShow.style.pointerEvents = 'auto';
        viewToShow.style.transition = `opacity ${transitionDuration}ms ease-out, transform ${transitionDuration}ms ease-out`;

        requestAnimationFrame(() => {
            viewToShow.classList.remove('view-entering');
            viewToShow.classList.add('active-view');
            currentActiveView = viewToShow;
        });

        if (viewToShow === jadwalView) {
            const todayReal = new Date().getDay();
            if (todayReal >= 1 && todayReal <= 5) {
                currentDayIndex = todayReal - 1;
            } else {
                currentDayIndex = 0;
            }
            currentDayDisplay.textContent = days[currentDayIndex];
            jadwalSearchInput.value = '';
            displayJadwal(days[currentDayIndex], '');
            populateDayDropdown();
            toggleDayDropdown(false);
        } else if (viewToShow === teacherView) {
            currentTeacherPage = 0;
            renderSubjectBoxes(currentTeacherPage);
        } else if (viewToShow === studentView) {
            currentStudentPage = 0;
            studentSearchInput.value = '';
            renderStudentTable(currentStudentPage, '');
        } else if (viewToShow === taskView) {
            currentTaskPage = 0;
            renderTaskTable(currentTaskPage);
        } else if (viewToShow === profileView) {
            loadUserProfile();
        } else if (viewToShow === loginView) {
            clearErrorMessages();
            inputNama.value = currentUserProfile.nama !== "Belum diisi" ? currentUserProfile.nama : "";
            inputKelas.value = currentUserProfile.kelas !== "Belum diisi" ? currentUserProfile.kelas : "";
            inputAbsen.value = currentUserProfile.absen !== "Belum diisi" ? currentUserProfile.absen : "";
            inputNISN.value = currentUserProfile.nisn !== "Belum diisi" ? currentUserProfile.nisn : "";
            inputNIS.value = currentUserProfile.nis !== "Belum diisi" ? currentUserUser.nis : "";
        } else if (viewToShow === manageTaskView) {
        } else if (viewToShow === settingsView) {
            updateActiveThemeButton(currentTheme);
        }
    }

    function showMainView(fastTransition = false) {
        showView(mainView, fastTransition);
    }

    function showJadwalView() {
        showView(jadwalView);
    }

    function showSettingsView() {
        showView(settingsView);
    }

    function showProfileView() {
        showView(profileView);
    }

    function showLoginView() {
        showView(loginView);
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

    function showTaskView() {
        showView(taskView);
    }

    function showManageTaskView(taskId = null) {
        showView(manageTaskView);
        manageTaskForm.reset();
        clearTaskErrorMessages();
        populateSubjectDatalist();

        if (taskId) {
            manageTaskTitle.textContent = "Edit Tugas";
            submitTaskButton.querySelector('.button-text').textContent = "Update";
            const task = taskData.find(t => t._id == taskId);
            if (task) {
                taskIdInput.value = task._id;
                taskTitleInput.value = task.judul;
                taskSubjectInput.value = task.mapel;
                taskDeadlineInput.value = task.deadline;
                taskContentInput.value = task.isi;
            }
        } else {
            manageTaskTitle.textContent = "Tambah Tugas";
            submitTaskButton.querySelector('.button-text').textContent = "Simpan Tugas";
            taskIdInput.value = '';
            const today = new Date().toISOString().split('T')[0];
            taskDeadlineInput.value = today;
        }
    }

    function showCreditView() {
        showView(creditView);
    }

    function showTeacherModal(subject) {
        modalSubjectTitle.textContent = subject;
        populateTeacherTable(modalTeacherTableBody, groupedTeacherData[subject]);
        teacherDetailModalOverlay.classList.add('visible');
        body.style.overflow = 'hidden';
    }

    function hideTeacherModal() {
        teacherDetailModalOverlay.classList.remove('visible');
        if (!taskDetailModalOverlay.classList.contains('visible') && !passwordConfirmModalOverlay.classList.contains('visible') && !searchResultsModalOverlay.classList.contains('visible')) {
            body.style.overflow = '';
        }
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

    function clearTaskErrorMessages() {
        clearErrorMessage(errorTaskTitle);
        clearErrorMessage(errorTaskSubject);
        clearErrorMessage(errorTaskDeadline);
        clearErrorMessage(errorTaskContent);
    }

    function showSnackbar(message, type = 'info') {
        snackbar.textContent = message;
        snackbar.className = `snackbar show ${type}`;
        setTimeout(() => {
            snackbar.className = snackbar.className.replace('show', '').replace(type, '');
        }, 3000);
    }

    let debounceTimer;
    function debounce(func, delay) {
        return function(...args) {
            const context = this;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        };
    }

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        clearErrorMessages();

        const submitButtonText = letsGoButtonLogin.querySelector('.button-text');
        const submitButtonSpinner = letsGoButtonLogin.querySelector('.loading-spinner');

        submitButtonText.classList.add('hidden');
        submitButtonSpinner.classList.remove('hidden');
        letsGoButtonLogin.disabled = true;

        setTimeout(() => {
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
                showSnackbar('Login berhasil!', 'success');
            } else {
                showSnackbar('Gagal login. Periksa kembali input Anda.', 'error');
            }

            submitButtonText.classList.remove('hidden');
            submitButtonSpinner.classList.add('hidden');
            letsGoButtonLogin.disabled = false;

        }, 1000);
    });

    uploadPhotoIcon.addEventListener('click', () => {
        profilePhotoUpload.click();
    });

    profilePhotoUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                showSnackbar('File yang dipilih bukan gambar. Harap pilih file gambar.', 'error');
                profilePhotoUpload.value = '';
                return;
            }
            const MAX_FILE_SIZE = 2 * 1024 * 1024;
            if (file.size > MAX_FILE_SIZE) {
                showSnackbar('Ukuran gambar terlalu besar. Maksimum 2MB.', 'error');
                profilePhotoUpload.value = '';
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                currentUserProfile.photo = e.target.result;
                saveUserProfile();
                showSnackbar('Foto profil berhasil diunggah!', 'success');
            };
            reader.onerror = () => {
                showSnackbar('Gagal membaca file gambar. Coba lagi.', 'error');
                profilePhotoUpload.value = '';
            };
            reader.readAsDataURL(file);
        }
    });

    function showSearchResultsModal(filterType, results) {
        searchResultsTableContainer.innerHTML = '';
        noSearchResultsMessage.classList.add('hidden');

        searchResultsModalTitle.textContent = `Hasil Pencarian ${filterType === 'teacher' ? 'Guru' : 'Murid'}`;

        const table = document.createElement('table');
        table.classList.add(filterType === 'teacher' ? 'teacher-modal-table' : 'student-table');
        table.classList.add('search-results-table');

        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        
        let headerRow = document.createElement('tr');
        if (filterType === 'teacher') {
            headerRow.innerHTML = '<th>Kode</th><th>Nama</th><th>Mapel</th>';
            populateTeacherTable(tbody, results);
        } else {
            headerRow.innerHTML = '<th>No.</th><th>NIS</th><th>NISN</th><th>Nama</th>';
            populateStudentSearchResultsTable(tbody, results);
        }
        thead.appendChild(headerRow);
        table.appendChild(thead);
        table.appendChild(tbody);
        searchResultsTableContainer.appendChild(table);

        if (!results || results.length === 0) {
            noSearchResultsMessage.classList.remove('hidden');
        }

        body.style.overflow = 'hidden';
        searchResultsModalOverlay.classList.add('visible');
    }

    function hideSearchResultsModal() {
        searchResultsModalOverlay.classList.remove('visible');
        setTimeout(() => {
            if (!taskDetailModalOverlay.classList.contains('visible') && !passwordConfirmModalOverlay.classList.contains('visible') && !teacherDetailModalOverlay.classList.contains('visible')) {
                body.style.overflow = '';
            }
            searchResultsTableContainer.innerHTML = '';
            noSearchResultsMessage.classList.add('hidden');
        }, ANIMATION_DURATION);
        globalSearchInput.value = '';
    }

    const handleGlobalSearchDebounced = debounce(function() {
        const searchTerm = globalSearchInput.value.toLowerCase().trim();
        if (searchTerm.length > 0) {
            let filteredResults;
            if (currentSearchFilter === 'teacher') {
                filteredResults = rawTeacherData.filter(teacher =>
                    teacher.nama.toLowerCase().includes(searchTerm) ||
                    teacher.mapel.toLowerCase().includes(searchTerm) ||
                    teacher.kode.toLowerCase().includes(searchTerm)
                );
                showSearchResultsModal('teacher', filteredResults);
            } else {
                filteredResults = studentData.filter(student =>
                    student.nama.toLowerCase().includes(searchTerm) ||
                    String(student.nis).includes(searchTerm) ||
                    String(student.nisn).includes(searchTerm)
                );
                showSearchResultsModal('student', filteredResults);
            }
        } else {
            hideSearchResultsModal();
        }
    }, 300);

    async function renderStudentTable(page, searchTerm = '') {
        showLoading(studentLoadingOverlay);
        await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay

        let filteredStudents = studentData;
        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            filteredStudents = studentData.filter(student =>
                student.nama.toLowerCase().includes(lowerCaseSearchTerm) ||
                String(student.nis).includes(lowerCaseSearchTerm) ||
                String(student.nisn).includes(lowerCaseSearchTerm)
            );
        }

        totalStudentPages = Math.ceil(filteredStudents.length / studentsPerPage);
        if (page >= totalStudentPages && totalStudentPages > 0) {
            currentStudentPage = totalStudentPages - 1;
            page = currentStudentPage;
        } else if (totalStudentPages === 0) {
            currentStudentPage = 0;
            page = 0;
        }

        const start = page * studentsPerPage;
        const end = start + studentsPerPage;
        const studentsToDisplay = filteredStudents.slice(start, end);

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

        prevStudentPageArrow.style.opacity = currentStudentPage === 0 ? '0.5' : '1';
        prevStudentPageArrow.style.pointerEvents = currentStudentPage === 0 ? 'none' : 'auto';
        nextStudentPageArrow.style.opacity = (currentStudentPage >= totalStudentPages - 1 && totalStudentPages > 0) ? '0.5' : '1';
        nextStudentPageArrow.style.pointerEvents = (currentStudentPage >= totalStudentPages - 1 && totalStudentPages > 0) ? 'none' : 'auto';

        hideLoading(studentLoadingOverlay);
    }

    async function renderTaskTable(page) {
        showLoading(taskLoadingOverlay);
        await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay

        try {
            const response = await fetch(`${backendUrl}/api/tasks`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            taskData = result.tasks;
            
            taskData.forEach((t, index) => {
                t.no = index + 1;
            });

            totalTaskPages = Math.ceil(taskData.length / tasksPerPage);
            if (page >= totalTaskPages && totalTaskPages > 0) {
                currentTaskPage = totalTaskPages - 1;
                page = currentTaskPage;
            } else if (totalTaskPages === 0) {
                currentTaskPage = 0;
                page = 0;
            }

            const start = page * tasksPerPage;
            const end = start + tasksPerPage;
            const tasksToDisplay = taskData.slice(start, end);

            taskTableBody.innerHTML = '';

            if (tasksToDisplay.length > 0) {
                tasksToDisplay.forEach(task => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${task.no}</td>
                        <td>${task.judul}</td>
                        <td>${task.mapel}</td>
                        <td>${task.deadline}</td>
                        <td class="action-buttons">
                            <button class="action-button edit-button" data-id="${task._id}" title="Edit Tugas"><i class="fas fa-edit"></i></button>
                            <button class="action-button delete-button" data-id="${task._id}" title="Hapus Tugas"><i class="fas fa-trash"></i></button>
                        </td>
                    `;
                    row.addEventListener('click', (event) => {
                        if (!event.target.closest('.action-button')) {
                            showTaskDetailModal(task._id);
                        }
                    });
                    taskTableBody.appendChild(row);
                });
            } else {
                taskTableBody.innerHTML = '<tr><td colspan="5" style="text-align: center; opacity: 0.7; padding: 20px;">Tidak ada tugas yang tersedia.</td></tr>';
            }

            currentTaskPageDisplay.textContent = page + 1;
            totalTaskPagesDisplay.textContent = totalTaskPages > 0 ? totalTaskPages : 1;

            prevTaskPageArrow.style.opacity = currentTaskPage === 0 ? '0.5' : '1';
            prevTaskPageArrow.style.pointerEvents = currentTaskPage === 0 ? 'none' : 'auto';
            nextTaskPageArrow.style.opacity = (currentTaskPage >= totalTaskPages - 1 && totalTaskPages > 0) ? '0.5' : '1';
            nextTaskPageArrow.style.pointerEvents = (currentTaskPage >= totalTaskPages - 1 && totalTaskPages > 0) ? 'none' : 'auto';

        } catch (error) {
            console.error('Error fetching tasks:', error);
            showSnackbar('Gagal memuat tugas dari server. Pastikan backend berjalan.', 'error');
            
            taskTableBody.innerHTML = '<tr><td colspan="5" style="text-align: center; opacity: 0.7; padding: 20px;">Gagal memuat tugas.</td></tr>';
            
            taskData = [];
            currentTaskPage = 0;
            totalTaskPages = 1;
            currentTaskPageDisplay.textContent = 1;
            totalTaskPagesDisplay.textContent = 1;
            prevTaskPageArrow.style.opacity = '0.5';
            prevTaskPageArrow.style.pointerEvents = 'none';
            nextTaskPageArrow.style.opacity = '0.5';
            nextTaskPageArrow.style.pointerEvents = 'none';
        } finally {
            hideLoading(taskLoadingOverlay);
        }
    }

    function showTaskDetailModal(id) {
        const task = taskData.find(t => t._id == id);
        if (task) {
            taskDetailModalTitle.textContent = task.judul;
            taskDetailSubject.textContent = task.mapel;
            const deadlineDate = new Date(task.deadline + 'T00:00:00');
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            taskDetailDeadline.textContent = deadlineDate.toLocaleDateString('id-ID', options);
            taskDetailContent.textContent = task.isi;

            deleteTaskFromDetailButton.dataset.id = task._id;

            taskDetailModalOverlay.classList.add('visible');
            body.style.overflow = 'hidden';
        }
    }

    function hideTaskDetailModal() {
        taskDetailModalOverlay.classList.remove('visible');
        if (!teacherDetailModalOverlay.classList.contains('visible') && !passwordConfirmModalOverlay.classList.contains('visible') && !searchResultsModalOverlay.classList.contains('visible')) {
            body.style.overflow = '';
        }
    }

    function populateSubjectDatalist() {
        subjectDatalist.innerHTML = '';
        subjectDatabase.forEach(subject => {
            const option = document.createElement('option');
            option.value = subject;
            subjectDatalist.appendChild(option);
        });
    }

    manageTaskForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        clearTaskErrorMessages();

        const submitButtonText = submitTaskButton.querySelector('.button-text');
        const submitButtonSpinner = submitTaskButton.querySelector('.loading-spinner');

        submitButtonText.classList.add('hidden');
        submitButtonSpinner.classList.remove('hidden');
        submitTaskButton.disabled = true;

        let isValid = true;

        const id = taskIdInput.value;
        const judul = taskTitleInput.value.trim();
        const mapel = taskSubjectInput.value.trim();
        const deadline = taskDeadlineInput.value;
        const isi = taskContentInput.value.trim();

        if (judul === "") {
            displayErrorMessage(errorTaskTitle, "Judul tugas tidak boleh kosong.");
            isValid = false;
        }
        if (mapel === "") {
            displayErrorMessage(errorTaskSubject, "Mata Pelajaran tidak boleh kosong.");
            isValid = false;
        } else if (!subjectDatabase.includes(mapel)) {
            displayErrorMessage(errorTaskSubject, "Mata Pelajaran tidak valid. Pilih dari daftar yang tersedia.");
            isValid = false;
        }
        if (deadline === "") {
            displayErrorMessage(errorTaskDeadline, "Deadline tidak boleh kosong.");
            isValid = false;
        } else {
            const selectedDate = new Date(deadline);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate < today) {
                displayErrorMessage(errorTaskDeadline, "Deadline tidak boleh di tanggal yang sudah lewat.");
                isValid = false;
            }
        }
        if (isi === "") {
            displayErrorMessage(errorTaskContent, "Isi deskripsi tugas tidak boleh kosong.");
            isValid = false;
        }

        if (isValid) {
            try {
                let apiEndpoint = `${backendUrl}/api/tasks`;
                let httpMethod = 'POST';
                if (id) {
                    apiEndpoint = `${backendUrl}/api/tasks/${id}`;
                    httpMethod = 'PUT';
                }

                const response = await fetch(apiEndpoint, {
                    method: httpMethod,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ judul, mapel, deadline, isi }),
                });

                const data = await response.json();

                if (data.success) {
                    showSnackbar(`Tugas berhasil di${id ? 'perbarui' : 'tambahkan'}!`, 'success');
                    showTaskView();
                    await renderTaskTable(currentTaskPage);
                } else {
                    showSnackbar(`Gagal ${id ? 'memperbarui' : 'menambahkan'} tugas: ${data.message}`, 'error');
                }
            } catch (error) {
                console.error(`Error ${id ? 'updating' : 'adding'} task:`, error);
                showSnackbar(`Terjadi kesalahan saat ${id ? 'menyimpan' : 'menambahkan'} tugas. Pastikan backend berjalan.`, 'error');
            }
        } else {
            showSnackbar('Gagal menyimpan tugas. Periksa kembali input Anda.', 'error');
        }

        submitButtonText.classList.remove('hidden');
        submitButtonSpinner.classList.add('hidden');
        submitTaskButton.disabled = false;
    });

    function showPasswordConfirmModal() {
        passwordConfirmModalOverlay.classList.add('visible');
        passwordInput.value = '';
        clearErrorMessage(errorPassword);
        passwordInput.focus();
        body.style.overflow = 'hidden';
    }

    function hidePasswordConfirmModal() {
        passwordConfirmModalOverlay.classList.remove('visible');
        if (!taskDetailModalOverlay.classList.contains('visible') && !teacherDetailModalOverlay.classList.contains('visible') && !searchResultsModalOverlay.classList.contains('visible')) {
            body.style.overflow = '';
        }
        taskToDeleteId = null;
    }

    deleteTaskFromDetailButton.addEventListener('click', (event) => {
        taskToDeleteId = event.currentTarget.dataset.id;
        hideTaskDetailModal();
        showPasswordConfirmModal();
    });

    confirmPasswordDeleteButton.addEventListener('click', async () => {
        const inputPassword = passwordInput.value.trim();
        const correctPassword = "123";

        if (inputPassword === correctPassword) {
            if (taskToDeleteId) {
                try {
                    const response = await fetch(`${backendUrl}/api/tasks/${taskToDeleteId}`, {
                        method: 'DELETE',
                    });

                    const data = await response.json();

                    if (data.success) {
                        showSnackbar('Tugas berhasil dihapus!', 'success');
                        hidePasswordConfirmModal();
                        showTaskView();
                        await renderTaskTable(currentTaskPage);
                    } else {
                        showSnackbar(`Gagal menghapus tugas: ${data.message}`, 'error');
                    }
                } catch (error) {
                    console.error('Error deleting task:', error);
                    showSnackbar('Terjadi kesalahan saat menghapus tugas. Pastikan backend berjalan.', 'error');
                }
            }
        } else {
            displayErrorMessage(errorPassword, "Password salah!");
            showSnackbar('Password salah. Gagal menghapus tugas.', 'error');
        }
    });

    cancelPasswordDeleteButton.addEventListener('click', hidePasswordConfirmModal);

    closePasswordConfirmModal.addEventListener('click', hidePasswordConfirmModal);

    passwordConfirmModalOverlay.addEventListener('click', (event) => {
        if (event.target === passwordConfirmModalOverlay) {
            hidePasswordConfirmModal();
        }
    });

    ebookBox.addEventListener('click', () => {
        window.open('https://drive.google.com/drive/u/0/folders/1I9tEvAKkkc-r1YCESmpsfX7_p3dys7id', '_blank');
        showSnackbar('Mengarahkan ke Google Drive E-Book.', 'info');
    });

    jadwalBox.addEventListener('click', showJadwalView);
    studentBox.addEventListener('click', showStudentView);
    teacherBox.addEventListener('click', showTeacherView);
    taskBox.addEventListener('click', showTaskView);
    settingsButtonFooter.addEventListener('click', showSettingsView);
    profileSettingsItem.addEventListener('click', showProfileView);
    profileLoginButton.addEventListener('click', showLoginView);
    loginBackButton.addEventListener('click', showProfileView);

    globalHomeButtonFooter.addEventListener('click', () => {
        showMainView(true);
    });

    goToHomepageButton.addEventListener('click', () => {
        showMainView();
    });

    goToCreditButton.addEventListener('click', () => {
        showCreditView();
    });

    creditBackButton.addEventListener('click', () => {
        showView(coverView);
    });

    dayDisplayBubble.addEventListener('click', (event) => {
        if (event.target === dayDisplayBubble || event.target.closest('.day-display-bubble') === dayDisplayBubble) {
            toggleDayDropdown();
        }
    });

    document.addEventListener('click', (event) => {
        if (!dayDisplayBubble.contains(event.target) && !customDayDropdown.contains(event.target)) {
            toggleDayDropdown(false);
        }
        if (!searchFilterButton.contains(event.target) && !searchFilterDropdownContent.contains(event.target)) {
            searchFilterDropdownContent.classList.remove('show');
            searchFilterButton.classList.remove('active');
        }
    });

    prevDayArrow.addEventListener('click', () => {
        currentDayIndex = (currentDayIndex - 1 + days.length) % days.length;
        currentDayDisplay.textContent = days[currentDayIndex];
        displayJadwal(days[currentDayIndex], jadwalSearchInput.value.trim());
        updateSelectedDayClass();
    });

    nextDayArrow.addEventListener('click', () => {
        currentDayIndex = (currentDayIndex + 1) % days.length;
        currentDayDisplay.textContent = days[currentDayIndex];
        displayJadwal(days[currentDayIndex], jadwalSearchInput.value.trim());
        updateSelectedDayClass();
    });

    jadwalSearchInput.addEventListener('input', debounce(function() {
        displayJadwal(days[currentDayIndex], jadwalSearchInput.value.trim());
    }, 300));


    prevSubjectPageArrow.addEventListener('click', () => {
        if (currentTeacherPage > 0) {
            currentTeacherPage--;
            renderSubjectBoxes(currentTeacherPage);
        }
    });

    nextSubjectPageArrow.addEventListener('click', () => {
        totalPages = Math.ceil(subjectNames.length / itemsPerPage);
        if (currentTeacherPage < totalPages - 1) {
            currentTeacherPage++;
            renderSubjectBoxes(currentTeacherPage);
        }
    });


    prevStudentPageArrow.addEventListener('click', () => {
        if (currentStudentPage > 0) {
            currentStudentPage--;
            renderStudentTable(currentStudentPage, studentSearchInput.value.trim());
        }
    });

    nextStudentPageArrow.addEventListener('click', () => {
        const currentFilteredStudents = studentData.filter(student =>
            student.nama.toLowerCase().includes(studentSearchInput.value.toLowerCase().trim()) ||
            String(student.nis).includes(studentSearchInput.value.toLowerCase().trim()) ||
            String(student.nisn).includes(studentSearchInput.value.toLowerCase().trim())
        );
        totalStudentPages = Math.ceil(currentFilteredStudents.length / studentsPerPage);

        if (currentStudentPage < totalStudentPages - 1) {
            currentStudentPage++;
            renderStudentTable(currentStudentPage, studentSearchInput.value.trim());
        }
    });

    studentSearchInput.addEventListener('input', debounce(function() {
        currentStudentPage = 0;
        renderStudentTable(currentStudentPage, studentSearchInput.value.trim());
    }, 300));


    prevTaskPageArrow.addEventListener('click', () => {
        if (currentTaskPage > 0) {
            currentTaskPage--;
            renderTaskTable(currentTaskPage);
        }
    });

    nextTaskPageArrow.addEventListener('click', () => {
        if (currentTaskPage < totalTaskPages - 1) {
            currentTaskPage++;
            renderTaskTable(currentTaskPage);
        }
    });

    addTaskButton.addEventListener('click', () => showManageTaskView(null));
    manageTaskBackButton.addEventListener('click', showTaskView);

    closeTeacherModalButton.addEventListener('click', hideTeacherModal);
    teacherDetailModalOverlay.addEventListener('click', (event) => {
        if (event.target === teacherDetailModalOverlay) {
            hideTeacherModal();
        }
    });

    closeTaskDetailModal.addEventListener('click', hideTaskDetailModal);
    taskDetailModalOverlay.addEventListener('click', (event) => {
        if (event.target === taskDetailModalOverlay) {
            hideTaskDetailModal();
        }
    });

    globalSearchInput.addEventListener('input', handleGlobalSearchDebounced);
    closeSearchModalButton.addEventListener('click', hideSearchResultsModal);
    searchResultsModalOverlay.addEventListener('click', (event) => {
        if (event.target === searchResultsModalOverlay) {
            hideSearchResultsModal();
        }
    });

    searchFilterButton.addEventListener('click', (event) => {
        event.stopPropagation();
        searchFilterDropdownContent.classList.toggle('show');
        searchFilterButton.classList.toggle('active');
    });

    document.querySelectorAll('.search-filter-item').forEach(item => {
        item.addEventListener('click', (event) => {
            currentSearchFilter = event.target.dataset.filter;
            currentSearchFilterDisplay.textContent = event.target.textContent;
            searchFilterDropdownContent.classList.remove('show');
            searchFilterButton.classList.remove('active');
            globalSearchInput.placeholder = `Cari ${event.target.textContent}...`;
            globalSearchInput.value = '';
            hideSearchResultsModal();
        });
    });

    document.querySelectorAll('.grid-item, .settings-item-full, .other-item, .cover-button, .day-nav-arrow, .pagination-arrow, .login-button, .publish-button, .add-task-button, .action-button, .confirm-button, .login-specific-top-bar .back-button, .credit-specific-top-bar .back-button, .delete-task-from-detail-button, .theme-button').forEach(item => {
        item.addEventListener('mousedown', (e) => {
            e.currentTarget.classList.add('active');
        });
        item.addEventListener('mouseup', (e) => {
            e.currentTarget.classList.remove('active');
        });
        item.addEventListener('mouseleave', (e) => {
            e.currentTarget.classList.remove('active');
        });
        if (item.classList.contains('settings-item-full') || item.classList.contains('login-button') || item.classList.contains('other-item') || item.classList.contains('subject-box') || item.classList.contains('add-task-button') || item.classList.contains('publish-button') || item.classList.contains('delete-task-from-detail-button') || item.classList.contains('confirm-button') || item.classList.contains('cover-button') || item.classList.contains('theme-button')) {
            if (!item.style.transition.includes('filter')) {
                item.style.transition += ', filter 0.2s ease';
            }
        }

        if (item.tagName === 'INPUT' || item.tagName === 'TEXTAREA' || item.tagName === 'SELECT') {
            item.addEventListener('focus', (e) => {
                e.currentTarget.classList.add('focused');
            });
            item.addEventListener('blur', (e) => {
                e.currentTarget.classList.remove('focused');
            });
        }
    });

    let isPulling = false;
    let startY = 0;
    const PULL_THRESHOLD = 80; // pixels to pull to trigger refresh
    const REFRESH_TIMEOUT = 1000; // milliseconds before allowing another refresh

    let lastRefreshTime = 0;

    function handlePullToRefresh(e, container, refreshCallback, loadingOverlay) {
        if (e.targetTouches.length === 1 && container.scrollTop === 0) {
            const touch = e.targetTouches[0];
            if (!isPulling) {
                isPulling = true;
                startY = touch.clientY;
                container.style.transition = 'none'; // Disable transition during pull
            }

            const currentY = touch.clientY;
            const pullDelta = currentY - startY;

            if (pullDelta > 0) {
                container.style.transform = `translateY(${Math.min(pullDelta, PULL_THRESHOLD * 1.5)}px)`;
                if (pullDelta > PULL_THRESHOLD && !container.classList.contains('pull-to-refresh-ready')) {
                    container.classList.add('pull-to-refresh-ready');
                    showSnackbar('Lepas untuk menyegarkan!', 'info');
                } else if (pullDelta <= PULL_THRESHOLD && container.classList.contains('pull-to-refresh-ready')) {
                    container.classList.remove('pull-to-refresh-ready');
                }
            }
        }
    }

    function endPullToRefresh(e, container, refreshCallback, loadingOverlay) {
        if (isPulling) {
            const pullDelta = e.changedTouches[0].clientY - startY;
            container.style.transition = 'transform 0.3s ease-out'; // Re-enable transition

            if (pullDelta > PULL_THRESHOLD && (Date.now() - lastRefreshTime > REFRESH_TIMEOUT)) {
                container.style.transform = `translateY(${PULL_THRESHOLD}px)`; // Snap to refresh position
                showLoading(loadingOverlay);
                refreshCallback().finally(() => {
                    container.style.transform = 'translateY(0)';
                    container.classList.remove('pull-to-refresh-ready');
                    hideLoading(loadingOverlay);
                    lastRefreshTime = Date.now();
                });
            } else {
                container.style.transform = 'translateY(0)'; // Snap back
                container.classList.remove('pull-to-refresh-ready');
            }
            isPulling = false;
        }
    }

    const setupPullToRefresh = (containerSelector, listSelector, refreshCallback, loadingOverlaySelector) => {
        const container = document.querySelector(containerSelector);
        const list = document.querySelector(listSelector);
        const loadingOverlay = document.getElementById(loadingOverlaySelector);

        if (!container || !list || !loadingOverlay) return;

        let lastTouchY = 0;
        let initialScrollTop = 0;

        container.addEventListener('touchstart', (e) => {
            if (container.scrollTop === 0) {
                initialScrollTop = container.scrollTop;
                lastTouchY = e.touches[0].clientY;
                isPulling = false; // Reset isPulling for each touch start
            }
        });

        container.addEventListener('touchmove', (e) => {
            if (container.scrollTop === 0 && e.touches[0].clientY > lastTouchY && !isPulling) {
                 isPulling = true; // Start pulling only if scrolled to top and pulling down
                 startY = e.touches[0].clientY;
                 container.style.transition = 'none';
            }

            if (isPulling && container.scrollTop <= 0) { // Only pull if at or above scroll top 0
                const currentY = e.touches[0].clientY;
                const pullDelta = currentY - startY;

                if (pullDelta > 0) {
                    e.preventDefault(); // Prevent native scroll
                    container.style.transform = `translateY(${Math.min(pullDelta, PULL_THRESHOLD * 1.5)}px)`;
                    if (pullDelta > PULL_THRESHOLD && !container.classList.contains('pull-to-refresh-ready')) {
                        container.classList.add('pull-to-refresh-ready');
                        // showSnackbar('Lepas untuk menyegarkan!', 'info'); // Snackbar can be annoying on pull
                    } else if (pullDelta <= PULL_THRESHOLD && container.classList.contains('pull-to-refresh-ready')) {
                        container.classList.remove('pull-to-refresh-ready');
                    }
                } else {
                    // If moving up (pullDelta <= 0) while pulling, reset pull state
                    isPulling = false;
                    container.style.transform = 'translateY(0)';
                    container.style.transition = 'transform 0.3s ease-out';
                    container.classList.remove('pull-to-refresh-ready');
                }
            } else if (isPulling && container.scrollTop > 0) { // If user started pulling, then scrolled down
                 isPulling = false; // Stop pull-to-refresh
                 container.style.transform = 'translateY(0)';
                 container.style.transition = 'transform 0.3s ease-out';
                 container.classList.remove('pull-to-refresh-ready');
            }
        }, { passive: false }); // Use passive: false to allow e.preventDefault()

        container.addEventListener('touchend', (e) => {
            if (isPulling) {
                const pullDelta = e.changedTouches[0].clientY - startY;
                container.style.transition = 'transform 0.3s ease-out';

                if (pullDelta > PULL_THRESHOLD && (Date.now() - lastRefreshTime > REFRESH_TIMEOUT)) {
                    container.style.transform = `translateY(${PULL_THRESHOLD}px)`;
                    showLoading(loadingOverlay);
                    refreshCallback().finally(() => {
                        container.style.transform = 'translateY(0)';
                        container.classList.remove('pull-to-refresh-ready');
                        hideLoading(loadingOverlay);
                        lastRefreshTime = Date.now();
                    });
                } else {
                    container.style.transform = 'translateY(0)';
                    container.classList.remove('pull-to-refresh-ready');
                }
                isPulling = false;
            }
        });

        // Also add mouse events for desktop testing
        let isMouseDown = false;
        let mouseStartY = 0;
        
        container.addEventListener('mousedown', (e) => {
            if (container.scrollTop === 0 && e.button === 0) { // Left click
                isMouseDown = true;
                mouseStartY = e.clientY;
                container.style.transition = 'none';
            }
        });

        container.addEventListener('mousemove', (e) => {
            if (isMouseDown && container.scrollTop === 0) {
                const pullDelta = e.clientY - mouseStartY;
                if (pullDelta > 0) {
                    e.preventDefault();
                    container.style.transform = `translateY(${Math.min(pullDelta, PULL_THRESHOLD * 1.5)}px)`;
                    if (pullDelta > PULL_THRESHOLD && !container.classList.contains('pull-to-refresh-ready')) {
                        container.classList.add('pull-to-refresh-ready');
                    } else if (pullDelta <= PULL_THRESHOLD && container.classList.contains('pull-to-refresh-ready')) {
                        container.classList.remove('pull-to-refresh-ready');
                    }
                } else {
                     // If moving up (pullDelta <= 0) while pulling, reset pull state
                    isMouseDown = false;
                    container.style.transform = 'translateY(0)';
                    container.style.transition = 'transform 0.3s ease-out';
                    container.classList.remove('pull-to-refresh-ready');
                }
            } else if (isMouseDown && container.scrollTop > 0) {
                isMouseDown = false;
                container.style.transform = 'translateY(0)';
                container.style.transition = 'transform 0.3s ease-out';
                container.classList.remove('pull-to-refresh-ready');
            }
        });

        container.addEventListener('mouseup', (e) => {
            if (isMouseDown) {
                const pullDelta = e.clientY - mouseStartY;
                container.style.transition = 'transform 0.3s ease-out';
                if (pullDelta > PULL_THRESHOLD && (Date.now() - lastRefreshTime > REFRESH_TIMEOUT)) {
                    container.style.transform = `translateY(${PULL_THRESHOLD}px)`;
                    showLoading(loadingOverlay);
                    refreshCallback().finally(() => {
                        container.style.transform = 'translateY(0)';
                        container.classList.remove('pull-to-refresh-ready');
                        hideLoading(loadingOverlay);
                        lastRefreshTime = Date.now();
                    });
                } else {
                    container.style.transform = 'translateY(0)';
                    container.classList.remove('pull-to-refresh-ready');
                }
                isMouseDown = false;
            }
        });
        container.addEventListener('mouseleave', () => { // If mouse leaves while dragging
            if (isMouseDown) {
                isMouseDown = false;
                container.style.transform = 'translateY(0)';
                container.style.transition = 'transform 0.3s ease-out';
                container.classList.remove('pull-to-refresh-ready');
            }
        });
    };

    setupPullToRefresh('#jadwal-view', '#jadwal-list', async () => {
        const selectedDay = days[currentDayIndex];
        await displayJadwal(selectedDay, jadwalSearchInput.value.trim());
    }, 'jadwal-loading-overlay');

    setupPullToRefresh('#teacher-view', '.subject-grid-container', async () => {
        await renderSubjectBoxes(currentTeacherPage);
    }, 'teacher-loading-overlay');

    setupPullToRefresh('#student-view', '.student-table-container', async () => {
        await renderStudentTable(currentStudentPage, studentSearchInput.value.trim());
    }, 'student-loading-overlay');

    setupPullToRefresh('#task-view', '.task-table-container', async () => {
        await renderTaskTable(currentTaskPage);
    }, 'task-loading-overlay');


    ebookBox.addEventListener('click', () => {
        window.open('https://drive.google.com/drive/u/0/folders/1I9tEvAKkkc-r1YCESmpsfX7_p3dys7id', '_blank');
        showSnackbar('Mengarahkan ke Google Drive E-Book.', 'info');
    });

    jadwalBox.addEventListener('click', showJadwalView);
    studentBox.addEventListener('click', showStudentView);
    teacherBox.addEventListener('click', showTeacherView);
    taskBox.addEventListener('click', showTaskView);
    settingsButtonFooter.addEventListener('click', showSettingsView);
    profileSettingsItem.addEventListener('click', showProfileView);
    profileLoginButton.addEventListener('click', showLoginView);
    loginBackButton.addEventListener('click', showProfileView);

    globalHomeButtonFooter.addEventListener('click', () => {
        showMainView(true);
    });

    goToHomepageButton.addEventListener('click', () => {
        showMainView();
    });

    goToCreditButton.addEventListener('click', () => {
        showCreditView();
    });

    creditBackButton.addEventListener('click', () => {
        showView(coverView);
    });

    dayDisplayBubble.addEventListener('click', (event) => {
        if (event.target === dayDisplayBubble || event.target.closest('.day-display-bubble') === dayDisplayBubble) {
            toggleDayDropdown();
        }
    });

    document.addEventListener('click', (event) => {
        if (!dayDisplayBubble.contains(event.target) && !customDayDropdown.contains(event.target)) {
            toggleDayDropdown(false);
        }
        if (!searchFilterButton.contains(event.target) && !searchFilterDropdownContent.contains(event.target)) {
            searchFilterDropdownContent.classList.remove('show');
            searchFilterButton.classList.remove('active');
        }
    });

    prevDayArrow.addEventListener('click', () => {
        currentDayIndex = (currentDayIndex - 1 + days.length) % days.length;
        currentDayDisplay.textContent = days[currentDayIndex];
        displayJadwal(days[currentDayIndex], jadwalSearchInput.value.trim());
        updateSelectedDayClass();
    });

    nextDayArrow.addEventListener('click', () => {
        currentDayIndex = (currentDayIndex + 1) % days.length;
        currentDayDisplay.textContent = days[currentDayIndex];
        displayJadwal(days[currentDayIndex], jadwalSearchInput.value.trim());
        updateSelectedDayClass();
    });

    jadwalSearchInput.addEventListener('input', debounce(function() {
        displayJadwal(days[currentDayIndex], jadwalSearchInput.value.trim());
    }, 300));


    prevSubjectPageArrow.addEventListener('click', () => {
        if (currentTeacherPage > 0) {
            currentTeacherPage--;
            renderSubjectBoxes(currentTeacherPage);
        }
    });

    nextSubjectPageArrow.addEventListener('click', () => {
        totalPages = Math.ceil(subjectNames.length / itemsPerPage);
        if (currentTeacherPage < totalPages - 1) {
            currentTeacherPage++;
            renderSubjectBoxes(currentTeacherPage);
        }
    });


    prevStudentPageArrow.addEventListener('click', () => {
        if (currentStudentPage > 0) {
            currentStudentPage--;
            renderStudentTable(currentStudentPage, studentSearchInput.value.trim());
        }
    });

    nextStudentPageArrow.addEventListener('click', () => {
        const currentFilteredStudents = studentData.filter(student =>
            student.nama.toLowerCase().includes(studentSearchInput.value.toLowerCase().trim()) ||
            String(student.nis).includes(studentSearchInput.value.toLowerCase().trim()) ||
            String(student.nisn).includes(studentSearchInput.value.toLowerCase().trim())
        );
        totalStudentPages = Math.ceil(currentFilteredStudents.length / studentsPerPage);

        if (currentStudentPage < totalStudentPages - 1) {
            currentStudentPage++;
            renderStudentTable(currentStudentPage, studentSearchInput.value.trim());
        }
    });

    studentSearchInput.addEventListener('input', debounce(function() {
        currentStudentPage = 0;
        renderStudentTable(currentStudentPage, studentSearchInput.value.trim());
    }, 300));


    prevTaskPageArrow.addEventListener('click', () => {
        if (currentTaskPage > 0) {
            currentTaskPage--;
            renderTaskTable(currentTaskPage);
        }
    });

    nextTaskPageArrow.addEventListener('click', () => {
        if (currentTaskPage < totalTaskPages - 1) {
            currentTaskPage++;
            renderTaskTable(currentTaskPage);
        }
    });

    addTaskButton.addEventListener('click', () => showManageTaskView(null));
    manageTaskBackButton.addEventListener('click', showTaskView);

    closeTeacherModalButton.addEventListener('click', hideTeacherModal);
    teacherDetailModalOverlay.addEventListener('click', (event) => {
        if (event.target === teacherDetailModalOverlay) {
            hideTeacherModal();
        }
    });

    closeTaskDetailModal.addEventListener('click', hideTaskDetailModal);
    taskDetailModalOverlay.addEventListener('click', (event) => {
        if (event.target === taskDetailModalOverlay) {
            hideTaskDetailModal();
        }
    });

    globalSearchInput.addEventListener('input', handleGlobalSearchDebounced);
    closeSearchModalButton.addEventListener('click', hideSearchResultsModal);
    searchResultsModalOverlay.addEventListener('click', (event) => {
        if (event.target === searchResultsModalOverlay) {
            hideSearchResultsModal();
        }
    });

    searchFilterButton.addEventListener('click', (event) => {
        event.stopPropagation();
        searchFilterDropdownContent.classList.toggle('show');
        searchFilterButton.classList.toggle('active');
    });

    document.querySelectorAll('.search-filter-item').forEach(item => {
        item.addEventListener('click', (event) => {
            currentSearchFilter = event.target.dataset.filter;
            currentSearchFilterDisplay.textContent = event.target.textContent;
            searchFilterDropdownContent.classList.remove('show');
            searchFilterButton.classList.remove('active');
            globalSearchInput.placeholder = `Cari ${event.target.textContent}...`;
            globalSearchInput.value = '';
            hideSearchResultsModal();
        });
    });

    document.querySelectorAll('.grid-item, .settings-item-full, .cover-button, .day-nav-arrow, .pagination-arrow, .login-button, .publish-button, .add-task-button, .action-button, .confirm-button, .login-specific-top-bar .back-button, .credit-specific-top-bar .back-button, .delete-task-from-detail-button, .theme-button, .subject-box').forEach(item => {
        item.addEventListener('mousedown', (e) => {
            e.currentTarget.classList.add('active');
        });
        item.addEventListener('mouseup', (e) => {
            e.currentTarget.classList.remove('active');
        });
        item.addEventListener('mouseleave', (e) => {
            e.currentTarget.classList.remove('active');
        });
        if (item.tagName === 'INPUT' || item.tagName === 'TEXTAREA' || item.tagName === 'SELECT') {
            item.addEventListener('focus', (e) => {
                e.currentTarget.classList.add('focused');
            });
            item.addEventListener('blur', (e) => {
                e.currentTarget.classList.remove('focused');
            });
        }
    });

    loadUserProfile();
    populateSubjectDatalist();
    showView(coverView);
});