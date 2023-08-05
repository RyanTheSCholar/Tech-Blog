const router = require('express').Router();
const { Model } = require('sequelize');
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.post('/', withAuth,async(req, res) => {
    try {
        const postData = await Post.create(req.body, {
            include: {model: User}
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});
router.delete('/:id', withAuth, async(req, res) => {
    try {
        const postData = await Post.destroy({
            where:{
                id: req.params.id,
                user_id: req.session.user_id
            },
        });
        if(!postData){
            res.status(404).json({message: 'No post found with this id!'});
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});
router.put('/:id', withAuth, async(req, res) => {
    try {
        const postData = await Post.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        if(!postData){
            res.status(404).json({message: 'No post found with this id!'});
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;