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

            // Get current user info or default
            let publisherName = "Me (Instructor)";
            const userJson = localStorage.getItem('currentUser');
            if (userJson) {
                const user = JSON.parse(userJson);
                publisherName = user.name + (user.role === 'instructor' ? '' : ''); // Add title if needed
            }

            // Create Date String
            const now = new Date();
            const dateStr = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
            const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

            // Create Announcement HTML Structure
            const newCard = document.createElement('div');
            newCard.className = 'announcement-card';

            // For simplicity, we can use a generic title or ask for one. 
            // The current UI only has a textarea. Let's assume the first few words are the title 
            // or just use a generic "New Announcement".
            // Let's split by newline to see if user put a title.

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

            // Prepend or Append? User asked "appear below". 
            // Usually "below" means appended to the list, or "below the input box" which is the top of the list.
            // "appear below" in context of "after i click add... appear below" likely means appear in the list below the input area.
            // Standard feed behavior is newest on top. I will prepend it to the key container so it's immediately below the input area.
            announcementsGrid.prepend(newCard);

            // Clear input
            textarea.value = '';
        });
    }
});
