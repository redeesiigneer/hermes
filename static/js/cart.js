let currentItemToRemove = null;

export function initCart() {
  // Load product cards
  fetch('/static/components/product-card.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('productsGrid').innerHTML = html;

      // Add event listeners to all add-to-cart buttons
      document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function() {
          const itemId = this.getAttribute('data-item-id');
          addToCart(itemId);
        });
      });
    });
}

export function addToCart(itemId) {
  const cartControls = document.getElementById(`cartControls${itemId}`);

  cartControls.innerHTML = `
    <div class="cart-controls-container">
      <button class="in-cart-btn" onclick="event.preventDefault()">
        <svg class="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 4a1 1 0 0 1 1-1h1.5a1 1 0 0 1 .979.796L7.939 6H19a1 1 0 0 1 .979 1.204l-1.25 6a1 1 0 0 1-.979.796H9.605l.208 1H17a3 3 0 1 1-2.83 2h-2.34a3 3 0 1 1-4.009-1.76L5.686 5H5a1 1 0 0 1-1-1Z"/>
          <path d="M2 14v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2H2Z"/>
        </svg>
        <span>В корзине</span>
      </button>

      <div class="quantity-controls">
        <button type="button" class="quantity-btn" onclick="changeQuantity(${itemId}, -1)">
          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
          </svg>
        </button>

        <input type="number" id="quantityInput${itemId}" class="quantity-input" value="1" min="0" max="99" onchange="updateQuantity(${itemId})"/>

        <button type="button" class="quantity-btn" onclick="changeQuantity(${itemId}, 1)">
          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
          </svg>
        </button>
      </div>
    </div>
  `;

  updateCartCounter(1);
}

export function changeQuantity(itemId, delta) {
  const input = document.getElementById(`quantityInput${itemId}`);
  let value = parseInt(input.value) + delta;
  if (value < 0) value = 0;
  input.value = value;
  updateQuantity(itemId);
}

export function updateQuantity(itemId) {
  const input = document.getElementById(`quantityInput${itemId}`);
  let value = parseInt(input.value);

  if (value <= 0) {
    currentItemToRemove = itemId;
    document.getElementById('confirmRemoveModal').style.display = 'flex';
  }
}

export function confirmRemoveItem() {
  const cartControls = document.getElementById(`cartControls${currentItemToRemove}`);

  cartControls.innerHTML = `
    <button class="add-to-cart-btn text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs sm:text-sm px-3 py-1.5 sm:px-5 sm:py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    data-item-id="${currentItemToRemove}">
      <svg class="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.268 6A2 2 0 0 0 14 9h1v1a2 2 0 0 0 3.04 1.708l-.311 1.496a1 1 0 0 1-.979.796H8.605l.208 1H16a3 3 0 1 1-2.83 2h-2.34a3 3 0 1 1-4.009-1.76L4.686 5H4a1 1 0 0 1 0-2h1.5a1 1 0 0 1 .979.796L6.939 6h5.329Z"/>
        <path d="M18 4a1 1 0 1 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0V8h2a1 1 0 1 0 0-2h-2V4Z"/>
      </svg>
    </button>
  `;

  updateCartCounter(-1);
  closeModal('confirmRemoveModal');
}

export function updateCartCounter(delta) {
  const counter = document.querySelector('.fixed.bottom-0 .relative span');
  let currentValue = parseInt(counter.textContent);
  counter.textContent = currentValue + delta;
}

export function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

// Initialize
initCart();

// Make functions available globally for HTML onclick attributes
window.changeQuantity = changeQuantity;
window.updateQuantity = updateQuantity;
window.confirmRemoveItem = confirmRemoveItem;
window.closeModal = closeModal;

// Открытие модального окна чата с продавцом
export function openSellerChat(sellerName) {
  document.getElementById('sellerChatTitle').textContent = `Чат с ${sellerName}`;
  document.getElementById('sellerChatModal').style.display = 'flex';
  document.getElementById('chatMessages').innerHTML = `
    <div class="text-center text-gray-500 dark:text-gray-400 py-8">Начните общение с продавцом</div>
  `;
}

// Отправка сообщения в чате
export function sendMessage() {
  const input = document.getElementById('chatInput');
  const message = input.value.trim();

  if (message) {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML += `
      <div class="mb-2 text-right">
        <div class="inline-block bg-blue-100 rounded-lg px-3 py-1 dark:bg-blue-900">
          ${message}
        </div>
      </div>
    `;
    input.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

// Сделать функции доступными глобально
window.openSellerChat = openSellerChat;
window.sendMessage = sendMessage;