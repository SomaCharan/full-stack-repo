/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from './shared/DashboardHeader';
import DashboardSidebar from './shared/DashboardSidebar';
import Table from './shared/Table';
import setGlobalLoader from '../../redux/actions/dashboardLoaderActions';
import Button from './shared/Button';
import { editUserSelf } from '../../redux/actions/userActions'
import getWithDrawalRequests from '../../redux/actions/withdrawalActions'

export default function Users() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [withdrawalRequest, setWithdrawalRequest] = useState([]);

    const columns = [
        { title: 'Date', field: 'date', filtering: false },
        { title: 'Amount', field: 'amount', filtering: false },
        { title: 'Status', field: 'status', filtering: false },
    ];

    const requestWithdrawal = () => {

        const data = {
            withdrawalRequest: true
        }

        setGlobalLoader(true)
        dispatch(editUserSelf(data)).then((res) => {
            if (res.status === 200) {
                toast.success('Withdrawal Request raised Successfully.')
            }
            setGlobalLoader(false)

        }).catch((err) => {
            console.log(err);
            toast.error('Some error occurred while requesting withdrawal. Please try again')
            setGlobalLoader(false)

        })
    }

    useEffect(() => {
        setGlobalLoader(true)
        dispatch(getWithDrawalRequests()).then((res) => {
            if (res.status === 200) {
                setWithdrawalRequest(res.data.map(d => ({
                    ...d,
                    date: d?.dateOfTransaction === '' ? format(new Date(d?.createdAt), 'MMM dd, yyyy') : format(new Date(d?.dateOfTransaction), 'MMM dd, yyyy')
                })))
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
                                <div className="page-title d-flex justify-content-between">
                                    <h4>
                                        <span className="font-weight-semibold">Payments</span>
                                    </h4>
                                    <div style={{ marginLeft: '20vw' }}>
                                        <Button
                                            text="Bank Information"
                                            type="submit"
                                            style={{ backgroundColor: '#ff3300', color : 'white' }}
                                            className="btn btn-sm mt-lg-2"
                                            onClick={() => navigate('/bank-information')}
                                        />
                                        <Button
                                            text="Request Payment"
                                            type="submit"
                                            style={{ backgroundColor: '#009900', color : 'white' }}
                                            className="btn btn-sm btn-success pr-3 ml-lg-2 mt-2"
                                            onClick={() => requestWithdrawal()}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- /page header --> */}

                        {/* <!-- Basic layout--> */}
                        <div className="content">
                            <Table
                                columns={columns}
                                data={withdrawalRequest}
                                export={false}
                                // search
                                selection={false}
                                toolbar
                                title="Payments"
                            />
                        </div>

                        {/* <!-- /basic layout --> */}
                    </div>
                </div>
            </div>
        </>
    );
}
