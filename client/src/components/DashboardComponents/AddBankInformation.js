/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import DashboardHeader from './shared/DashboardHeader';
import DashboardSidebar from './shared/DashboardSidebar';
import { addBankInformation, getBankInformation } from '../../redux/actions/bankActions';
import setGlobalLoader from '../../redux/actions/dashboardLoaderActions';

export default function AddUser() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [bankDetails, setBankDetails] = useState(null)

    const handleOnSubmit = async (values) => {

        if (values.confirmAccNumber !== values.accNumber) {
            toast.error(`Account Number details don't match. Please check the form`);
            return;
        }
        const { confirmAccNumber, ...accountDetails } = values;

        setGlobalLoader(true)
        dispatch(addBankInformation(accountDetails)).then(res => {
            setGlobalLoader(false)
            toast.success(res.data);
            navigate('/dashboard')
        }).catch(err => {
            setGlobalLoader(false)
            console.log(err)
            toast.error('Some Error Occured saving bank details. Please try in some time.');
        });
    };


    useEffect(() => {
        setGlobalLoader(true)
        dispatch(getBankInformation()).then(res => {
            if (res.status === 200) {
                if (
                    res.data !== null
                ) {
                    toast.error('You have your bank details submitted already. You cannot edit or submit more. Please contact admin for if any query.');
                }
                setBankDetails(res.data)
            }
        }).catch(err => {
            toast.error('Some Error Occured while fetching user details. Please try in some time.');
            console.log(err)
        });
        setGlobalLoader(false)
    }, [])


    return (
        <Formik
            enableReinitialize
            initialValues={{
                accName: bankDetails?.accName ?? '',
                accNumber: bankDetails?.accNumber ?? '',
                confirmAccNumber: bankDetails?.accNumber ?? '',
                ifscCode: bankDetails?.ifscCode ?? '',
            }}
            onSubmit={handleOnSubmit}
            validationSchema={yup.object().shape({
                accName: yup.string().required('This field is required.'),
                accNumber: yup.string().required('This field is required.'),
                confirmAccNumber: yup.string().required('This field is required.'),
                ifscCode: yup.string().required('This field is required.'),
            })}
        >
            {(props) => {
                const { values, setFieldValue, handleSubmit } = props;
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
                                                    <span className="font-weight-semibold">Add Bank Information</span>
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- /page header --> */}

                                    {/* <!-- Basic layout--> */}
                                    <div className="container mt-3">
                                        <div className="container">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h5 className="card-title">
                                                        All Details are mandatory
                                                    </h5>
                                                </div>

                                                <div className="card-body">
                                                    <form onSubmit={handleSubmit}>
                                                        <div className="form-group">
                                                            <label>Account Holder Name:</label>
                                                            <input
                                                                disabled={bankDetails !== null}
                                                                value={values.accName}
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Full Name"
                                                                onChange={(e) =>
                                                                    setFieldValue('accName', e.target.value)
                                                                }
                                                            />
                                                            <ErrorMessage
                                                                name="accName"
                                                                component="div"
                                                                className="text-danger"
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Account Number</label>
                                                            <input
                                                                disabled={bankDetails !== null}
                                                                value={values.accNumber}
                                                                type="number"
                                                                className="form-control"
                                                                placeholder="Account Number"
                                                                onChange={(e) =>
                                                                    setFieldValue('accNumber', e.target.value)
                                                                }
                                                            />
                                                            <ErrorMessage
                                                                name="accNumber"
                                                                component="div"
                                                                className="text-danger"
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Confirm Account Number</label>
                                                            <input
                                                                disabled={bankDetails !== null}
                                                                value={values.confirmAccNumber}
                                                                type="password"
                                                                className="form-control"
                                                                placeholder="Confirm Account Number"
                                                                onChange={(e) =>
                                                                    setFieldValue('confirmAccNumber', e.target.value)
                                                                }
                                                            />
                                                            <ErrorMessage
                                                                name="confirmAccNumber"
                                                                component="div"
                                                                className="text-danger"
                                                            />
                                                        </div>
                                                        {values.confirmAccNumber !== values.accNumber && (
                                                            <div className="text-danger">
                                                                Account Number Don&lsquo;t Match
                                                            </div>
                                                        )}
                                                        <div className="form-group">
                                                            <label>IFSC Code</label>
                                                            <input
                                                                disabled={bankDetails !== null}
                                                                value={values.ifscCode}
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="IFSC Code"
                                                                onChange={(e) =>
                                                                    setFieldValue('ifscCode', e.target.value)
                                                                }
                                                            />
                                                            <ErrorMessage
                                                                name="ifscCode"
                                                                component="div"
                                                                className="text-danger"
                                                            />
                                                        </div>
                                                        <div className="text-right">
                                                            <button type="submit" className="btn btn-primary"
                                                                disabled={bankDetails !== null}


                                                            >
                                                                Submit form
                                                                <i className="icon-paperplane ml-2" />
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- /basic layout --> */}
                                </div>
                            </div>
                        </div>
                    </>
                );
            }}
        </Formik>
    );
}
