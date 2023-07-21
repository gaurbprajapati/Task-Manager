// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Initialize the Express app
const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Set up MongoDB connection
mongoose.connect('mongodb://localhost/task_manager_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((err) => {
        console.log('Cannot connect to the database', err);
        process.exit();
    });

// Define the Task model
const Task = mongoose.model('Task', {
    title: String,
    description: String,
});


// Define API endpoints



// GET all tasks
app.get('/api/tasks', (req, res) => {
    Task.find()
        .then((tasks) => {
            res.json(tasks);
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
});

// GET a single task by ID
app.get('/api/tasks/:id', (req, res) => {
    Task.findById(req.params.id)
        .then((task) => {
            if (!task) {
                res.status(404).json({ error: 'Task not found' });
            } else {
                res.json(task);
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
});

// POST a new task
app.post('/api/addtasks', (req, res) => {
    const { title, description } = req.body;

    // Check if the title field is not empty
    if (!title) {
        return res.status(400).json({ error: 'Title field is required' });
    }

    const task = new Task({
        title: title,
        description: description,
    });

    task.save()
        .then(() => {
            res.json({ message: 'Task created successfully' });
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
});


// PUT/update an existing task
app.put('/api/updatetasks/:id', (req, res) => {
    Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((task) => {
            if (!task) {
                res.status(404).json({ error: 'Task not found' });
            } else {
                res.json(task);
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
});

// DELETE a task
app.delete('/api/deltasks/:id', (req, res) => {
    Task.findByIdAndRemove(req.params.id)
        .then((task) => {
            if (!task) {
                res.status(404).json({ error: 'Task not found' });
            } else {
                res.json({ message: 'Task deleted successfully' });
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
});

// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
