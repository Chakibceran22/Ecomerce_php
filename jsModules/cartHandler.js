let cart = []

const getItems = async() => {
    const response = await fetch('http://localhost/TP_Projects/Ecomerce/routes/getCartItems.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const result = await response.json();
}
//this is to get the cart items fromm the data base
// SELECT products.name, products.image,products.description,products.price,products.stock
// FROM users
// JOIN cart ON users.username = cart.user_id
// JOIN products ON cart.proudct_id = products.id
// WHERE users.username = 'chakib';