// Sample course data (in real application this would come from backend)
const courses = [
    {
        code: "SWEG432",
        name: "Fundamentals of Programming",
        credit: 3,
        instructor: "Miss Lelise",
        semester: "2025-1",
        status: "active",
        schedule: "Mon & Wed 08:30 - 10:00",
        location: "Hall A-201"
    },
    {
        code: "SWEG652",
        name: "Data Structures & Algorithms",
        credit: 4,
        instructor: "Mr. Fedlu",
        semester: "2025-1",
        status: "active",
        schedule: "Tue & Thu 02:30 - 04:00",
        location: "Lab B-105"
    },
    {
        code: "SWEG511",
        name: "Computer Organization & Architecture",
        credit: 3,
        instructor: "Dr. Elias",
        semester: "2024-2",
        status: "completed",
        schedule: "Mon & Wed 10:30 - 12:00",
        location: "Hall C-302"
    },
    {
        code: "MATH301",
        name: "Discrete Mathematics",
        credit: 3,
        instructor: "Ms. Selam",
        semester: "2024-2",
        status: "completed",
        schedule: "Fri 08:30 - 11:00",
        location: "Hall D-108"
    },
    {
        code: "SWEG710",
        name: "Database Systems",
        credit: 4,
        instructor: "Dr. Lemlem",
        semester: "2025-2",
        status: "upcoming",
        schedule: "To be announced",
        location: "TBA"
    }
];

// DOM elements
const coursesContainer = document.getElementById('coursesContainer');
const noResults = document.getElementById('noResults');
const semesterFilter = document.getElementById('semesterFilter');
const searchInput = document.getElementById('searchInput');

// Render courses
function renderCourses(filteredCourses) {
    coursesContainer.innerHTML = '';

    if (filteredCourses.length === 0) {
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';

    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.innerHTML = `
            <div class="course-header">${course.code} - ${course.name}</div>
            <div class="course-body">
                <div class="course-info">
                    <p><strong>Credit Hours:</strong> ${course.credit}</p>
                    <p><strong>Instructor:</strong> ${course.instructor}</p>
                    <p><strong>Schedule:</strong> ${course.schedule}</p>
                    <p><strong>Location:</strong> ${course.location}</p>
                </div>
                <span class="course-status status-${course.status}">
                    ${course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                </span>
            </div>
        `;
        coursesContainer.appendChild(card);
    });
}

// Filter function
function filterCourses() {
    const semester = semesterFilter.value;
    const searchTerm = searchInput.value.toLowerCase().trim();

    let filtered = courses;

    // Semester filter
    if (semester) {
        filtered = filtered.filter(c => c.semester === semester);
    }

    // Search filter
    if (searchTerm) {
        filtered = filtered.filter(c => 
            c.name.toLowerCase().includes(searchTerm) ||
            c.code.toLowerCase().includes(searchTerm) ||
            c.instructor.toLowerCase().includes(searchTerm)
        );
    }

    renderCourses(filtered);
}

// Event listeners
semesterFilter.addEventListener('change', filterCourses);
searchInput.addEventListener('input', filterCourses);

// Initial render
renderCourses(courses);