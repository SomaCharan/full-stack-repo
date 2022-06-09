import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from './shared/DashboardHeader';
import DashboardSidebar from './shared/DashboardSidebar';
import FiguresBox from './shared/FiguresBox';

export default function AffiliateDashboard() {
  const authReducer = useSelector((state) => state.authReducer);
  const navigate = useNavigate();

  // users shouldn't be able to access this dashboard
  useEffect(() => {
    if (authReducer?.user?.userType?.includes('2')) {
      navigate('/dashboard');
    }
  }, [authReducer]);

  const checkProducts = (values) => {
    if (values.includes('1')) {
      return 'Success Kit'
    }
    return 'Mini Success Kit'
  }

  return (
    <>
      {authReducer?.user?.userType === '2' ? (
        <>
          <DashboardHeader />
          <div className="page-content">
            <DashboardSidebar />
            <div className="container">
              <h1>Dashboard is in Progress</h1>
            </div>
          </div>
        </>
      ) : (
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
                        <span className="font-weight-semibold">Dashboard</span>
                      </h4>
                      <h4 className="text-align-left d-lg-none ">
                        <span className="font-weight-semibold text-success">
                          {authReducer?.user?.name}
                        </span>
                        <br />
                        <span className="font-weight-semibold text-danger">
                          @{authReducer?.user?.username}
                        </span>
                      </h4>

                    </div>
                  </div>
                </div>
                {/* <!-- /page header --> */}

                {/* <!-- Content area --> */}
                <div className="content">
                  <div className="row">
                    <div className='col-sm-12 d-lg-none d-md-none'>
                      <div className="card card-body" style={{ background: 'linear-gradient(to right, #003399 0%, #0066ff 100%)', boxShadow: '5px 5px 5px gray' }} >
                        <div className="media">
                          <div className="mr-3 align-self-center">
                            <i className='text-white' />
                          </div>

                          <div className="media-body text-center">
                            <img
                              src={
                                authReducer?.user?.profile_image
                                  ? authReducer?.user?.profile_image
                                  : 'https://res.cloudinary.com/dtqrvcvp8/image/upload/v1652010949/w1brnxd9vrid1d21fbi6.jpg'
                              }
                              className="img-fluid rounded-circle shadow-sm text-center"
                              style={{
                                height: '50vw',
                                width: '50vw',
                                backgroundColor: 'lightblue',
                              }}
                              alt=""
                            />
                            <h3 className="mb-0 text-white mt-1">{authReducer?.user?.name}</h3>
                            <h6 className="mb-0 text-white "> @{authReducer?.user?.username}</h6>
                            <h6 className="mb-0 text-danger "> Product - {checkProducts(authReducer?.user?.products)}</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Simple statistics --> */}
                  <div className="mb-3">
                    <h6 className="mb-0 font-weight-semibold">Earnings</h6>

                  </div>

                  <div className="row">
                    <FiguresBox
                      iconClass="icon-coin-dollar icon-3x text-success"
                      number={authReducer?.user?.todayIncome ?? 0}
                      text="Today"
                    />

                    <FiguresBox
                      iconClass="icon-coin-dollar icon-3x text-success"
                      number={authReducer?.user?.sevenDaysIncome ?? 0}
                      text="Last 7 Days"
                    />

                    <FiguresBox
                      iconClass="icon-coin-dollar icon-3x text-success"
                      number={authReducer?.user?.thirtyDaysIncome ?? 0}
                      text="Last 30 Days"
                    />

                    <FiguresBox
                      boxClass="col-sm-12 col-xl-12"
                      iconClass="icon-coin-dollar icon-3x text-success"
                      number={
                        authReducer?.user?.activeIncome +
                        authReducer?.user?.passiveIncome ?? 0
                      }
                      text="Total Income"
                    />

                    <FiguresBox
                      boxClass="col-sm-6 col-xl-6"
                      iconClass="icon-coin-dollar icon-3x text-success"
                      number={authReducer?.user?.activeIncome ?? 0}
                      text="Active Income"
                    />
                    <FiguresBox
                      boxClass="col-sm-6 col-xl-6"
                      iconClass="icon-coin-dollar icon-3x text-success"
                      number={authReducer?.user?.passiveIncome ?? 0}
                      text="Passive Income"
                    />
                  </div>
                  {/* <!-- /simple statistics --> */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
