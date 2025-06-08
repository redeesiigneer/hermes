// Load components
document.addEventListener('DOMContentLoaded', () => {
  // Load header
  fetch('/static/components/header.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('header').innerHTML = html;
    });
  
  // Load header
  fetch('/static/components/dial.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('dial').innerHTML = html;
    });

  // Load footer
  fetch('/static/components/footer.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('footer').innerHTML = html;
    });

  // Load modals
  fetch('/static/components/modals.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('modals').innerHTML = html;
    });

  // Initialize modules
  import('./carousel.js');
  import('./cart.js');
});