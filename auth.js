// Demo users database
const demoUsers = [
    { email: 'student@learnhub.com', password: 'student123', name: 'Demo Student' },
    { email: 'admin@learnhub.com', password: 'admin123', name: 'Demo Admin' }
];

// Handle Login
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Check credentials
        const user = demoUsers.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Store user info in memory (simulating session)
            const userData = { email: user.email, name: user.name };
            
            // For demo purposes, we'll pass user data via URL parameters
            // In production, use proper session management or tokens
            window.location.href = `dashboard.html?user=${encodeURIComponent(JSON.stringify(userData))}`;
        } else {
            alert('Invalid email or password. Please try again or use demo accounts.');
        }
    });
}

// Handle Sign Up
if (document.getElementById('signupForm')) {
    document.getElementById('signupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Validation
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        if (password.length < 6) {
            alert('Password must be at least 6 characters long!');
            return;
        }
        
        // Check if user already exists
        const existingUser = demoUsers.find(u => u.email === email);
        if (existingUser) {
            alert('An account with this email already exists!');
            return;
        }
        
        // Create new user (in production, this would be saved to a database)
        const newUser = { email: email, password: password, name: fullname };
        demoUsers.push(newUser);
        
        alert('Account created successfully! Please login.');
        window.location.href = 'index.html';
    });
}