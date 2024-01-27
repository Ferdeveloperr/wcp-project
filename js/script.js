let countdown;

function startTimer() {
    // Duración en horas (72 horas)
    const durationHours = 72;
    const endTime = new Date().getTime() + durationHours * 60 * 60 * 1000;

    countdown = setInterval(updateTimer, 1000);

    function updateTimer() {
        const currentTime = new Date().getTime();
        const timeDifference = endTime - currentTime;

        if (timeDifference <= 0) {
            clearInterval(countdown);
            document.getElementById('timer').innerHTML = 'Tiempo agotado';
        } else {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            document.getElementById('timer').innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    }
}

