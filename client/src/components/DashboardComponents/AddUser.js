/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useEffect } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import DashboardHeader from './shared/DashboardHeader';
import DashboardSidebar from './shared/DashboardSidebar';
import { addUser } from '../../redux/actions/userActions';
import setGlobalLoader from '../../redux/actions/dashboardLoaderActions';

export default function AddUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authReducer = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (authReducer?.user?.userType !== '0') {
      navigate('/dashboard');
    }
  }, [authReducer]);

  const userTypeOptions = [
    { label: 'Super Admin', value: '0' },
    { label: 'Affiliate', value: '1' },
    { label: 'User', value: '2' },
  ];

  const statusOptions = [
    { label: 'Active', value: true },
    { label: 'Inactive', value: false },
  ];

  const handleOnSubmit = async (values) => {
    setGlobalLoader(true)
    dispatch(addUser(values));
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: '',
        username: '',
        phone: '',
        email: '',
        password: '',
        isActive: true,
        userType: '2',
      }}
      onSubmit={handleOnSubmit}
      validationSchema={yup.object().shape({
        name: yup.string().required('This field is required.'),
        username: yup.string().required('This field is required.'),
        phone: yup.string().required('This field is required.'),
        email: yup.string().required('This field is required.'),
        password: yup.string().required('This field is required.'),
        userType: yup.string().required('This field is required.'),
        isActive: yup.bool().required('This field is required.'),
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
                          <span className="font-weight-semibold">Add User</span>
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
                              <label>Name:</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="name"
                                onChange={(e) =>
                                  setFieldValue('name', e.target.value)
                                }
                              />
                              <ErrorMessage
                                name="name"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                            <div className="form-group">
                              <label>Username</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="user name"
                                onChange={(e) =>
                                  setFieldValue('username', e.target.value)
                                }
                              />
                              <ErrorMessage
                                name="username"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                            <div className="form-group">
                              <label>Email</label>
                              <input
                                type="email"
                                className="form-control"
                                placeholder="email"
                                onChange={(e) =>
                                  setFieldValue('email', e.target.value)
                                }
                              />
                              <ErrorMessage
                                name="email"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                            <div className="form-group">
                              <label>Phone Number</label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="phone"
                                onChange={(e) =>
                                  setFieldValue('phone', e.target.value)
                                }
                              />
                              <ErrorMessage
                                name="phone"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                            <div className="form-group">
                              <label>Password:</label>
                              <input
                                type="password"
                                className="form-control"
                                placeholder="password"
                                onChange={(e) =>
                                  setFieldValue('password', e.target.value)
                                }
                              />
                              <ErrorMessage
                                name="password"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                            <div className="form-group">
                              <label className="d-block">
                                User Type:
                                <Select
                                  placeholder="User Type"
                                  options={userTypeOptions}
                                  onChange={(e) =>
                                    setFieldValue('userType', e.value)
                                  }
                                />
                                <ErrorMessage
                                  name="userType"
                                  component="div"
                                  className="text-danger"
                                />
                              </label>
                            </div>
                            <div className="form-group">
                              <label className="d-block">
                                Status:
                                <Select
                                  placeholder="User Status"
                                  options={statusOptions}
                                  value={statusOptions.filter(d => d.value === values.isActive)}
                                  onChange={(e) =>
                                    setFieldValue('isActive', e.value)
                                  }
                                />
                                <ErrorMessage
                                  name="isActive"
                                  component="div"
                                  className="text-danger"
                                />
                              </label>
                            </div>
                            <div className="form-group">
                              <label>Address</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Address"
                                onChange={(e) =>
                                  setFieldValue('address', e.target.value)
                                }
                              />
                            </div>
                            {values?.userType === '1' && (
                              <>
                                <div className="form-group">
                                  <label>Today Income</label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Active Income"
                                    onChange={(e) =>
                                      setFieldValue(
                                        'todayIncome',
                                        e.target.value
                                      )
                                    }
                                  />{" "}
                                  <br />
                                  <div className="form-group">
                                    <label>7 Days Income</label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      placeholder="Active Income"
                                      onChange={(e) =>
                                        setFieldValue(
                                          'sevenDaysIncome',
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                </div>{' '}
                                <div className="form-group">
                                  <label>30 days income</label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Active Income"
                                    onChange={(e) =>
                                      setFieldValue(
                                        'thirtyDaysIncome',
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="form-group">
                                  <label>Active Income</label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Active Income"
                                    onChange={(e) =>
                                      setFieldValue(
                                        'activeIncome',
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="form-group">
                                  <label>Passive Income</label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Passive Income"
                                    onChange={(e) =>
                                      setFieldValue(
                                        'passiveIncome',
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="form-group">
                                  <label>Students</label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    placeholder="no. of students"
                                    onChange={(e) =>
                                      setFieldValue('students', e.target.value)
                                    }
                                  />
                                </div>
                              </>
                            )}
                            <div className="text-right">
                              <button type="submit" className="btn btn-primary">
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
