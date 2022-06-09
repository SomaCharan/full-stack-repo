/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import $ from 'jquery';
import { logout } from '../../../redux/actions/authActions';
import CopyToClipBoardIconButton from './CopyToClipBoardIconButton';

export default function DashboardHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authReducer = useSelector((state) => state.authReducer);

  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/login');
      window.location.reload();
    }
  }, [isAuthenticated]);

  const isVideoPage = window.location.href.includes('video');

  const [showSearch, setShowSearch] = useState(false);

  const showVideos = () => {
    const mobileVideosArea = $('#sidebar-mobile-videos-menu');
    mobileVideosArea.addClass('sidebar-mobile-expanded');
  };

  const showMenu = () => {
    const mobileMenuArea = $('#main-sidebar-mobile');
    mobileMenuArea.addClass('sidebar-mobile-expanded');
  };

  const varShowSearch = () => {
    const mobileSearchArea = $('#navbar-search');
    if (showSearch === false) {
      mobileSearchArea.addClass('show');
    } else {
      mobileSearchArea.removeClass('show');
    }
    setShowSearch(!showSearch);
  };

  return (
    <>
      {/* <!-- Main navbar --> */}
      <div className="navbar navbar-expand-lg navbar-dark navbar-static" style={{ background: 'linear-gradient(to right, #003399 0%, #0066ff 100%)' }}>
        <div className="d-flex flex-1 d-lg-none">
          <button
            className="navbar-toggler sidebar-mobile-main-toggle"
            type="button"
            onClick={() => showMenu()}
          >
            <i className="icon-paragraph-justify3" />
          </button>

          <CopyToClipBoardIconButton
            // disabled={authReducer?.user?.userType === '2'}
            className="navbar-toggler"
            clipBoardValue={`${window.location.origin}?referer=${authReducer?.user?.userreference}`}
          />

          <button
            type="button"
            className="navbar-toggler"
            data-toggle="collapse"
            onClick={() => varShowSearch()}
          >
            <i className="icon-search4" />
          </button>
        </div>

        <div className="navbar-brand text-center text-lg-left">
          <Link to="/dashboard" className="d-inline-block">
            <img
              src="https://res.cloudinary.com/dtqrvcvp8/image/upload/v1650883782/1_vp11ij.png"
              style={{ width: '30px' }}
              className="d-none d-sm-block"
              alt="Logo"
            />
            <img
              src="https://res.cloudinary.com/dtqrvcvp8/image/upload/v1650883782/1_vp11ij.png"
              style={{ width: '30px' }}
              className="d-sm-none"
              alt="Logo"
            />
          </Link>
        </div>

        <div
          className="navbar-collapse collapse flex-lg-1 mx-lg-3 order-2 order-lg-1"
          id="navbar-search"
        >
          <div className="navbar-search d-flex align-items-center py-2 py-lg-0">
            <div className="form-group-feedback form-group-feedback-left flex-grow-1">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
              />
              <div className="form-control-feedback">
                <i className="icon-search4 text-white opacity-50" />
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end align-items-center flex-1 flex-lg-0 order-1 order-lg-2">
          <ul className="navbar-nav flex-row align-items-center">
          <li className="nav-item d-lg-none mr-2 align-items-center">
            <img
              src={
                authReducer?.user?.profile_image
                  ? authReducer?.user?.profile_image
                  : 'https://res.cloudinary.com/dtqrvcvp8/image/upload/v1652010949/w1brnxd9vrid1d21fbi6.jpg'
              }
              className="img-fluid rounded-circle shadow-sm text-center"
              style={{
                height: '40px',
                width: '40px',
                backgroundColor: 'lightblue',
              }}
              alt=""
            />
            </li>

            <li className="nav-item">
              <button
                style={{ backgroundColor: '#ff3300', color: 'white' }}
                type="button"
                className="btn"
                onClick={() => dispatch(logout())}
              >
                Logout <i className="icon-switch" />
              </button>
              {isVideoPage && (
                <button
                  type="button"
                  className="navbar-toggler sidebar-mobile-right-toggle"
                  onClick={() => showVideos()}
                >
                  <i className="icon-video-camera3" />
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
      {/* <!-- /main navbar --> */}
    </>
  );
}
