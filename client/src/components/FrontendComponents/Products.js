import React, { Suspense } from 'react';
import Preloader from '../sharedComponents/Preloader';

const Footer = React.lazy(() => import('../sharedComponents/Footer'));
const Navbar = React.lazy(() => import('../sharedComponents/Navbar'));
const Product = React.lazy(() => import('../sharedComponents/Product'));

export default function Products() {
  const successKitpointsValid = [
    '90+ Learning Videos',
    'personality development bundle',
    'Communication Mastery',
    'Public speaking Mastery',
    'Canva Bundle',
    'Instagram Mastery',
    'Facebook Expertise',
    'Google ads bundle',
    'Lead Generation Expertise',
    'leadership Mastery',
    'how to start a startup',
    'Sales Mastery',
    'YouTube marketing',
    'Email Marketing',
    'Video Creation influence',
    'Crypto Expertise',
    'Free successthinks branded T shirt',
    'Free Monetization Ebook',
    'Free 20 mins dept talk',
    'Free Affiliate Access',
    'Surprise Gift over completion of The courses',
  ];

  const successKitpointsInvalid = [];

  const MiniSuccessKitpointsValid = [
    '40+ Learning Videos',
    'Communication Mastery',
    'Canva Bundle',
    'Instagram Mastery',
    'Facebook Expertise',
    'Lead Generation Expertise',
    'Sales Mastery',
    'Free Monetization Ebook',
    'Free Affiliate Access',
  ];

  const MiniSuccessKitpointsInvalid = [
    'personality development bundle',
    'Google ads bundle',
    'Public speaking Mastery',
    'leadership Mastery',
    'how to start a startup',
    'YouTube marketing',
    'Email Marketing',
    'Video Creation influence',
    'Crypto Expertise',
    'Free successthinks branded T shirt',
    'Free 20 mins dept talk',
    'Surprise Gift over completion of The courses',
  ];

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
                  src="https://res.cloudinary.com/dtqrvcvp8/image/upload/v1650883494/10_qigofi.png"
                  id="contact-form-image"
                  alt=""
                />
              </div>
              <div className="col-lg-6 contact-us-page-title col-sm-12 mt-5">
                <h4>
                  Now I am watching One game changer Decide to became Money
                  Making machine.
                </h4>
                <p>
                  Here are 3 Keys for your treasure, The More better one You
                  choose, The more Bigger One you can Grab.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* <!--page-title area end--> */}

        {/* <!-- Pricing area Start --> */}
        <div className="Pricing-area partner-page-area pd-top-150 pd-bottom-120">
          <div className="container">
            <div className="row justify-content-center">
              <Product
                image="https://res.cloudinary.com/dtqrvcvp8/image/upload/v1650883784/7_mfuaq8.png"
                varClass="col-lg-5 col-md-6"
                productName="Success Kit"
                productPrice="4999"
                validPoints={successKitpointsValid}
                invalidPoints={successKitpointsInvalid}
                productId="1"
              />

              <Product
                image="https://res.cloudinary.com/dtqrvcvp8/image/upload/v1651574841/1651563051_1_crbkx0.png"
                varClass="col-lg-5 col-md-6"
                productName="Mini Success Kit"
                productPrice="1999"
                validPoints={MiniSuccessKitpointsValid}
                invalidPoints={MiniSuccessKitpointsInvalid}
                productId="2"
              />
            </div>
          </div>
        </div>
        {/* <!-- Pricing area End --> */}
        <Footer />
      </>
    </Suspense>
  );
}
