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
    const commandResponse = await fetch('http://localhost/TP_Projects/Ecomerce/routes/getAllCommands.php',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const CommandResult = await commandResponse.json();
    console.log(CommandResult);
    const commands = document.getElementById('commands');
    commands.textContent = CommandResult.length;
    let revenue = 0
    CommandResult.map(command => {
        const status = command.status;
        if(status == 'accepted')
            {
                revenue += command.total;
            } 
    })
    revenue = Number(revenue.toFixed(2));
    const revenueElement = document.getElementById('revenue');
    revenueElement.textContent = revenue + '€';

}
window.onload = getData;