// const IS_PROD = process.env.NODE_ENV === 'production';

const API_ROUTES = {
  // baseURL: IS_PROD
  //   ? 'https://success-thinks-backend.herokuapp.com/'
  //   : 'http://localhost:4000/',

  // note 2 create users options will be there, one for user and one for admin

  // user management
  createUser: '/user',
  editUserSelf: '/user',
  editUserImage: '/user/image/{uuid}',
  getIncome: '/user/income',

  // withdrawal Requests
  getWithDrawalRequests : '/withdrawal-request',

  // Bank Information
  addBankInformation: '/bank',
  getBankInformation: '/bank',

  // razorpay
  createOrder: '/payment/razorpay_create_orders',
  confirmOrder: '/payment/catch_payment/{userreference}',

  // auth routes
  auth: '/auth',

  // video
  addVideo: '/video',
  getVideos: '/video/',
  deleteVideo: '/video/',

  // admin routes
  addUser: '/admin/user',
  getUsers: '/admin/users',
  deleteUser: '/admin/user/{uuid}',
  getAllDetailsOfUser: '/admin/user/{uuid}/all-details',
  editUser: '/admin/user/{uuid}',
  registerWithdrawalPayment: '/admin/withdrawal-request'
};

export default API_ROUTES;
