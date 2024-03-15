const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

// Connect to the SQLite database
const db = new sqlite3.Database("dua_main.sqlite");

// Define routes to fetch categories, subcategories, and duas

// Fetch all categories
app.get("/category", (req, res) => {
  db.all("SELECT * FROM category", (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(rows);
  });
});

// Fetch subcategories for a given category ID
app.get("/sub_category", (req, res) => {
  const categoryId = req.params.categoryId;
  db.all("SELECT * FROM sub_category", categoryId, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(rows);
  });
});

// Fetch duas for a given subcategory ID
app.get("/dua", (req, res) => {
  const subcategoryId = req.params.subcategoryId;
  db.all("SELECT * FROM dua ", subcategoryId, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(rows);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
