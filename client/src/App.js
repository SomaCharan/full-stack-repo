import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'react-toastify/dist/ReactToastify.min.css';
import './App.css';
import Home from './components/FrontendComponents/Home';
import AboutMentor from './components/FrontendComponents/AboutMentor';
import Products from './components/FrontendComponents/Products';
import Contact from './components/FrontendComponents/Contact';
import PrivacyPolicy from './components/FrontendComponents/PrivacyPolicy';
import TermsAndConditions from './components/FrontendComponents/TermsAndConditions';
import RefundAndCancellation from './components/FrontendComponents/RefundAndCancellation';
import LoginSignup from './components/FrontendComponents/LoginSignup';
import ErrorPage from './components/FrontendComponents/ErrorPage';
import Dashboard from './components/DashboardComponents/Dashboard';
import IncomeDashboard from './components/DashboardComponents/IncomeDashboard';
import AddBankInformation from './components/DashboardComponents/AddBankInformation';
import AddUser from './components/DashboardComponents/AddUser';
import Users from './components/DashboardComponents/Users';
// import UsersIncomeTable from './components/DashboardComponents/UsersIncomeTable';
import AddNotification from './components/DashboardComponents/AddNotification';
import Notifications from './components/DashboardComponents/Notifications';
import AllVideos from './components/DashboardComponents/AllVideos';
import EditUser from './components/DashboardComponents/EditUser';
import AffiliateDashboard from './components/DashboardComponents/AffiliateDashboard';
import Payments from './components/DashboardComponents/Payments';
import WithdrawalRequests from './components/DashboardComponents/WithdrawalRequests';
import AddVideo from './components/DashboardComponents/AddVideo';
import Videos from './components/DashboardComponents/Videos';
import { loadUser } from './redux/actions/authActions';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);

  function checkIfDashboard() {
    if (
      window.location.href.includes('dashboard') ||
      window.location.href.includes('ebook') ||
      window.location.href.includes('edit-user') ||
      window.location.href.includes('add-user') ||
      window.location.href.includes('users') ||
      window.location.href.includes('success-kit') ||
      window.location.href.includes('add-video') ||
      window.location.href.includes('all-videos') ||
      window.location.href.includes('bank-information') ||
      window.location.href.includes('withdrawal-requests') ||
      window.location.href.includes('payments') ||
      window.location.href.includes('leaderboard') ||
      window.location.href.includes('notifications') ||
      window.location.href.includes('add-notifications') ||
      window.location.href.includes('users-income-table') ||
      window.location.href.includes('deep-talk')
    ) {
      return true;
    }
    return false;
  }

  return (
    <>
      {checkIfDashboard() === false ? (
        <>
          <link rel="stylesheet" href="assets/css/vendor.css" />
          <link rel="stylesheet" href="assets/css/style.css" />
          <link rel="stylesheet" href="assets/css/responsive.css" />
        </>
      ) : (
        <>
          <link
            href="/assets/dashboardStyle/assets/css/bootstrap.css"
            rel="stylesheet"
            type="text/css"
          />
          <link
            href="/assets/dashboardStyle/assets/css/bootstrap_limitless.css"
            rel="stylesheet"
            type="text/css"
          />
          <link
            href="/assets/dashboardStyle/assets/css/layout.css"
            rel="stylesheet"
            type="text/css"
          />
          <link
            href="/assets/dashboardStyle/assets/css/icons/icomoon/styles.min.css"
            rel="stylesheet"
            type="text/css"
          />
        </>
      )}

      <div
        id="root-app-spinner"
        className="d-flex justify-content-center align-items-center"
      >
        <div className="spinner-border text-light" role="status">
          <span className="sr-only" />
        </div>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/about-mentor" exact element={<AboutMentor />} />
          <Route path="/contact" exact element={<Contact />} />
          <Route path="/privacy-policy" exact element={<PrivacyPolicy />} />
          <Route path="/products" exact element={<Products />} />
          <Route path="/terms-and-conditions" exact element={<TermsAndConditions />} />
          <Route path="/refunds-and-cancellation" exact element={<RefundAndCancellation />} />
          <Route path="/login" exact element={<LoginSignup />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/bank-information" exact element={<AddBankInformation />} />
          <Route path="/payments" exact element={<Payments />} />
          <Route path="/withdrawal-requests" exact element={<WithdrawalRequests />} />
          <Route path="/income-dashboard/:userId/" exact element={<IncomeDashboard />} />
          <Route
            path="/dashboard/affiliate-dashboard"
            exact
            element={<AffiliateDashboard />}
          />
          {/* <Route path="/users-income-table" exact element={<UsersIncomeTable />} /> */}
          <Route path="/add-notifications" exact element={<AddNotification />} />
          <Route path="/notifications" exact element={<Notifications />} />
          <Route path="/add-video" exact element={<AddVideo />} />
          <Route path="/add-user" exact element={<AddUser />} />
          <Route path="/users" exact element={<Users />} />
          <Route path="/all-videos" exact element={<AllVideos />} />
          <Route path="/edit-user/:userId/" exact element={<EditUser />} />
          {/* key makes sure, it again renders the component if its shared on some common routes */}
          <Route
            path="/success-kit/videos"
            key="success-kit-videos"
            exact
            element={<Videos />}
          />
          <Route
            path="/mini-success-kit/videos"
            key="mini-success-kit-videos"
            exact
            element={<Videos />}
          />
          <Route path="/*" element={<ErrorPage />} />
          <Route path="/**" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
