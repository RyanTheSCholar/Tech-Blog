const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.params.user.id,
      },
      attributes: ['id', 'title', 'body', 'date_created'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'body_text', 'post_id', 'user_id', 'date_created'],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    const post = postData.map((post) => post.get({plain: true}));
    res.render('dashboard', {post, 
        logged_in: req.session.logged_in
    })
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        user_id: req.params.user.id,
      },
      attributes: ['id', 'title', 'body', 'date_created'],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ['id', 'body_text', 'post_id', 'user_id', 'date_created'],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        
      ],
    });
    if(!postData) {
        res.status(404).json({message: 'Post not found at this id.'})
    } else{
        const post = postData.map((post) => post.get({plain: true}));
    res.render('edit', {post, 
        logged_in: req.session.logged_in
    })
    }
    
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;