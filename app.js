// Check if user is logged in
function checkAuth() {
    const urlParams = new URLSearchParams(window.location.search);
    const userParam = urlParams.get('user');
    
    if (!userParam) {
        window.location.href = 'index.html';
        return null;
    }
    
    try {
        return JSON.parse(decodeURIComponent(userParam));
    } catch (e) {
        window.location.href = 'index.html';
        return null;
    }
}

// Initialize user
const currentUser = checkAuth();
if (currentUser) {
    document.getElementById('userName').textContent = `Welcome, ${currentUser.name}!`;
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = 'index.html';
    }
}

// Course data
const courses = [
    {
        id: 1,
        title: "Web Development Fundamentals",
        description: "Master HTML, CSS, and JavaScript to build modern, responsive websites from scratch.",
        icon: "💻",
        lessons: [
            { title: "Introduction to HTML", duration: "15 min" },
            { title: "CSS Styling Basics", duration: "20 min" },
            { title: "JavaScript Essentials", duration: "25 min" },
            { title: "Responsive Design", duration: "30 min" },
            { title: "Building Your First Website", duration: "45 min" }
        ],
        completed: false
    },
    {
        id: 2,
        title: "Python Programming",
        description: "Learn Python from basics to advanced concepts including data structures and algorithms.",
        icon: "🐍",
        lessons: [
            { title: "Python Basics & Syntax", duration: "20 min" },
            { title: "Data Types & Variables", duration: "25 min" },
            { title: "Control Flow & Loops", duration: "30 min" },
            { title: "Functions & Modules", duration: "35 min" },
            { title: "Object-Oriented Programming", duration: "40 min" }
        ],
        completed: false
    },
    {
        id: 3,
        title: "Digital Marketing Mastery",
        description: "Comprehensive guide to SEO, social media marketing, and content strategy for business growth.",
        icon: "📱",
        lessons: [
            { title: "Digital Marketing Overview", duration: "15 min" },
            { title: "SEO Fundamentals", duration: "30 min" },
            { title: "Social Media Strategy", duration: "25 min" },
            { title: "Content Marketing", duration: "35 min" },
            { title: "Analytics & Tracking", duration: "20 min" }
        ],
        completed: false
    },
    {
        id: 4,
        title: "Data Science Essentials",
        description: "Introduction to data analysis, visualization, and machine learning with Python.",
        icon: "📊",
        lessons: [
            { title: "Introduction to Data Science", duration: "20 min" },
            { title: "Data Analysis with Pandas", duration: "40 min" },
            { title: "Data Visualization", duration: "35 min" },
            { title: "Machine Learning Basics", duration: "45 min" },
            { title: "Real-world Projects", duration: "60 min" }
        ],
        completed: false
    }
];

// Render courses
function renderCourses() {
    const grid = document.getElementById('coursesGrid');
    grid.innerHTML = '';

    courses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.onclick = () => showCourseDetail(course.id);

        card.innerHTML = `
            <div class="course-header">
                <div class="course-icon">${course.icon}</div>
            </div>
            <div class="course-body">
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${course.description}</p>
                <div class="course-meta">
                    <span class="lessons-count">${course.lessons.length} Lessons</span>
                    ${course.completed ? '<span class="completed-badge">✓ Completed</span>' : ''}
                </div>
            </div>
        `;

        grid.appendChild(card);
    });
}

// Show course detail
function showCourseDetail(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    const detailView = document.getElementById('courseDetailView');
    const coursesView = document.getElementById('coursesView');

    coursesView.classList.add('hidden');
    detailView.classList.add('active');

    const progress = course.completed ? 100 : 0;

    detailView.innerHTML = `
        <div class="detail-header">
            <div class="detail-icon">${course.icon}</div>
            <div class="detail-info">
                <h2>${course.title}</h2>
                <p>${course.description}</p>
            </div>
        </div>

        <div>
            <h3 style="color: #333; margin-bottom: 15px;">Course Progress</h3>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
            <p style="color: #666; text-align: center;">${progress}% Complete</p>
        </div>

        <div class="lessons-list">
            <h3 style="color: #333; margin-bottom: 20px;">Course Lessons (${course.lessons.length})</h3>
            ${course.lessons.map((lesson, index) => `
                <div class="lesson-item">
                    <div class="lesson-title">${index + 1}. ${lesson.title}</div>
                    <div class="lesson-duration">⏱️ ${lesson.duration}</div>
                </div>
            `).join('')}
        </div>

        <div class="action-buttons">
            <button class="btn btn-secondary" onclick="showCoursesList()">← Back to Courses</button>
            ${!course.completed 
                ? `<button class="btn btn-success" onclick="markAsCompleted(${course.id})">Mark as Completed ✓</button>`
                : `<button class="btn btn-primary" disabled style="opacity: 0.7; cursor: not-allowed;">Already Completed ✓</button>`
            }
        </div>
    `;
}

// Show courses list
function showCoursesList() {
    document.getElementById('coursesView').classList.remove('hidden');
    document.getElementById('courseDetailView').classList.remove('active');
}

// Mark course as completed
function markAsCompleted(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (course) {
        course.completed = true;
        renderCourses();
        showCourseDetail(courseId);
    }
}

// Initialize
renderCourses();