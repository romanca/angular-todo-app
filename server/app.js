const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const todoRoutes = express.Router();
const PORT = 4000;

let Todo = require("./todoModel");

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/local", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;

connection.once("open", function() {
    console.log("MongoDB database connection established successfully");
});

todoRoutes.route("/").get(function(req, res) {
    Todo.find(function(err, local) {
        if (err) {
            console.log(err);
        } else {
            res.json(local);
        }
    });
});

todoRoutes.route("/:id").get(function(req, res) {
    let id = req.params.id;
    Todo.findById(id, function(err, todo) {
        res.json(todo);
    });
});

todoRoutes.route("/:id").delete((req, res) => {
    Todo.findByIdAndDelete(req.params.id)
        .then(() => res.json("Todo deleted"))
        .catch((err) => res.status(400).json("Error:delete" + err));
});

todoRoutes.route("/update/:id").post(function(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        if (!todo) res.status(404).send("data is not found");
        else todo.name = req.body.name;
        todo.name = req.body.name;

        todo
            .save()
            .then((todo) => {
                res.json("Todo updated!");
            })
            .catch((err) => {
                res.status(400).send("Update not possible");
            });
    });
});

todoRoutes.route("/add").post(function(req, res) {
    let todo = new Todo(req.body);
    todo
        .save()
        .then((todo) => {
            res.status(200).json({ todo: "todo added successfully" });
        })
        .catch((err) => {
            res.status(400).send("adding new todo failed");
        });
});

app.use("/local", todoRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});