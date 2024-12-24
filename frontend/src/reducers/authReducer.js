import { SET_USER, LOGOUT } from '../actions/authActions';

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case LOGOUT:
      localStorage.removeItem('token');
      return { ...state, user: null, token: null };
    default:
      return state;
  }
};

export default authReducer;
