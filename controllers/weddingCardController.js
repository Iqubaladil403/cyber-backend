const WeddingCard = require("../models/WeddingCard");

// POST: Add new wedding card
exports.addWeddingCard = async (req, res) => {
  try {
    const images = req.files?.map((f) => `/uploads/${f.filename}`) || [];

    const card = await WeddingCard.create({
      title: req.body.title,
      price: req.body.price,
      discount: req.body.discount,
      size: req.body.size,
      paper: req.body.paper,
      images,
    });

    res.status(201).json(card);
  } catch (err) {
    res.status(400).json({ message: err.message });
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
    const card = await WeddingCard.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    // text fields update
    card.title = req.body.title ?? card.title;
    card.price = req.body.price ?? card.price;
    card.discount = req.body.discount ?? card.discount;
    card.size = req.body.size ?? card.size;
    card.paper = req.body.paper ?? card.paper;

    // new images (optional)
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(
        (f) => `/uploads/${f.filename}`
      );
      card.images = [...card.images, ...newImages]; // append
    }

    const updated = await card.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
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
