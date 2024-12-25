const handleModifyProduct = async(event) => {
    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const description = document.getElementById('product-description').value;
    const image = document.getElementById('product-image-url').value;
    const stock = parseInt(document.getElementById('product-stock').value);
    const id = parseInt(urlParams.get('id'));
    const data = { name, price, description, image, stock, id };


    const response = await fetch('http://localhost/TP_Projects/Ecomerce/routes/modifyProduct.php', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, price, description, image, stock, id })
    });
    const result = await response.json();
    if(result.status == "Updated") {
        // const updaetProducts = await fetch('http://localhost/TP_Projects/Ecomerce/routes/products.php',{
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     }
        // })
        // const responseUpdate = await updaetProducts.json();
        // localStorage.setItem('products', JSON.stringify(responseUpdate));
        // console.log(JSON.parse(localStorage.getItem('products')));
        showToast('Product modified successfully');
        setTimeout(() => {
            window.location.href = 'http://localhost/TP_Projects/Ecomerce/views/sellerProducts.html';
        }, 1500);
    } else {
        showToast(result.error);
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