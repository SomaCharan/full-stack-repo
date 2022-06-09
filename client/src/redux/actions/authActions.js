import axios from 'axios';
import { toast } from 'react-toastify';
import ApiRoute from '../../utils/apiRoutes';
import setAuthToken from '../../utils/setAuthToken';
import {
  USER_LOADED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  AUTH_ERROR,
  LOGOUT,
} from './types';

/**
 * Verify token
 */
export const loadUser = () => async (dispatch) => {

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(ApiRoute.baseURL + ApiRoute.auth);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
    // console.log(res)
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

/**
 * user login
 */
export const login = (data) => async (dispatch) => {
  try {
    const res = await axios.post(ApiRoute.baseURL + ApiRoute.auth, data);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    // dispatch(loadUser());
    return;
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.error[0]?.msg);
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

/**
 * Logout user
 */
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
