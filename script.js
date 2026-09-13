// CONFIGURACIÓN DE PREGUNTAS
const questions = [
    {
        question: "¿Dónde fue nuestro viaje o momento más divertido juntos?",
        options: ["En la playa", "En aquella escapada a la montaña", "En aquella cena inolvidable"],
        correct: 1 // Índice de la respuesta correcta (0, 1 o 2)
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

let currentQuestion = 0;

document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
});

function loadQuestion() {
    const q = questions[currentQuestion];
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const errorMsg = document.getElementById('error-message');
    const progressBar = document.getElementById('progress');

    // Ocultar mensaje de error
    errorMsg.classList.add('hidden');

    // Actualizar barra de progreso
    const progressPercent = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // Cargar texto de la pregunta
    questionText.textContent = `${currentQuestion + 1}. ${q.question}`;

    // Generar botones de opciones
    optionsContainer.innerHTML = '';
    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'btn-option';
        btn.innerHTML = `<span>${opt}</span> <span>➔</span>`;
        btn.addEventListener('click', () => checkAnswer(index));
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selectedIndex) {
    const q = questions[currentQuestion];
    const errorMsg = document.getElementById('error-message');

    if (selectedIndex === q.correct) {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showReward();
        }
    } else {
        errorMsg.classList.remove('hidden');
    }
}

function showReward() {
    const quizScreen = document.getElementById('quiz-screen');
    const rewardScreen = document.getElementById('reward-screen');

    quizScreen.classList.add('hidden');
    rewardScreen.classList.remove('hidden');

    // Esperamos 200ms a que termine la animación de entrada de la tarjeta
    setTimeout(() => {
        // Disparo principal con número de partículas optimizado para móvil
        confetti({
            particleCount: 70,
            spread: 70,
            origin: { y: 0.6 },
            disableForReducedMotion: true // Respetar si el móvil tiene ahorro de batería/recursos
        });

        // Ráfaga secundaria suave a los 400ms
        setTimeout(() => {
            confetti({
                particleCount: 40,
                angle: 60,
                spread: 55,
                origin: { x: 0 }
            });
            confetti({
                particleCount: 40,
                angle: 120,
                spread: 55,
                origin: { x: 1 }
            });
        }, 400);
    }, 200);

}