const router = require("express").Router();
const User = require("../module/User");
const Post = require("../module/Post");

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE POST
router.put("/:_id", async (req, res) => {
  try {
    const post = await Post.findById(req.params._id);
    if (post.username === req.body.username) {
      try {
        const updatePost = await Post.findByIdAndUpdate(
          req.params._id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(201).json(updatePost);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("You Can Update Only Your Posts");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// //DELETE POST
router.delete("/:_id", async (req, res) => {
  try {
    const post = await Post.findById(req.params._id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(201).json("Post has been deleted");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("You Can Delete Only Your Post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// //GET POST
router.get("/:_id", async (req, res) => {
  try {
    const post = await Post.findById(req.params._id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// //GET POST BY QUERY PARAMETAR & GET ALL POST
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
