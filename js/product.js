import { fetchData } from "./main.js";

const productContainer = document.querySelector(".product-container");
const renderDetailProduct = (data) => {
  productContainer.innerHTML = `
    <div>
      <img src="${data.images[0]}" alt="">
    </div>
    <div class="product-details">
      <h1>${data.title}</h1>
      <p class="description">${data.description}</p>
      <div class="meta">
        <span class="highlight">Price:</span> $${data.price} (Save ${data.discountPercentage}%)
        <span><strong>Brand:</strong> ${data.brand}</span>
        <span><strong>Rating:</strong> ${data.rating}⭐</span>
        <span><strong>Stock:</strong> ${data.stock}</span>
        <span><strong>Shipping:</strong> ${data.shippingInformation}</span>
        <span><strong>Return Policy:</strong> ${data.returnPolicy}</span>
        <span><strong>Minimum Order:</strong> ${data.minimumOrderQuantity}</span>
        <span><strong>Warranty:</strong> ${data.warrantyInformation}</span>
      </div>
    </div>
  `;
};

window.onload = () => {
  const params = new URLSearchParams(location.search);
  fetchData(`products/${params.get("id")}`, renderDetailProduct);
};
