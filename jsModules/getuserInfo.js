const getUserData = async() => {
    const response = await fetch('http://localhost/TP_Projects/Ecomerce/routes/gettingUserInfo.php',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const result = await response.json();
    console.log(result);

    if(result.status === 'success'){
        console.log(result.user.username);
        console.log(result.user.type);
        document.getElementById('user-name').textContent = result.user.username;
        document.getElementById('user-email').textContent = result.user.type;
    }
}


window.onload = getUserData;