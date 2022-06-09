import axios from 'axios';
import ApiRoute from '../../utils/apiRoutes';

/**
 * add a video
 * @param {Object} data
 */
export const addVideo = (data) => async () => {
  const res = await axios.post(ApiRoute.baseURL + ApiRoute.addVideo, data);

  return res;
};

/**
 * get a videos
 */
export const getVideos = () => async () => {
  const res = await axios.get(ApiRoute.baseURL + ApiRoute.getVideos);

  return res;
};
