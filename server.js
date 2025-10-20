const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;

// =========================================================
// Configuration
// =========================================================

// Configure Express to use EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse incoming request bodies (for forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like your main HTML file and CSS)
// Assuming your main HTML file is at the root level (public/index.html)
app.use(express.static(path.join(__dirname, 'public'))); 

// Define a simple, secure Admin user (for demonstration)
const ADMIN_USER = {
    username: 'admin',
    password: 'securePassword123' // NOTE: In a real app, hash this!
};

// =========================================================
// Authentication Route
// =========================================================

// Handle the POST request from the Admin Login modal form
app.post('/admin/login', (req, res) => {
    const { username, password } = req.body;
    
    // 1. Authentication Check
    if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
        
        // 2. Successful Login
        // In a real application, you would set a session or JWT here.
        // For this example, we just redirect to the dashboard page.
        
        console.log(`Admin user ${username} successfully logged in.`);
        
        // Redirect to the dashboard
        res.redirect('/admin/dashboard');

    } else {
        
        // 3. Failed Login
        console.log(`Login failed for user: ${username}`);
        
        // In a real application, you would send a JSON error response back 
        // to the client (which the front-end JS would handle).
        
        // For this simple example, we render an error page.
        res.render('loginError', { 
            message: 'Invalid username or password.',
            redirectUrl: '/' 
        });
    }
});

// =========================================================
// Protected Route
// =========================================================

// The Admin Dashboard route - Protected content
app.get('/admin/dashboard', (req, res) => {
    // NOTE: In a real application, you'd add middleware here 
    // to check if the user is logged in (via session or token).
    
    res.render('dashboard', { user: ADMIN_USER.username });
});


// =========================================================
// Server Start
// =========================================================
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log('Admin login form listens on POST /admin/login');
});