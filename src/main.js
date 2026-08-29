import './style.css';

// Enable passive event listeners for touch events
document.addEventListener('touchstart', () => {}, { passive: true });

// Global Contact Info
const phoneNumber = "7171234567";

const contactInfo = {
  phoneDisplay: `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`,
  phoneDial: `+1${phoneNumber}`
};

// Inject phone data when the DOM loads
document.addEventListener('DOMContentLoaded', () => {
  // 1. Update the href attribute for all call buttons/links
  document.querySelectorAll('.phone-link').forEach(link => {
    link.href = `tel:${contactInfo.phoneDial}`;
  });

  // 2. Update the visible text wherever the number is displayed
  document.querySelectorAll('.phone-display').forEach(text => {
    text.textContent = contactInfo.phoneDisplay;
  });
});