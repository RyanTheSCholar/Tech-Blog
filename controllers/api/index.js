const router = require('express').Router();
const comments = require('./comments');
const posts = require('./posts');
const users = require('./userRoutes');

router.use('/comments', comments);
router.use('/posts', posts);
router.use('/users', users);

module.exports = router;