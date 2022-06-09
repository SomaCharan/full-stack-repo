import axios from 'axios';
import ApiRoute from '../../utils/apiRoutes';

/**
 * get all withdrawal Requests
 */
const getWithDrawalRequests = () => async () => {
  const res = await axios.get(ApiRoute.baseURL + ApiRoute.getWithDrawalRequests);
  return res;
};

export default getWithDrawalRequests

