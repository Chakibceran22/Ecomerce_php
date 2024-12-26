let commands = [];
const getUserData = async() => {
    const response = await fetch('http://localhost/TP_Projects/Ecomerce/routes/gettingUserInfo.php',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const result = await response.json();


    if(result.status === 'success'){
        document.getElementById('user-name').textContent = result.user.username;
        document.getElementById('user-email').textContent = result.user.type;
    }
    
    const commandsResponse = await fetch('http://localhost/TP_Projects/Ecomerce/routes/getUserCommand.php',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const resultCommand = await commandsResponse.json();
    
    commands = resultCommand.commands
    console.log(commands);
    displayCommands();
}
const displayCommands = async () => {
    const tableBody = document.getElementById('table-body');
    commands.map(command => {
        const status = command.status;
        let buttonExist = ``
        // Determine the class based on the status
        let statusClass = '';
        if (status === 'pending') {
            statusClass = 'bg-yellow-100 text-yellow-800';
           
        } else if (status === 'accepted') {
            statusClass = 'bg-green-100 text-green-800';
        } else if (status === 'refused') {
            statusClass = 'bg-red-100 text-red-800';
        }
        const escapedProductIds = command.products_ids.replace(/"/g, '&quot;');

        // Add the table row with the correct status class
        tableBody.innerHTML += `
        <tr class="border-b hover:bg-gray-50">
            <td class="p-3">#${command.id}</td>
            <td class="p-3">${command.user_id}</td>
            <td class="p-3">${command.date}</td>
            <td class="p-3">
                <span class="px-2 py-1 ${statusClass} rounded-full">
                    ${status === 'pending' ? 'En attente' : status === 'accepted' ? 'Accepté' : 'Refusé'}
                </span>
            </td>
            <td class="p-3 text-right">${command.total}</td>
            <td class="p-3">
                <div class="flex justify-center space-x-2">
                    ${buttonExist}
                    <button class="px-3 py-1 border-2 border-purple-500 text-purple-600 font-bold rounded-lg hover:bg-purple-50 transition" 
                            onclick="goToCommandDetails(${command.id}, '${escapedProductIds}')">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </td>
        </tr>
        `;
    });
};
function goToCommandDetails(id,prodcuts) {
    const productIds = JSON.parse(prodcuts);
    localStorage.setItem('user_command_details', JSON.stringify(productIds));
    window.location.href = `http://localhost/TP_Projects/Ecomerce/views/commandDetail.html?id=${id}`;
    
}





window.onload = getUserData;