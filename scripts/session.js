function loadUserData() {
    const userJson = localStorage.getItem('currentUser');

    // Redirect if no user is logged in (Simple Security)
    if (!userJson) {
        // Only redirect if valid session is required. 
        // For pages like login/about/home, this might not be needed, but this script 
        // should likely only be included in dashboard pages.
        // We'll assume this script is loaded on protected pages.

        // Check if we are in a protected page (e.g., studentPages or instructurePages)
        if (window.location.href.includes('studentPages') || window.location.href.includes('instructurePages')) {
            alert("Please login first.");
            // Determine path back to login relative to current location
            // Simple assumption: Go back to root login.html
            window.location.href = '../login.html';
            // Note: Adjust path if depending on where the user is.
        }
        return;
    }

    const user = JSON.parse(userJson);

    // Update DOM elements
    // Common elements
    const nameElements = document.querySelectorAll('.user-name, #welcome-name');
    nameElements.forEach(el => el.textContent = user.name);

    const idElements = document.querySelectorAll('.user-id, .id-display');
    idElements.forEach(el => el.textContent = user.id); // e.g., "ID: ETS..."

    const deptElements = document.querySelectorAll('.user-dept, .dept-display');
    deptElements.forEach(el => el.textContent = user.department);

    const emailElements = document.querySelectorAll('.user-email');
    emailElements.forEach(el => el.textContent = user.email);

    // Specific to welcome header in dashboards
    // "WELCOME BACK, <Name>" logic
    // We can assume the HTML has specific IDs or classes we agreed on.

    // Example: Welcome Headers
    const welcomeHeaderName = document.querySelector('.welcome-text h1');
    if (welcomeHeaderName) {
        // Keep "WELCOME BACK," and replace name
        welcomeHeaderName.innerHTML = `WELCOME BACK,<br>${user.name.split(' ')[0]}`; // First name only for big header
    }

    const welcomeDetails = document.querySelector('.welcome-text p:first-of-type'); // ID
    if (welcomeDetails) welcomeDetails.textContent = `ID: ${user.id}`;

    const welcomeDept = document.querySelector('.welcome-text p:nth-of-type(2)'); // Dept
    if (welcomeDept) welcomeDept.textContent = `DEPARTMENT: ${user.department}`;

    // Profile Page Specifics (Inputs/Displays)
    const profileName = document.querySelector('.profile-info h2');
    if (profileName) profileName.textContent = user.name;

    // Profile Card Info
    // This is a bit specific to structure. We might need to target specific items better in HTML update.
    // For now, let's assume we update the specific HTML structure found in profile.html.

    // Sidebar/Nav "Active" User logic could go here too if needed.
}

document.addEventListener('DOMContentLoaded', loadUserData);
