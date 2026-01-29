const express = require("express");
const router = express.Router();
const upload = require("../config/upload");

const {
  addWeddingCard,
  getWeddingCards,
  getWeddingCardById,
  updateWeddingCard,
  deleteWeddingCard,
} = require("../controllers/weddingCardController");

// GET all wedding cards
router.get("/", getWeddingCards);

// GET single wedding card by ID (for edit prefill)
router.get("/:id", getWeddingCardById);

// ADD new wedding card
router.post("/", upload.array("images", 5), addWeddingCard);

// UPDATE wedding card
router.put("/:id", upload.array("images", 5), updateWeddingCard);

// ❌ DELETE
router.delete("/:id", deleteWeddingCard);

module.exports = router;
