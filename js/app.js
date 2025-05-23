import {fetchData} from "./main.js"

const wrapper = document.querySelector(".wrapper")
const productCategory = document.querySelector(".product-category")
const btnSeeMore = document.querySelector(".btn-seemore")
const skeletonEl = document.querySelector(".skeleton")

function closeLoading () {
    skeletonEl.style.display = "none"
}

let totalProducts = 0;
let loadedProducts = 0;

function renderProduct(data) {
    totalProducts = data.total || totalProducts;
    loadedProducts += data.products.length;
  
    data.products.forEach((product) => {
      const card = document.createElement("div");
      card.className = "card";
      card.dataset.id = product.id;
      card.innerHTML = `
        <img name="card-image" src=${product.thumbnail} alt="">
        <h3>${product.title}</h3>
        <p class="brand">${product.brand}</p>
        <p class="price">$${product.price} (${product.discountPercentage}% off)</p>
        <p class="stock">${product.stock > 0 ? "In Stock" : "Out of Stock"}</p>
      `;
      wrapper.appendChild(card);
    });
  
    if (loadedProducts >= totalProducts) {
      btnSeeMore.disabled = true;
      btnSeeMore.innerText = "No More Products";
      btnSeeMore.style.opacity = "0.6";
      btnSeeMore.style.cursor = "not-allowed";
    }
  }  

wrapper.addEventListener("click", (event)=>{
    let name = event.target.name
    if(name === "card-image"){
        const id = event.target.closest(".card").dataset.id
        open(`/pages/product.html?id=${id}`, "_self")
    }
    
})

function renderProductsCategories(data) {
    data.forEach((category)=>{
        let li = document.createElement("li")
        li.innerHTML = category
        productCategory.appendChild(li)        
    })
}

productCategory.addEventListener("click", (event)=>{
    if(event.target.tagName === "LI") {
        wrapper.innerHTML = null
        if(event.target.innerHTML === "All"){
            skeletonEl.style.display = "flex"
            fetchData(`products`, renderProduct, closeLoading)
        }else {
            skeletonEl.style.display = "flex"
            fetchData(`products/category/${event.target.innerHTML}`, renderProduct, closeLoading)
        }
    }
})

let offset = 0
const perPageCount = 12

btnSeeMore.onclick = (e)=>{
    offset++
    fetchData(`products?limit=${perPageCount}&skip=${perPageCount * offset}`, renderProduct)
}

window.onload = ()=>{
    fetchData("products/category-list", renderProductsCategories)
    fetchData(`products?limit=${perPageCount}&skip=0`, renderProduct, closeLoading)
}

function createSkeleton() {
    const fragment = document.createDocumentFragment()
    Array(12).fill("").forEach(()=>{
        const div = document.createElement("div")
        div.className = "skeleton__item"
        div.innerHTML = `
            <div class="skeleton__image skeleton__animation"></div>
            <div class="skeleton__line skeleton__animation"></div>
            <div class="skeleton__line skeleton__animation"></div>
            <div class="skeleton__line skeleton__animation"></div>
            <div class="skeleton__line skeleton__animation"></div>
        `
        fragment.appendChild(div)
    })
    skeletonEl.appendChild(fragment)
}
createSkeleton()