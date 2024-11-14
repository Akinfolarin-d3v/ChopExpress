document.addEventListener("DOMContentLoaded", function () {
    const cartItems = [];
    const cartItemsList = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
  
    function updateCart() {
      // Clear the current cart items
      cartItemsList.innerHTML = "";
  
      // Update the cart with new items
      let totalPrice = 0;
      cartItems.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.name} - ₵${item.price.toFixed(2)}`;
        cartItemsList.appendChild(listItem);
        totalPrice += item.price;
      });
  
      // Update the total price
      totalPriceElement.textContent = `Total: ₵${totalPrice.toFixed(2)}`;
    }
  
    // Event listener for "Add to Cart" buttons
    document.querySelectorAll(".add-to-cart").forEach(button => {
      button.addEventListener("click", function () {
        const menuItem = this.parentElement;
        const itemName = menuItem.getAttribute("data-name");
        const itemPrice = parseFloat(menuItem.getAttribute("data-price"));
  
        // Add item to cart
        cartItems.push({ name: itemName, price: itemPrice });
        updateCart();
      });
    });
  });
  