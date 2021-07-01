const express = require("express");

const {
  sneakerFetch,
  deleteSneaker,
  createSneaker,
  updateSneaker,
} = require("./controllers");

const router = express.Router();

router.get("/", sneakerFetch);
router.delete("/:productID", deleteSneaker);
router.post("/", createSneaker);
router.put("/:productID", updateSneaker);

module.exports = router;
