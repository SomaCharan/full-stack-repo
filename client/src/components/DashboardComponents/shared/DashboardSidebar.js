/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import $ from 'jquery';
import Tooltip from '@material-ui/core/Tooltip';
import { Link, useNavigate } from 'react-router-dom';
import CopyToClipBoardIconButton from './CopyToClipBoardIconButton';
import Popup from './Popup';
import Button from './Button';
import setAuthToken from '../../../utils/setAuthToken';
import { editUserImage } from '../../../redux/actions/userActions';
import setGlobalLoader from '../../../redux/actions/dashboardLoaderActions';

export default function DashboardSidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [successKitMenu, setSuccessKitMenu] = useState(false);
  const [successKitMiniMenu, setSuccessKitMiniMenu] = useState(false);
  const [affiliateDashboard, setAffiliateDashboard] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const authReducer = useSelector((state) => state.authReducer);

  const isSuccessKit = authReducer?.user?.products?.includes('1');
  const isSuccessKitMini = authReducer?.user?.products?.includes('2');
  const isUser = authReducer?.user?.userType?.includes('2');
  const isAdmin = authReducer?.user?.userType?.includes('0');

  const uploadFile = () => {
    setGlobalLoader(true);
    // getting the file using useState was not working here, so used jquery
    const image = $('#profile_image_chnage').prop('files')[0];

    const formData = new FormData();
    formData.append('image', image);

    // case sensitive data
    const configHeaders = {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    };

    dispatch(
      editUserImage(
        authReducer?.user?.userreference,
        formData,
        configHeaders,
        setOpenModal
      )
    );
  };

  const inputField = () => (
    <>
      <div className="d-flex justify-content-center">
        <input type="file" id="profile_image_chnage" />
      </div>
      <br />
      <div className="d-flex container col-lg-6  justify-content-around">
        <Button
          text="Submit"
          type="submit"
          className="btn btn-sm btn-primary"
          onClick={() => uploadFile()}
        />
        <Button
          text="Close"
          type="reset"
          className="btn btn-sm btn-danger"
          onClick={() => setOpenModal(false)}
        />
      </div>
    </>
  );

  // toggle menu
  const showAffiliateDashboard = () => {
    if (affiliateDashboard === false) {
      $('#affiliateDashboardMenu').css('display', 'block');
      setAffiliateDashboard(true);
    } else {
      $('#affiliateDashboardMenu').css('display', 'none');
      setAffiliateDashboard(false);
    }
  };

  // toggle menu
  const showMenuSuccessKit = () => {
    if (successKitMenu === false) {
      $('#successKitMenu').css('display', 'block');
      setSuccessKitMenu(true);
    } else {
      $('#successKitMenu').css('display', 'none');
      setSuccessKitMenu(false);
    }
  };

  // toggle menu
  const showMenuSuccessKitMini = () => {
    if (successKitMiniMenu === false) {
      $('#successKitMiniMenu').css('display', 'block');
      setSuccessKitMiniMenu(true);
    } else {
      $('#successKitMiniMenu').css('display', 'none');
      setSuccessKitMiniMenu(false);
    }
  };

  useEffect(() => {
    if (!authReducer.isAuthenticated) {
      navigate('/login');
      return;
    }

    if (localStorage.token) {
      setAuthToken(localStorage.token);
    } else {
      console.log('no token to send');
      return;
    }

    setModalContent(inputField);
  }, [authReducer]);

  $('#main-sidebar-mobile').css('height', '100vh');

  const hideMenu = () => {
    const mobileMenuArea = $('#main-sidebar-mobile');
    mobileMenuArea.removeClass('sidebar-mobile-expanded');
  };

  return (
    // <!-- Main sidebar -->
    <div
      className="sidebar sidebar-light sidebar-main sidebar-expand-lg"
      id="main-sidebar-mobile"
    >
      {/* <!-- Sidebar content --> */}
      <div className="sidebar-content">
        {/* <!-- User menu --> */}
        <div className="sidebar-section">
          <div className="sidebar-user-material">
            <div className="sidebar-section-body">
              <div className="d-flex justify-content-between">
                <div className="flex-1">
                  <button
                    type="button"
                    className="btn btn-outline-light border-transparent btn-icon btn-sm rounded-pill"
                    onClick={() => setOpenModal(true)}
                  >
                    <i className="icon-wrench" />
                  </button>
                </div>
                <img
                  src={
                    authReducer?.user?.profile_image
                      ? authReducer?.user?.profile_image
                      : 'https://res.cloudinary.com/dtqrvcvp8/image/upload/v1652010949/w1brnxd9vrid1d21fbi6.jpg'
                  }
                  className="img-fluid rounded-circle shadow-sm text-center"
                  style={{
                    height: '80px',
                    width: '80px',
                    backgroundColor : 'lightblue',
                  }}
                  alt=""
                />

                <div className="flex-1 text-right">
                  <CopyToClipBoardIconButton
                    // disabled={isUser}
                    className="btn btn-outline-light border-transparent btn-icon rounded-pill btn-sm sidebar-control sidebar-main-resize d-none d-lg-inline-flex"
                    clipBoardValue={`${window.location.origin}?referer=${authReducer?.user?.userreference}`}
                  />

                  <button
                    type="button"
                    className="btn btn-outline-light border-transparent btn-icon rounded-pill btn-sm sidebar-mobile-main-toggle d-lg-none"
                    onClick={() => hideMenu()}
                  >
                    <i className="icon-cross2" />
                  </button>
                </div>
              </div>

              <div className="text-center">
                <h6 className="mb-0 text-white text-shadow-dark mt-3">
                  {authReducer?.user?.name}
                </h6>
                <span className="font-size-sm text-white text-shadow-dark">
                  @{authReducer?.user?.username}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- /user menu --> */}

        {/* <!-- Main navigation --> */}
        <div className="sidebar-section">
          <ul className="nav nav-sidebar" data-nav-type="accordion">
            {/* <!-- Main --> */}
            <li className="nav-item-header">
              <div className="text-uppercase font-size-xs line-height-xs">
                Menu
              </div>
              <i className="icon-menu" title="Main" />
            </li>

            {isUser === false ? (
              <li className="nav-item nav-item-submenu">
                <a
                  href="#"
                  className="nav-link"
                  onClick={() => showAffiliateDashboard()}
                >
                  <i className="icon-home4" role="button" />
                  <span>Dashboard</span>
                </a>
                <ul
                  className="nav nav-group-sub"
                  data-submenu-title="Menu levels"
                  id="affiliateDashboardMenu"
                >
                  <li className="nav-item">
                    <Link to="/dashboard" className="nav-link">
                      <i className="icon-home4" />
                      <span>Dashboard</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/dashboard/affiliate-dashboard"
                      className="nav-link"
                    >
                      <i className="icon-cash3" />
                      <span>Affiliate Dashboard</span>
                    </Link>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">
                  <i className="icon-home4" />
                  <span>Dashboard</span>
                </Link>
              </li>
            )}
            {/* <li className="nav-item">
              <Link to="/bank-information" className="nav-link">
                <i className="icon-coin-dollar" />
                <span>Bank Information</span>
              </Link>
            </li> */}
            <li className="nav-item">
              <Link to="/payments" className="nav-link">
                <i className="icon-coin-dollar" />
                <span>Payments</span>
              </Link>
            </li>

            {isSuccessKit || isAdmin ? (
              <li className="nav-item nav-item-submenu">
                <a
                  href="#"
                  className="nav-link"
                  onClick={() => showMenuSuccessKit()}
                >
                  <i className="icon-bag" role="button" />
                  <span>Success Kit</span>
                </a>
                <ul
                  className="nav nav-group-sub"
                  data-submenu-title="Menu levels"
                  id="successKitMenu"
                >
                  <li className="nav-item">
                    <Link to="/success-kit/videos" className="nav-link">
                      <i className="icon-video-camera3" />
                      <span>Videos</span>
                    </Link>
                  </li>
                </ul>
              </li>
            ) : (
              <span className="nav-item">
                <a href="#" className="nav-link">
                  <i className="icon-bag" />
                  Success Kit
                  <Tooltip title="This Content is Locked for you.">
                    <span className="badge badge-danger badge-pill ml-auto p-0">
                      <i className="icon-lock mr-2 ml-2" />
                    </span>
                  </Tooltip>
                </a>
              </span>
            )}

            {isSuccessKitMini || isAdmin ? (
              <li className="nav-item nav-item-submenu">
                <a
                  href="#"
                  className="nav-link"
                  onClick={() => showMenuSuccessKitMini()}
                >
                  <i className="icon-bag" role="button" />
                  <span>Mini Success Kit</span>
                </a>
                <ul
                  className="nav nav-group-sub"
                  data-submenu-title="Menu levels"
                  id="successKitMiniMenu"
                >
                  <li className="nav-item">
                    <Link to="/mini-success-kit/videos" className="nav-link">
                      <i className="icon-video-camera3" />
                      <span>Videos</span>
                    </Link>
                  </li>
                </ul>
              </li>
            ) : (
              <span className="nav-item">
                <a href="#" className="nav-link">
                  <i className="icon-bag" />
                  Mini Success Kit
                  <Tooltip title="This Content is Locked for you.">
                    <span className="badge badge-danger badge-pill ml-auto p-0">
                      <i className="icon-lock mr-2 ml-2" />
                    </span>
                  </Tooltip>
                </a>
              </span>
            )}

            {authReducer?.user?.userType === '0' && (
              <>
                <li className="nav-item">
                  <Link to="/add-user" className="nav-link">
                    <i className="icon-user-plus" />
                    <span>Add User</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/users" className="nav-link">
                    <i className="icon-users" />
                    <span>Users</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/add-video" className="nav-link">
                    <i className="icon-video-camera3" />
                    <span>Add Video</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/all-videos" className="nav-link">
                    <i className="icon-video-camera3" />
                    <span>All Videos</span>
                  </Link>
                </li>
                <li className="nav-item">
              <Link to="/withdrawal-requests" className="nav-link">
                <i className="icon-link" />
                <span>Withdrawal Requests</span>
              </Link>
            </li>
              </>
            )}
            {/* <!-- /main --> */}
          </ul>
        </div>
        {/* <!-- /main navigation --> */}
      </div>
      <Popup
        setOpenModal={setOpenModal}
        openModal={openModal}
        maxWidth="sm"
        Title="Update New Image"
        Content={modalContent}
      />
      {/* <!-- /sidebar content --> */}
    </div>

    // {/* <!-- /main sidebar --> */}
  );
}
