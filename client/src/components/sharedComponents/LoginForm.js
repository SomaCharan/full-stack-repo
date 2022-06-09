import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { login } from '../../redux/actions/authActions';

export default function LoginForm() {
  const dispatch = useDispatch();

  const handleOnSubmit = async (values) => {
    dispatch(login(values));
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={handleOnSubmit}
      validationSchema={yup.object().shape({
        email: yup.string().required('This field is required.'),
        password: yup.string().required('This field is required.'),
      })}
    >
      {(props) => {
        const { setFieldValue, handleSubmit, values } = props;
        return (
          <form className="login-area-inner pr-lg-4" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <p>Login Here if you are already member Of Successthinks. </p>
            <label className="single-input-inner">
              <span>Email address*</span>
              <input
                type="text"
                placeholder="your@gmail.com"
                value={values.email}
                onChange={(e) => setFieldValue('email', e.target.value)}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
              {/* <i className="la la-check"></i> */}
            </label>
            <label className="single-input-inner">
              <span>Password</span>
              <input
                type="password"
                placeholder="Password"
                value={values.password}
                onChange={(e) => setFieldValue('password', e.target.value)}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger"
              />
              {/* <i className="la la-check"></i> */}
            </label>
            <div className="row">
              <div className="col-md-6">
                {/* <label className="single-checkbox-inner">
                  <input type="checkbox" />
                  <span>Show Password</span>
                </label> */}
              </div>
              <div className="col-md-6 text-md-right">
                {/* TODO later */}
                {/* <label
                  className="single-checkbox-inner"
                  htmlFor="ForgotPasword"
                >
                  <Link to="/">Forgot password?</Link>
                </label> */}
              </div>
            </div>

            <div className="nav-right-part  button-new-css-design">
              <button className="btn btn-red w-100 mt-3" type="submit">
                Login
              </button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
}
