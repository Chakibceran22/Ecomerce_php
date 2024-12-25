const getData = async() => {
    const response = await fetch('http://localhost/TP_Projects/Ecomerce/routes/products.php',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const result = await response.json();
    const products = result;
    const productNumber = document.getElementById('product-number');
    productNumber.textContent = products.length;

}
window.onload = getData;