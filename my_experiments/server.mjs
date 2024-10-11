// server.js

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Initialize Express app
const app = express();
const port = 3000;

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the 'plots_store' directory at '/plots_store' URL path
app.use('/plots_store', express.static(path.join(__dirname, 'my_experiments', 'plots_store')));

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});