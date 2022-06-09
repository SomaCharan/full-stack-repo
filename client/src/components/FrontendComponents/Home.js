import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import Preloader from '../sharedComponents/Preloader';

const Footer = React.lazy(() => import('../sharedComponents/Footer'));
const Navbar = React.lazy(() => import('../sharedComponents/Navbar'));
const Product = React.lazy(() => import('../sharedComponents/Product'));

export default function Home() {
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

  const takeAwayPictures = [
    'https://res.cloudinary.com/dtqrvcvp8/image/upload/v1653750295/product/1650133432_xl8o90.png',
    'https://res.cloudinary.com/dtqrvcvp8/image/upload/v1653750294/product/1650133467_t1la1z.png',
    'https://res.cloudinary.com/dtqrvcvp8/image/upload/v1653750293/product/1650133349_xwmnrj.png',
    'https://res.cloudinary.com/dtqrvcvp8/image/upload/v1653750292/product/1650133413_sl8tbx.png',
    'https://res.cloudinary.com/dtqrvcvp8/image/upload/v1653750290/product/1650133393_oilsgc.png',
    'https://res.cloudinary.com/dtqrvcvp8/image/upload/v1653750290/product/1650133437_rirtw4.png',
    'https://res.cloudinary.com/dtqrvcvp8/image/upload/v1653750289/product/1650133311_olyjup.png',
    'https://res.cloudinary.com/dtqrvcvp8/image/upload/v1653750288/product/1650133260_kjvlji.png',
    'https://res.cloudinary.com/dtqrvcvp8/image/upload/v1653750288/product/1650132384_mijduj.png',
    'https://res.cloudinary.com/dtqrvcvp8/image/upload/v1653750288/product/1650133152_fldb6f.png',
    'https://res.cloudinary.com/dtqrvcvp8/image/upload/v1653750288/product/1650132379_e2cvoq.png',
    'https://res.cloudinary.com/dtqrvcvp8/image/upload/v1653750287/product/1650132469_lqx7ig.png',
    'https://res.cloudinary.com/dtqrvcvp8/image/upload/v1653750287/product/1650133218_nfzc4a.png',
    'https://res.cloudinary.com/dtqrvcvp8/image/upload/v1653750284/product/1650132316_skdczc.png',
    'https://res.cloudinary.com/dtqrvcvp8/image/upload/v1653750284/product/1650133191_rpey2i.png',
    'https://res.cloudinary.com/dtqrvcvp8/image/upload/v1653750282/product/1650132288_qgnenr.png',
  ]
  return (
    <Suspense fallback={Preloader}>
      <>
        {/* <Preloader /> */}
        <Navbar />
        {/* <!-- banner start --> */}
        <div className="banner-area">
          <div className="container">
            <div className="banner-area-inner">
              <div className="row">
                <div className="col-md-6 col-sm-12 order-md-last mb-4 mb-md-0">
                  <img
                    rel="preload"
                    src="https://res.cloudinary.com/dtqrvcvp8/image/upload/v1650883488/1_sk02ni.png"
                    alt="img"
                    id="banner-image"
                  />
                </div>
                <div className="col-md-6 order-md-0 align-self-center">
                  <div className="banner-inner">
                    <h2>Welcome to the world of success</h2>
                    <p>
                      Enter Into The India&apos;s Most Successful Digital
                      marketing Training Platform.
                    </p>
                    <div className="btn-wrap button-new-css-design">
                      <Link
                        className="btn btn-red button-new-css-design"
                        to="/products"
                      >
                        <img src="assets/img/icon/1.png" alt="img" />
                        Join Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- banner end --> */}

        {/* <!-- Plan area Start --> */}
        <div className="about-area pd-top-150">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-8">
                <div className="thumb">
                  {/* <img src="assets/img/other/1.png" alt="img" /> */}

                  <embed
                    src="https://www.youtube.com/embed/X0Spy_gAo8c"
                    wmode="transparent"
                    type="video/mp4"
                    width="560"
                    height="315"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="YouTube video player"
                  />
                  {/* <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/X0Spy_gAo8c"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  /> */}
                </div>
              </div>
              <div className="col-lg-6 mt-lg-0 mt-4 align-self-center">
                <div className="about-inner">
                  <div className="section-title">
                    <h2>Your Plan To success</h2>
                    {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p> */}
                  </div>
                  <a
                    href="https://www.youtube.com/watch?v=X0Spy_gAo8c"
                    className="video-btn video-play-btn mfp-iframe"
                    tabIndex="0"
                  >
                    <i className="fa fa-play" /> Watch Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Plan area end --> */}

        {/* <!-- Speaker area Start --> */}
        <div className="speaker-area pd-top-140">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-7 col-lg-8">
                <div className="section-title text-center">
                  <h2>Heres Your Takeaways</h2>
                  {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt consectetur ut et dolore magna aliqua.</p> */}
                </div>
              </div>
            </div>
            <div id='takeaways_carousal'>
              <Carousel>
                {takeAwayPictures.map((img) => (
                  <img className="product-takeaways" src={img} alt='TakeAways' style={{ minWidth: "100% !important" }} />
                ))}
              </Carousel>
            </div>
          </div>
        </div>
        {/* <!-- Speaker area End --> */}

        {/* <!-- About me Start --> */}
        <div className="about-area pd-top-150">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-8  col-sm-12">
                <div className="thumb">
                  <img
                    src="https://res.cloudinary.com/dtqrvcvp8/image/upload/v1650883492/2_zktndt.png"
                    alt="img"
                    id="about-me-image"
                  />
                </div>
              </div>
              <div className="col-lg-6 mt-lg-0 mt-4 align-self-center">
                <div className="about-inner">
                  <div className="section-title">
                    <h2>About Me</h2>
                    <p>
                      Just like you, EVen I am Young kid having big dreams.
                      founder of successthinks, & I ahave trained over 500+
                      studnets, & WOrked with 25+ brands, & Served 300+ Clients
                      as Freelance digital marketer, Having around 2 years of
                      experience, Ufffff, I know heck alot of introduction. To
                      know more about me,
                    </p>
                  </div>
                  <div className="nav-right-part nav-right-part-desktop button-new-css-design">
                    <Link to="/about-mentor" className="btn btn-red mr-4 ">
                      About Me
                    </Link>
                  </div>
                  {/* <a className="btn btn-red mr-4" href="#">
                  Click here
                </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- About me end --> */}

        {/* <!-- About our CEO Start --> */}
        <div className="about-area pd-top-150">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mt-lg-0 mt-4 align-self-center">
                <div className="about-inner">
                  <div className="section-title">
                    <h2>About Our CEO</h2>
                    <p>
                      So, Now I am Introducing Our CEO, Miss.Nishtha Deep, She
                      Have been the most Successful student in Successthinks &
                      Earned as CEO by rocking in her Freelance Career, Worked
                      with 5 Brands & SO passionate + most lovely Person I met
                      as personal, Served more than 50+ high ticket clients as
                      freelancer, & yet Very good friend of mine!
                    </p>
                  </div>
                  {/* <a className="btn btn-red mr-4" href="#">
                  Click here
                </a> */}
                  {/* <a href="https://www.youtube.com/watch?v=WwvNiN2_Jlk" className="video-btn video-play-btn mfp-iframe" tabindex="0"><i className="fa fa-play"></i> Watch Now</a> */}
                </div>
              </div>
              <div className="col-lg-6 col-md-8  col-sm-12">
                <div className="thumb">
                  <img
                    src="https://res.cloudinary.com/dtqrvcvp8/image/upload/v1650883488/3_wwwfbm.png"
                    alt="img"
                    id="about-ceo-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- About our CEO end --> */}

        {/* <!-- Short story Start --> */}
        <div className="about-area pd-top-150">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-8  col-sm-12">
                <div className="thumb">
                  <img
                    src="https://res.cloudinary.com/dtqrvcvp8/image/upload/v1650883489/4_kac0hd.png"
                    alt="img"
                    id="short-story"
                  />
                </div>
              </div>
              <div className="col-lg-6 mt-lg-0 mt-4 align-self-center">
                <div className="about-inner">
                  <div className="section-title">
                    <h2>Short Story for you</h2>
                    <p>
                      This Platform Was My dream, I have struggled & Got scammed
                      worth of 2,00,000rs In search of proper Digital marketing
                      guidance & startups, but After Facing Huge losses I learnt
                      to Rise in this market, Be a absolute money making
                      machine, So, This SUCCESSTHINKS is a sum of all the
                      lessons from my life regarding DIgtal marketing Along with
                      Top Business men from india as a Guest Coach for you
                      sharing their Money lessons in order to train you to be
                      Millionaire & As this platform will not just be a learning
                      system can also act as Money making system too. What else
                      you need to Say Yes For This platform
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Short story end --> */}

        {/* <!-- Testimonial Start --> */}
        <div className="speaker-area pd-top-140">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-7 col-lg-8">
                <div className="section-title text-center">
                  <h2>Listen what my students say</h2>
                </div>
              </div>
            </div>
            <div id='testimonial_carousal'>
              <Carousel >
                <iframe
                  className='testimonial-video'
                  // width="560"
                  // height="400"
                  src="https://www.youtube.com/embed/N_xN5jKVF18"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <iframe
                  className='testimonial-video'
                  // width="560"
                  // height="400"
                  src="https://www.youtube.com/embed/XdkPswMcSaM"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />

                <iframe
                  className='testimonial-video'
                  // width="560"
                  // height="400"
                  src="https://www.youtube.com/embed/1cFukGEZwh0"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Carousel>
            </div>
          </div>
        </div>
        {/* <!-- Testimonial End --> */}

        {/* product area start --> */}
        <div className="Pricing-area partner-page-area pd-top-150 pd-bottom-120">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-7 col-lg-8">
                <div className="section-title text-center">
                  <h2>Our Products</h2>
                </div>
              </div>
            </div>
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
        {/* product area end */}
        <br />

        {/* <!-- complimentary area Start --> */}
        <div className="complimentary-area bg-red">
          <div className="container">
            <div className="complimentary-area-inner">
              <div className="row custom-gutters-20 " id="complimentary-row">
                <div className="col-lg-6 col-sm-6">
                  <div className="thumb">
                    <img
                      src="https://res.cloudinary.com/dtqrvcvp8/image/upload/v1650883490/5_gxyjzn.png"
                      alt="img"
                      id="complimentary-image"
                    />
                  </div>
                </div>
                <div className="col-lg-6 align-self-center">
                  <div className="section-title style-white pl-xl-5">
                    <h2 className="text-dark">You are so amazing!</h2>
                    <p className="text-dark">
                      I know that if you have came this far, You are having the
                      Fire That was running within me when I was at starting
                      position, so, I decided to Give you a free Ebook of
                      &quot;How to Start a Startup&quot; Guide which is Worth
                      999rs for free! Enter your Email to get
                    </p>
                  </div>
                  <div className="widget widget_subscribe ">
                    <div className="input-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        aria-describedby="basic-addon2"
                        required="required"
                      />
                      <button className="btn btn-primary" type="button">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- complimentary area End --> */}

        <Footer />
      </>
    </Suspense>
  );
}
