// Soal Umum (Level 2)
const soalUmum = [
  {question: "Siapa penulis novel 'Laskar Pelangi'?", answers:["Andrea Hirata","Tere Liye","Habiburrahman El Shirazy","Dewi Lestari","Ahmad Fuadi"], correct:0},
  {question: "Apa ibu kota Australia?", answers:["Sydney","Melbourne","Canberra","Brisbane","Perth"], correct:2},
  {question: "Ilmuwan teori relativitas?", answers:["Newton","Einstein","Galilei","Tesla","Hawking"], correct:1},
  {question: "Letak Candi Borobudur?", answers:["Yogyakarta","Magelang","Surakarta","Semarang","Malang"], correct:1},
  {question: "Mata uang resmi Jepang?", answers:["Won","Yuan","Yen","Baht","Ringgit"], correct:2}
];

// Soal Soshum (Level 3 - RUU TNI)
const soalSoshum = [
  {question:"Pasal dalam revisi UU TNI terkait OMSP?", answers:["Pasal 3","Pasal 7","Pasal 47","Pasal 53","Pasal 30"], correct:1},
  {question:"Total tugas OMSP dalam UU TNI baru?", answers:["12","14","16","18","20"], correct:2},
  {question:"Isi Pasal 47 revisi UU TNI?", answers:["Kedudukan TNI","Penambahan OMSP","Prajurit aktif jabatan sipil","Usia pensiun","Kewenangan siber"], correct:2},
  {question:"Batas usia pensiun perwira tinggi bintang 3?", answers:["60 tahun","61 tahun","62 tahun","63 tahun","65 tahun"], correct:2},
  {question:"Tujuan tambahan OMSP dalam revisi UU TNI?", answers:["Politik","Pertahanan siber & kepentingan nasional","Ekonomi","Keamanan internal","Anggaran pertahanan"], correct:1}
];

// Soal Saintek (Level 3)
const soalSaintek = [
  {question:"Protein pengikat oksigen di darah?", answers:["Albumin","Globulin","Fibrinogen","Hemoglobin","Mioglobin"], correct:3},
  {question:"Proses tumbuhan hasilkan energi dari matahari?", answers:["Fotosintesis","Respirasi","Fermentasi","Difusi","Transpirasi"], correct:0},
  {question:"Rumus kimia glukosa?", answers:["C6H6O6","C6H12O6","C12H22O11","C2H5OH","CH3COOH"], correct:1},
  {question:"Unsur terbanyak di atmosfer bumi?", answers:["Karbon Dioksida","Nitrogen","Oksigen","Argon","Hidrogen"], correct:1},
  {question:"Hukum aksi-reaksi Newton adalah hukum ke?", answers:["1","2","3","4","5"], correct:2}
];

// Tetap gunakan script JavaScript Vol.2 sebelumnya untuk fungsi kuis

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
        <a href="https://link.dana.id/danakaget?c=s64e7zwc2&r=fRBIPX&orderId=20250331101214789315010300166513115141967" target="_blank">Ambil Hadiahmu!</a>`;
    } else {
        specialLink.innerHTML = `<p>Terima kasih telah berpartisipasi!</p>`;
    }
}
