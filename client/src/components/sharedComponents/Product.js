/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import Popup from '../DashboardComponents/shared/Popup';
import SignupForm from './SignupForm';
import PaymentPopup from './PaymentPopup';
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
  const [modalTitle, setModalTitle] = useState('');

  const handleOnSubmit = async (values) => {
    if (values.password !== values.confirmPassword) {
      toast.error(`Passwords don't match, Please try again`);
      return;
    }

    try {
      const res = await axios.post(ApiRoute.createUser, { ...values, product: parseInt(productId, 10), productPrice: parseInt(productPrice, 10) });
      if (res.status === 201) {
        setModalTitle('Please Complete Payment')
        setModalContent(PaymentPopup(setOpenModal, productPrice));
      }
      return;
    } catch (error) {
      console.log(error.response);
      toast.error('Some error occured while creating user. please contact admin.');
    }
  };

  const createUserModal = (introducerreference) =>
    SignupForm(handleOnSubmit, introducerreference);

  const registerUserProcess = async () => {
    setGlobalLoader(false);
    setOpenModal(true);
    setModalTitle('Please enter your details')
    setModalContent(createUserModal(Cookies.get('referer')));
  }

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
        Title={modalTitle}
        Content={modalContent}
      />
    </div>
  );
}
