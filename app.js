const express = require('express');
const oracledb = require('oracledb');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Database connection configuration
const dbConfig = {
  user: 'system',         // your Oracle username
  password: 'tFP6Zfxf',   // your Oracle password
  connectString: 'localhost:1521/XE', // use XE as the service name
};

// Endpoint to register a new user
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Connect to the database
    const connection = await oracledb.getConnection(dbConfig);

    // Insert the user into the database
    const result = await connection.execute(
      `INSERT INTO users (username, email, password) VALUES (:username, :email, :password)`,
      [username, email, password],
      { autoCommit: true }
    );

    // Close the connection
    await connection.close();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
