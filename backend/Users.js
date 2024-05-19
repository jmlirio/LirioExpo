const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
console.log(process.env.SECRETKEY);
const jsonwebtoken = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');





let db;

async function connectToDb() {
  db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blogposting'
  });
}

connectToDb().catch(error => console.error('Error connecting to database:', error));


// Register a new user
router.post('/Users/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
   
    // Log the parameters to the console for debugging
    console.log("Register Parameters:", req.body);

    const insertUserQuery =
      "INSERT INTO Users (email, password) VALUES (?, ?)";
    
    // Here's where you modify the code
    await db.query(insertUserQuery, [email, hashedPassword]);

    console.log('Before sending response');
    res.status(201).json({ message: "User registered successfully" });
    console.log('After sending response');
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login a user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const getUserQuery = "SELECT * FROM users WHERE email = ?";

  try {
    const [rows] = await db.execute(getUserQuery, [email]);
    if (rows.length > 0) {
      const user = rows[0];

      // Check if the provided password matches the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ error: "Invalid password" });
      }

      // Generate a JWT token
      const token = jsonwebtoken.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

      // Return the token
      return res.json({ token });
    } else {
      return res.status(400).json({ error: "Invalid email" });
    }
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all users
router.get('/Users', async (req, res) => {
  try {
      const [rows, fields] = await db.query("SELECT * FROM Users");
      res.json(rows);
  } catch (error) {
      console.error("Error getting users:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a user by id
router.get('/Users/:id', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
    res.send(results[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while getting the user.');
  }
});

// Update a user
router.put('/Users/:id', async (req, res) => {
  try {
    await db.query('UPDATE users SET email = ?, password = ? WHERE id = ?', [req.body.email, req.body.password, req.params.id]);
    res.send('User updated successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while updating the user.');
  }
});

// Delete a user
router.delete('/Users/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.send('User deleted successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while deleting the user.');
  }
});
module.exports = router;