import axios from 'axios';
import ApiRoute from '../../utils/apiRoutes';

/**
 * add a video
 * @param {Object} data
 */
export const addNotification = (data) => async () => {
  const res = await axios.post(ApiRoute.addNotification, data);

  return res;
};

/**
 * get a videos
 */
export const getNotifications = () => async () => {
  const res = await axios.get(ApiRoute.getNotifications);

  return res;
};
