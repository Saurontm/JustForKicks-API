const express = require("express");
const passport = require("passport");

const {
  brandFetch,
  createBrand,
  fetchBrand,
  createSneaker,
} = require("./controllers");

const multer = require("multer");
const router = express.Router();

router.param("brandID", async (req, res, next, brandID) => {
  const brand = await fetchBrand(brandID, next);
  if (brand) {
    req.brand = brand;
    next();
  } else {
    const error = new Error("brand not found");
    error.status = 404;
    next(error);
  }
});

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get("/", brandFetch);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createBrand
);
router.post(
  "/:brandID/products",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createSneaker
);

module.exports = router;
