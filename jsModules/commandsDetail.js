let products = []
let qunt = []
const getCommandDetails = async() => {
    const params = new URLSearchParams(window.location.search);
    const idCommand = params.get('id');
    const productsIds = JSON.parse(localStorage.getItem('user_command_details'))
    const productKeys = Object.keys(productsIds).map(key => parseInt(key))
    const response = await fetch('http://localhost/TP_Projects/Ecomerce/routes/getSelectedProducts.php',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ids :productKeys, id: idCommand})
    })
    const result = await response.json();
    if(result.status === 'success'){
      products = result.products;
      console.log(products);
      qunt = result.products_ids.products_ids;
      qunt = JSON.parse(qunt);
      qunt = Object.values(qunt);
      
      displayProducts();
    }
    else{
      alert(result.error)
    }
}
function displayProducts(productsToShow = products) {
    const grid = document.getElementById("products-grid");
    grid.innerHTML = "";
    if(productsToShow.length === 0){
      grid.innerHTML = `<div class="text-center text-xl text-gray-500">No products found</div>`;
    }
  
    productsToShow.forEach((product, index) => {
  
      const card = document.createElement("div");
      card.className ="product-card bg-white rounded-xl shadow-md overflow-hidden";
      card.style.animationDelay = `${index * 100}ms`;
      card.innerHTML = `
                      <div class="relative">
                          <img src="${product.image}" alt="${product.name}" class="w-full h-96 object-cover">
                          
                      </div>
                      <div class="p-6">
                          <h3 class="text-xl font-semibold mb-2">${product.name}</h3>
                          <div class="flex justify-between items-center mb-4">
                              <span class="text-2xl font-bold text-purple-600">${
                                product.price
                              }&euro;</span>
                              <span class="text-sm text-gray-500">Quantity: ${
                                qunt[index]
                              }</span>
                          </div>
                          
                      </div>
                  `;
      grid.appendChild(card);
    });
  }

  window.onload = getCommandDetails;