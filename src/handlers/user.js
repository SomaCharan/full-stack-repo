const Router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var multer = require("multer");
const { body } = require("express-validator");
const User = require("../models/User");
const Order = require("../models/Order");
const rejectBadRequests = require("../services/validationService");
const { v4: uuidv4 } = require("uuid");
const auth = require("../middleware/auth");
var cloudinary = require("cloudinary").v2;
const sgMail = require("@sendgrid/mail");

const port = process.env.PORT || 4000;

const isDevelopment = port.toString().includes("4000");

sgMail.setApiKey(
  "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"
);

cloudinary.config({
  cloud_name: "dtqrvcvp8",
  api_key: "137487476221951",
  api_secret: "uSHY3PvYKXbMfoYnw0AN0wGFYV8",
});

// TODO include payment details as well
const userPostBodyValidators = [
  body("name").notEmpty().withMessage("name field is required"),
  body("username").notEmpty().withMessage("username field is required"),
  body("phone").notEmpty().withMessage("phone field is required"),
  body("email").notEmpty().withMessage("email field is required"),
  body("password").notEmpty().withMessage("password field is required"),
];

var upload = multer({ dest: "public/uploads/" });

/**
 * create a user
 */
Router.post(
  "/",
  userPostBodyValidators,
  rejectBadRequests,
  async (req, res) => {
    // const { paymentData, confirmPassword, ...userDetails } = req.body;
    const { confirmPassword, product, productPrice, ...userDetails } = req.body;


    const userreference = uuidv4();

    const { email, phone, password } = userDetails;

    const productId = product;

    try {
      let user = await User.findOne({ email });

      if (user) {
        res.status(409).json({
          error: [{ msg: "User already Exists with this email address" }],
        });
        return;
      }

      user = await User.findOne({ phone });

      if (user) {
        res.status(409).json({
          error: [{ msg: "User already Exists with this phone number" }],
        });
        return;
      }

      user = new User({
        ...userDetails,
        userreference: userreference,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save().catch((err) => {
        console.log(err);
        res
          .status(400)
          .send(
            "some error occured while creating user, Please contact admin if money has been deducted"
          );
        return;
      });

      await User.findByIdAndUpdate(user.id, {
        $push: { products: productId },
      }).catch((err) => {
        console.log(err);
        res
          .status(400)
          .send(
            "User registered successfully, but failed to update some attributes, Please contact admin."
          );
        return;
      });

      if (
        userDetails.introducerreference !== undefined &&
        userDetails.introducerreference !== "" &&
        userDetails.introducerreference !== null
      ) {
        await User.findOneAndUpdate(
          { userreference: userDetails.introducerreference },
          { $push: { downlineUsers: user.id } }
        ).catch((err) => {
          console.log(err);
          res
            .status(400)
            .send(
              "User registered successfully, but failed to update referer, Please contact admin. You can login from the login page"
            );
          return;
        });
      }

      var msg = {
        to: email, // Change to your recipient
        from: "teamsucessthinks@gmail.com", // Change to your verified sender
        subject: "Complete Payment - Success Thinks",
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="font-family:arial, 'helvetica neue', helvetica, sans-serif">
        <head>
        <meta charset="UTF-8">
        <meta content="width=device-width, initial-scale=1" name="viewport">
        <meta name="x-apple-disable-message-reformatting">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta content="telephone=no" name="format-detection">
        <title>New message</title><!--[if (mso 16)]>
        <style type="text/css">
        a {text-decoration: none;}
        </style>
        <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
        <xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG></o:AllowPNG>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        <style type="text/css">
        #outlook a {
        padding:0;
        }
        .es-button {
        mso-style-priority:100!important;
        text-decoration:none!important;
        }
        a[x-apple-data-detectors] {
        color:inherit!important;
        text-decoration:none!important;
        font-size:inherit!important;
        font-family:inherit!important;
        font-weight:inherit!important;
        line-height:inherit!important;
        }
        .es-desk-hidden {
        display:none;
        float:left;
        overflow:hidden;
        width:0;
        max-height:0;
        line-height:0;
        mso-hide:all;
        }
        [data-ogsb] .es-button {
        border-width:0!important;
        padding:10px 30px 10px 30px!important;
        }
        [data-ogsb] .es-button.es-button-1 {
        padding:5px!important;
        }
        @media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:36px!important; text-align:left } h2 { font-size:26px!important; text-align:left } h3 { font-size:20px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:36px!important; text-align:left } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important; text-align:left } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important; text-align:left } .es-menu td a { font-size:12px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:14px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:20px!important; display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0!important } .es-m-p0r { padding-right:0!important } .es-m-p0l { padding-left:0!important } .es-m-p0t { padding-top:0!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-m-p5 { padding:5px!important } .es-m-p5t { padding-top:5px!important } .es-m-p5b { padding-bottom:5px!important } .es-m-p5r { padding-right:5px!important } .es-m-p5l { padding-left:5px!important } .es-m-p10 { padding:10px!important } .es-m-p10t { padding-top:10px!important } .es-m-p10b { padding-bottom:10px!important } .es-m-p10r { padding-right:10px!important } .es-m-p10l { padding-left:10px!important } .es-m-p15 { padding:15px!important } .es-m-p15t { padding-top:15px!important } .es-m-p15b { padding-bottom:15px!important } .es-m-p15r { padding-right:15px!important } .es-m-p15l { padding-left:15px!important } .es-m-p20 { padding:20px!important } .es-m-p20t { padding-top:20px!important } .es-m-p20r { padding-right:20px!important } .es-m-p20l { padding-left:20px!important } .es-m-p25 { padding:25px!important } .es-m-p25t { padding-top:25px!important } .es-m-p25b { padding-bottom:25px!important } .es-m-p25r { padding-right:25px!important } .es-m-p25l { padding-left:25px!important } .es-m-p30 { padding:30px!important } .es-m-p30t { padding-top:30px!important } .es-m-p30b { padding-bottom:30px!important } .es-m-p30r { padding-right:30px!important } .es-m-p30l { padding-left:30px!important } .es-m-p35 { padding:35px!important } .es-m-p35t { padding-top:35px!important } .es-m-p35b { padding-bottom:35px!important } .es-m-p35r { padding-right:35px!important } .es-m-p35l { padding-left:35px!important } .es-m-p40 { padding:40px!important } .es-m-p40t { padding-top:40px!important } .es-m-p40b { padding-bottom:40px!important } .es-m-p40r { padding-right:40px!important } .es-m-p40l { padding-left:40px!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; max-height:inherit!important } }
        </style>
        </head>
        <body data-new-gr-c-s-loaded="14.1064.0" style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
        <div class="es-wrapper-color" style="background-color:#FAFAFA"><!--[if gte mso 9]>
        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
        <v:fill type="tile" color="#fafafa"></v:fill>
        </v:background>
        <![endif]-->
        <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FAFAFA">
        <tr>
        <td valign="top" style="padding:0;Margin:0">
        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
        <tr>
        <td align="center" style="padding:0;Margin:0">
        <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
        <tr>
        <td align="left" style="Margin:0;padding-bottom:10px;padding-top:20px;padding-left:20px;padding-right:20px">
        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
        <tr>
        <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
        <tr>
        <td align="center" class="es-m-txt-c" style="padding:0;Margin:0;padding-bottom:10px;padding-top:20px"><h3 style="Margin:0;line-height:40px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:bold;color:#333333">Please Complete Payment !</h3></td>
        </tr>
        <tr>
        <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:28px;color:#333333;font-size:14px"><br>Please complete payment of Rs ${productPrice} &nbsp; on below available methods.&nbsp;<br><br>QR Scan&nbsp;Code</p></td>
        </tr>
        <tr>
        <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px;font-size:0px"><img class="adapt-img" src="https://res.cloudinary.com/dtqrvcvp8/image/upload/v1656041616/gsjvhuwjcb9ohcgk6syw.jpg" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="300"></td>
        </tr>
        <tr>
        <td align="left" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Gpay / Phonepe / Paytm :- 9182935177&nbsp;</p></td>
        </tr>
        <tr>
        <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:28px;color:#333333;font-size:14px"><br>Please whatsapp a screenshot of payment&nbsp;to&nbsp;9182935177 to activate your account or click below to whatsapp directly.</p></td>
        </tr>
        <tr>
        <td align="left" class="es-m-txt-l" style="padding:0;Margin:0"><span class="es-button-border" style="border-style:solid;border-color:#2CB543;background:#ffffff;border-width:0px;display:inline-block;border-radius:0px;width:auto"><a href="https://wa.me/9182935177" class="es-button es-button-1" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:20px;border-style:solid;border-color:#ffffff;border-width:5px;display:inline-block;background:#ffffff;border-radius:0px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:24px;width:auto;text-align:center"><!--[if !mso]><!-- --><img src="https://cdn-icons-png.flaticon.com/512/124/124034.png?w=360" alt="icon" style="display:inline-block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;vertical-align:middle;margin-right:10px" align="absmiddle" height="50"><!--<![endif]--></a></span></td>
        </tr>
        </table></td>
        </tr>
        </table></td>
        </tr>
        <tr>
        <td align="left" style="padding:0;Margin:0;padding-bottom:10px;padding-left:20px;padding-right:20px">
        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
        <tr>
        <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-radius:5px" role="presentation">
        <tr>
        <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><span class="es-button-border" style="border-style:solid;border-color:#2CB543;background:#0160f4;border-width:0px;display:inline-block;border-radius:6px;width:auto"><a href="https://successthinks.com/" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:20px;border-style:solid;border-color:#0160f4;border-width:10px 30px 10px 30px;display:inline-block;background:#0160f4;border-radius:6px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:24px;width:auto;text-align:center;border-left-width:30px;border-right-width:30px">Visit Website</a></span></td>
        </tr>
        </table></td>
        </tr>
        </table></td>
        </tr>
        </table></td>
        </tr>
        </table></td>
        </tr>
        </table>
        </div>
        </body>
        </html>`
      };

      // sgMail
      //   .send(msg)
      //   .catch((error) => {
      //     console.error(error);
      //   });

      res
        .status(201)
        .send("User created successfully");
      return;
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send("Some error occurred while creating user. Contact Admin");
      return;
    }
  }
);

/**
 * User update api
 */
Router.patch("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).send({ msg: "no user found with this user ID" });
    }
    await User.findByIdAndUpdate(req.user.id, req.body)
      .then(() => {
        return res.status(200).send("User details updated successfully");
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

// TODO change to patch
/**
 * User image update api
 */
Router.post(
  "/image/:userId",
  auth,
  upload.single("image"),
  async (req, res) => {
    try {
      image = await cloudinary.uploader.upload(req?.file?.path);
    } catch (error) {
      console.log(error);
    }

    var data = { profile_image: image?.secure_url };

    try {
      const user = await User.find({ userreference: req.params.userId });

      if (!user) {
        return res.status(404).send({ msg: "no user found with this user ID" });
      }

      await User.findOneAndUpdate({ userreference: req.params.userId }, data)
        .then(() => {
          return res.status(200).send("User details updated successfully");
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
  }
);

/**
 * get current user income
 */
Router.get("/income", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).send({ msg: "no user found with this user ID" });
    }

    let activeUsers = await User.find({
      introducerreference: user.userreference,
    });

    activeUsers = activeUsers.filter(user => user.isActive !== false);

    let passiveUsers = [];

    for (let i = 0; i < activeUsers.length; i++) {
      let tempUsers = await User.find({
        introducerreference: activeUsers[i].userreference,
      });
      passiveUsers = passiveUsers.concat(tempUsers);
    }

    passiveUsers = passiveUsers.filter(user => user.isActive !== false);

    const activeUsersVar = activeUsers.map((person) => ({
      ...person._doc,
      commission: person?.products?.includes("2") ? "1600" : "3000",
    }));

    const passiveUsersVar = passiveUsers.map((person) => ({
      ...person._doc,
      commission: person?.products?.includes("2") ? "150" : "500",
    }));

    return res
      .status(200)
      .send({ activeUsers: activeUsersVar, passiveUsers: passiveUsersVar });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

/**
 * get leaderboard details
 */
Router.get("/leaderboard", auth, async (req, res) => {

  let userList = ['2dc4347a-1136-481f-8d2f-bf1656a951ca',
    'b58c90af-195c-4565-bf03-be30d86bc1d9',
    'c3c711dd-09f0-4330-891f-4c8aa3ea4a60',
    'a776f2b7-c835-4418-8a0c-0a8e28a8d969',
    'aaeea79d-999d-49a7-b72c-48ad5cf5b39f'];

  if (isDevelopment === true) {
    userList = ['2dc4347a-1136-481f-8d2f-bf1656a951ca',
      'b58c90af-195c-4565-bf03-be30d86bc1d9',
      'c3c711dd-09f0-4330-891f-4c8aa3ea4a60',
      'a776f2b7-c835-4418-8a0c-0a8e28a8d969',
      'aaeea79d-999d-49a7-b72c-48ad5cf5b39f']
  }

  const tempArray = [];

  try {
    const users = await User.find().or([{ userreference: userList[0] }, { userreference: userList[1] }, { userreference: userList[2] }, { userreference: userList[3] }, { userreference: userList[4] },])
      .select("userreference email name LeaderBoardIncome profile_image username");

    let activeUsers;
    for (let j = 0; j < users.length; j++) {
      activeUsers = await User.find({
        introducerreference: users[j].userreference,
      });

      activeUsers = activeUsers.filter(user => user.isActive !== false);

      let passiveUsers = [];

      for (let i = 0; i < activeUsers.length; i++) {
        let tempUsers = await User.find({
          introducerreference: activeUsers[i].userreference,
        });
        passiveUsers = passiveUsers.concat(tempUsers);
      }

      passiveUsers = passiveUsers.filter(user => user.isActive !== false);

      const activeUsersVar = activeUsers.map((person) => ({
        commission: person?.products?.includes("2") ? "1600" : "3000",
      }));

      activeIncomeVarVar = activeUsersVar.reduce(
        (previousValue, currentValue) => previousValue + parseInt(currentValue.commission, 10),
        0
      );

      const passiveUsersVar = passiveUsers.map((person) => ({
        commission: person?.products?.includes("2") ? "150" : "500",
      }));

      passiveIncomeVarVar = passiveUsersVar.reduce(
        (previousValue, currentValue) => previousValue + parseInt(currentValue.commission, 10),
        0
      );
      tempArray.push({ user: users[j], totalIncome: passiveIncomeVarVar + activeIncomeVarVar + parseInt(users[j].LeaderBoardIncome, 10) })
    }

    return res
      .status(200)
      .send(tempArray);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

module.exports = Router;
