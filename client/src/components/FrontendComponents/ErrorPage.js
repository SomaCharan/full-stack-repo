import { Link } from 'react-router-dom';
import React, { Suspense } from 'react';
import Preloader from '../sharedComponents/Preloader';

const Footer = React.lazy(() => import('../sharedComponents/Footer'));
const Navbar = React.lazy(() => import('../sharedComponents/Navbar'));
export default function ErrorPage() {
  return (
    <Suspense fallback={Preloader}>
      <>
      <link rel="stylesheet" href="assets/css/vendor.css" />
          <link rel="stylesheet" href="assets/css/style.css" />
          <link rel="stylesheet" href="assets/css/responsive.css" />
        {/* <Preloader /> */}
        <Navbar />

        {/* <!-- error page start --> */}
        <div className="error-area">
          <div className="container">
            <div className="error-area-inner">
              <div className="row justify-content-center">
                <div className="col-xl-8 col-lg-8 col-md-10 text-center">
                  <h2>Ooups, page not found</h2>
                  <p>
                    We are very sory for the inconvenience. It looks like
                    you&apos;re trying to access a page that has been deleted or
                    never even existed.
                  </p>
                  <div className="btn-wrap">
                    <Link className="btn btn-red" to="/">
                      BACK TO HOMEPAGE
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- error page end -->  */}
        <Footer />
      </>
    </Suspense>
  );
}
