const express = require('express');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(routes);


// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
