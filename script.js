// ===== CONFIGURACIÓN DE PREGUNTAS =====
const questions = [
    {
        question: "¿Dónde fue nuestro viaje o momento más divertido juntos?",
        options: ["En la playa", "En aquella escapada a la montaña", "En aquella cena inolvidable"],
        correct: 1
    },
    {
        question: "¿Qué es lo que más te caracteriza cuando celebras tu cumple?",
        options: ["Tu sonrisa constante", "Organizarlo todo a la perfección", "Pedir un deseo con ganas"],
        correct: 0
    },
    {
        question: "¿Cuántos años cumplimos hoy?",
        options: ["38 + 1", "39 por todo lo alto", "Las dos anteriores son correctas"],
        correct: 2
    }
];

// ===== ESTADO =====
let currentQuestion = 0;
let isTransitioning = false;

// ===== ELEMENTOS DEL DOM =====
const welcomeScreen = document.getElementById('welcome-screen');
const quizScreen = document.getElementById('quiz-screen');
const countdownScreen = document.getElementById('countdown-screen');
const rewardScreen = document.getElementById('reward-screen');
const btnStart = document.getElementById('btn-start');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const errorMsg = document.getElementById('error-message');
const progressBar = document.getElementById('progress');
const questionBadge = document.getElementById('question-badge');
const questionBox = document.getElementById('question-box');
const quizDots = document.querySelectorAll('.dot');
const countdownNum = document.getElementById('countdown-num');
const videoContainer = document.getElementById('video-container');
const finalMessage = document.getElementById('final-message');

// ===== CORAZONES FLOTANTES =====
const heartEmojis = ['💖', '💕', '✨', '🌸', '💗', '🦋', '💝'];
const heartsContainer = document.getElementById('floating-hearts');

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (6 + Math.random() * 5) + 's';
    heart.style.fontSize = (1 + Math.random() * 0.8) + 'rem';
    heartsContainer.appendChild(heart);

    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 12000);
}

setInterval(createFloatingHeart, 1800);
for (let i = 0; i < 4; i++) {
    setTimeout(createFloatingHeart, i * 500);
}

// ===== PANTALLA DE BIENVENIDA =====
btnStart.addEventListener('click', () => {
    welcomeScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    quizScreen.classList.add('fade-in-up');
    loadQuestion();
});

// ===== QUIZ =====
function loadQuestion() {
    const q = questions[currentQuestion];

    errorMsg.classList.add('hidden');

    const progressPercent = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = progressPercent + '%';

    questionBadge.textContent = `Pregunta ${currentQuestion + 1} de ${questions.length}`;

    quizDots.forEach((dot, i) => {
        dot.classList.toggle('active', i <= currentQuestion);
    });

    questionText.textContent = q.question;

    optionsContainer.innerHTML = '';
    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'btn-option';
        btn.innerHTML = `<span>${opt}</span><span class="option-arrow">→</span>`;
        btn.addEventListener('click', () => checkAnswer(index, btn));
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selectedIndex, clickedBtn) {
    if (isTransitioning) return;

    const q = questions[currentQuestion];
    const allBtns = optionsContainer.querySelectorAll('.btn-option');

    allBtns.forEach(btn => btn.disabled = true);

    if (selectedIndex === q.correct) {
        clickedBtn.classList.add('correct');
        clickedBtn.querySelector('.option-arrow').textContent = '✓';
        isTransitioning = true;

        confetti({
            particleCount: 25,
            spread: 50,
            origin: { y: 0.7 },
            colors: ['#10b981', '#34d399', '#6ee7b7']
        });

        setTimeout(() => {
            questionBox.classList.remove('slide-in-right');
            questionBox.classList.add('slide-out-left');

            setTimeout(() => {
                if (currentQuestion < questions.length - 1) {
                    currentQuestion++;
                    loadQuestion();
                    questionBox.classList.remove('slide-out-left');
                    questionBox.classList.add('slide-in-right');
                    isTransitioning = false;
                } else {
                    quizScreen.classList.add('hidden');
                    startCountdown();
                    isTransitioning = false;
                }
            }, 350);
        }, 700);

    } else {
        clickedBtn.classList.add('wrong');
        clickedBtn.querySelector('.option-arrow').textContent = '✗';
        errorMsg.classList.remove('hidden');

        setTimeout(() => {
            allBtns.forEach(btn => {
                btn.disabled = false;
                btn.classList.remove('wrong');
                btn.querySelector('.option-arrow').textContent = '→';
            });
            errorMsg.classList.add('hidden');
        }, 1200);
    }
}

// ===== COUNTDOWN =====
function startCountdown() {
    countdownScreen.classList.remove('hidden');
    countdownScreen.classList.add('scale-in');

    let count = 3;
    countdownNum.textContent = count;
    countdownNum.style.animation = 'none';
    void countdownNum.offsetWidth;
    countdownNum.style.animation = 'countdown-pop 1s ease forwards';

    const countdownInterval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownNum.textContent = count;
            countdownNum.style.animation = 'none';
            void countdownNum.offsetWidth;
            countdownNum.style.animation = 'countdown-pop 1s ease forwards';
        } else {
            clearInterval(countdownInterval);
            countdownNum.textContent = '🎉';
            countdownNum.style.animation = 'none';
            countdownNum.style.fontSize = '3.5rem';
            countdownNum.style.background = 'none';
            countdownNum.style.webkitTextFillColor = 'initial';

            setTimeout(() => {
                showReward();
            }, 600);
        }
    }, 1000);
}

// ===== REWARD =====
function showReward() {
    countdownScreen.classList.add('hidden');
    rewardScreen.classList.remove('hidden');
    rewardScreen.classList.add('fade-in-up');

    setTimeout(() => {
        videoContainer.classList.add('show');
    }, 400);

    setTimeout(() => {
        finalMessage.classList.add('show');
    }, 1200);

    setTimeout(() => {
        confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#ff4d6d', '#ff758f', '#c9184a', '#7209b7', '#ffd700']
        });

        setTimeout(() => {
            confetti({
                particleCount: 50,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff4d6d', '#ff758f', '#ffd700']
            });
            confetti({
                particleCount: 50,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#7209b7', '#c9184a', '#ffd700']
            });
        }, 300);

        setTimeout(() => {
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    confetti({
                        particleCount: 30,
                        spread: 360,
                        ticks: 100,
                        gravity: 0,
                        decay: 0.94,
                        startVelocity: 20,
                        colors: ['#ff4d6d', '#ff758f', '#c9184a', '#ffb3c6'],
                        origin: {
                            x: Math.random(),
                            y: Math.random() * 0.3
                        }
                    });
                }, i * 200);
            }
        }, 800);
    }, 500);
}

