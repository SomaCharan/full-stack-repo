import React from 'react';
import DashboardHeader from './shared/DashboardHeader';
import DashboardSidebar from './shared/DashboardSidebar';
import PurchaseNow from './shared/PurchaseNow';

export default function Ebook() {
  const a = 0;

  return (
    <>
      <DashboardHeader />
      <div className="page-content">
        <DashboardSidebar />
        {/* <!-- Main content --> */}
        <div className="content-wrapper">
          {/* <!-- Inner content --> */}
          <div className="content-inner">
            {a === 0 ? (
              <PurchaseNow amount="269" product="ebook" productId='1' />
            ) : (
              // {/* TODO condition if user has bought or not */}
              // {/* <!-- Page header --> */}
              <div className="page-header page-header-light">
                <div className="page-header-content header-elements-lg-inline">
                  <div className="page-title d-flex">
                    <h4>
                      <span className="font-weight-semibold">Dashboard</span>
                    </h4>
                  </div>
                </div>
              </div>
            )}
            {/* <!-- /page header --> */}
          </div>
        </div>
      </div>
    </>
  );
}
