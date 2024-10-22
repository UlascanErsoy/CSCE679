const express = require('express');
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');
const path = require('path');

// Create an Express app
const app = express();

// Set the directory to serve (public folder in this case)
const publicDir = path.join(__dirname, 'public');

// Create a live reload server
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(publicDir);

// Add live reload middleware
app.use(connectLivereload());

// Serve the static files from the public folder
app.use(express.static(publicDir));

// Watch for changes and notify the browser to reload
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

// Set the port
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

