/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
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

export default function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const authReducer = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (authReducer?.user?.userType !== '0') {
      navigate('/dashboard');
    }
  }, [authReducer]);

  const handleDelete = async (rowData) => {
    const text = `Do you want to delete ${rowData.name} user ?`;

    if (window.confirm(text) === true) {
      try {
        const res = await axios.delete(
          ApiRoute.baseURL +
          ApiRoute.deleteUser.replace('{uuid}', rowData.userId)
        );
        if (res.status === 200) {
          toast.success(`${rowData.name} user is deleted successfully`);
          setUsers(users.filter((d) => d.userId !== rowData.userId));
          return;
        }
      } catch (error) {
        console.log(error);
        toast.error('some error occured while deleting the user');
      }
    } else {
      toast.success('Deletion request cancelled.');
    }
  };

  const columns = [
    { title: 'Name', field: 'name', filtering: false },
    { title: 'Email', field: 'email', filtering: false },
    { title: 'Phone', field: 'phone', filtering: false },
    { title: 'Product', field: 'product', filtering: false },
    { title: 'Role', field: 'role', filtering: false },
    { title: 'User Id', field: 'userId', filtering: false },
    { title: 'Created On', field: 'createdOn', filtering: false },
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
          <Tooltip title="Edit User">
            <i
              className="icon-user ml-2 "
              role="button"
              onClick={() =>
                navigate(`/edit-user/${rowData.userId}`, {
                  state: rowData,
                })
              }
            />
          </Tooltip>

          <Tooltip title="Delete User">
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

  const checkProducts = (values) => {
    if (values.includes('1') && values.includes('2')) {
      return 'Success Kit and Mini Success Kit'
    } if (values.includes('1')) {
      return 'Success Kit'
    }
    if (values.includes('2')) {
      return 'Mini Success Kit'
    }
    return 'No Product Assigned'
  }

  async function getUsers() {
    setGlobalLoader(true);
    try {
      const res = await axios.get(ApiRoute.baseURL + ApiRoute.getUsers);

      if (res.status === 200) {
        const data = res.data.map((d) => ({
          ...d,
          userId: d?.userreference,
          createdOn: format(new Date(d?.createdAt), 'MMM dd, yyyy'),
          product: checkProducts(d.products),
          role:
            d?.userType === '0'
              ? 'Admin'
              : d?.userType === '1'
                ? 'Affiliate'
                : 'User',
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
                    <span className="font-weight-semibold">Users</span>
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
