function loadUserData() {
    const userJson = localStorage.getItem('currentUser');
    if (!userJson) {
        if (window.location.href.includes('studentPages') || window.location.href.includes('instructurePages')) {
            alert("Please login first.");
            window.location.href = '../login.html';
        }
        return;
    }

    const user = JSON.parse(userJson);

    const nameElements = document.querySelectorAll('.user-name, #welcome-name');
    nameElements.forEach(el => el.textContent = user.name);

    const idElements = document.querySelectorAll('.user-id, .id-display');
    idElements.forEach(el => el.textContent = user.id);

    const deptElements = document.querySelectorAll('.user-dept, .dept-display');
    deptElements.forEach(el => el.textContent = user.department);

    const emailElements = document.querySelectorAll('.user-email');
    emailElements.forEach(el => el.textContent = user.email);

    const welcomeHeaderName = document.querySelector('.welcome-text h1');
    if (welcomeHeaderName) {
        welcomeHeaderName.innerHTML = `WELCOME BACK,<br>${user.name.split(' ')[0]}`;
    }

    const welcomeDetails = document.querySelector('.welcome-text p:first-of-type');
    if (welcomeDetails) welcomeDetails.textContent = `ID: ${user.id}`;

    const welcomeDept = document.querySelector('.welcome-text p:nth-of-type(2)');
    if (welcomeDept) welcomeDept.textContent = `DEPARTMENT: ${user.department}`;

    const profileName = document.querySelector('.profile-info h2');
    if (profileName) profileName.textContent = user.name;
}

document.addEventListener('DOMContentLoaded', loadUserData);
