/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Tooltip from '@material-ui/core/Tooltip';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from './shared/DashboardHeader';
import DashboardSidebar from './shared/DashboardSidebar';
import Table from './shared/Table';
import ApiRoute from '../../utils/apiRoutes';
import setAuthToken from '../../utils/setAuthToken';
import setGlobalLoader from '../../redux/actions/dashboardLoaderActions';

export default function AllVideos() {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const authReducer = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (authReducer?.user?.userType !== '0') {
      navigate('/dashboard');
    }
  }, [authReducer]);

  const handleDelete = async (rowData) => {
    const text = `Do you want to delete ${rowData.title} video ?`;

    if (window.confirm(text) === true) {
      try {
        const res = await axios.delete(
          ApiRoute.deleteVideo + rowData.id
        );

        if (res.status === 200) {
          toast.success(`${rowData.title} video is deleted successfully`);
          setVideos(videos.filter((d) => d.id !== rowData.id));
          return;
        }
      } catch (error) {
        console.log(error);
        toast.error('some error occured while deleting the video');
      }
    } else {
      toast.success('Deletion request cancelled.');
    }
  };

  const columns = [
    { title: 'Title', field: 'title', filtering: false },
    { title: 'Link', field: 'link', filtering: false },
    { title: 'Products', field: 'product', filtering: false },
    {
      title: 'Actions',
      field: '',
      filtering: false,
      render: (rowData) => (
        <div className="tableActions ">
          <Tooltip title="Delete Video">
            <i
              className="icon-trash ml-2 text-danger"
              role="button"
              onClick={() => handleDelete(rowData)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  const getProducts = (values) => {
    if (values.length === 1 && values.includes('1')) {
      return 'Success Kit';
    }
    if (values.length === 1 && values.includes('2')) {
      return 'Mini Success Kit';
    }
    if (values.length === 2 && values.includes('1') && values.includes('2')) {
      return 'Success Kit and Mini Success Kit';
    }
    return 'No Product Found';
  };

  async function getVideos() {
    setGlobalLoader(true);
    try {
      const res = await axios.get(ApiRoute.getVideos);

      if (res.status === 200) {
        const data = res.data.map((d) => ({
          link: d?.link,
          title: d?.title,
          product: getProducts(d?.products),
          // eslint-disable-next-line no-underscore-dangle
          id: d?._id,
        }));
        setVideos(data);
        setGlobalLoader(false);
      }

      return;
    } catch (error) {
      console.log(error);
      setGlobalLoader(false);
      toast.error('some error occured while getting the list of videos');
    }
  }

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    } else {
      console.log('no token to send');
      return;
    }
    getVideos();
  }, []);

  return (
    <>
      <DashboardHeader />
      <div className="page-content">
        <DashboardSidebar />
        {/* <!-- Main content --> */}
        <div className="content-wrapper">
          {/* <!-- Inner content --> */}
          <div className="content-inner">
            {/* <!-- Page header --> */}
            <div className="page-header page-header-light">
              <div className="page-header-content header-elements-lg-inline">
                <div className="page-title d-flex">
                  <h4>
                    <span className="font-weight-semibold">Videos</span>
                  </h4>
                </div>
              </div>
            </div>
            {/* <!-- /page header --> */}

            {/* <!-- Basic layout--> */}
            <div className="content">
              <Table
                columns={columns}
                data={videos}
                export={false}
                // search
                selection={false}
                toolbar
                title="Videos"
              />
            </div>

            {/* <!-- /basic layout --> */}
          </div>
        </div>
      </div>
    </>
  );
}
