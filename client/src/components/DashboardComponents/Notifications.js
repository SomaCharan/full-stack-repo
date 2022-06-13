/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector , useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from './shared/DashboardHeader';
import DashboardSidebar from './shared/DashboardSidebar';
import Table from './shared/Table';
import setGlobalLoader from '../../redux/actions/dashboardLoaderActions';
import { getNotifications } from '../../redux/actions/notificationActions';

export default function Notifications() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([])
  const authReducer = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (authReducer?.user?.userType !== '0') {
      navigate('/dashboard');
    }
  }, [authReducer]);

  const columns = [
    { title: 'Title', field: 'title', filtering: false },
    { title: 'Description', field: 'description', filtering: false },
  ];

  useEffect(() => {
    setGlobalLoader(true)
    dispatch(getNotifications())
      .then((res) => {
        if (res.status === 200) {
          setNotifications(res.data)
          setGlobalLoader(false)
          localStorage.setItem('notificationCount', res.data.length);
        } else {
          setGlobalLoader(false)
          toast.error('Some error occured fetching details, please try again');
        }
      })
      .catch((error) => {
        console.log(error);
        setGlobalLoader(false)
        toast.error('some error occured while fetching notifications');
      });
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
                    <span className="font-weight-semibold">Notifications</span>
                  </h4>
                </div>
              </div>
            </div>
            {/* <!-- /page header --> */}

            {/* <!-- Basic layout--> */}
            <div className="content">
              <Table
                columns={columns}
                data={notifications}
                export={false}
                // search
                selection={false}
                toolbar
                title="Notifications"
              />
            </div>


            {/* <!-- /basic layout --> */}
          </div>
        </div>
      </div>
    </>
  );
}
