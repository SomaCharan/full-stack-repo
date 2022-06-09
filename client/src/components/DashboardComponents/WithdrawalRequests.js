/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Tooltip from '@material-ui/core/Tooltip';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from './shared/DashboardHeader';
import DashboardSidebar from './shared/DashboardSidebar';
import Table from './shared/Table';
import setGlobalLoader from '../../redux/actions/dashboardLoaderActions';
import { getUsersWithWithdrawalRequests } from '../../redux/actions/adminActions'

export default function Users() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
        { title: 'Phone', field: 'phone', filtering: false },
        { title: 'Role', field: 'role', filtering: false },
        { title: 'User Id', field: 'userId', filtering: false },
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

    useEffect(() => {
        setGlobalLoader(true)
        dispatch(getUsersWithWithdrawalRequests()).then((res) => {
            if (res.status === 200) {
                const data = res.data.map((d) => ({
                    ...d,
                    userId: d?.userreference,
                    role:
                        d?.userType === '0'
                            ? 'Admin'
                            : d?.userType === '1'
                                ? 'Affiliate'
                                : 'User',
                }));
                setUsers(data);
            }
            setGlobalLoader(false)
        }).catch((err) => {
            console.log(err.response);
            toast.error('Some error occurred while fetching withdrawal requests details. Please try again')
            setGlobalLoader(false)
        })
    }, [])

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
