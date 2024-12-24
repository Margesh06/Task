import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../actions/taskActions';

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();
  
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);

  const handleDelete = () => {
    dispatch(deleteTask(task._id)); 
  };

  const handleUpdate = () => {
    const newStatus = task.status === 'pending' ? true : false; 
  
    dispatch(updateTask(task._id, { completed: newStatus, title: task.title, description: task.description }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    dispatch(updateTask(task._id, { title: newTitle, description: newDescription }));
    setIsEditing(false); 
  };

  return (
    <div>
      {isEditing ? (
        <input 
          type="text" 
          value={newTitle} 
          onChange={(e) => setNewTitle(e.target.value)} 
        />
      ) : (
        <h3>{task.title}</h3> 
      )}

      {isEditing ? (
        <textarea 
          value={newDescription} 
          onChange={(e) => setNewDescription(e.target.value)} 
        />
      ) : (
        <p>{task.description}</p> 
      )}

      <p>Status: {task.status}</p>

      <button onClick={handleEditToggle}>
        {isEditing ? 'Cancel' : 'Edit'}
      </button>

      {isEditing && (
        <button onClick={handleSave}>Save</button>
      )}

      <button onClick={handleUpdate}>
        {task.status === 'completed' ? 'Mark as Pending' : 'Mark as Completed'}
      </button>

      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TaskCard;
