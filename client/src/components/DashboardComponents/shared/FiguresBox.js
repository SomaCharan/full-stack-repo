import React from 'react';

export default function FiguresBox({
  boxClass = 'col-sm-6 col-xl-4',
  iconClass,
  number,
  text,
}) {
  return (
    <div className={boxClass}>
      <div className="card card-body" style={{background: 'linear-gradient(to right, #003399 0%, #0066ff 100%)' ,  boxShadow: '5px 5px 5px gray' }} >
        <div className="media">
          <div className="mr-3 align-self-center">
            <i className={`${iconClass} text-white`} />
          </div>

          <div className="media-body text-right">
            <h3 className="font-weight-semibold mb-0 text-white">Rs. {number}</h3>
            <span className="text-uppercase font-size-sm text-white">
              {text}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
