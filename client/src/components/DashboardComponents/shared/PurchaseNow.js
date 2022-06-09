
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ApiRoute from '../../../utils/apiRoutes';
import setAuthToken from '../../../utils/setAuthToken';

export default function PurchaseNow({ amount, productName, productId }) {
  const [orderData, setOrderData] = useState({});
  const [User, setUser] = useState({});

  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('userData')));
  }, [isAuthenticated]);

  function showRazorPay() {
    if (orderData.amount <= 100) {
      window.alert('please try again');
    }
    const options = {
      // live
      // key: 'rzp_live_iuvlVeLMPlClj6',
      
      // test
      key: 'rzp_test_W3Z271TBZUSS5t',
      amount: orderData?.amount,
      currency: 'INR',
      name: 'Success Thinks',
      description: productName,
      image:
        'https://res.cloudinary.com/dtqrvcvp8/image/upload/v1650883782/1_vp11ij.png',
      order_id: orderData?.id,
      handler: async (response) => {
        if (localStorage.token) {
          setAuthToken(localStorage.token);
        } else {
          console.log('no token to send');
          return;
        }

        const paymentData = {
          product: parseInt(productId, 10),
          price: parseInt(amount, 10),
          razorpay_signature: response.razorpay_signature,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
        };

        try {
          const res = await axios.post(
            ApiRoute.baseURL +
              ApiRoute.confirmOrder.replace(
                '{userreference}',
                User.userreference
              ),
            paymentData
          );

          if (res.status === 200) {
            toast.success('Your order has been successfully placed.');
          }

          return;
        } catch (error) {
          console.log(error);
          toast.error(
            'some error occured while confirming order. Please contact admin.'
          );
        }

        console.log(response);
      },
    };

    // it is loaded from the script
    // eslint-disable-next-line no-undef
    const rzp1 = new Razorpay(options);
    rzp1.open();

    rzp1.on('payment.failed', (response) => {
      toast.error(response.error.description);
    });
  }

  function loadRazorPay() {
    // TODO remove this to make payment active
    return
    // eslint-disable-next-line no-unreachable
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    document.body.appendChild(script);
    script.onload = showRazorPay;
  }

  const data = { price: amount };

  async function createRazorPayOrder() {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    } else {
      console.log('no token to send');
      return;
    }

    try {
      const res = await axios.post(
        ApiRoute.baseURL + ApiRoute.createOrder,
        data
      );

      if (res.status === 200) {
        setOrderData(res.data);
        // console.log(res.data);
      }

      return;
    } catch (error) {
      console.log(error);
      toast.error(
        'some error occured while creating order. Please refresh the page.'
      );
    }
  }

  useEffect(() => {
    createRazorPayOrder();
  }, []);

  return (
    <div className="fluid-container bg-secondary" style={{ height: '100vh' }}>
      <div className="d-flex justify-content-center align-items-center h-100">
        <button
          type="button"
          className="btn btn-lg btn-danger "
          onClick={() => loadRazorPay()}
        >
          Purchase Now
        </button>
      </div>
    </div>
  );
}
