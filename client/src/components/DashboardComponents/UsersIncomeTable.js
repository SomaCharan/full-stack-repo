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

export default function UsersIncomeTable() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const authReducer = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (authReducer?.user?.userType !== '0') {
      navigate('/dashboard');
    }
  }, [authReducer]);

  const columns = [
    { title: 'Name', field: 'name', filtering: false },
    { title: 'Email', field: 'email', filtering: false },
    { title: 'User Reference', field: 'userId', filtering: false },
    { title: 'Total Income', field: 'totalIncome', filtering: false },
    {
      title: 'Actions',
      field: '',
      filtering: false,
      render: (rowData) => (
        <div className="tableActions ">
          <Tooltip title="View Income">
            <i
              className="icon-eye"
              role="button"
              onClick={() =>
                navigate(`/income-dashboard/${rowData.userId}`, {
                  state: rowData,
                })
              }
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  async function getUsers() {
    setGlobalLoader(true);
    try {
      const res = await axios.get(ApiRoute.getUsersIncome);

      if (res.status === 200) {
        const data = res.data.map((d) => ({
          ...d,
          userId: d?.user.userreference,
          name: d?.user?.name,
          email: d?.user?.email,
        }));
        setUsers(data);
        setGlobalLoader(false);
      }

      return;
    } catch (error) {
      console.log(error);
      setGlobalLoader(false);
      toast.error('some error occured while getting the list of users');
    }
  }

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    } else {
      console.log('no token to send');
      return;
    }
    getUsers();
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
                    <span className="font-weight-semibold">Users With Total Income</span>
                  </h4>
                </div>
              </div>
            </div>
            {/* <!-- /page header --> */}

            {/* <!-- Basic layout--> */}
            <div className="content">
              <Table
                columns={columns}
                data={users}
                export={false}
                // search
                selection={false}
                toolbar
                title="Users"
              />
            </div>

            {/* <!-- /basic layout --> */}
          </div>
        </div>
      </div>
    </>
  );
}
