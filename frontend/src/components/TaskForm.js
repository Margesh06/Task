import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../actions/taskActions';

const TaskForm = () => {
  const [task, setTask] = useState({ title: '', description: '', completed: false });
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.tasks.loading);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask(task));
    setTask({ title: '', description: '', completed: false });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Task Title</label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={task.description}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Adding Task...' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;
