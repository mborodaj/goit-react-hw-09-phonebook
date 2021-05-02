import axios from 'axios';
import {
  getCurrentUserRequest,
  getCurrentUserSuccess,
  gentCurrentUserError,
  userRegisterRequest,
  userRegisterSuccess,
  userRegisterError,
  userLoginError,
  userLoginRequest,
  userLoginSuccess,
  userLogoutRequest,
  userLogoutError,
  userLogoutSuccess,
} from './auth-actions';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unSet() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const getCurrentUser = () => async (dispatch, getState) => {
  const {
    auth: { token: getToken },
  } = getState();

  if (!getToken) {
    return;
  }

  token.set(getToken);
  dispatch(getCurrentUserRequest());

  try {
    const { data } = await axios.get('/users/current');

    dispatch(getCurrentUserSuccess(data));
  } catch (error) {
    dispatch(gentCurrentUserError(error));
  }
};

const registerNewUser = newUser => async dispatch => {
  dispatch(userRegisterRequest());

  try {
    const { data } = await axios.post('/users/signup', newUser);

    token.set(data.token);
    dispatch(userRegisterSuccess(data));
  } catch (error) {
    console.log('registration error');
    dispatch(userRegisterError(error.message));
  }
};

const loginUser = user => async dispatch => {
  dispatch(userLoginRequest());

  try {
    const { data } = await axios.post('/users/login', user);

    token.set(data.token);
    dispatch(userLoginSuccess(data));
  } catch (error) {
    dispatch(userLoginError(error.message));
  }
};

const logoutUser = () => async dispatch => {
  dispatch(userLogoutRequest());

  try {
    axios.post('/users/logout');

    token.unSet();
    dispatch(userLogoutSuccess());
  } catch (error) {
    dispatch(userLogoutError(error.message));
  }
};

export { getCurrentUser, registerNewUser, loginUser, logoutUser };
