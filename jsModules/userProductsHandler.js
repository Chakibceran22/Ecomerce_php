let cart = JSON.parse(localStorage.getItem("cart")) || [];
let products = []
const getUserProducts = async() => {
    const response = await fetch('http://localhost/TP_Projects/Ecomerce/routes/getUserProducts.php',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const result = await response.json();
    products = result.products;
  
    displayProducts(products);
    setupFilters();
}





function displayProducts(productsToShow = products ) {
  const grid = document.getElementById("products-grid");
  grid.innerHTML = "";
  

  productsToShow.forEach((product, index) => {

    const inCart = cart.some((item) => item.id === product.id);
    

    const card = document.createElement("div");
    card.className ="product-card bg-white rounded-xl shadow-md overflow-hidden";
    card.style.animationDelay = `${index * 100}ms`;
    card.innerHTML = `
                    <div class="relative">
                        <img src="${product.image}" alt="${product.name}" class="w-full h-96 object-cover">
                        ${
                          inCart
                            ? `
                            <div class="added-badge absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                Dans le panier
                            </div>
                        `
                            : ""
                        }
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-semibold mb-2">${product.name}</h3>
                        <div class="flex justify-between items-center mb-4">
                            <span class="text-2xl font-bold text-purple-600">${
                              product.price
                            }&euro;</span>
                            <span class="text-sm text-gray-500">Stock: ${
                              product.stock
                            }</span>
                        </div>
                        <button data-id="${product.id}"
                                data-name="${product.name}"
                                data-price="${product.price}"
                                data-stock="${product.stock}"
                                data-image="${product.image}"
                                data-description="${product.description}"
                                onclick="goToProductPage(this)"
                        class="btn-gradient w-full py-3 px-4 rounded-lg text-white font-semibold">
                          Visualiser Produit
                        </button>
                    </div>
                `;
    grid.appendChild(card);
  });
}
function setupFilters() {
  const searchInput = document.getElementById("search");
  const priceFilter = document.getElementById("price-filter");

  function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const maxPrice = parseFloat(priceFilter.value) || Infinity;
    // ||
    // product.description.toLowerCase().includes(searchTerm) you can implement this her eif you realy want to search in description too
    const filtered = products.filter((product) => {
      return (
        product.name
          .toLowerCase()
          .includes(searchTerm) /*you can pput it here */ &&
        product.price <= maxPrice
      );
    });

    displayProducts(filtered);
  }

  searchInput.addEventListener("input", filterProducts);
  priceFilter.addEventListener("input", filterProducts);
}

function goToProductPage(button) {
  const id = button.dataset.id;
  const name = button.dataset.name;
  const price = button.dataset.price;
  const stock = button.dataset.stock;
  const image = button.dataset.image;
  const description = button.dataset.description;
  window.location.href = `http://localhost/TP_Projects/Ecomerce/views/productPage.html?id=${id}&name=${name}&price=${price}&stock=${stock}&image=${image}&desc=${description}`;
  // ?id=${id}&name=${name}&price=${price}&stock=${stock}&image=${image}
}
window.onload = getUserProducts;