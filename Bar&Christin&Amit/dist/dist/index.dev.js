"use strict";

var products = [{
  Id: 1,
  Name: "adidas Originals ballet fine knit t-shirt in cream",
  Price: 345,
  Image: "./top3-1.jpeg",
  InStock: true,
  amountInStock: 100
}, {
  Id: 2,
  Name: "Beauty of Joseon Relief Rice & Probiotics Sun Cream SPF 50 50ml",
  Price: 100,
  Image: "./top3-2.jpeg",
  InStock: true,
  amountInStock: 50
}, {
  Id: 3,
  Name: "ASOS DESIGN slim oval sunglasses in tort",
  Price: 80,
  Image: "./top3-3.jpeg",
  InStock: true,
  amountInStock: 60
}];
var nextId = 4; //view function

function htmlProduct(product) {
  return "\n        <div class=\"topsales__top3__item\" data-product-id=\"" + product.Id + "\">\n            <img src=\"" + product.Image + "\" alt=\"" + product.Name + "\"    \n            <h3 style=\"font-size: 18px; font-weight: bold; margin-bottom: 8px; color: #333;\">" + product.Name + "</h3>\n            <p style=\"font-size: 16px; color: #007bff; font-weight: bold; margin-bottom: 8px;\">\u20AA" + product.Price + "</p>\n            <p style=\"font-size: 14px; color: " + (product.InStock ? '#28a745' : '#dc3545') + "; margin-bottom: 5px;\">\n                " + (product.InStock ? '✓ In Stock' : '✗ Out of Stock') + "\n            </p>\n            <p style=\"font-size: 14px; color: #666;\">Quantity: " + product.amountInStock + "</p>\n        </div>\n    ";
}

function renderProducts() {
  try {
    var topSalesContainer = document.getElementById("topSalesContainer");
    var sortPriceBtn = document.getElementById('sortByPrice');
    if (!topSalesContainer) throw new Error("topSalesContainer element not found");
    topSalesContainer.innerHTML = products.map(function (product) {
      return htmlProduct(product);
    }).join('');
    sortPriceBtn.textContent = 'Sort by Price (Low to High)';
  } catch (error) {
    console.error("Error rendering products:", error);
  }
} //control function


function handleAddProduct() {
  var imageUrlElement = document.getElementById('imageUrl');
  var nameElement = document.getElementById('name');
  var priceElement = document.getElementById('price');
  var inStockElement = document.getElementById('inStock');
  var quantityElement = document.getElementById('quantity');
  var productData = {
    Name: nameElement.value,
    Price: parseFloat(priceElement.value),
    Image: imageUrlElement.value,
    InStock: inStockElement.checked,
    amountInStock: parseInt(quantityElement.value)
  };
  var newProduct = addProduct(products, productData);
  console.log('Added product:', newProduct);
  renderProducts();
}

function handleSortByPrice() {
  sortProductsByPrice(products);
  renderProducts();
} //model function


function addProduct(productsArray, productData) {
  var newProduct = {
    Id: nextId++,
    Name: productData.Name,
    Price: productData.Price,
    Image: productData.Image,
    InStock: productData.InStock,
    amountInStock: productData.amountInStock
  };
  productsArray.push(newProduct);
  return newProduct;
}

function sortProductsByPrice(productsArray) {
  productsArray.sort(function (a, b) {
    return a.Price - b.Price;
  });
}

function initializeApp() {
  renderProducts();
  var addBtn = document.getElementById('addProductBtn');
  var sortPriceBtn = document.getElementById('sortByPrice');

  if (addBtn) {
    addBtn.addEventListener('click', function (e) {
      e.preventDefault();
      handleAddProduct();
    });
  }

  if (sortPriceBtn) {
    sortPriceBtn.addEventListener('click', function (e) {
      e.preventDefault();
      handleSortByPrice();
    });
  }

  console.log('Product management system initialized');
}

document.addEventListener('DOMContentLoaded', initializeApp);