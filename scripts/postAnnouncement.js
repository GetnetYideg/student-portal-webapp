document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.querySelector('.create-btn');
    const textarea = document.getElementById('newAnounce');
    const announcementsGrid = document.querySelector('.announcements-grid');

    if (addButton && textarea && announcementsGrid) {
        addButton.addEventListener('click', () => {
            const content = textarea.value.trim();
            if (!content) {
                alert("Please write something to announce.");
                return;
            }

            let publisherName = "Me (Instructor)";
            const userJson = localStorage.getItem('currentUser');
            if (userJson) {
                const user = JSON.parse(userJson);
                publisherName = user.name + (user.role === 'instructor' ? '' : ''); // Add title if needed
            }

            const now = new Date();
            const dateStr = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
            const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

            const newCard = document.createElement('div');
            newCard.className = 'announcement-card';

            const lines = content.split('\n');
            let title = "Recent Update";
            let body = content;

            if (lines.length > 1) {
                title = lines[0];
                body = lines.slice(1).join('<br>');
            } else if (content.length > 30) {
                title = "Announcement";
            } else {
                title = content;
            }

            newCard.innerHTML = `
                <div class="card-header">${title}</div>
                <div class="card-content">
                    <div class="card-body">
                        <p>${body}</p>
                        <button class="read-more">&gt;</button>
                    </div>
                    <div class="card-meta">
                        Published By: ${publisherName}<br>
                        Date: ${dateStr}<br>
                        Time: ${timeStr}
                    </div>
                </div>
            `;
            announcementsGrid.prepend(newCard);

            textarea.value = '';
        });
    }
});
