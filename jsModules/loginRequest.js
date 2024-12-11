const handleLoginRequest = async(event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const data = {
        username,
        password
    }
    try{
        console.log(data);
        const response = await fetch('http://localhost/TP_Projects/Ecomerce/routes/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const result = await response.json();
        console.log(result.usertype);
        if(result.status == 'success'){
            alert(result.success);
            if(result.usertype == 'seller')
            {
                window.location.href = '/TP_Projects/Ecomerce/views/sellerDashbord.html';
                return;
            }
            if(result.usertype == 'buyer')
            {
                window.location.href = '/TP_Projects/Ecomerce/views/userDahsbord.html';
                return;
            }
            // window.location.href = '/TP_Projects/Ecomerce/views/mainPage.html';
        }
        else{
            alert(result.error);
        }
    }catch(err){
        console.log('error here');
        console.log(err);
    }
}