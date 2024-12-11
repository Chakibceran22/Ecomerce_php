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
    console.log(JSON.stringify(data));


    const response = await fetch('http://localhost/TP_Projects/Ecomerce/routes/modifyProduct.php', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, price, description, image, stock, id })
    });
    const result = await response.json();
    console.log(result);
}