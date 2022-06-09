import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import Popup from '../DashboardComponents/shared/Popup';
import SignupForm from './SignupForm';
import { loadUser } from '../../redux/actions/authActions';
import ApiRoute from '../../utils/apiRoutes';
import setGlobalLoader from '../../redux/actions/dashboardLoaderActions';
import { REGISTER_SUCCESS } from '../../redux/actions/types';

export default function Product({
  image,
  varClass,
  productName,
  productPrice,
  validPoints,
  invalidPoints,
  productId,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleOnSubmit = async (values) => {
    if (values.password !== values.confirmPassword) {
      toast.error(`Passwords don't match, Please try again`);
      return;
    }
    setOpenModal(false);

    const { orderDetails, ...userDetails } = values;

    const options = {
      key:
        process.env.NODE_ENV === 'production'
          ? 'rzp_live_iuvlVeLMPlClj6'
          : 'rzp_test_W3Z271TBZUSS5t',
      amount: orderDetails.amount,
      currency: 'INR',
      name: 'Success Thinks',
      description: productName,
      image:
        'https://res.cloudinary.com/dtqrvcvp8/image/upload/v1650883782/1_vp11ij.png',
      order_id: orderDetails.id,
      handler: async (response) => {
        const paymentData = {
          product: parseInt(productId, 10),
          price: parseInt(productPrice, 10),
          razorpay_signature: response.razorpay_signature,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
        };

        try {
          const res = await axios.post(ApiRoute.createUser, {
            paymentData,
            ...userDetails,
          });

          if (res.status === 200) {
            toast.success('Registration Successful');
            dispatch({
              type: REGISTER_SUCCESS,
              payload: res.data,
            });
            dispatch(loadUser());
            navigate('/dashboard');
            window.location.reload();
          }
          return;
        } catch (error) {
          console.log(error.response);
          toast.error(error.response.data.errors[0].msg);
        }
      },
    };

    // eslint-disable-next-line no-undef
    const rzp1 = new Razorpay(options);
    rzp1.open();

    rzp1.on('payment.failed', (response) => {
      toast.error(response.error.description);
    });
  };

  const createUserModal = (orderDetails, introducerreference) =>
    SignupForm(handleOnSubmit, orderDetails, introducerreference);

  const registerUserProcess = async () => {
    setGlobalLoader(true);
    const data = { price: parseInt(productPrice, 10) };

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    document.body.appendChild(script);

    try {
      const res = await axios.post(
        ApiRoute.createOrder,
        data
      );

      if (res.status === 200) {
        setGlobalLoader(false);
        setOpenModal(true);
        setModalContent(createUserModal(res.data, Cookies.get('referer')));
      }

      return;
    } catch (error) {
      console.log(error);
      toast.error(
        'some error occured while creating order. Please refresh the page.'
      );
    }
  };

  return (
    <div className={varClass}>
      <div className="single-ticket-price-inner text-center">
        <div className="icon">
          <img src={image} alt="img" className="product-page-product-image" />
        </div>
        <h2 className="title">{productName}</h2>
        <h2 className="price">Rs {productPrice}</h2>
        <div className="list">
          <ul>
            {validPoints?.map((d) => (
              <li>
                <i className="fa fa-check" />
                {d}
              </li>
            ))}

            {invalidPoints?.map((d) => (
              <li>
                <i className="fa fa-times text-danger" />
                {d}
              </li>
            ))}
          </ul>
        </div>
        <div className="nav-right-part button-new-css-design w-100">
          <button
            className="btn btn-red"
            onClick={() => {
              registerUserProcess();
            }}
            type="button"
          >
            <img src="assets/img/icon/1.png" alt="img" />
            Buy Now
          </button>
        </div>
      </div>
      <Popup
        setOpenModal={setOpenModal}
        openModal={openModal}
        maxWidth="md"
        Title="Please enter your details"
        Content={modalContent}
      />
    </div>
  );
}
