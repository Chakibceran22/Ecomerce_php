        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('main-content');
        const sidebarToggle = document.getElementById('sidebarToggle');
        const revealSidebar = document.getElementById('reveal-sidebar');

        // yaw this is to  hide sidebar
        sidebarToggle.addEventListener('click', () => {
            sidebar.style.transform = 'translateX(-100%)';
            mainContent.classList.remove('ml-64');
            mainContent.classList.add('ml-0');
            revealSidebar.style.display = 'block';
        });

        // get it back easy you can remeber it 
        revealSidebar.addEventListener('click', () => {
            sidebar.style.transform = 'translateX(0)';
            mainContent.classList.add('ml-64');
            mainContent.classList.remove('ml-0');
            revealSidebar.style.display = 'none';
        });

        