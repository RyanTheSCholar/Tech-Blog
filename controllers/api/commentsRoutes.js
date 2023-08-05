const router = require('express').Router();
const { Post, User, Comment} = require('../models');
const withAuth = require('../utils/auth');

router.post('/', withAuth,async(req, res) => {
    try {
        const commentData = await Comment.create(req.body, {
            include: {model: User}
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;