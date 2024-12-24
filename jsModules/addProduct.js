const handleAddProduct = async (event) => {
    event.preventDefault();
    const name = document.getElementById('product-name').value;
    const price = parseFloat( document.getElementById('product-price').value);
    const description = document.getElementById('product-description').value;
    const image = document.getElementById('product-image-url').value;
    const stock = parseInt(document.getElementById('product-stock').value);

    const data = {
        name,
        price,
        image,
        description,
        stock 
    }

    const  response = await fetch('http://localhost/TP_Projects/Ecomerce/routes/addProduct.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    if(result.status == 'Created') {
        showToast('Product added successfully');
    } else {
        showToast(result.error)
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



