const router = require("express").Router();
const User = require("../module/User");
const Post = require("../module/Post");
const bcrypt = require("bcrypt");

//UPDATE
router.put("/:_id", async (req, res) => {
  if (req.body.userId == req.params._id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params._id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateUser);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(401).json("You Can Update Only Your Account");
  }
});

// //DELETE
router.delete("/:_id", async (req, res) => {
  if (req.body._id === req.params._id) {
    try {
      const user = await User.findById(req.params._id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params._id);
        res.status(200).json("User has been deleted");
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  } else {
    res.status(401).json("You Can Delete Only Your Account");
  }
});

//GET USER
router.get("/:_id", async (req, res) => {
  try {
    const user = await User.findById(req.params._id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
