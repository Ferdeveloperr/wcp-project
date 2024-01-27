

const countdownElement = document.getElementById('countdown');

function updateCountdown() {
  const deadline = new Date(Date.now() + 72 * 60 * 60 * 1000); // 72 hours from now
  const now = new Date();
  const diffMs = deadline - now;
  const diffDays = Math.floor(diffMs / 86400000); // days
  const diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
  const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
  const diffSecs = Math.round((((diffMs % 86400000) % 3600000) % 60000) / 1000); // seconds

  countdownElement.textContent = `${diffDays}d ${diffHrs}h ${diffMins}m ${diffSecs}s`;

  if (diffMs <= 0) {
    clearInterval(intervalId);
    countdownElement.textContent = 'Time\'s up!';
  }
}

const intervalId = setInterval(updateCountdown, 1000); // update every second

updateCountdown(); // start with an initial update