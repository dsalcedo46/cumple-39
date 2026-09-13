document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('celebrate-btn');

    btn.addEventListener('click', () => {
        // Explosión inicial de confeti
        confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 }
        });

        // Ráfagas laterales suplementarias
        setTimeout(() => {
            confetti({
                particleCount: 50,
                angle: 60,
                spread: 55,
                origin: { x: 0 }
            });
            confetti({
                particleCount: 50,
                angle: 120,
                spread: 55,
                origin: { x: 1 }
            });
        }, 250);
    });
});