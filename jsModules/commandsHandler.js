let commands = [];
const getAllCommands = async() => {
    const response = await fetch('http://localhost/TP_Projects/Ecomerce/routes/getAllCommands.php',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const result = await response.json();
    commands = result;
    console.log(commands);
    displayCommands();
}
window.onload = getAllCommands;


const displayCommands = async () => {
    const tableBody = document.getElementById('table-body');
    commands.map(command => {
        const status = command.status;

        // Determine the class based on the status
        let statusClass = '';
        if (status === 'pending') {
            statusClass = 'bg-yellow-100 text-yellow-800';
        } else if (status === 'accepted') {
            statusClass = 'bg-green-100 text-green-800';
        } else if (status === 'rejected') {
            statusClass = 'bg-red-100 text-red-800';
        }

        // Add the table row with the correct status class
        tableBody.innerHTML += `
        <tr class="border-b hover:bg-gray-50">
            <td class="p-3">${command.id}</td>
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
                    <button class="px-3 py-1 btn-gradient text-white font-bold rounded-lg hover:opacity-90 transition">
                        Accepter
                    </button>
                    <button class="px-3 py-1 border-2 border-purple-500 text-purple-600 font-bold rounded-lg hover:bg-purple-50 transition">
                        Refuser
                    </button>
                    <button class="px-3 py-1 border-2 border-purple-500 text-purple-600 font-bold rounded-lg hover:bg-purple-50 transition">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </td>
        </tr>
        `;
    });
};


