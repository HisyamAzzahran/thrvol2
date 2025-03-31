const questions = [
    {
        question: "Siapakah Presiden pertama Republik Indonesia?",
        answers: ["Mohammad Hatta", "Soekarno", "Soeharto", "BJ Habibie", "Joko Widodo"],
        correct: 1
    },
    {
        question: "Hasil dari 12 × 7 adalah?",
        answers: ["72", "74", "84", "96", "82"],
        correct: 2
    },
    {
        question: "Siapa penemu bola lampu?",
        answers: ["Nikola Tesla", "Albert Einstein", "Isaac Newton", "Thomas Edison", "Michael Faraday"],
        correct: 3
    },
    {
        question: "Tahun berapakah Proklamasi Kemerdekaan RI?",
        answers: ["1940", "1942", "1945", "1950", "1965"],
        correct: 2
    },
    {
        question: "Ibukota dari Jawa Barat adalah?",
        answers: ["Bandung", "Jakarta", "Semarang", "Surabaya", "Bogor"],
        correct: 0
    }
];

let currentQuestion = 0;
let correctAnswers = 0;

const bgMusic = document.getElementById('bg-music');
const musikYa = document.getElementById('musik-ya');
const musikTidak = document.getElementById('musik-tidak');
const startContainer = document.getElementById('start-container');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const questionNumber = document.getElementById('question-number');
const nextBtn = document.getElementById('next-btn');
const scoreEl = document.getElementById('score');
const specialLink = document.getElementById('special-link');

musikYa.addEventListener('click', () => {
    bgMusic.play();
    mulaiQuiz();
});

musikTidak.addEventListener('click', () => {
    mulaiQuiz();
});

function mulaiQuiz() {
    startContainer.classList.add('hidden');
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
        button.addEventListener('click', () => pilihJawaban(index, button));
        answersEl.appendChild(button);
    });
}

function resetPertanyaan() {
    nextBtn.classList.add('hidden');
    nextBtn.disabled = false;
    answersEl.innerHTML = '';
}

function pilihJawaban(index, button) {
    document.querySelectorAll('.answer').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    nextBtn.classList.remove('hidden');

    nextBtn.onclick = () => {
        if (index === questions[currentQuestion].correct) {
            correctAnswers++;
        }
        currentQuestion++;
        if (currentQuestion < questions.length) {
            tampilkanPertanyaan();
        } else {
            tampilkanHasil();
        }
    };
}

function tampilkanHasil() {
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    scoreEl.innerText = `Kamu menjawab benar ${correctAnswers} dari ${questions.length} pertanyaan.`;

    if (correctAnswers === questions.length) {
        specialLink.innerHTML = `<p>Selamat, semua benar! Klik link berikut untuk hadiah spesial:</p>
        <a href="https://link.dana.id/danakaget?c=szvajt2zp&r=fRBIPX&orderId=20250330101214533515010300166513115202103" target="_blank">Ambil Hadiahmu!</a>`;
    } else {
        specialLink.innerHTML = `<p>Terima kasih telah berpartisipasi!</p>`;
    }
}
