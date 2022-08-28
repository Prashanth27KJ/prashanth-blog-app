const router = require("express").Router();
const Category = require("../module/Category");

// CREATE CATEGORY
router.post("/", async (req, res) => {
  const newCat = new Category(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(201).json(savedCat);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET CATEGORY
router.get("/", async (req, res) => {
  try {
    const cats = await Category.find();
    res.status(201).json(cats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
