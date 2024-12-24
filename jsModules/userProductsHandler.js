let cart = []
let products = []
const getUserProducts = async() => {
    const response = await fetch('http://localhost/TP_Projects/Ecomerce/routes/getUserProducts.php',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const result = await response.json();
    products.push(...result.products);
    console.log(products)
  //   if(result.status == "success"){
  //       const products = result.products;
  //       const length = products.length;
  //       console.log(result.user)
  //       for(let i =0 ; i<length;i++){
  //           addToCart(products[i].id,products);
            
  //   }
    
  // }
    displayProducts(products);
    setupFilters();
}




// function addToCart(productId,products) {
//     console.log(productId);
//     const product = products.find((p) => p.id == productId);
//     const existingItem = cart.find((item) => item.id == productId);
//     if (product.stock == 0) {
//       updateCart();
//       showToast("Désolé, ce produit est en rupture de stock");
//       displayProducts();
//       return;
//     }
//     if (existingItem) {
//       existingItem.quantity++;
//     } else {
//       cart.push({ ...product, quantity: 1 });
//     }
  
//     updateCart();
//   }
// function updateCart() {
//     const cartItems = document.getElementById("cart-items");
//     const cartTotal = document.getElementById("cart-total");
//     let total = 0;
  
//     cartItems.innerHTML = cart
//       .map((item) => {
//         const itemTotal = item.price * item.quantity;
//         total += itemTotal;
//         return `
//                       <div class="cart-item flex justify-between items-center py-4 border-b border-gray-100">
//                           <div class="flex items-center gap-4">
//                               <img src="${item.image}" alt="${
//           item.name
//         }" class="w-16 h-16 object-cover rounded-lg">
//                               <div>
//                                   <h4 class="font-medium">${item.name}</h4>
//                                   <p class="text-gray-600">Quantité: ${
//                                     item.quantity
//                                   }</p>
//                               </div>
//                           </div>
//                           <div class="flex items-center gap-4">
//                               <span class="font-semibold">${itemTotal.toLocaleString(
//                                 "fr-FR",
//                                 { style: "currency", currency: "EUR" }
//                               )}</span>
//                               <button onclick="removeFromCart(${item.id})" 
//                                       class="text-red-500 hover:text-red-700 transition">
//                                   Supprimer
//                               </button>
//                           </div>
//                       </div>
//                   `;
//       })
//       .join("");
  
//     cartTotal.innerHTML = cart.length
//       ? `
//                   <div class="flex justify-between items-center">
//                       <span class="text-xl font-semibold">Total</span>
//                       <span class="text-2xl font-bold text-purple-600">
//                           ${total.toLocaleString("fr-FR", {
//                             style: "currency",
//                             currency: "EUR",
//                           })}
//                       </span>
//                   </div>
//                   <button onclick="checkout()" 
//                           class="btn-gradient w-full mt-6 py-3 rounded-lg text-white font-semibold">
//                       Finaliser l'achat
//                   </button>
//               `
//       : '<p class="text-gray-500 text-center">Votre panier est vide</p>';
//   }
function displayProducts(productsToShow = products ) {
  console.log("chakib is here");
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
                        <button onclick="goToProductPage('${product.id}', '${product.name}', '${product.price}', '${product.stock}', '${product.image}','${product.description}')" 
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

function goToProductPage(id, name, price, stock, image,desc) {
  window.location.href = `http://localhost/TP_Projects/Ecomerce/views/productPage.html?id=${id}&name=${name}&price=${price}&stock=${stock}&image=${image}&desc=${desc}`;
  // ?id=${id}&name=${name}&price=${price}&stock=${stock}&image=${image}
}
window.onload = getUserProducts;