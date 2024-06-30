const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse the JSON body of requests
app.use(bodyParser.json());

// Middleware to enable CORS
app.use(cors());

// "Database" in memory to store users
let users = [];

// POST route to handle form submission
// POST endpoint to handle form submission
app.post('/submit', (req, res) => {
  const { name, email } = req.body;

  console.log('Received data:', { name, email }); // Check the data received on the server side

// Data validation
  if (!name || !email) {
    return res.status(400).json({ message: 'Please fill out all fields.' });
  }

  // Saving user data
  users.push({ name, email });

 // Reply with a success message
  res.status(200).json({ message: 'Form submitted successfully!' });
});


// GET route for home page
app.get('/', (req, res) => {
  res.send('Welcome to my website!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
