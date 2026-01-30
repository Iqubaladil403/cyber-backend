const WeddingCard = require("../models/WeddingCard");

// POST: Add new wedding card
// controllers/weddingCardController.js

exports.addWeddingCard = async (req, res) => {
  try {
    const imageUrls = req.files.map(file => file.path); // 🔥 Cloudinary URLs

    const card = await WeddingCard.create({
      title: req.body.title,
      price: req.body.price,
      discount: req.body.discount,
      size: req.body.size,
      paper: req.body.paper,
      images: imageUrls, // ✅ yahin save
    });

    res.status(201).json(card);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET: All wedding cards
exports.getWeddingCards = async (req, res) => {
  try {
    const cards = await WeddingCard.find().sort({ createdAt: -1 });
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT: Update wedding card
exports.updateWeddingCard = async (req, res) => {
  try {
    const imageUrls = req.files?.map(file => file.path);

    const updateData = {
      ...req.body,
    };

    if (imageUrls && imageUrls.length > 0) {
      updateData.images = imageUrls;
    }

    const card = await WeddingCard.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(card);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET: Single wedding card by ID
exports.getWeddingCardById = async (req, res) => {
  try {
    const card = await WeddingCard.findById(req.params.id);

    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.json(card);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE: Wedding Card
exports.deleteWeddingCard = async (req, res) => {
  try {
    const card = await WeddingCard.findById(req.params.id);

    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    await card.deleteOne();
    res.json({ message: "Wedding card deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
