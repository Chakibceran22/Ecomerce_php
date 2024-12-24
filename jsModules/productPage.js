const getProductInfo = () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id"); // '123'
    const name = params.get("name"); // 'ProductName'
    const price = params.get("price"); // '50'
    const stock = params.get("stock"); // '10'
    const image = params.get("image"); // 'someimage.jpg'
    const desc = params.get("desc"); // 'some description
    
    const productName = document.getElementById("product-name");
    const productPrice = document.getElementById("product-price");
    const productStock = document.getElementById("product-stock");
    const productImage = document.getElementById("product-image");
    const productDesc = document.getElementById("product-desc");

    productName.textContent = name;
    productPrice.textContent = price;
    productStock.textContent = stock;
    productImage.src = image;
    productDesc.textContent = desc;
    for (let i = 1 ;i <= stock; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        document.getElementById("quantity").appendChild(option);
    }
}
const addProductToCart = async () => {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));
    const quantity =  parseInt(document.getElementById("quantity").value);
    
    const data = {
        id,
        quantity
    }
    const response = await fetch(`http://localhost/TP_Projects/Ecomerce/routes/addToCart.php`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ data})
    });
    const result = await response.json();
    console.log(result);

    if(result.status == "Success"){
      showToast("Product Added To cart")

    }
  
  }

window.onload = getProductInfo;
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.className =
    "toast fixed bottom-8 right-8 bg-white rounded-lg shadow-lg px-6 py-4 border-l-4 border-purple-500";
  toast.textContent = message;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 1000);
}