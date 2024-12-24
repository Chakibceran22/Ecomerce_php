window.onload = async() => {
    const response = await fetch('http://localhost/TP_Projects/Ecomerce/routes/login.php', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify()
    });
    const  result = await response.json();
    if( result.status == 'success'){
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
    }
}



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
        console.log(result.status);
        console.log(result);
        if(result.status == 'success'){
             showToast('Login Success');
            if(result.usertype == 'admin')
            {
                setTimeout(() => {window.location.href = '/TP_Projects/Ecomerce/views/sellerDashbord.html';}, 1500);
                return;
            }
            if(result.usertype == 'buyer')
            {
                setTimeout(() => {window.location.href = '/TP_Projects/Ecomerce/views/userDahsbord.html';}, 1500);
                return;
            }
            // window.location.href = '/TP_Projects/Ecomerce/views/mainPage.html';
        }
        else{
            showToast(result.error)
        }
    }catch(err){
        console.log('error here');
        console.log(err);
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