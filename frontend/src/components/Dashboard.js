import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../actions/taskActions';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import { logoutUser } from '../actions/authActions'; 
import { useNavigate } from 'react-router-dom'; 

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { tasks, loading } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/'); 
  };

  return (
    <div>
      <h2>Your Tasks</h2>
      <TaskForm />
      
      <button onClick={handleLogout}>Logout</button>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        tasks.map((task) => <TaskCard key={task._id} task={task} />)
      )}
    </div>
  );
};

export default Dashboard;
