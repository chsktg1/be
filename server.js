const express = require("express");
const db = require("./database");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/query", async (req, res) => {
  const { query, params } = req.body;
  try {
    if (!query) {
      return res.status(400).json({ error: "No query provided" });
    }
    const result = await db.query(query, params);
    console.log("result", result);
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Failed to execute query" });
  }
});

app.post("/modify", async (req, res) => {
  const { query, params } = req.body;
  console.log("modify-query", query);
  try {
    if (!query) {
      return res.status(400).json({ error: "No query provided" });
    }
    const result = await db.query(query, params);
    console.log("modify-result", result);
    res.json({ success: true, affectedRows: result.rowCount });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Failed to modify database" });
  }
});

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
