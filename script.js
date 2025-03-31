const soalUmum = [
    {
        question: "Siapa Wakil Presiden pertama RI?",
        answers: ["Soekarno", "Mohammad Hatta", "Ki Hajar Dewantara", "Tan Malaka", "Agus Salim"],
        correct: 1
    },
    {
        question: "√144 + √81 adalah?",
        answers: ["20", "21", "23", "24", "25"],
        correct: 3
    },
    {
        question: "Negara yang pertama kali mengakui kemerdekaan Indonesia?",
        answers: ["Mesir", "India", "Amerika Serikat", "Belanda", "Australia"],
        correct: 0
    },
    {
        question: "Siapakah Bapak Pendidikan Nasional Indonesia?",
        answers: ["Soekarno", "Mohammad Yamin", "Ki Hajar Dewantara", "Sutan Syahrir", "WR Soepratman"],
        correct: 2
    },
    {
        question: "Ibukota Sumatera Utara adalah?",
        answers: ["Padang", "Palembang", "Pekanbaru", "Medan", "Banda Aceh"],
        correct: 3
    }
];

const soalSoshum = [
    {
        question: "RUU TNI yang sedang viral terkait dengan?",
        answers: ["Ekonomi", "Politik", "Kesehatan", "Pertahanan dan Keamanan", "Pariwisata"],
        correct: 3
    },
    {
        question: "RUU TNI menjadi viral karena dianggap?",
        answers: ["Terlalu menguntungkan sipil", "Mengurangi peran TNI", "Memberi TNI kewenangan luas di sipil", "Terlalu kecil anggarannya", "Tidak jelas tujuannya"],
        correct: 2
    },
    {
        question: "Isu sentral pada RUU TNI terkait dengan?",
        answers: ["Ekonomi kreatif", "Pengangguran", "Pembangunan desa", "Peran TNI di ranah sipil", "Teknologi digital"],
        correct: 3
    },
    {
        question: "Dampak kontroversial dari RUU TNI adalah?",
        answers: ["Peningkatan ekonomi", "Perubahan sosial budaya", "Potensi pelanggaran HAM", "Peningkatan pendidikan", "Infrastruktur"],
        correct: 2
    },
    {
        question: "Kritikan masyarakat terhadap RUU TNI terutama soal?",
        answers: ["Peran TNI di politik", "Bantuan sosial", "Kesehatan", "Pariwisata", "Teknologi"],
        correct: 0
    }
];

const soalSaintek = [
    {
        question: "Unsur dengan simbol kimia 'O' adalah?",
        answers: ["Ozon", "Emas", "Oksigen", "Perak", "Karbon"],
        correct: 2
    },
    {
        question: "Planet terdekat kedua dari matahari?",
        answers: ["Merkurius", "Venus", "Mars", "Bumi", "Yupiter"],
        correct: 1
    },
    {
        question: "Air mendidih pada suhu berapa (derajat Celcius)?",
        answers: ["90°C", "80°C", "100°C", "70°C", "95°C"],
        correct: 2
    },
    {
        question: "Organ manusia yang berfungsi untuk menyaring darah?",
        answers: ["Jantung", "Ginjal", "Paru-paru", "Hati", "Otak"],
        correct: 1
    },
    {
        question: "Rumus kimia air adalah?",
        answers: ["H₂O₂", "H₂", "O₂", "H₂O", "HO"],
        correct: 3
    }
];

let currentQuestion = 0;
let correctAnswers = 0;
let questions = [...soalUmum];

const bgMusic = document.getElementById('bg-music');
const musikYa = document.getElementById('musik-ya');
const musikTidak = document.getElementById('musik-tidak');
const startContainer = document.getElementById('start-container');
const quizContainer = document.getElementById('quiz-container');
const categoryContainer = document.getElementById('category-container');
const resultContainer = document.getElementById('result-container');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const questionNumber = document.getElementById('question-number');
const nextBtn = document.getElementById('next-btn');
const scoreEl = document.getElementById('score');
const specialLink = document.getElementById('special-link');
const btnSoshum = document.getElementById('btn-soshum');
const btnSaintek = document.getElementById('btn-saintek');

musikYa.onclick = () => { bgMusic.play(); pilihKategori(); };
musikTidak.onclick = () => pilihKategori();

function pilihKategori() {
    startContainer.classList.add('hidden');
    categoryContainer.classList.remove('hidden');
}

btnSoshum.onclick = () => mulaiQuiz('soshum');
btnSaintek.onclick = () => mulaiQuiz('saintek');

function mulaiQuiz(kategori) {
    questions = kategori === 'soshum' ? [...soalUmum, ...soalSoshum] : [...soalUmum, ...soalSaintek];
    categoryContainer.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    tampilkanPertanyaan();
}

function tampilkanPertanyaan() {
    resetPertanyaan();
    let q = questions[currentQuestion];
    questionNumber.innerText = `Pertanyaan ${currentQuestion + 1} dari ${questions.length}`;
    questionEl.innerText = q.question;

    q.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.classList.add('answer');
        button.innerText = String.fromCharCode(65 + index) + '. ' + answer;
        button.onclick = () => pilihJawaban(index, button);
        answersEl.appendChild(button);
    });
}

function resetPertanyaan() {
    nextBtn.classList.add('hidden');
    answersEl.innerHTML = '';
}

function pilihJawaban(index, button) {
    document.querySelectorAll('.answer').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    nextBtn.classList.remove('hidden');

    nextBtn.onclick = () => {
        if (index === questions[currentQuestion].correct) correctAnswers++;
        currentQuestion++;
        if (currentQuestion < questions.length) tampilkanPertanyaan();
        else tampilkanHasil();
    };
}

function tampilkanHasil() {
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    scoreEl.innerText = `Kamu menjawab benar ${correctAnswers} dari ${questions.length} pertanyaan.`;
    
    if(correctAnswers === questions.length){
        specialLink.innerHTML = `<p>Selamat, semua benar! Klik link berikut untuk hadiah spesial:</p>
        <a href="https://link.dana.id/danakaget?c=smjvl2nfr&r=fRBIPX&orderId=20250331101214955815010300166513115170548" target="_blank">Ambil Hadiahmu!</a>`;
    } else {
        specialLink.innerHTML = `<p>Terima kasih telah berpartisipasi!</p>`;
    }
}
