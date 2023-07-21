import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, handleDeleteTask, handleEditTask }) => {
    return (
        <div className="task-list">
            {tasks.map((task) => (
                <TaskItem
                    key={task._id}
                    task={task}
                    handleDeleteTask={handleDeleteTask}
                    handleEditTask={handleEditTask}
                />
            ))}
        </div>
    );
};

export default TaskList;
