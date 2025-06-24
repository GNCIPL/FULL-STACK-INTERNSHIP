const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Task = require('./models/Task');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;
const url='mongodb://127.0.0.1:27017/todoapp';

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Route to show all tasks
app.get('/', async (req, res) => {
    const tasks = await Task.find({});
    res.render('index', { tasks, editId: null });
});

// Show edit input for a task
app.get('/edit/:id', async (req, res) => {
    const tasks = await Task.find({});
    const editId = req.params.id;
    res.render('index', { tasks, editId });
});

// Add a new task
app.post('/add', async (req, res) => {
    const { content } = req.body;
    await Task.create({ content });
    res.redirect('/');
});

// Update a task
app.post('/update/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    task.content = req.body.content;
    await task.save();
    res.redirect('/');
});

// Delete a task
app.post('/delete/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

// Toggle completion status
app.post('/toggle/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    task.completed = !task.completed;
    await task.save();
    res.redirect('/');
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
