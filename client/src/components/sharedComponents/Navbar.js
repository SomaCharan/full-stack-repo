import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import $ from 'jquery';

export default function Navbar() {
  const [searchParams] = useSearchParams();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  // setup introducer reference in cookie for 2 days
  if (
    searchParams.get('referer') !== null &&
    (Cookies.get('referer') === 'null' ||
      Cookies.get('referer') === null ||
      Cookies.get('referer') === undefined)
  ) {
    Cookies.set('referer', searchParams.get('referer'), {
      expires: 2,
    });
  }

  const [open, setOpen] = useState(false);

  const showMenu = () => {
    const mobileMenuIcon = $('#toggle-btn-mobile');
    const mobileMenuArea = $('.navbar-area .navbar-collapse');

    if (open === false) {
      mobileMenuIcon.addClass('open');
      mobileMenuArea.addClass('sopen');
    } else {
      mobileMenuIcon.removeClass('open');
      mobileMenuArea.removeClass('sopen');
    }

    setOpen(!open);
  };
  return (
    <>
      {/* < Preloader /> */}
      <div className="navbar-area">
        <nav className="navbar navbar-expand-lg">
          <div className="container nav-container">
            <div className="responsive-mobile-menu">
              <button
                className="menu toggle-btn d-block d-lg-none"
                data-target="#eventa7_main_menu"
                aria-expanded="false"
                aria-label="Toggle navigation"
                id="toggle-btn-mobile"
                onClick={() => showMenu()}
                type="button"
              >
                <span className="icon-left" />
                <span className="icon-right" />
              </button>
            </div>
            <div className="logo">
              <Link className="main-logo" to="/">
                <img
                  src="https://res.cloudinary.com/dtqrvcvp8/image/upload/v1650883782/1_vp11ij.png"
                  style={{ width: '30px' }}
                  alt="img"
                  id="logo-image"
                />
              </Link>
              <Link className="sticky-logo" to="/">
                <img
                  src="https://res.cloudinary.com/dtqrvcvp8/image/upload/v1650883782/1_vp11ij.png"
                  style={{ width: '30px' }}
                  alt="img"
                  id="logo-image"
                />
              </Link>
            </div>
            <div className="nav-right-part nav-right-part-mobile button-new-css-design">
              <Link className="btn btn-red button-new-css-design " to="/login">
                Login
              </Link>
            </div>
            <div className="collapse navbar-collapse" id="eventa7_main_menu">
              <ul className="navbar-nav menu-open">
                <li className="current-menu-item">
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/products">Products</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </ul>
            </div>
            <div className="nav-right-part nav-right-part-desktop button-new-css-design">
              <Link className="btn btn-red " to="/login">
                Join Us
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
