/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useEffect } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import DashboardHeader from './shared/DashboardHeader';
import DashboardSidebar from './shared/DashboardSidebar';
import { addVideo } from '../../redux/actions/videoActions';
import setGlobalLoader from '../../redux/actions/dashboardLoaderActions';

export default function AddVideo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authReducer = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (authReducer?.user?.userType !== '0') {
      navigate('/dashboard');
    }
  }, [authReducer]);

  const productOptions = [
    { label: 'Success Kit', value: '1' },
    { label: 'Mini Success Kit', value: '2' },
  ];

  const handleOnSubmit = async (values) => {
    const data = {
      link: values.link,
      title: values.title,
      category: 'general',
      product: values.product.map((d) => d.value),
    };

    setGlobalLoader(true);
    dispatch(addVideo(data))
      .then((res) => {
        if (res.status === 200) {
          setGlobalLoader(false);
          toast.success(res.data);
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
        link: '',
        category: '',
        title: '',
        product: [],
      }}
      onSubmit={handleOnSubmit}
      validationSchema={yup.object().shape({
        link: yup.string().required('This field is required.'),
        // category: yup.string().required('This field is required.'),
        title: yup.string().required('This field is required.'),
        product: yup
          .array()
          .min(1, 'This field is required.')
          .of(
            yup.object().shape({
              label: yup.string().required('This field is required.'),
              value: yup.string().required('This field is required.'),
            })
          ),
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
                            Add Video
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
                              <label>Link:</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Link"
                                onChange={(e) =>
                                  setFieldValue('link', e.target.value)
                                }
                              />
                              <ErrorMessage
                                name="link"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                            {/* <div className="form-group">
                              <label className="d-block">
                                Video Category:
                                <Select
                                  placeholder="Video Category"
                                  options={videoCategoryOptions}
                                  onChange={(e) =>
                                    setFieldValue('category', e.value)
                                  }
                                />
                                <ErrorMessage
                                  name="category"
                                  component="div"
                                  className="text-danger"
                                />
                              </label>
                            </div> */}
                            <div className="form-group">
                              <label className="d-block">
                                Choose Product:
                                <Select
                                  isMulti
                                  placeholder="Choose Products"
                                  options={productOptions}
                                  onChange={(e) => {
                                    // console.log(values.product);
                                    setFieldValue('product', e);
                                  }}
                                />
                                <ErrorMessage
                                  name="product"
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
