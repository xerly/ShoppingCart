"use strict";

// JS Scripts
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  // Remove button
  var removeCartItemButtons = document.getElementsByClassName("btn-danger");

  for (let i = 0; i < removeCartItemButtons.length; i++) {
    const button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  } 
  
  // Quantity can't be 0 or negative
  var quantityInputs = document.getElementsByClassName("cart-quantity-input");

  for (let i = 0; i < quantityInputs.length; i++) {
    const input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  
  // Add to Shopping Cart
  var addToCartButtons = document.getElementsByClassName("shop-item-button");
  for (let i = 0; i < addToCartButtons.length; i++) {
    const button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }
  
  // Purchase Button (Remove Items from Cart)
  document.getElementsByClassName("btn-purchase")[0].addEventListener("click", purchaseClicked);
}

function quantityChanged(event) {
  const input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addToCartClicked(event) {
  const button = event.target;
  const shopItem = button.parentElement.parentElement;
  const title = shopItem.querySelectorAll("p")[0];
  const productTitle = title.innerText.trim();
  const price = shopItem.getElementsByClassName("prod-price")[0].innerText;
  addItemToCart(productTitle, price);
  updateCartTotal();
}

// Add Item to Cart Row
function addItemToCart(productTitle, price) {
  const cartRow = document.createElement("div");
  cartRow.classList.add("cart-row", "d-flex", "justify-content-between");
  const cartItems = document.getElementsByClassName("cart-items")[0];
  const cartItemNames = cartItems.getElementsByClassName("cart-item-title");

  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == productTitle) {
      const quantityInputs = document.getElementsByClassName("cart-quantity-input");
      quantityInputs[i].value++;
      return;
    }
  }

  const cartRowContents = `
      <div class="cart-item cart-column">
        <span class="cart-item-title">${productTitle}</span>
      </div>
      <span class="cart-price cart-column">${price}</span>
      <div class="cart-quantity cart-column">
        <input type="number" value="1" class="cart-quantity-input">
        <button class="btn btn-danger" type="button">REMOVE</button>
      </div>
  `;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow.getElementsByClassName("btn-danger")[0].addEventListener("click", removeCartItem);
  cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener("change", quantityChanged);
}

// Remove Cart Item
function removeCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

// Update Cart Total
function updateCartTotal() {
  const cartItemContainer = document.getElementsByClassName("cart-items")[0];
  const cartRows = cartItemContainer.getElementsByClassName("cart-row");
  var total = 0;

  for (let i = 0; i < cartRows.length; i++) {
    const cartRow = cartRows[i];
    const priceElement = cartRow.getElementsByClassName("cart-price")[0];
    const quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0];
    const price = parseFloat(priceElement.innerText.replace("€", ""));
    const quantity = quantityElement.value;
    total = total + price * quantity;
  }

  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText = "€" + total.toFixed(2);
}

// Purchase Clicked
function purchaseClicked() {
  alert("Thank you for your purchase");
  const cartItems = document.getElementsByClassName("cart-items")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}

// Tooltips
const tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});


/* --------- Method Drag & Drop --------- */

function allowDrop(event) {
  event.preventDefault();
}

var pTitle;
var pPrice;

function drag(event) {
  const draggableInfo = event.target.parentElement;
  pTitle = draggableInfo.querySelectorAll("p")[0].innerText.trim();
  pPrice = draggableInfo.querySelectorAll("p")[1].innerText;
}

function drop(event) {
  event.preventDefault();
  addItemToCart(pTitle, pPrice);
  updateCartTotal();
}

/* --------- / Method Drag & Drop --------- */