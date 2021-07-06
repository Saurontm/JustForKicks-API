const express = require("express");

const {
  sneakerFetch,
  deleteSneaker,
  createSneaker,
  updateSneaker,
  fetchSneaker,
} = require("./controllers");
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

router.get("/", sneakerFetch);
router.delete("/:productID", deleteSneaker);
router.post("/", createSneaker);
router.put("/:productID", updateSneaker);

module.exports = router;
