const handleLoginRequest = async(event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const data = {
        username,
        password
    }
    try{
        const response = await fetch('routes/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const result = await response.json();
        if(result.status == 'success'){
            alert(result.success);
            window.location.href = '/TP_Projects/Ecomerce/mainPage.html';
        }
        else{
            alert(result.error);
        }
    }catch(err){
        console.log(err);
    }
}