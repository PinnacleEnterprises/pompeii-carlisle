// Enable passive event listeners for touch events
document.addEventListener('touchstart', () => {}, { passive: true });

// Global Contact Info
const phoneNumber = '7172546016';

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


//Address and Directions
const address = '2 A St, Carlisle, PA';

const addressDirections =
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

document.querySelectorAll('[data-address-link]').forEach((link) => {
  link.href = addressDirections;
  link.target = '_blank';
  link.rel = 'noopener';
});

// Hours of Operation
const hours = {
  0: { open: '11 AM', close: '11 PM' }, // Sun
  1: { open: '11 AM', close: '11 PM' }, // Mon
  2: { open: '11 AM', close: '11 PM' }, // Tue
  3: { open: '11 AM', close: '11 PM' }, // Wed
  4: { open: '11 AM', close: '11 PM' }, // Thu
  5: { open: '11 AM', close: '12 AM' }, // Fri
  6: { open: '11 AM', close: '12 AM' }, // Sat
};

const todayHours = hours[new Date().getDay()];

document.querySelectorAll('[data-hours-status]').forEach((element) => {
  element.textContent = todayHours
    ? `Open today until ${todayHours.close}`
    : 'Closed today';
});

