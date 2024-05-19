const mysql = require('mysql2/promise');

let db;

async function connectToDatabase() {
  try {
    db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'blogposting'
    });
    console.log('Connected to the MySQL database.');
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}

connectToDatabase();

module.exports = db;