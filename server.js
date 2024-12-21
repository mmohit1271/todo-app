const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

let todos = [];

app.get("/todos", (req, res) => res.json(todos));
app.post("/todos", (req, res) => {
    const { task } = req.body;
    if (task) {
        todos.push({ id: todos.length + 1, task });
        res.status(201).json({ message: "Task added successfully!" });
    } else {
        res.status(400).json({ message: "Task is required." });
    }
});
app.delete("/todos/:id", (req, res) => {
    const { id } = req.params;
    todos = todos.filter(todo => todo.id != id);
    res.json({ message: "Task deleted successfully!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

