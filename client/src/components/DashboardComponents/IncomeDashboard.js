import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import $ from 'jquery';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DashboardHeader from './shared/DashboardHeader';
import DashboardSidebar from './shared/DashboardSidebar';
import FiguresBox from './shared/FiguresBox';
import { getAllDetailsOfUser } from '../../redux/actions/userActions';
import { registerWithdrawalPayment } from '../../redux/actions/adminActions';
import setGlobalLoader from '../../redux/actions/dashboardLoaderActions';
import Table from './shared/Table';
import Button from './shared/Button';
import Popup from './shared/Popup';

export default function Dashboard() {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const [forceUpdate, setForceUpdate] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [activeUsers, setActiveUsers] = useState([]);
    const [passiveUsers, setPassiveUsers] = useState([]);
    const [successfulPayments, setSuccessfulPayments] = useState([]);
    const [totalPayments, setTotalPayments] = useState(0);
    const [bankDetails, setBankDetails] = useState({});
    const [user, setUser] = useState({});
    const [activeIncome, setActiveIncome] = useState(0);
    const [passiveIncome, setPassiveIncome] = useState(0);
    const authReducer = useSelector((state) => state.authReducer);
    const isAdmin = authReducer?.user?.userType?.includes('0');

    const { userId } = params;

    const createSuccessfulPayment = () => {
        const amount = $('#paymentAmount').val()
        const date = $('#paymentDate').val()

        const data = {
            userreference: userId,
            dateOfTransaction: date,
            amount,
        }
        setGlobalLoader(true);

        dispatch(registerWithdrawalPayment(data)).then((res) => {
            if (res.status === 200) {
                setGlobalLoader(false);
                setOpenModal(false);
                toast.success('Payment registered successfully');
                setForceUpdate(state => !state)
            }
        })
            .catch((error) => {
                console.log(error);
                setGlobalLoader(false);
                toast.error(error.response.data);
            });
    }

    const inputField = () => (
        <>
            <div >
                <input type="number" name='amount' id='paymentAmount' required className='form-control' placeholder='0' /> <br />
                <input type="date" name='date' id='paymentDate' className='form-control' /> <br />
                <h6 className="text-danger">Enter date only if payment was done before today.</h6>
            </div>
            <br />
            <div className="d-flex container col-lg-6  justify-content-around">
                <Button
                    text="Submit"
                    type="submit"
                    className="btn btn-sm btn-primary"
                    onClick={() => createSuccessfulPayment()}
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

    const columns = [
        { title: 'Name', field: 'name', filtering: false },
        { title: 'Email', field: 'email', filtering: false },
        { title: 'Phone', field: 'phone', filtering: false },
        { title: 'Product', field: 'product', filtering: false },
        { title: 'Comission', field: 'commission', filtering: false },
        { title: 'Joined On', field: 'joinedOn', filtering: false },
    ];

    const paymentColumns = [
        { title: 'Payment Date', field: 'paymentDate', filtering: false },
        { title: 'Amount', field: 'amount', filtering: false },
        { title: 'Status', field: 'status', filtering: false },
    ];


    const checkProducts = (values) => {
        if (values.includes('1')) {
            return 'Success Kit'
        }
        return 'Mini Success Kit'
    }

    const calculateIncome = (active, passive) => {
        let tempActiveIncome = 0;
        let tempPassiveIncome = 0;

        if (active.length > 0) {
            for (let index = 0; index < active.length; index++) {
                tempActiveIncome += parseInt(active[index].commission, 10);
            }
        }
        if (passive.length > 0) {
            for (let index = 0; index < passive.length; index++) {
                tempPassiveIncome += parseInt(passive[index].commission, 10);
            }
        }
        setActiveIncome(tempActiveIncome);
        setPassiveIncome(tempPassiveIncome);
        setActiveUsers(active.map(d => ({
            name: d.name,
            email: d.email,
            phone: d.phone,
            product: checkProducts(d.products),
            commission: d.commission,
            joinedOn: format(new Date(d?.createdAt), 'MMM dd, yyyy'),
        })));

        setPassiveUsers(passive.map(d => ({
            name: d.name,
            email: d.email,
            phone: d.phone,
            product: checkProducts(d.products),
            commission: d.commission,
            joinedOn: format(new Date(d?.createdAt), 'MMM dd, yyyy'),
        })));
    };

    const calculatePayments = (payments) => {
        let totalPaymentsVar = 0;

        setSuccessfulPayments(payments.map(d => ({
            amount: d?.amount,
            status: d?.status,
            paymentDate: d?.dateOfTransaction === '' ? format(new Date(d?.createdAt), 'MMM dd, yyyy') : format(new Date(d?.dateOfTransaction), 'MMM dd, yyyy')
        })))

        if (payments.length > 0) {
            for (let index = 0; index < payments.length; index++) {
                totalPaymentsVar += parseInt(payments[index].amount, 10);
            }
        }

        setTotalPayments(totalPaymentsVar)
    }

    useEffect(() => {
        setGlobalLoader(true);
        dispatch(getAllDetailsOfUser(userId))
            .then((res) => {
                if (res.status === 200) {
                    setUser(res.data.user)
                    calculateIncome(res.data.activeUsers, res.data.passiveUsers);
                    setBankDetails(res.data.bank)
                    calculatePayments(res.data.withdrawalRequests)
                    setGlobalLoader(false);
                } else {
                    toast.error('Some error occured fetching details, please try again');
                }
            })
            .catch((error) => {
                console.log(error);
                setGlobalLoader(false);
                toast.error(error.response.data);
            });

        setModalContent(inputField)
    }, [forceUpdate]);

    useEffect(() => {
        if (!isAdmin) {
            navigate('/dashboard');
        }
    }, [authReducer]);

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
                                        <span className="font-weight-semibold">User Details</span>
                                        <br />
                                        <Button
                                            text="Register Payment"
                                            type="submit"
                                            className="btn btn-sm btn-success"
                                            onClick={() => setOpenModal(true)}

                                        />
                                    </h4>
                                    <h4 className="text-align-left">

                                        <span className="font-weight-semibold text-success">
                                            {user?.name}
                                        </span>
                                        <br />
                                        <span className="font-weight-semibold text-danger">
                                            @{user?.username}
                                        </span>
                                    </h4>
                                </div>
                            </div>
                        </div>
                        {/* <!-- /page header --> */}

                        {/* <!-- Content area --> */}
                        <div className="content">

                            <div className="row">

                                <FiguresBox
                                    boxClass="col-sm-12 col-xl-12"
                                    iconClass="icon-coin-dollar icon-3x text-success"
                                    number={totalPayments}
                                    text="Total Paid Till Now"
                                />
                            </div>

                            <Table
                                columns={paymentColumns}
                                data={successfulPayments}
                                export={false}
                                // search
                                selection={false}
                                toolbar
                                title="Previous Payments"
                            />
                            <br />
                            {/* <!-- Simple statistics --> */}
                            <div className="mb-3">
                                <h6 className="mb-0 font-weight-semibold">Earnings</h6>
                            </div>

                            <div className="row">
                                <FiguresBox
                                    boxClass="col-sm-12 col-xl-12"
                                    iconClass="icon-coin-dollar icon-3x text-success"
                                    number={passiveIncome + activeIncome}
                                    text="Total Income"
                                />

                                <FiguresBox
                                    boxClass="col-sm-6 col-xl-6"
                                    iconClass="icon-coin-dollar icon-3x text-success"
                                    number={activeIncome ?? 0}
                                    text="Active Income"
                                />
                                <FiguresBox
                                    boxClass="col-sm-6 col-xl-6"
                                    iconClass="icon-coin-dollar icon-3x text-success"
                                    number={passiveIncome ?? 0}
                                    text="Passive Income"
                                />
                            </div>

                            <div className="mb-3">
                                <h6 className="mb-0 font-weight-semibold">Bank Details</h6>
                            </div>
                            <div className="row">
                                <div className='col-sm-12 col-xl-12' >
                                    <div className="card card-body" style={{ boxShadow: '5px 5px 5px gray' }}>
                                        <div className="media">
                                            <div className="media-body text-left">
                                                Account Name : {bankDetails?.accName ?? ''} <br />
                                                Account Number :  {bankDetails?.accNumber ?? ''} <br />
                                                IFSC Code : {bankDetails?.ifscCode ?? ''}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Table
                                columns={columns}
                                data={activeUsers}
                                export={false}
                                // search
                                selection={false}
                                toolbar
                                title="Active Users"
                            />
                            <br />
                            <Table
                                columns={columns}
                                data={passiveUsers}
                                export={false}
                                // search
                                selection={false}
                                toolbar
                                title="Passive Users"
                            />
                            {/* <!-- /simple statistics --> */}
                        </div>
                    </div>
                </div>
            </div>
            <Popup
                setOpenModal={setOpenModal}
                openModal={openModal}
                maxWidth="sm"
                Title="Register a payment"
                Content={modalContent}
            />
        </>
    );
}
