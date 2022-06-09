/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Formik, ErrorMessage } from 'formik';
import Select from 'react-select';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import * as yup from 'yup';
import DashboardHeader from './shared/DashboardHeader';
import DashboardSidebar from './shared/DashboardSidebar';
import { editUser } from '../../redux/actions/userActions';
import setGlobalLoader from '../../redux/actions/dashboardLoaderActions';

export default function EditUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const userTypeOptions = [
    { label: 'Super Admin', value: '0' },
    { label: 'Affiliate', value: '1' },
    { label: 'User', value: '2' },
  ];

  const productOptions = [
    { label: 'Success Kit', value: '1' },
    { label: 'Mini Success Kit', value: '2' },
  ];

  const [user, setUser] = useState({});
  const authReducer = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (authReducer.user.userType !== '0') {
      navigate('/dashboard');
    }
  }, [authReducer]);

  useEffect(() => {
    setUser(location.state);
  }, [location]);

  const handleOnSubmit = async (values) => {

    const { products, ...data } = values;

    data.products = products.map(a => a.value)

    setGlobalLoader(true);
    dispatch(editUser(params.userId, data))
      .then((res) => {
        if (res.status === 200) {
          setGlobalLoader(false);
          toast.success('user details updated successfully.');
          navigate('/users');
        }
      })
      .catch((err) => {
        console.error(err);
        setGlobalLoader(false);
        toast.error(
          'Some error occurred while updating user. Please contact admin'
        );
      });
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        passiveIncome: user.passiveIncome ?? 0,
        sevenDaysIncome: user.sevenDaysIncome ?? 0,
        todayIncome: user.todayIncome ?? 0,
        thirtyDaysIncome: user.thirtyDaysIncome ?? 0,
        students: user.students ?? 0,
        activeIncome: user.activeIncome ?? 0,
        userType: user.userType,
        products: user.products ? productOptions.filter(d => user.products.includes(d.value)) : [],
      }}
      onSubmit={handleOnSubmit}
      validationSchema={yup.object().shape({
        passiveIncome: yup.string().required('This field is required.'),
        sevenDaysIncome: yup.string().required('This field is required.'),
        todayIncome: yup.string().required('This field is required.'),
        students: yup.string().required('This field is required.'),
        thirtyDaysIncome: yup.string().required('This field is required.'),
        activeIncome: yup.string().required('This field is required.'),
        userType: yup.string().required('This field is required.'),
        // products: yup
        //   .array()
        //   .min(1, 'This field is required.')
        //   .of(
        //     yup.object().shape({
        //       label: yup.string().required('This field is required.'),
        //       value: yup.string().required('This field is required.'),
        //     })
        //   ),
      })}
    >
      {(props) => {
        const { setFieldValue, handleSubmit, values } = props;
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
                          <span className="font-weight-semibold">
                            Edit User : {user.name}
                          </span>
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
                              <label>Active Income:</label>
                              <input
                                type="text"
                                className="form-control"
                                value={values.activeIncome}
                                onChange={(e) =>
                                  setFieldValue('activeIncome', e.target.value)
                                }
                              />
                              <ErrorMessage
                                name="activeIncome"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                            <div className="form-group">
                              <label>Passive Income:</label>
                              <input
                                type="text"
                                className="form-control"
                                value={values.passiveIncome}
                                onChange={(e) =>
                                  setFieldValue('passiveIncome', e.target.value)
                                }
                              />
                              <ErrorMessage
                                name="passiveIncome"
                                component="div"
                                className="text-danger"
                              />
                            </div>{' '}
                            <div className="form-group">
                              <label>Today Income:</label>
                              <input
                                type="text"
                                className="form-control"
                                value={values.todayIncome}
                                onChange={(e) =>
                                  setFieldValue('todayIncome', e.target.value)
                                }
                              />
                              <ErrorMessage
                                name="todayIncome"
                                component="div"
                                className="text-danger"
                              />
                            </div>{' '}
                            <div className="form-group">
                              <label>Seven Days Income</label>
                              <input
                                type="text"
                                className="form-control"
                                value={values.sevenDaysIncome}
                                onChange={(e) =>
                                  setFieldValue(
                                    'sevenDaysIncome',
                                    e.target.value
                                  )
                                }
                              />
                              <ErrorMessage
                                name="sevenDaysIncome"
                                component="div"
                                className="text-danger"
                              />
                            </div>{' '}
                            <div className="form-group">
                              <label>30 Days Income:</label>
                              <input
                                type="text"
                                className="form-control"
                                value={values.thirtyDaysIncome}
                                onChange={(e) =>
                                  setFieldValue(
                                    'thirtyDaysIncome',
                                    e.target.value
                                  )
                                }
                              />
                              <ErrorMessage
                                name="thirtyDaysIncome"
                                component="div"
                                className="text-danger"
                              />
                            </div>{' '}
                            <div className="form-group">
                              <label>Students:</label>
                              <input
                                type="text"
                                className="form-control"
                                value={values.students}
                                onChange={(e) =>
                                  setFieldValue('students', e.target.value)
                                }
                              />
                              <ErrorMessage
                                name="students"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                            <div className="form-group">
                              <label className="d-block">
                                Choose Product:
                                <Select
                                  isMulti
                                  placeholder="Product"
                                  options={productOptions}
                                  value={values.products}
                                  onChange={(e) =>
                                    setFieldValue('products', e)

                                  }
                                />
                                <ErrorMessage
                                  name="products"
                                  component="div"
                                  className="text-danger"
                                />
                              </label>
                            </div>
                            <div className="form-group">
                              <label className="d-block">
                                User Type:
                                <Select
                                  placeholder="User Type"
                                  options={userTypeOptions}
                                  value={userTypeOptions.filter(
                                    (d) => d.value === values.userType
                                  )}
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
