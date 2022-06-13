const Router = require("express").Router();
const { body } = require("express-validator");
const rejectBadRequests = require("../services/validationService");
const auth = require("../middleware/auth");
const Video = require("../models/Video");
const User = require("../models/User");

const videoPostBodyValidators = [
  body("link")
    .notEmpty()
    .withMessage("Link field is required")
    .isString()
    .withMessage("link must be a string."),
  body("title")
    .notEmpty()
    .withMessage("Title field is required")
    .isString()
    .withMessage("Title must be a string."),
  body("category")
    .notEmpty()
    .withMessage("category field is required")
    .isString()
    .withMessage("category must be a string."),
  body("product")
    .notEmpty()
    .withMessage("products are required creation")
    .isArray()
    .withMessage("product must be a list."),
  body("product.*")
    .notEmpty()
    .withMessage("product should be provided for deletion")
    .isString()
    .withMessage("product must be a string."),
];

// todo add admin validator
/**
 * create a video
 */
Router.post(
  "/",
  auth,
  videoPostBodyValidators,
  rejectBadRequests,
  async (req, res) => {
    const { product, ...videoData } = req.body;

    try {
      const videos = await Video.find();

      const countVar = videos.length;

      video = new Video({
        ...videoData,
        primaryKey: countVar + 1,
      });

      await video.save().catch((err) => {
        console.log(err);
        return res
          .status(400)
          .send("some error occured while saving video, Please contact admin");
      });

      product.forEach(async (ele) => {
        await Video.findByIdAndUpdate(video.id, {
          $push: { products: ele },
        }).catch((err) => {
          console.log(err);
          res
            .status(400)
            .send(
              "some error occured while saving video, Please contact admin"
            );
          return;
        });
      });

      return res.status(200).send("Video Created Successfully.");
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send("Some error occurred while creating video. Contact Admin");
      return;
    }
  }
);

/**
 * get a list of videos
 */
Router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  let videos;
  const product = user.products[0];

  try {
    //  if admin return all videos, else return only which are can be shown to user
    if (user.userType === "0") {
      videos = await Video.find().select("-createdAt -updatedAt");
    } else {
      videos = await Video.find({ products: { $in: [product] } }).select(
        "-createdAt -updatedAt"
      );
    }
    return res.status(200).json(videos);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

// todo add admin validator
/**
 * Video update api
 */
Router.patch("/:videoId", auth, async (req, res) => {
  const admin = await User.findById(req.user.id);

  if (admin.userType !== "0") {
    return res
      .status(401)
      .send({ msg: "You are not authorized to make this action." });
  }

  try {
    const video = await Video.findById(req.params.videoId);

    if (!video) {
      return res.status(404).send({ msg: "no Video found with this video ID" });
    }

    await Video.findByIdAndUpdate(req.params.videoId, req.body)
      .then(() => {
        return res.status(200).send("Video details updated successfully");
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

// todo add admin validator
/**
 * video Delete APi
 */
Router.delete("/:videoId", auth, async (req, res) => {
  const admin = await User.findById(req.user.id);

  if (admin.userType !== "0") {
    return res
      .status(401)
      .send({ msg: "You are not authorized to make this action." });
  }

  try {
    const video = await Video.findById(req.params.videoId);

    if (!video) {
      return res.status(404).send({ msg: "no Video found with this video ID" });
    }

    await Video.findByIdAndDelete(req.params.videoId)
      .then(() => {
        return res.status(200).send("Video deleted Successfully");
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).send(err);
      });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

module.exports = Router;
