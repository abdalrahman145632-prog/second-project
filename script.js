const theme = document.getElementById("theme-toggle");
const cartCountElement = document.querySelector(".cart-count");
const cartAddButton = document.querySelectorAll(".cart-btn");
const user = document.getElementById("user-btn");
let cartCountNumber = Number(window.localStorage.getItem("cart-count")) || 0;
let dataMode = Number(window.localStorage.getItem("data-mode")) || 1;
document.body.setAttribute("data-mode", dataMode);

const cartDropdown = document.getElementById("cart-dropdown");
const cartBtn = document.getElementById("cart-btn");
const closeCartBtn = document.getElementById("close-cart");
let cart = [];
let total = 0

const savedCart = window.localStorage.getItem("cartData");
if (savedCart) {
    cart = JSON.parse(savedCart);
    renderCart();
}

if (cartCountElement) {
    cartCountElement.textContent = cart.length;
}
const products = [
  { id: 1, name: "Pro Smartphone 15", category: "Smartphones", price: 899.99, rating: 4.9, image: "images/product1.jpg", badge: "New" },
  { id: 2, name: "Pro Laptop 15", category: "Laptops", price: 1299.99, rating: 4.1, image: "images/product2.jpg", badge: "Pro choice" },
  { id: 3, name: "Pro Audio Headphones", category: "Audio", price: 199.99, rating: 5.0, image: "images/product3.jpg", badge: "Best Seller" },
]

theme.addEventListener("click", () => {
    dataMode = (dataMode === 1) ? 2 : 1;
    document.body.setAttribute("data-mode", dataMode);
    window.localStorage.setItem("data-mode", dataMode);
});

cartAddButton.forEach(button => {
    button.addEventListener("click", () => {
        cart.push({
            name: button.parentElement.querySelector("h3").textContent,
            price: button.parentElement.querySelector(".price").textContent
        });
        renderCart();
    });
});

function renderCart() {
    const cartItemsContainer = document.querySelector(".cart-items");

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<li class="cart-item">Your cart is empty.</li>`;
    } else {
        cartItemsContainer.innerHTML = cart.map((item, index) => `
            <li class="cart-item" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <span>${item.name}</span>
                <span>${item.price}</span>
                <button onclick="removeCartItem(${index})" style="background: transparent; border: none; color: #ff4d4d; cursor: pointer; font-weight: bold;">✖</button>
            </li>
        `).join('');
    }

    window.localStorage.setItem("cartData", JSON.stringify(cart));
    window.localStorage.setItem("cart-count", cart.length);

    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
    renderTotal();
}

function removeCartItem(index) {
    cart.splice(index, 1);
    renderCart();
}

cartBtn.addEventListener("click", () => {
    cartDropdown.classList.toggle("show");
});

closeCartBtn.addEventListener("click", () => {
    cartDropdown.classList.remove("show");
});

function renderTotal() {
    let total = 0;

    cart.forEach(item => {

        let priceNumber = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
        total += priceNumber;
    });


    const totalElement = document.querySelector(".cart-total");
    if (totalElement) {
        totalElement.innerHTML = `<p>Total: $${total.toFixed(2)}</p>`;
    }
}

// ////////////////////////////////

