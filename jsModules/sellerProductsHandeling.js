const getProducts = async () => {

    const data = {
        username : "chakib@gmail.com"
    }
    const response = await fetch('http://localhost/TP_Projects/Ecomerce/routes/getSellersProducts.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    console.log(result);
    
    if(result.status == 'success'){
        const products = result.products;
        products.forEach(product => {
            console.log(product);
            const card = document.createElement("div");
            card.className = "product-card bg-white rounded-xl shadow-md overflow-hidden";
            card.innerHTML =  `
                <div class="relative">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-80 object-cover">
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-semibold mb-2">${product.name}</h3>
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-2xl font-bold text-purple-600">${product.price}&euro;</span>
                        <span class="text-sm text-gray-500">Stock: ${product.stock}</span>
                    </div>
                    <button class="btn-gradient w-full py-3 px-4 rounded-lg text-white font-semibold" data-product-id="${product.id}">
                        Modifier le produit
                    </button>
                </div>
            `;
            
            // Append the card to the grid
            document.getElementById("products-grid").appendChild(card);
            
            // Get the button and add an event listener
            const button = card.querySelector("button");
            button.addEventListener("click", function() {
                const productId = button.getAttribute("data-product-id");
                // Redirect to modifyProduct.html with the product ID in the URL
                window.location.href = `modifyProduct.html?id=${productId}`;
            });
        });
    }
    
    
}
window.onload = getProducts;