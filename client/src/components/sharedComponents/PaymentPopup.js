import React from 'react';

export default function PaymentPopup(setOpenModal, productPrice) {
  return (
    <div >
      <h5>
        Please transfer Rs {productPrice} to any of the given below methods.
      </h5>
      <h6>Qr Scan Code</h6>
      <div className='text-center'>
        <img src='https://res.cloudinary.com/dtqrvcvp8/image/upload/v1656041616/gsjvhuwjcb9ohcgk6syw.jpg' alt='qrcode'
          id='qrscanner' />
      </div>
      <p>Gpay / Phonepe / Paytm :- 9182935177 </p>
      <p>
        Please whatsapp a screenshot of payment to 9182935177 to activate your account or <br /> click <a style={{color : 'blue'}} href="https://wa.me/9182935177" target="_blank" rel="noreferrer">here</a> to whatsapp directly.
      </p>

      <div className="nav-right-part  button-new-css-design  w-100 ">
        <button className="btn btn-red w-100 mt-3" type="submit" onClick={() => setOpenModal(false)}>
          Done
        </button>
      </div>
      <br />
    </div>
  )
}

