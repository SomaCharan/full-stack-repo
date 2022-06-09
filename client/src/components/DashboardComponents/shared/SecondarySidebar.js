/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import $ from 'jquery';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { getVideos } from '../../../redux/actions/videoActions';
import setGlobalLoader from '../../../redux/actions/dashboardLoaderActions';

export default function SecondarySidebar({ setCurrentVideo }) {
  const dispatch = useDispatch();
  const [videos, setVideos] = useState([]);
  const location = useLocation();
  const productId = window.location.href.includes('mini') ? '2' : '1';

  useEffect(() => {
    setGlobalLoader(true);
    dispatch(getVideos())
      .then((res) => {
        if (res.status === 200) {
          setGlobalLoader(false);
          setVideos(
            res?.data?.filter((v) => v.products.includes(`${productId}`))
          );
        } else {
          toast.error(
            'Some error occured while getting videos, Please try again'
          );
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          'Some error occured while getting videos, Please try again'
        );
        setGlobalLoader(false);
      });
  }, [location.pathname]);

  return (
    // <!-- Secondary sidebar -->
    <div
      className="sidebar sidebar-light sidebar-right sidebar-expand-lg"
      id="sidebar-mobile-videos-menu"
    >
      {/* <!-- Sidebar content --> */}
      <div className="sidebar-content">
        {/* <!-- Header --> */}
        <div className="sidebar-section sidebar-section-body d-flex align-items-center">
          <h5 className="mb-0">Videos</h5>
          <div className="ml-auto">
            <button
              type="button"
              className="btn btn-outline-dark border-transparent btn-icon rounded-pill btn-sm sidebar-mobile-secondary-toggle d-lg-none"
              onClick={() =>
                $('#sidebar-mobile-videos-menu').removeClass(
                  'sidebar-mobile-expanded'
                )
              }
            >
              <i className="icon-cross2" />
            </button>
          </div>
        </div>
        {/* <!-- /header --> */}

        {/* <!-- Sub navigation --> */}
        {/* <div className="sidebar-section">
          <div className="sidebar-section-header">
            <span className="font-weight-semibold">Categories</span>
            <div className="list-icons ml-auto">
              <a
                href="#sidebar-navigation"
                className="list-icons-item"
                data-toggle="collapse"
              >
                <i className="icon-arrow-down12" />
              </a>
            </div>
          </div>

          <div className="collapse show" id="sidebar-navigation">
            <ul className="nav nav-sidebar my-2" data-nav-type="accordion">
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="icon-files-empty" /> All tasks
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="icon-file-plus" />
                  Active tasks
                  <span className="badge badge-dark badge-pill ml-auto">
                    28
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="icon-file-check" /> Closed tasks
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="icon-reading" />
                  Assigned to me
                  <span className="badge badge-info badge-pill ml-auto">
                    86
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="icon-make-group" />
                  Assigned to my team
                  <span className="badge badge-danger badge-pill ml-auto">
                    47
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="icon-cog3" /> Settings
                </a>
              </li>
            </ul>
          </div>
        </div>
       */}
        {/* <!-- /sub navigation --> */}

        <ul className="nav nav-sidebar my-2">
          {videos.map((video, index) => (
            <li className="nav-item">
              <a
                href="#"
                className="nav-link"
                onClick={() => {
                  setCurrentVideo(video);
                }}
              >
                {index + 1}.
                <i className="icon-video-camera3 ml-1" />
                {video.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
    // {/* <!-- /secondary sidebar --> */}
  );
}
