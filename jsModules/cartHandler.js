let cart = []

const getItems = async() => {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
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
                    <div class="cart-item flex justify-between items-center py-4 border-b border-gray-100" id="item-${item.id}">
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
                <button onclick="createCommand(${total})" 
                        class="btn-gradient w-full mt-6 py-3 rounded-lg text-white font-semibold">
                    Finaliser l'achat
                </button>
            `
    : '<p class="text-gray-500 text-center">Votre panier est vide</p>';
}
async function removeFromCart(id) {
    const userChoice = confirm("Voulez-vous vraiment supprimer cet article?");
    if(userChoice){
        const response = await fetch('/TP_Projects/Ecomerce/routes/deleteProductFromCart.php',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id})
        })
        const result = await response.json();
        console.log(result);
        if(result.status == 'Deleted'){
            showToast("Article supprimé");
            const updateCart = await fetch('http://localhost/TP_Projects/Ecomerce/routes/getUsersCart.php',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
        
            })
            const result = await updateCart.json();
            localStorage.setItem('cart', JSON.stringify(result.cart));
            setTimeout(() => {
              window.location.reload();
            }, 1500);
        }
        else{
            showToast(result.error);
        }
    }
    else{
      showToast("Opération annulée");
    }
  
  
}
async function createCommand(total){
      const userChoice = confirm("Voulez-vous vraiment finaliser votre achat?");
      if(userChoice)
      {
        
        
        const response = await fetch('http://localhost/TP_Projects/Ecomerce/routes/setCommands.php',{
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({total: total})
        })
        const result = await response.json();
        if(result.status == 'success'){
          showToast(result.message);
        }
        else{
          showToast(result.error);
        }
        

      }
      else{
        showToast("Opération annulée");
      }

}
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.className =
    "toast fixed bottom-8 right-8 bg-white rounded-lg shadow-lg px-6 py-4 border-l-4 border-purple-500";
  toast.textContent = message;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 1500);
}
//this is to get the cart items fromm the data base
// SELECT products.name, products.image,products.description,products.price,products.stock
// FROM users
// JOIN cart ON users.username = cart.user_id
// JOIN products ON cart.proudct_id = products.id
// WHERE users.username = 'chakib';