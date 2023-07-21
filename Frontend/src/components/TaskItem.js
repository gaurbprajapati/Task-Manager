import React, { useState } from 'react';

const TaskItem = ({ task, handleDeleteTask, handleEditTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editDescription, setEditDescription] = useState(task.description);

    const handleUpdateTask = () => {
        handleEditTask(task._id, editTitle, editDescription);
        setIsEditing(false);
    };

    return (
        <div className="task-item">
            <div className="task-details">
                {isEditing ? (
                    <div>
                        <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <input
                            type="text"
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                        />
                        <button onClick={handleUpdateTask}>Update</button>
                    </div>
                ) : (
                    <div>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                    </div>
                )}
            </div>
            <div className="task-actions">
                <button className="delete-button" onClick={() => handleDeleteTask(task._id)}>
                    Delete
                </button>
                {isEditing ? (
                    <button className="update-button" onClick={() => setIsEditing(false)}>
                        Cancel
                    </button>
                ) : (
                    <button className="update-button" onClick={() => setIsEditing(true)}>
                        Edit
                    </button>
                )}
            </div>
        </div>
    );
};

export default TaskItem;
