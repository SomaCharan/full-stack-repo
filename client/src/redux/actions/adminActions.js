import axios from 'axios';
// import { toast } from 'react-toastify';
import ApiRoute from '../../utils/apiRoutes';

/**
 * get all users with open withdrawal requests
 */

export const getUsersWithWithdrawalRequests = () => async () => {
    const res = await axios.get(`${ApiRoute.baseURL}${ApiRoute.getUsers}?withdrawalRequest=true`);

    return res;
};


/**
 * create a withdrawal payment success 
 * @param {Object} data
 */
export const registerWithdrawalPayment = (data) => async () => {
    const res = await axios.post(ApiRoute.baseURL + ApiRoute.registerWithdrawalPayment, data);

    return res;
};