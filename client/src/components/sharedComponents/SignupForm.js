import React from 'react';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';

export default function SignupForm(
  handleOnSubmit,
  orderDetails,
  introducerreference,
) {
  return (
    <Formik
      initialValues={{
        name: '',
        username: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        isActive: false,
        orderDetails,
        introducerreference,
      }}
      onSubmit={handleOnSubmit}
      validationSchema={yup.object().shape({
        name: yup.string().required('This field is required.'),
        username: yup.string().required('This field is required.'),
        phone: yup.string().required('This field is required.'),
        email: yup.string().required('This field is required.'),
        password: yup.string().required('This field is required.'),
        confirmPassword: yup.string().required('This field is required.'),
      })}
    >
      {(props) => {
        const { setFieldValue, handleSubmit, values } = props;
        return (
          <form
            className="container login-area-inner border-lg-left pl-lg-5"
            onSubmit={handleSubmit}
          >
            <h2>Register</h2>
            <p>
              Register yourself In successthinks to experience all benefits if
              you are new here.
            </p>
            <div className="row">
              <div className="col-md-12">
                <label className="single-input-inner no-checkbox">
                  <span>Full Name</span>
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="name"
                    onChange={(e) => setFieldValue('name', e.target.value)}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger"
                  />
                </label>
              </div>
              <div className="col-12">
                <label className="single-input-inner">
                  <span>Username</span>
                  <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={(e) => setFieldValue('username', e.target.value)}
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-danger"
                  />
                  {/* <i className="la la-check"></i> */}
                </label>
              </div>
              <div className="col-12">
                <label className="single-input-inner">
                  <span>Phone Number</span>
                  <input
                    type="number"
                    placeholder="Phone Number"
                    onChange={(e) => setFieldValue('phone', e.target.value)}
                    name="phone"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-danger"
                  />
                  {/* <i className="la la-check"></i> */}
                </label>
              </div>
              <div className="col-12">
                <label className="single-input-inner">
                  <span>Email</span>
                  <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setFieldValue('email', e.target.value)}
                    name="email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                  {/* <i className="la la-check"></i> */}
                </label>
              </div>
              <div className="col-12">
                <label className="single-input-inner">
                  <span>Address</span>
                  <input
                    type="text"
                    placeholder="Address"
                    onChange={(e) => setFieldValue('address', e.target.value)}
                    name="address"
                  />
                  {/* <i className="la la-check"></i> */}
                </label>
              </div>
              <div className="col-12">
                <label className="single-input-inner">
                  <span>Password</span>
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setFieldValue('password', e.target.value)}
                    name="password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger"
                  />
                  {/* <i className="la la-check"></i> */}
                </label>
              </div>
              <div className="col-12">
                <label className="single-input-inner">
                  <span>Re-type Password</span>
                  <input
                    type="password"
                    placeholder="Re-type Password"
                    onChange={(e) => {
                      setFieldValue('confirmPassword', e.target.value);
                      // checkPassword(values, e.target.value);
                    }}
                    name="confirmPassword"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-danger"
                  />
                  {values.confirmPassword !== values.password && (
                    <div className="text-danger">
                      Passwords Don&lsquo;t Match
                    </div>
                  )}
                </label>
              </div>
            </div>
            <div className="nav-right-part  button-new-css-design  w-100 ">
              <button className="btn btn-red w-100 mt-3" type="submit">
                Register Now
              </button>
            </div>
            <br />
          </form>
        );
      }}
    </Formik>
  );
}
