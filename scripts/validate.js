// Mock Data
const students = [
    { name: "Abebe Kebede", id: "ETS001/16", password: "password123", email: "abebe.kebede@aastu.edu.et", department: "Software Engineering", role: "student" },
    { name: "Kebede Balcha", id: "ETS002/16", password: "password123", email: "kebede.balcha@aastu.edu.et", department: "Electrical Engineering", role: "student" },
    { name: "Chaltu Tadesse", id: "ETS003/16", password: "password123", email: "chaltu.tadesse@aastu.edu.et", department: "Mechanical Engineering", role: "student" },
    { name: "Dawit Alemu", id: "ETS004/16", password: "password123", email: "dawit.alemu@aastu.edu.et", department: "Civil Engineering", role: "student" },
    { name: "Elias Girma", id: "ETS005/16", password: "password123", email: "elias.girma@aastu.edu.et", department: "Software Engineering", role: "student" },
    { name: "Fikre Teferra", id: "ETS006/16", password: "password123", email: "fikre.teferra@aastu.edu.et", department: "Chemical Engineering", role: "student" },
    { name: "Genet Bekele", id: "ETS007/16", password: "password123", email: "genet.bekele@aastu.edu.et", department: "Biomedical Engineering", role: "student" },
    { name: "Hana Mekonnen", id: "ETS008/16", password: "password123", email: "hana.mekonnen@aastu.edu.et", department: "Architecture", role: "student" },
    { name: "Ibsa Negash", id: "ETS009/16", password: "password123", email: "ibsa.negash@aastu.edu.et", department: "Electrical Engineering", role: "student" },
    { name: "Jemal Hussein", id: "ETS010/16", password: "password123", email: "jemal.hussein@aastu.edu.et", department: "Software Engineering", role: "student" },
    { name: "Kalkidan Yilma", id: "ETS011/16", password: "password123", email: "kalkidan.yilma@aastu.edu.et", department: "Civil Engineering", role: "student" },
    { name: "Lemma Desta", id: "ETS012/16", password: "password123", email: "lemma.desta@aastu.edu.et", department: "Mechanical Engineering", role: "student" },
    { name: "Meron Tesfaye", id: "ETS013/16", password: "password123", email: "meron.tesfaye@aastu.edu.et", department: "Software Engineering", role: "student" },
    { name: "Nahom Hagos", id: "ETS014/16", password: "password123", email: "nahom.hagos@aastu.edu.et", department: "Electrical Engineering", role: "student" },
    { name: "Oumer Ali", id: "ETS015/16", password: "password123", email: "oumer.ali@aastu.edu.et", department: "Chemical Engineering", role: "student" },
    { name: "Paulos Yohannes", id: "ETS016/16", password: "password123", email: "paulos.yohannes@aastu.edu.et", department: "Biomedical Engineering", role: "student" },
    { name: "Rahel Solomon", id: "ETS017/16", password: "password123", email: "rahel.solomon@aastu.edu.et", department: "Architecture", role: "student" },
    { name: "Samuel Tilahun", id: "ETS018/16", password: "password123", email: "samuel.tilahun@aastu.edu.et", department: "Software Engineering", role: "student" },
    { name: "Tigist Assefa", id: "ETS019/16", password: "password123", email: "tigist.assefa@aastu.edu.et", department: "Civil Engineering", role: "student" },
    { name: "Yared Mulugeta", id: "ETS020/16", password: "password123", email: "yared.mulugeta@aastu.edu.et", department: "Mechanical Engineering", role: "student" }
];

const instructors = [
    { name: "Dr. Kebede Gessesse", id: "EDI001/00", password: "password123", email: "kebede.gessesse@aastu.edu.et", department: "Software Engineering", role: "instructor" },
    { name: "Prof. Almaz Ayana", id: "EDI002/00", password: "password123", email: "almaz.ayana@aastu.edu.et", department: "Electrical Engineering", role: "instructor" },
    { name: "Mr. Teshome Gemechu", id: "EDI003/00", password: "password123", email: "teshome.gemechu@aastu.edu.et", department: "Mechanical Engineering", role: "instructor" },
    { name: "Ms. Roman Worku", id: "EDI004/00", password: "password123", email: "roman.worku@aastu.edu.et", department: "Civil Engineering", role: "instructor" },
    { name: "Dr. Solomon Demeke", id: "EDI005/00", password: "password123", email: "solomon.demeke@aastu.edu.et", department: "Chemical Engineering", role: "instructor" }
];

// Validation Function
function validateLogin(usernameOrEmail, id, password, role) {
    const database = role === 'student' ? students : instructors;

    // Simplification logic (checking both username/email field against name or email)
    // In a real app, strict field matching is better. 
    // Here we check if the input matches either Name or Email, AND ID matches, AND Password matches.

    return database.find(user =>
        (user.email.toLowerCase() === usernameOrEmail.toLowerCase() || user.name.toLowerCase() === usernameOrEmail.toLowerCase()) &&
        user.id.toUpperCase() === id.toUpperCase() &&
        user.password === password
    );
}

// Handle Login Submission
function handleLogin(event, role) {
    event.preventDefault();

    const usernameInput = document.querySelector('input[type="text"][placeholder="User name or Email"]');
    const idInput = document.querySelector('input[type="text"][placeholder="Id number"]');
    const passwordInput = document.getElementById('password');
    const errorMsg = document.querySelector('.error-message');

    if (!usernameInput || !idInput || !passwordInput) {
        console.error("Form inputs not found!");
        return;
    }

    const username = usernameInput.value.trim();
    const id = idInput.value.trim();
    const password = passwordInput.value;

    const user = validateLogin(username, id, password, role);

    if (user) {
        // Successful Login
        localStorage.setItem('currentUser', JSON.stringify(user));

        if (role === 'student') {
            window.location.href = 'studentPages/dashboard.html';
        } else {
            window.location.href = 'instructurePages/lecture-dashboard.html';
        }
    } else {
        // Failed Login
        if (errorMsg) {
            errorMsg.textContent = "User not registered or incorrect credentials.";
            errorMsg.style.display = 'block';
        } else {
            alert("User not registered or incorrect credentials.");
        }
    }
}
