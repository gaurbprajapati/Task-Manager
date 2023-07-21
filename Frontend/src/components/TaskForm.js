import React, { useState } from 'react';

const TaskForm = ({ handleAddTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleAddButtonClick = () => {
        handleAddTask(title, description);
        setTitle('');
        setDescription('');
    };

    return (
        <div className="add-task">
            <h2 className="add-task-css">Add Task</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={handleAddButtonClick}>Add Task</button>
        </div>
    );
};

export default TaskForm;
