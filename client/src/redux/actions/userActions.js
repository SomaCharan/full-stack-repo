import axios from 'axios';
import { toast } from 'react-toastify';
import ApiRoute from '../../utils/apiRoutes';
import { loadUser } from './authActions';
// import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';
import setGlobalLoader from './dashboardLoaderActions';

// /**
//  * signup a user
//  * @param {Object} data
//  * @returns
//  */
// export const signUpUser = (data) => async (dispatch) => {
//   try {
//     const res = await axios.post(ApiRoute.createUser, data);

//     if (res.status === 200) {
//       toast.success('user registered successfully.');

//       dispatch({
//         type: REGISTER_SUCCESS,
//         payload: res.data,
//       });
//       dispatch(loadUser());
//     }
//     return res;
//   } catch (err) {
//     console.log(err);
//     if (err.response.status === 409) {
//       toast.error(err.response.data.error[0].msg);
//     }
//     dispatch({
//       type: REGISTER_FAIL,
//     });
//     return err.response;
//   }
// };

/**
 * add a user
 * @param {Object} data
 * @returns
 */
export const addUser = (data) => async () => {
  try {
    const res = await axios.post(ApiRoute.addUser, data);

    if (res.status === 201) {
      toast.success('user registered successfully.');
      setGlobalLoader(false);
    }
    return res;
  } catch (err) {
    console.log(err);
    if (err.response.status === 409) {
      toast.error(err.response.data.error[0].msg);
    }
    return err.response;
  }
};

// thi is currently only for admin
/**
 * Edit a user
 * @param {Object} data
 * @returns
 */
export const editUser = (userId, data) => async () => {
  try {
    const res = await axios.patch(
      ApiRoute.editUser.replace('{uuid}', userId),
      data
    );

    return res;
  } catch (err) {
    console.log(err);
    toast.error(
      'Some error occurred while updating user. Please contact admin'
    );
    return err.response;
  }
};

/**
 * Edit a user
 * @param {Object} data
 * @returns
 */
export const editUserSelf = (data) => async () => {
  try {
    const res = await axios.patch(
      ApiRoute.editUserSelf,
      data
    );

    return res;
  } catch (err) {
    console.log(err);
    toast.error(
      'Some error occurred while updating user. Please contact admin'
    );
    return err.response;
  }
};

// this is for user
/**
 * Edit a user image
 * @param {Object} data
 * @returns
 */
export const editUserImage =
  (userId, data, headers, setOpenModal) => async (dispatch) => {
    try {
      const res = await axios.post(
        ApiRoute.editUserImage.replace('{uuid}', userId),
        data,
        headers
      );

      if (res.status === 200) {
        toast.success('user image updated successfully.');
        dispatch(loadUser());
        setGlobalLoader(false);
        setOpenModal(false);
      }
      return res;
    } catch (err) {
      console.log(err);
      toast.error('Some error occurred while updating user. Please try again');
      return err.response;
    }
  };

// this is for the logged in user
/**
 * get income of current user
 */
export const getIncome = () => async () => {
  const res = await axios.get(ApiRoute.getIncome);

  return res;
};

// this is for the admin to get income of users
/**
 * get income of current user
 */
export const getAllDetailsOfUser = (userId) => async () => {

  const res = await axios.get(
    ApiRoute.getAllDetailsOfUser.replace('{uuid}', userId),
  );

  return res;
};

