// Soal Umum (Level 2)
const soalUmum = [
    {question:"Tahun berapa ASEAN didirikan?", answers:["1965","1967","1970","1975","1980"], correct:1},
    {question:"Sungai terpanjang di dunia?", answers:["Sungai Nil","Sungai Amazon","Sungai Yangtze","Sungai Mississippi","Sungai Gangga"], correct:0},
    {question:"Negara terbesar berdasarkan wilayah di dunia?", answers:["Kanada","Amerika Serikat","Rusia","Tiongkok","Brasil"], correct:2},
    {question:"Julukan untuk Pulau Bali?", answers:["Pulau Seribu Masjid","Pulau Dewata","Pulau Rempah","Pulau Seribu Pura","Pulau Gadang"], correct:1},
    {question:"Mata uang resmi negara Thailand?", answers:["Peso","Dollar","Baht","Dong","Rupiah"], correct:2}
];

// Soal Soshum (Level 4 - Kejanggalan Demokrasi Indonesia)
const soalSoshum = [
    {question:"Pasal multitafsir UUD 1945 terkait demokrasi ekonomi adalah?", answers:["Pasal 27 ayat (1)","Pasal 28 ayat (1)","Pasal 33 ayat (3)","Pasal 37 ayat (5)","Pasal 7C"], correct:2},
    {question:"UU yang dikritik karena mengancam kebebasan berekspresi?", answers:["UU No.11/2008 ITE","UU No.7/2017 Pemilu","UU No.30/2002 KPK","UU No.2/2002 Polri","UU No.32/2004 Pemda"], correct:0},
    {question:"Money politics bertentangan dengan pasal berapa di UU Pemilu No.7/2017?", answers:["Pasal 280 ayat (1)","Pasal 281 ayat (2)","Pasal 282 ayat (1)","Pasal 283 ayat (1)","Pasal 284 ayat (2)"], correct:0},
    {question:"Politik dinasti bertentangan dengan UU Pemerintahan Daerah nomor berapa?", answers:["UU No.23/2014 Pasal 76","UU No.2/2011 Pasal 15","UU No.32/2004 Pasal 5","UU No.11/2008 Pasal 27","UU No.40/2008 Pasal 3"], correct:0},
    {question:"Putusan MK tentang keterwakilan perempuan dalam politik nomor berapa?", answers:["MK No.14/PUU-XI/2013","MK No.20/PUU-XVII/2019","MK No.22-24/PUU-VI/2008","MK No.55/PUU-XVII/2019","MK No.135/PUU-XIII/2015"], correct:2}
];

// Soal Saintek (Level 4)
const soalSaintek = [
    {question:"Enzim yang mengubah protein menjadi asam amino?", answers:["Amilase","Lipase","Tripsin","Maltase","Laktase"], correct:2},
    {question:"Zat aktif utama analgesik dalam aspirin?", answers:["Asam Asetat","Asam Benzoat","Asam Salisilat","Asam Sitrat","Asam Fosfat"], correct:2},
    {question:"Gelombang elektromagnetik dengan panjang gelombang terpendek?", answers:["Gelombang radio","Gelombang mikro","Inframerah","Ultraviolet","Gamma"], correct:4},
    {question:"Proses pembentukan sel darah disebut?", answers:["Eritropoiesis","Leukopoiesis","Trombopoiesis","Hematopoiesis","Osteogenesis"], correct:3},
    {question:"Neurotransmitter pengatur suasana hati di otak manusia?", answers:["Dopamin","Serotonin","GABA","Adrenalin","Histamin"], correct:1}
];

// Gunakan logika pemilihan soal seperti di quiz sebelumnya (Vol.2 & Vol.3)

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
