// Load components
document.addEventListener('DOMContentLoaded', () => {
  // Load header
  fetch('components/header.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('header').innerHTML = html;
    });
  
  // Load header
  fetch('components/dial.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('dial').innerHTML = html;
    });

  // Load footer
  fetch('components/footer.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('footer').innerHTML = html;
    });

  // Load modals
  fetch('components/modals.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('modals').innerHTML = html;
    });

  // Initialize modules
  import('./carousel.js');
  import('./cart.js');
});