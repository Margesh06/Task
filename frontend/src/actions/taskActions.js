import api from '../services/api'

// Action Types
export const GET_TASKS = 'GET_TASKS';
export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const SET_LOADING = 'SET_LOADING';

// Action Creators
export const getTasks = () => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const token = localStorage.getItem('token');
    const response = await api.get('/tasks', {
      headers: {
        Authorization: `Bearer ${token}`  // Add the token to the request header
      }
    });
    dispatch({ type: GET_TASKS, payload: response.data });
  } catch (error) {
    console.error(error);
  }
};



export const addTask = (task) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const token = localStorage.getItem('token');  // Get token from localStorage
    if (!token) {
      throw new Error('No token found');
    }

    // Ensure the task contains a title
    if (!task.title) {
      throw new Error('Title is required');
    }

    const response = await api.post('/tasks', task, {
      headers: {
        Authorization: `Bearer ${token}`,  // Add token to headers
      },
    });

    dispatch({ type: ADD_TASK, payload: response.data });
  } catch (error) {
    console.error('Error creating task:', error.message);
    dispatch({ type: SET_LOADING, payload: false });
  }
};


export const updateTask = (taskId, updatedTask) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    const response = await api.put(`/tasks/${taskId}`, updatedTask, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
      },
    });
    dispatch({ type: UPDATE_TASK, payload: response.data });
  } catch (error) {
    console.error('Error updating task:', error);
  }
};


export const deleteTask = (taskId) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    await api.delete(`/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
      },
    });
    dispatch({ type: DELETE_TASK, payload: taskId });
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};

