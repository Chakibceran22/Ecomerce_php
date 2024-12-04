const handSignUpRequest = async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const type = document.getElementById('user-type').value;
    const data = {
        username,
        password,
        type
    }
    try{
        const response = await fetch('/TP_Projects/Ecomerce/routes/signup.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const result = await response.json();
        
        
        if(result.status == 'Created'){
            alert(result.message);
            
            window.location.href = '/TP_Projects/Ecomerce/views/loginPage.html';
        }
        else{
            alert(result.error)
        }
    }catch(err){
        console.log(err);
        console.log("error here")
    }

}