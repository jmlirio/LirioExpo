const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
console.log(process.env.SECRETKEY);
const jsonwebtoken = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');





let db;

async function connectToDatabase() {
  try {
    db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'blogposting'
    });
    console.log('Connected to the MySQL server.');
  } catch (err) {
    console.error('Failed to create connection to database:', err);
  }
}

connectToDatabase().catch(err => console.error(err));


// ... existing code ...

// Create a new post

router.post('/Posts/register', async (req, res) => {
    try {
      const { title, description, user_id } = req.body;
  
    
     
      // Log the parameters to the console for debugging
      console.log("Register Parameters:", req.body);
  
      const insertUserQuery =
        "INSERT INTO Posts (title, description, user_id) VALUES (?, ?, ?)";
      await db.query(insertUserQuery, [title, description, user_id]);
  
      res.status(201).json({ message: "Post registered successfully" });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  // Get all posts
  router.get('/Posts', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM Posts');
        res.status(200).json(results);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});
  
  // Get one post
  router.get('/Posts/:id', async (req, res) => {
    try {
      const [results] = await db.query('SELECT * FROM Posts WHERE id = ?', [req.params.id]);
      res.status(200).json(results);
    } catch (error) {
      console.log(error);
      res.status(500).send('Server error');
    }
  });
  
  // Update a post
  router.put('/Posts/:id', async (req, res) => {
    const { title, description } = req.body;
    try {
      await db.query('UPDATE Posts SET title = ?, description = ? WHERE id = ?', [title, description, req.params.id]);
      res.status(200).send('Post updated');
    } catch (error) {
      console.log(error);
      res.status(500).send('Server error');
    }
  });
  
  // Delete a post
  router.delete('/Posts/:id', async (req, res) => {
    try {
      await db.query('DELETE FROM Posts WHERE id = ?', [req.params.id]);
      res.send('Post deleted successfully');
    } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred while deleting the user.');
    }
  });
  
  module.exports = router;