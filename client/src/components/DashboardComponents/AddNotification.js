/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import DashboardHeader from './shared/DashboardHeader';
import DashboardSidebar from './shared/DashboardSidebar';
import { addNotification } from '../../redux/actions/notificationActions';
import setGlobalLoader from '../../redux/actions/dashboardLoaderActions';

export default function AddNotification() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authReducer = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (authReducer?.user?.userType !== '0') {
      navigate('/dashboard');
    }
  }, [authReducer]);

  const handleOnSubmit = async (values) => {

    setGlobalLoader(true);
    dispatch(addNotification(values))
      .then((res) => {
        if (res.status === 200) {
          setGlobalLoader(false);
          toast.success(res.data);
          setTimeout(() => {
            navigate(0)
          }, 2000);
        } else {
          toast.error('Some error occured while creating this video.');
        }
      })
      .catch((error) => {
        console.log(error);
        setGlobalLoader(false);
        toast.error(error.response.data.errors[0].msg);
      });
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        title: '',
        description : '',
      }}
      onSubmit={handleOnSubmit}
      validationSchema={yup.object().shape({
        description: yup.string().required('This field is required.'),
        title: yup.string().required('This field is required.'),
      })}
    >
      {(props) => {
        const { setFieldValue, handleSubmit } = props;
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
                            Add Notification
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
                              <label>Title:</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Title"
                                onChange={(e) =>
                                  setFieldValue('title', e.target.value)
                                }
                              />
                              <ErrorMessage
                                name="title"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                            <div className="form-group">
                              <label>Description:</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Description"
                                onChange={(e) =>
                                  setFieldValue('description', e.target.value)
                                }
                              />
                              <ErrorMessage
                                name="description"
                                component="div"
                                className="text-danger"
                              />
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
