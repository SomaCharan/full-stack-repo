import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { format, isEqual, isAfter, sub } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import DashboardHeader from './shared/DashboardHeader';
import DashboardSidebar from './shared/DashboardSidebar';
import FiguresBox from './shared/FiguresBox';
import { getIncome } from '../../redux/actions/userActions';
import setGlobalLoader from '../../redux/actions/dashboardLoaderActions';
import Table from './shared/Table';

export default function Dashboard() {
  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state.authReducer);
  const [activeUsers, setActiveUsers] = useState([]);
  const [passiveUsers, setPassiveUsers] = useState([]);
  const [activeIncome, setActiveIncome] = useState(0);
  const [passiveIncome, setPassiveIncome] = useState(0);
  const [todayIncome, setTodayIncome] = useState(0);
  const [sevenDaysIncome, setSevenDaysIncome] = useState(0);
  const [thirtyDaysIncome, setThirtyDaysIncome] = useState(0);
  const currentDate = new Date(new Date().toDateString());
  const sevenDaysBeforeDate = sub(new Date(new Date().toDateString()), { days: 7 });
  const thirtyDaysBeforeDate = sub(new Date(new Date().toDateString()), { days: 30 })

  const columns = [
    { title: 'Name', field: 'name', filtering: false },
    { title: 'Email', field: 'email', filtering: false },
    { title: 'Phone', field: 'phone', filtering: false },
    { title: 'Product', field: 'product', filtering: false },
    { title: 'Comission', field: 'commission', filtering: false },
    { title: 'Joined On', field: 'joinedOn', filtering: false },
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
    let tempTodayIncome = 0;
    let tempSevenDaysIncome = 0;
    let tempThirtyDaysIncome = 0;

    const tempArray = [...active, ...passive];

    const usersJoinedToday = tempArray.filter(d => isEqual(new Date(new Date(d?.createdAt).toDateString()), currentDate))
    const usersJoinedInLastSevenDays = tempArray.filter(d => isAfter(new Date(new Date(d?.createdAt).toDateString()), sevenDaysBeforeDate))
    const usersJoinedInLastThirtyDays = tempArray.filter(d => isAfter(new Date(new Date(d?.createdAt).toDateString()), thirtyDaysBeforeDate))

    if (usersJoinedToday.length > 0) {
      for (let index = 0; index < usersJoinedToday.length; index++) {
        tempTodayIncome += parseInt(usersJoinedToday[index].commission, 10);
      }
    }
    if (usersJoinedInLastSevenDays.length > 0) {
      for (let index = 0; index < usersJoinedInLastSevenDays.length; index++) {
        tempSevenDaysIncome += parseInt(usersJoinedInLastSevenDays[index].commission, 10);
      }
    }
    if (usersJoinedInLastThirtyDays.length > 0) {
      for (let index = 0; index < usersJoinedInLastThirtyDays.length; index++) {
        tempThirtyDaysIncome += parseInt(usersJoinedInLastThirtyDays[index].commission, 10);
      }
    }
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

    setTodayIncome(tempTodayIncome);
    setSevenDaysIncome(tempSevenDaysIncome);
    setThirtyDaysIncome(tempThirtyDaysIncome);
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

  useEffect(() => {
    setGlobalLoader(true);
    dispatch(getIncome())
      .then((res) => {
        if (res.status === 200) {
          calculateIncome(res.data.activeUsers, res.data.passiveUsers);
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
  }, []);

  // const authReducer = useSelector((state) => state.authReducer);

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
                    <span className="font-weight-semibold">Dashboard</span>
                  </h4>
                  {/* <h4 className=" d-lg-none">
                    <span className="font-weight-semibold text-success">
                      {authReducer?.user?.name}
                    </span>
                    <br />
                    <span className="font-weight-semibold text-danger">
                      @{authReducer?.user?.username}
                    </span>
                  </h4> */}
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
                  number={todayIncome ?? 0}
                  text="Today"
                />

                <FiguresBox
                  iconClass="icon-coin-dollar icon-3x text-success"
                  number={sevenDaysIncome ?? 0}
                  text="Last 7 Days"
                />

                <FiguresBox
                  iconClass="icon-coin-dollar icon-3x text-success"
                  number={thirtyDaysIncome ?? 0}
                  text="Last 30 Days"
                />
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
    </>
  );
}
