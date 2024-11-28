'use strict';



/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);



/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

});
// JavaScript to toggle the cart section visibility
document.getElementById("toggle-cart-btn").addEventListener("click", function() {
  const cartSection = document.querySelector(".cart-section");
  
  // Toggle the 'hidden' class
  cartSection.classList.toggle("hidden");

  // Change button text based on cart visibility
  if (cartSection.classList.contains("hidden")) {
    this.textContent = "View Cart";
  } else {
    this.textContent = "Hide Cart";
  }
});


           document.addEventListener("DOMContentLoaded", function () {
          // Load cart items from localStorage
          let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
          const cartItemsList = document.getElementById("cart-items");
          const totalPriceElement = document.getElementById("total-price");
          const checkoutBtn = document.getElementById("checkout-btn");
          const cartCountElement = document.getElementById("cart-count");
          const toggleCartBtn = document.getElementById("toggle-cart-btn");
          const cartSection = document.querySelector(".cart-section");

          // Function to update the cart display and total price
          function updateCart() {
              cartItemsList.innerHTML = "";
              let totalPrice = 0;
              let totalItems = 0;

              cartItems.forEach((item, index) => {
                  const listItem = document.createElement("li");
                  listItem.classList.add("cart-item");
                  listItem.innerHTML = `
                      <span class="item-details">${item.name} - ₵${(item.price * item.quantity).toFixed(2)}</span>
                      <span class="quantity">${item.quantity}</span>
                      <button class="remove-from-cart" data-index="${index}">Remove</button>
                  `;
                  cartItemsList.appendChild(listItem);

                  totalPrice += item.price * item.quantity;
                  totalItems += item.quantity;
              });

              totalPriceElement.textContent = `Total: ₵${totalPrice.toFixed(2)}`;
              cartCountElement.textContent = totalItems;
              checkoutBtn.style.display = cartItems.length > 0 ? "block" : "none";

              // Save updated cart to localStorage
              localStorage.setItem("cartItems", JSON.stringify(cartItems));
          }

          // Function to add an item to the cart
          function addToCart(name, price) {
              const existingItem = cartItems.find(item => item.name === name);
              if (existingItem) {
                  existingItem.quantity += 1;
              } else {
                  cartItems.push({ name, price, quantity: 1 });
              }
              updateCart();
          }

          // Function to remove an item from the cart
          function removeFromCart(index) {
              cartItems.splice(index, 1);
              updateCart();
          }

          // Function to increase item quantity
          function incrementQuantity(index) {
              cartItems[index].quantity += 1;
              updateCart();
          }

          // Function to decrease item quantity
          function decrementQuantity(index) {
              if (cartItems[index].quantity > 1) {
                  cartItems[index].quantity -= 1;
              } else {
                  removeFromCart(index);
              }
              updateCart();
          }

          // Add event listener to "Add to Cart" buttons
          document.querySelectorAll(".add-to-cart").forEach(button => {
              button.addEventListener("click", function () {
                  const itemName = this.getAttribute("data-name");
                  const itemPrice = parseFloat(this.getAttribute("data-price"));
                  addToCart(itemName, itemPrice);
              });
          });

          // Event delegation for cart actions
          cartItemsList.addEventListener("click", function (event) {
              const index = event.target.getAttribute("data-index");
              if (event.target.classList.contains("increment")) {
                  incrementQuantity(index);
              } else if (event.target.classList.contains("decrement")) {
                  decrementQuantity(index);
              } else if (event.target.classList.contains("remove-from-cart")) {
                  removeFromCart(index);
              }
          });

          // Event listener for the Checkout button
          checkoutBtn.addEventListener("click", function () {
              alert("Proceeding to checkout...");
              // Save cart items to localStorage before navigating
              localStorage.setItem("cartItems", JSON.stringify(cartItems));
              window.location.href = "checkout.html";
          });

          // Initial cart update to display any items loaded from localStorage
          updateCart();
});


  