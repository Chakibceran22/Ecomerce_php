const products = [];
let cart = [];

// Refactored fetchProducts using async/await
const fetchProducts = async () => {
  try {
    const response = await fetch(
      "http://localhost/TP_Projects/Ecomerce/routes/products.php"
    );

    if (!response.ok) {
      throw new Error("Error fetching products: " + response.statusText);
    }

    const fetchedProducts = await response.json();

    // Push the fetched products into the global array
    products.push(...fetchedProducts);

    // Display the products in the DOM
    displayProducts();
    setupFilters();
  } catch (error) {
    console.error("Error:", error);
  }
};
window.onload = fetchProducts;

// Initialize

// Display Products
 function displayProducts(productsToShow = products) {
  const grid = document.getElementById("products-grid");
  grid.innerHTML = "";

  productsToShow.forEach((product, index) => {
    const inCart = cart.some((item) => item.id === product.id);

    const card = document.createElement("div");
    card.className ="product-card bg-white rounded-xl shadow-md overflow-hidden";
    card.style.animationDelay = `${index * 100}ms`;
    card.innerHTML = `
                    <div class="relative">
                        <img src="${product.image}" alt="${product.name}" class="w-full h-80 object-cover">
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
                        <button onclick="addToCart(${product.id})" 
                                class="btn-gradient w-full py-3 px-4 rounded-lg text-white font-semibold">
                            Visualiser Produit
                        </button>
                    </div>
                `;
    grid.appendChild(card);
  });
}

// Cart Management
function addToCart(productId) {
  const product = products.find((p) => p.id == productId);
  const existingItem = cart.find((item) => item.id == productId);
  if (product.stock == 0) {
    updateCart();
    showToast("Désolé, ce produit est en rupture de stock");
    displayProducts();
    return;
  }
  if (existingItem) {
    product.stock--;
    existingItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
    product.stock--;
  }

  updateCart();
  showToast("Produit ajouté au panier !");
  displayProducts(); // Refresh products to show "Dans le panier" badge
}


function removeFromCart(productId) {
  const productInCart = cart.find((p) => p.id == productId);
  if (productInCart.quantity == 1) {
    cart = cart.filter((item) => item.id != productId);
    console.log(cart);
    updateCart();
    displayProducts();
    showToast("Produit retiré du panier !");
  } else {
    let index = cart.findIndex((item) => item.id == productId);

    cart[index].quantity--;
    updateCart();
    showToast("stock deinuished !");
  }
}

function checkout() {
  if (confirm("Voulez-vous finaliser votre achat ?")) {
    cart = [];
    updateCart();
    displayProducts();
    showToast("Merci pour votre achat !");
  }
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

// Toast Notifications
 function showToast(message) {
  const toast = document.getElementById("toast");
  toast.className =
    "toast fixed bottom-8 right-8 bg-white rounded-lg shadow-lg px-6 py-4 border-l-4 border-purple-500";
  toast.textContent = message;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 1000);
}


