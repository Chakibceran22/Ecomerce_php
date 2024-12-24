let cart = []
const getUserProducts = async() => {
    const response = await fetch('http://localhost/TP_Projects/Ecomerce/routes/getUserProducts.php',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const result = await response.json();
    if(result.status == "success"){
        const products = result.products;
        const length = products.length;
        console.log(result.user)
        for(let i =0 ; i<length;i++){
            addToCart(products[i].id,products);
            
    }
    updateCart();

}

function addToCart(productId,products) {
    console.log(productId);
    const product = products.find((p) => p.id == productId);
    const existingItem = cart.find((item) => item.id == productId);
    if (product.stock == 0) {
      updateCart();
      showToast("Désolé, ce produit est en rupture de stock");
      displayProducts();
      return;
    }
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
  
    updateCart();
  }
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    let total = 0;
  
    cartItems.innerHTML = cart
      .map((item) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        return `
                      <div class="cart-item flex justify-between items-center py-4 border-b border-gray-100">
                          <div class="flex items-center gap-4">
                              <img src="${item.image}" alt="${
          item.name
        }" class="w-16 h-16 object-cover rounded-lg">
                              <div>
                                  <h4 class="font-medium">${item.name}</h4>
                                  <p class="text-gray-600">Quantité: ${
                                    item.quantity
                                  }</p>
                              </div>
                          </div>
                          <div class="flex items-center gap-4">
                              <span class="font-semibold">${itemTotal.toLocaleString(
                                "fr-FR",
                                { style: "currency", currency: "EUR" }
                              )}</span>
                              <button onclick="removeFromCart(${item.id})" 
                                      class="text-red-500 hover:text-red-700 transition">
                                  Supprimer
                              </button>
                          </div>
                      </div>
                  `;
      })
      .join("");
  
    cartTotal.innerHTML = cart.length
      ? `
                  <div class="flex justify-between items-center">
                      <span class="text-xl font-semibold">Total</span>
                      <span class="text-2xl font-bold text-purple-600">
                          ${total.toLocaleString("fr-FR", {
                            style: "currency",
                            currency: "EUR",
                          })}
                      </span>
                  </div>
                  <button onclick="checkout()" 
                          class="btn-gradient w-full mt-6 py-3 rounded-lg text-white font-semibold">
                      Finaliser l'achat
                  </button>
              `
      : '<p class="text-gray-500 text-center">Votre panier est vide</p>';
  }
}
window.onload = getUserProducts;