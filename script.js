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
    const taskView = document.getElementById('task-view'); // Diubah dari announcementView
    const manageTaskView = document.getElementById('manage-task-view'); // Diubah dari manageAnnouncementView
    const coverView = document.getElementById('cover-view');
    const creditView = document.getElementById('credit-view');

    const jadwalBox = document.getElementById('jadwal-box');
    const studentBox = document.getElementById('student-box');
    const othersBox = document.getElementById('others-box');
    const teacherBox = document.getElementById('teacher-box');
    const taskBox = document.getElementById('task-main-box'); // Diubah dari announcementBox
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
    const studentSearchInput = document.getElementById('student-search-input');
    const prevStudentPageArrow = document.getElementById('prev-student-page');
    const nextStudentPageArrow = document.getElementById('next-student-page');
    const currentStudentPageDisplay = document.getElementById('current-student-page-display');
    const totalStudentPagesDisplay = document.getElementById('total-student-pages-display');

    const taskTableBody = document.getElementById('task-table-body'); // Diubah dari announcementTableBody
    const prevTaskPageArrow = document.getElementById('prev-task-page'); // Diubah dari prevAnnouncementPageArrow
    const nextTaskPageArrow = document.getElementById('next-task-page'); // Diubah dari nextAnnouncementPageArrow
    const currentTaskPageDisplay = document.getElementById('current-task-page-display'); // Diubah dari currentAnnouncementPageDisplay
    const totalTaskPagesDisplay = document.getElementById('total-task-pages-display'); // Diubah dari totalAnnouncementPagesDisplay
    const addTaskButton = document.getElementById('add-task-button'); // Diubah dari addAnnouncementButton

    const manageTaskBackButton = document.getElementById('manage-task-back-button'); // Diubah dari manageAnnouncementBackButton
    const manageTaskTitle = document.getElementById('manage-task-title'); // Diubah dari manageAnnouncementTitle
    const manageTaskForm = document.getElementById('manage-task-form'); // Diubah dari manageAnnouncementForm
    const taskIdInput = document.getElementById('task-id-input'); // Diubah dari announcementIdInput
    const taskTitleInput = document.getElementById('task-title-input'); // Diubah dari announcementTitleInput
    const taskSubjectInput = document.getElementById('task-subject-input'); // Diubah dari announcementSubjectInput
    const subjectDatalist = document.getElementById('subject-list');
    const taskDeadlineInput = document.getElementById('task-deadline-input'); // Diubah dari announcementDeadlineInput
    const taskContentInput = document.getElementById('task-content-input'); // Diubah dari announcementContentInput
    const submitTaskButton = document.getElementById('submit-task-button'); // Diubah dari submitAnnouncementButton
    const errorTaskTitle = document.getElementById('error-task-title'); // Diubah dari errorAnnouncementTitle
    const errorTaskSubject = document.getElementById('error-task-subject'); // Diubah dari errorAnnouncementSubject
    const errorTaskDeadline = document.getElementById('error-task-deadline'); // Diubah dari errorAnnouncementDeadline
    const errorTaskContent = document.getElementById('error-task-content'); // Diubah dari errorAnnouncementContent

    const taskDetailModalOverlay = document.getElementById('task-detail-modal-overlay'); // Diubah dari announcementDetailModalOverlay
    const taskDetailModalTitle = document.getElementById('task-detail-modal-title'); // Diubah dari announcementDetailModalTitle
    const taskDetailSubject = document.getElementById('task-detail-subject'); // Diubah dari announcementDetailSubject
    const taskDetailDeadline = document.getElementById('task-detail-deadline'); // Diubah dari announcementDetailDeadline
    const taskDetailContent = document.getElementById('task-detail-content'); // Diubah dari announcementDetailContent
    const closeTaskDetailModal = document.getElementById('close-task-detail-modal'); // Diubah dari closeAnnouncementDetailModal

    const coverDateDisplay = document.getElementById('cover-date-display');
    const coverTimeDisplay = document.getElementById('cover-time-display');
    const goToHomepageButton = document.getElementById('go-to-homepage-button');
    const goToSettingsButton = document.getElementById('go-to-settings-button'); // Akan dihapus event listener-nya
    const goToCreditButton = document.getElementById('go-to-credit-button');

    const creditBackButton = document.getElementById('credit-back-button');

    const snackbar = document.getElementById('snackbar');

    const deleteConfirmModalOverlay = document.getElementById('delete-confirm-modal-overlay');
    const closeDeleteConfirmModal = document.getElementById('close-delete-confirm-modal');
    const cancelDeleteButton = document.getElementById('cancel-delete');
    const confirmDeleteButton = document.getElementById('confirm-delete');
    let taskToDeleteId = null; // Diubah dari announcementToDeleteId


    let currentUserProfile = {
        nama: "Belum diisi",
        kelas: "Belum diisi",
        absen: "Belum diisi",
        nisn: "Belum diisi",
        nis: "Belum diisi",
        photo: "https://via.placeholder.com/100"
    };

    let currentActiveView = null; // Track the currently active view element

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

    let taskData = JSON.parse(localStorage.getItem('taskData')) || []; // Diubah dari announcementData
    const tasksPerPage = 7; // Diubah dari announcementsPerPage
    let currentTaskPage = 0; // Diubah dari currentAnnouncementPage
    let totalTaskPages = Math.ceil(taskData.length / tasksPerPage); // Diubah dari totalAnnouncementPages

    const subjectDatabase = [
        "Fisika", "Kimia", "Agama Islam", "Agama Kristen", "Sejarah", "Matematika Wajib",
        "Matematika Lanjut", "Bahasa Inggris", "Bahasa Indonesia", "Informatika", "PPKn",
        "Seni Budaya", "PKWU", "PJOK", "BK", "PEND. AGAMA", "EKONOMI", "SOSIOLOGI", "GEOGRAFI", "BAHASA JERMAN", "BIMBINGAN KONSELING"
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

        totalPages = Math.ceil(subjectNames.length / itemsPerPage);

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

        prevSubjectPageArrow.style.opacity = currentTeacherPage === 0 ? '0.5' : '1';
        prevSubjectPageArrow.style.pointerEvents = currentTeacherPage === 0 ? 'none' : 'auto';
        nextSubjectPageArrow.style.opacity = (currentTeacherPage >= totalPages - 1 && totalPages > 0) ? '0.5' : '1';
        nextSubjectPageArrow.style.pointerEvents = (currentTeacherPage >= totalPages - 1 && totalPages > 0) ? 'none' : 'auto';
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

    function displayJadwal(day, searchTerm = '') {
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
    const FAST_ANIMATION_DURATION = 200; // Untuk transisi cepat ke homepage

    function showView(viewToShow, fastTransition = false) {
        if (viewToShow === currentActiveView) {
            return;
        }

        const previousView = currentActiveView;
        const mainContainer = document.querySelector('.container');
        const globalBottomBar = document.getElementById('global-bottom-bar');
        const globalTopBar = document.getElementById('global-top-bar'); // Pastikan ini juga di-deklarasi di sini atau global

        // Hide any open modals first
        hideTeacherModal();
        hideSearchResultsModal();
        hideTaskDetailModal();
        hideDeleteConfirmModal();

        const transitionDuration = fastTransition ? FAST_ANIMATION_DURATION : ANIMATION_DURATION;

        // Reset transition property on all views before applying new transitions
        // This is crucial to prevent "stuck" transitions
        const allViewsInContainer = document.querySelectorAll('.container > div[id$="-view"]');
        allViewsInContainer.forEach(view => {
            view.style.transition = 'none';
        });
        if (coverView) coverView.style.transition = 'none';
        if (creditView) creditView.style.transition = 'none';
        if (globalBottomBar) globalBottomBar.style.transition = 'none'; // Tambahkan ini


        // 1. Start exit animation for previous view
        if (previousView) {
            previousView.classList.remove('active-view');
            previousView.classList.add('view-exit');
            previousView.style.pointerEvents = 'none';
            previousView.style.transition = `opacity ${transitionDuration}ms ease-in, transform ${transitionDuration}ms ease-in`;

            setTimeout(() => {
                previousView.classList.remove('view-exit');
                previousView.classList.add('hidden-view');
                previousView.style.transition = ''; // Reset transition after it's done
            }, transitionDuration);
        }

        // Determine global bar and container visibility based on target view
        if (viewToShow === coverView || viewToShow === creditView) {
            mainContainer.classList.add('hidden-view');
            globalTopBar.classList.add('hidden-view');
            globalBottomBar.classList.add('hidden-view');
            globalBottomBar.style.transition = ''; // Pastikan transisi tidak aktif saat disembunyikan
            viewToShow.style.position = 'fixed';
        } else {
            mainContainer.classList.remove('hidden-view');
            globalTopBar.classList.remove('hidden-view');
            globalBottomBar.classList.remove('hidden-view');
            globalBottomBar.style.transition = `opacity ${transitionDuration}ms ease-out, transform ${transitionDuration}ms ease-out`; // Terapkan transisi untuk bottom bar
            viewToShow.style.position = 'relative';
            
            // Explicitly hide mainView if we are going to any other internal view
            if (viewToShow !== mainView) {
                mainView.classList.remove('active-view');
                mainView.classList.add('hidden-view');
                mainView.style.pointerEvents = 'none';
            }
        }
        
        // 2. Prepare target view for entry animation
        viewToShow.classList.remove('hidden-view');
        viewToShow.classList.add('view-entering');
        viewToShow.style.pointerEvents = 'auto';
        viewToShow.style.transition = `opacity ${transitionDuration}ms ease-out, transform ${transitionDuration}ms ease-out`;

        // 3. Start entry animation for target view
        requestAnimationFrame(() => {
            viewToShow.classList.remove('view-entering');
            viewToShow.classList.add('active-view');
            currentActiveView = viewToShow;
        });

        // Initialize view-specific data/rendering when a view is shown
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
        } else if (viewToShow === taskView) { // Changed to taskView
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
            inputNIS.value = currentUserProfile.nis !== "Belum diisi" ? currentUserProfile.nis : "";
        } else if (viewToShow === manageTaskView) {
             // Handled by showManageTaskView which calls showView
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
            const task = taskData.find(t => t.id == taskId);
            if (task) {
                taskIdInput.value = task.id;
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

    const handleTeacherSearchDebounced = debounce(function() {
        const searchTerm = headerSearchInput.value.toLowerCase().trim();
        if (searchTerm.length > 0) {
            const filteredTeachers = rawTeacherData.filter(teacher =>
                teacher.nama.toLowerCase().includes(searchTerm) ||
                teacher.mapel.toLowerCase().includes(searchTerm) ||
                teacher.kode.toLowerCase().includes(searchTerm)
            );
            populateTeacherTable(searchResultsTeacherTableBody, filteredTeachers);
            showSearchResultsModal();
        } else {
            hideSearchResultsModal();
        }
    }, 300);

    function renderStudentTable(page, searchTerm = '') {
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
    }

    function renderTaskTable(page) {
        taskData.forEach((t, index) => {
            t.no = index + 1;
        });
        localStorage.setItem('taskData', JSON.stringify(taskData));

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
                        <button class="action-button edit-button" data-id="${task.id}" title="Edit Tugas"><i class="fas fa-edit"></i></button>
                        <button class="action-button delete-button" data-id="${task.id}" title="Hapus Tugas"><i class="fas fa-trash"></i></button>
                    </td>
                `;
                taskTableBody.appendChild(row);
            });
        } else {
            taskTableBody.innerHTML = '<tr><td colspan="5" style="text-align: center; opacity: 0.7; padding: 20px;">Belum ada tugas.</td></tr>';
        }

        currentTaskPageDisplay.textContent = page + 1;
        totalTaskPagesDisplay.textContent = totalTaskPages > 0 ? totalTaskPages : 1;

        prevTaskPageArrow.style.opacity = currentTaskPage === 0 ? '0.5' : '1';
        prevTaskPageArrow.style.pointerEvents = currentTaskPage === 0 ? 'none' : 'auto';
        nextTaskPageArrow.style.opacity = (currentTaskPage >= totalTaskPages - 1 && totalTaskPages > 0) ? '0.5' : '1';
        nextTaskPageArrow.style.pointerEvents = (currentTaskPage >= totalTaskPages - 1 && totalTaskPages > 0) ? 'none' : 'auto';


        document.querySelectorAll('#task-table-body .view-details-link').forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const taskId = event.target.dataset.id;
                showTaskDetailModal(taskId);
            });
        });

        document.querySelectorAll('#task-table-body .edit-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const taskId = event.currentTarget.dataset.id;
                showManageTaskView(taskId);
            });
        });

        document.querySelectorAll('#task-table-body .delete-button').forEach(button => {
            button.addEventListener('click', (event) => {
                taskToDeleteId = event.currentTarget.dataset.id;
                showDeleteConfirmModal();
            });
        });
    }

    function showTaskDetailModal(id) {
        const task = taskData.find(t => t.id == id);
        if (task) {
            taskDetailModalTitle.textContent = task.judul;
            taskDetailSubject.textContent = task.mapel;
            const deadlineDate = new Date(task.deadline);
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            taskDetailDeadline.textContent = deadlineDate.toLocaleDateString('id-ID', options);
            taskDetailContent.textContent = task.isi;

            taskDetailModalOverlay.classList.add('visible');
            body.style.overflow = 'hidden';
        }
    }

    function hideTaskDetailModal() {
        taskDetailModalOverlay.classList.remove('visible');
        body.style.overflow = '';
    }

    function populateSubjectDatalist() {
        subjectDatalist.innerHTML = '';
        subjectDatabase.forEach(subject => {
            const option = document.createElement('option');
            option.value = subject;
            subjectDatalist.appendChild(option);
        });
    }

    manageTaskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        clearTaskErrorMessages();

        const submitButtonText = submitTaskButton.querySelector('.button-text');
        const submitButtonSpinner = submitTaskButton.querySelector('.loading-spinner');

        submitButtonText.classList.add('hidden');
        submitButtonSpinner.classList.remove('hidden');
        submitTaskButton.disabled = true;

        setTimeout(() => {
            let isValid = true;

            const id = taskIdInput.value;
            const title = taskTitleInput.value.trim();
            const subject = taskSubjectInput.value.trim();
            const deadline = taskDeadlineInput.value;
            const content = taskContentInput.value.trim();

            if (title === "") {
                displayErrorMessage(errorTaskTitle, "Judul tugas tidak boleh kosong.");
                isValid = false;
            }
            if (subject === "") {
                displayErrorMessage(errorTaskSubject, "Mata Pelajaran tidak boleh kosong.");
                isValid = false;
            } else if (!subjectDatabase.includes(subject)) {
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
            if (content === "") {
                displayErrorMessage(errorTaskContent, "Isi deskripsi tugas tidak boleh kosong.");
                isValid = false;
            }

            if (isValid) {
                if (id) {
                    const index = taskData.findIndex(t => t.id == id);
                    if (index !== -1) {
                        taskData[index] = { ...taskData[index], judul: title, mapel: subject, deadline: deadline, isi: content };
                        showSnackbar('Tugas berhasil diperbarui!', 'success');
                    }
                } else {
                    const newTask = {
                        id: Date.now(),
                        judul: title,
                        mapel: subject,
                        deadline: deadline,
                        isi: content
                    };
                    taskData.push(newTask);
                    showSnackbar('Tugas berhasil ditambahkan!', 'success');
                }
                localStorage.setItem('taskData', JSON.stringify(taskData));
                showTaskView();
            } else {
                showSnackbar('Gagal menyimpan tugas. Periksa kembali input Anda.', 'error');
            }

            submitButtonText.classList.remove('hidden');
            submitButtonSpinner.classList.add('hidden');
            submitTaskButton.disabled = false;

        }, 1000);
    });

    function showDeleteConfirmModal() {
        deleteConfirmModalOverlay.classList.add('visible');
        body.style.overflow = 'hidden';
    }

    function hideDeleteConfirmModal() {
        deleteConfirmModalOverlay.classList.remove('visible');
        body.style.overflow = '';
        taskToDeleteId = null;
    }

    confirmDeleteButton.addEventListener('click', () => {
        if (taskToDeleteId) {
            taskData = taskData.filter(t => t.id != taskToDeleteId);
            taskData.forEach((t, index) => {
                t.no = index + 1;
            });
            localStorage.setItem('taskData', JSON.stringify(taskData));
            hideDeleteConfirmModal();
            showTaskView();
            showSnackbar('Tugas berhasil dihapus!', 'success');
        }
    });

    cancelDeleteButton.addEventListener('click', hideDeleteConfirmModal);

    closeDeleteConfirmModal.addEventListener('click', hideDeleteConfirmModal);
    deleteConfirmModalOverlay.addEventListener('click', (event) => {
        if (event.target === deleteConfirmModalOverlay) {
            hideDeleteConfirmModal();
        }
    });


    jadwalBox.addEventListener('click', showJadwalView);
    studentBox.addEventListener('click', showStudentView);
    othersBox.addEventListener('click', showOtherView);
    teacherBox.addEventListener('click', showTeacherView);
    taskBox.addEventListener('click', showTaskView); // Diubah dari announcementBox, showAnnouncementView
    settingsButtonFooter.addEventListener('click', showSettingsView);
    profileSettingsItem.addEventListener('click', showProfileView);
    profileLoginButton.addEventListener('click', showLoginView);
    loginBackButton.addEventListener('click', showProfileView);

    globalHomeButtonFooter.addEventListener('click', () => {
        showMainView(true); // Cepat ke homepage dari footer
    });

    // Perubahan: Hapus event listener untuk goToSettingsButton jika tidak lagi ada di HTML cover
    // Jika masih ada di HTML cover, baris ini harus tetap ada
    // goToSettingsButton.addEventListener('click', () => { showSettingsView(); });

    goToHomepageButton.addEventListener('click', () => {
        showMainView(); // Dari cover, transisi normal
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
        totalTaskPages = Math.ceil(taskData.length / tasksPerPage);
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

    headerSearchInput.addEventListener('input', handleTeacherSearchDebounced);
    closeSearchModalButton.addEventListener('click', hideSearchResultsModal);
    searchResultsModalOverlay.addEventListener('click', (event) => {
        if (event.target === searchResultsModalOverlay) {
            hideSearchResultsModal();
        }
    });

    document.querySelectorAll('.grid-item, .settings-item-full, .other-item, .cover-button, .day-nav-arrow, .pagination-arrow, .login-button, .publish-button, .add-task-button, .action-button, .confirm-button, .login-specific-top-bar .back-button, .credit-specific-top-bar .back-button').forEach(item => {
        item.addEventListener('mousedown', (e) => {
            e.currentTarget.classList.add('active');
        });
        item.addEventListener('mouseup', (e) => {
            e.currentTarget.classList.remove('active');
        });
        item.addEventListener('mouseleave', (e) => {
            e.currentTarget.classList.remove('active');
        });
        if (item.tagName === 'INPUT' || item.tagName === 'TEXTAREA') {
            item.addEventListener('focus', (e) => {
                e.currentTarget.classList.add('focused');
            });
            item.addEventListener('blur', (e) => {
                e.currentTarget.classList.remove('focused');
            });
        }
    });


    // Initial setup when DOM is loaded
    loadUserProfile();
    populateSubjectDatalist();
    showView(coverView);
});
