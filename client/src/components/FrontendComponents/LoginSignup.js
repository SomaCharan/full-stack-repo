import React, { useEffect, Suspense } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Preloader from '../sharedComponents/Preloader';

const Footer = React.lazy(() => import('../sharedComponents/Footer'));
const Navbar = React.lazy(() => import('../sharedComponents/Navbar'));
const LoginForm = React.lazy(() => import('../sharedComponents/LoginForm'));
// const SignupForm = React.lazy(() => import('../sharedComponents/SignupForm'));

export default function LoginSignup() {
  const navigate = useNavigate();
  const authReducer = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (authReducer.isAuthenticated) {
      navigate('/dashboard');
      window.location.reload();
    }
  }, [authReducer.isAuthenticated]);

  return (
    <Suspense fallback={Preloader}>
      <>
        {/* <Preloader /> */}
        <Navbar />
        {/* <!--page-title area start--> */}

        <section className="page-title-area" id="contact-us-header">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-sm-12">
                <img
                  src="https://res.cloudinary.com/dtqrvcvp8/image/upload/v1650883491/9_vxqly9.png"
                  id="contact-form-image"
                  alt=""
                />
              </div>
              <div className="col-lg-6 contact-us-page-title col-sm-12 mt-5">
                <h2>Finally, Feels so Happy, that You are doing it!</h2>
                <p>
                  From This point of step In successthinks, Things will Go
                  insanely interesting. Will wait For your Success Champ, Go for
                  it!
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* <!--page-title area end--> */}

        {/* <!-- login area Start --> */}
        <div className="login-area pd-top-150 pd-bottom-120">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <LoginForm />
              </div>
              <div className="col-lg-6 mt-lg-0 mt-5">
                <div className="nav-right-part  button-new-css-design">
                 <h3> Register Now </h3>
                  <Link
                    to="/products"
                    className="btn btn-red w-100 mt-3"
                    type="submit"
                  >
                    Register Now
                  </Link>
                </div>
                {/* <SignupForm /> */}
              </div>
            </div>
          </div>
        </div>

        {/* <!-- login area End --> */}
        <Footer />
      </>
    </Suspense>
  );
}
