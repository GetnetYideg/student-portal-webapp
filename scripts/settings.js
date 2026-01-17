const changeUsernameBtn = document.getElementById('changeUsernameBtn');
const changePasswordBtn = document.getElementById('changePasswordBtn');

const usernameModal = document.getElementById('usernameModal');
const passwordModal = document.getElementById('passwordModal');

const closeButtons = document.querySelectorAll('.close-modal');

const currentUsernameEl = document.querySelector('.username-display.user-name'); // Specific class added in session.js integration

function openModal(modal) {
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

function closeModal(modal) {
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);
}

closeButtons.forEach(btn => {
    btn.onclick = () => closeModal(btn.closest('.modal'));
});

window.onclick = e => {
    if (e.target.classList.contains('modal') && e.target.style.display === 'flex') {
        closeModal(e.target);
    }
};

changeUsernameBtn?.addEventListener('click', () => {
    openModal(usernameModal);

    const form = usernameModal.querySelector('form');
    const newUsernameInput = form.querySelector('#newUsername');
    const currentPassInput = form.querySelector('#currentPassForUsername');
    const errorEl = form.querySelector('.error-message');

    form.onsubmit = e => {
        e.preventDefault();

        const newUsername = newUsernameInput.value.trim();
        const currentPass = currentPassInput.value.trim();
        const userJson = localStorage.getItem('currentUser');

        if (!userJson) {
            errorEl.textContent = "Session invalid. Please login again.";
            return;
        }

        const currentUser = JSON.parse(userJson);

        if (!newUsername) {
            errorEl.textContent = "Please enter a new username";
            return;
        }
        if (newUsername.length < 4) {
            errorEl.textContent = "Username must be at least 4 characters";
            return;
        }
        if (!currentPass) {
            errorEl.textContent = "Please enter your current password";
            return;
        }
        if (currentUser.password !== currentPass) {
            errorEl.textContent = "Incorrect password";
            return;
        }
        currentUser.name = newUsername;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        if (typeof loadUserData === 'function') {
            loadUserData();
        } else {
            const nameElements = document.querySelectorAll('.user-name, #welcome-name');
            nameElements.forEach(el => el.textContent = newUsername);
        }

        errorEl.textContent = "";
        alert("Username updated successfully!");
        closeModal(usernameModal);
        form.reset();
    };
});


changePasswordBtn?.addEventListener('click', () => {
    openModal(passwordModal);

    const form = passwordModal.querySelector('form');
    const currentPass = form.querySelector('#currentPassword');
    const newPass = form.querySelector('#newPassword');
    const confirmPass = form.querySelector('#confirmPassword');
    const errorEl = form.querySelector('.error-message');

    const toggleIcons = form.querySelectorAll('.toggle-password');
    toggleIcons.forEach(icon => {
        icon.onclick = () => {
            const input = icon.previousElementSibling;
            const type = input.type === 'password' ? 'text' : 'password';
            input.type = type;
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        };
    });

    form.onsubmit = e => {
        e.preventDefault();

        const userJson = localStorage.getItem('currentUser');
        if (!userJson) {
            errorEl.textContent = "Session invalid. Please login again.";
            return;
        }

        const currentUser = JSON.parse(userJson);

        if (!currentPass.value) {
            errorEl.textContent = "Please enter your current password";
            return;
        }
        if (currentUser.password !== currentPass.value) {
            errorEl.textContent = "Incorrect current password";
            return;
        }

        if (!newPass.value || newPass.value.length < 8) {
            errorEl.textContent = "New password must be at least 8 characters";
            return;
        }
        if (newPass.value !== confirmPass.value) {
            errorEl.textContent = "Passwords do not match";
            return;
        }

        currentUser.password = newPass.value;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        errorEl.textContent = "";
        alert("Password changed successfully!");
        closeModal(passwordModal);
        form.reset();
    };
});

