const handSignUpRequest = async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const data = {
        username,
        password,
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
            showToast(result.message);
            
            setTimeout(() => {window.location.href = '/TP_Projects/Ecomerce/views/loginPage.html';}, 1500);
        }
        else{
            showToast(result.error);
        }
    }catch(err){
        console.log(err);
        console.log("error here")
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