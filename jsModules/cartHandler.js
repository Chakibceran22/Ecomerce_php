let cart = []

const getItems = async() => {
    const response = await fetch('http://localhost/TP_Projects/Ecomerce/routes/getCartItems.php', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const result = await response.json();
    console.log(result);
    cart = result;
    updateCart();
}
window.onload = getItems;

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    let total = 0;
  
    cartItems.innerHTML = cart
      .map((item) => {
        const itemTotal = item.price * item.qnt;
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
                                    item.qnt
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
//this is to get the cart items fromm the data base
// SELECT products.name, products.image,products.description,products.price,products.stock
// FROM users
// JOIN cart ON users.username = cart.user_id
// JOIN products ON cart.proudct_id = products.id
// WHERE users.username = 'chakib';