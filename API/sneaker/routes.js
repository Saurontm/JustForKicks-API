const express = require("express");

const {
  sneakerFetch,
  deleteSneaker,
  createSneaker,
  updateSneaker,
  fetchSneaker,
} = require("./controllers");

const multer = require("multer");
const router = express.Router();

router.param("productID", async (req, res, next, productID) => {
  const sneaker = await fetchSneaker(productID, next);
  if (sneaker) {
    req.sneaker = sneaker;
    next();
  } else {
    const error = new Error("product not found");
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

router.get("/", sneakerFetch);
router.delete("/:productID", deleteSneaker);
router.post("/", upload.single("image"), createSneaker);
router.put("/:productID", upload.single("image"), updateSneaker);

module.exports = router;
