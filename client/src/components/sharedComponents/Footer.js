import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer-area bg-red">
      <div className="container">
        <div className="footer-top">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="widget widget_about">
                <div className="thumb">
                  <img
                    src="https://res.cloudinary.com/dtqrvcvp8/image/upload/v1650883782/1_vp11ij.png"
                    alt="img"
                    id="logo-image"
                  />
                </div>
                <div className="details">
                  <p className="text-dark">
                    I have tried My best today, Hope I am successful to add tons
                    of value into your life.. If you Want to connect with me,
                    You can through these social links below!
                  </p>
                  <ul className="social-area">
                    <li>
                      <a href="https://www.youtube.com/channel/UCZcuFVr2FGMBTmT8Eoh4feA">
                        <i className="fa fa-youtube text-dark" />
                      </a>
                    </li>
                    <li>
                      <a href="https://twitter.com/successthinks/">
                        <i className="fa fa-twitter text-dark" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/successthinks/">
                        <i className="fa fa-instagram text-dark" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <br />
              <br />
              <h4 className="widget-title text-dark">Usefull Links</h4>
              <div className="widget widget_nav_menu">
                <ul>
                  <li>
                    <Link className="text-dark" to="/">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link className="text-dark" to="/products">
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link className="text-dark" to="/contact">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link className="text-dark" to="/login">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link className="text-dark" to="/login">
                      Join Us
                    </Link>
                  </li>
                  <li>
                    <Link className="text-dark" to="/privacy-policy">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <img
                src="https://res.cloudinary.com/dtqrvcvp8/image/upload/v1650883490/6_pw2hhu.png"
                id="footer-image"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom text-center">
        <div className="container">
          <p className="text-dark">
            © 2022 Created by Shubham / All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
