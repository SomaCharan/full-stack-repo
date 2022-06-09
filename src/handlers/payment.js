const Router = require("express").Router();
const shortid = require("shortid");
const Razorpay = require("razorpay");

const port = process.env.PORT || 4000;
const isDevelopment = port.toString().includes("4000");

const razorpayOptions = isDevelopment
  ? // test keys
    {
      key_id: "rzp_test_W3Z271TBZUSS5t",
      key_secret: "lOW5MUy0Z6xGHho3vD22PQlp",
    }
  : // prod keys
    {
      key_id: "rzp_live_iuvlVeLMPlClj6",
      key_secret: "F1p1846LCASOUyVV6KooID07",
    };

const razorpay = new Razorpay(razorpayOptions);

/**
 * create order
 */
Router.post("/razorpay_create_orders", async (req, res) => {
  const payment_capture = 1;

  var options = {
    amount: parseInt(req.body.price, 10) * 100, // amount in the smallest currency unit
    currency: "INR",
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    res.status(200).json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});

/**
 * update user with the payment
 */
Router.post("/catch_payment/:userreference", async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { userreference: req.params.userreference },
      { $push: { orders: req.body } }
    )
      .then(() => {
        return res.status(200).send("Order confirmed");
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
        return;
      });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

module.exports = Router;
