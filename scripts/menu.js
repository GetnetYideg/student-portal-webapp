document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('nav ul');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent click from bubbling to document
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });

        // Handle dropdowns on mobile (touch) if needed
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                   // Let default link behavior happen if it's a link, 
                   // but maybe toggle a class for submenu if we wanted accurate sub-menus.
                   // For this simple implementation, hover might be tricky on touch, 
                   // but usually clicking the parent works if it's just :hover.
                   // If :hover in CSS, it might stick. 
                   // Let's assume CSS :hover works "okay" for now, or users tap twice.
                }
            });
        });
    }
});
