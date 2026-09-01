// Enable passive event listeners for touch events
document.addEventListener('touchstart', () => {}, { passive: true });

// Global Contact Info
const phoneNumber = '7171234567';

const phoneDial = `+1${phoneNumber}`;
const phoneDisplay =
  `(${phoneNumber.slice(0, 3)}) ` +
  `${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;

document.querySelectorAll('[data-phone-link]').forEach((link) => {
  link.href = `tel:${phoneDial}`;
});

document.querySelectorAll('[data-phone-display]').forEach((element) => {
  element.textContent = phoneDisplay;
});

