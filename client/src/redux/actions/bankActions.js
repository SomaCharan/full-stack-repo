import axios from 'axios';
import ApiRoute from '../../utils/apiRoutes';

/**
 * add bank information
 * @param {Object} data
 */
export const addBankInformation = (data) => async () => {
  const res = await axios.post(ApiRoute.addBankInformation, data);
  return res;
};

/**
 * get bank information
 */
export const getBankInformation = () => async () => {
  const res = await axios.get(ApiRoute.getBankInformation);
  return res;
};
