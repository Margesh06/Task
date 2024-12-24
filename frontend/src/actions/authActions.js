import api from '../services/api'
// Action Types
export const SET_USER = 'SET_USER';
export const LOGOUT = 'LOGOUT';
export const SET_LOADING = 'SET_LOADING';

// Action Creators
export const registerUser = (userData) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await api.post('/auth/register', userData);
    localStorage.setItem('token', response.data.token);
    dispatch({ type: SET_USER, payload: response.data.user });
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
  }
};


export const loginUser = (userData) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await api.post('/auth/login', userData);
    localStorage.setItem('token', response.data.token);
    dispatch({ type: SET_USER, payload: response.data.user });
  } catch (error) {
    console.error(error);
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT });
};
