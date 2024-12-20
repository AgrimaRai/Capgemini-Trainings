const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

// Hardcoded credentials for demo purposes
const correctUsername = 'abc';
const correctPassword = '123';

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    
    // Serve the login page
    if (parsedUrl.pathname === '/' && req.method === 'GET') {
        fs.readFile(path.join(__dirname, 'public', '/index.html'), 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error loading the login page');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } 
    // Handle login form submission
    else if (parsedUrl.pathname === '/login' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        
        req.on('end', () => {
            const parsedBody = querystring.parse(body);
            const username = parsedBody.username;
            const password = parsedBody.password;

            if (username === correctUsername && password === correctPassword) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end('<h1>Welcome, ' + username + '!</h1>');
            } else {
                res.writeHead(401, { 'Content-Type': 'text/html' });
                res.end('<h1>Invalid credentials, please try again.</h1>');
            }
        });
    } 
    // Serve static files (CSS)
    else if (parsedUrl.pathname === '/style.css') {
        fs.readFile(path.join(__dirname, 'public', 'style.css'), 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error loading stylesheet');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(data);
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});