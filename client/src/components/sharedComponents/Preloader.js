import React, { useEffect } from 'react';
import $ from 'jquery';

export default function Preloader() {
  // const preLoder = $('#preloader');

  useEffect(() => {
    // preLoder.css('display', 'block');
    setTimeout(() => {
      $("#preloader").fadeOut(2000)
    }, 2000);
  }, []);

  return (
    <>
      <div className="preloader" id="preloader">
        <div className="preloader-inner">
          <div className="spinner">
            <div className="dot1" />
            <div className="dot2" />
          </div>
        </div>
      </div>
      <div className="body-overlay" id="body-overlay" />
    </>
  );
}
