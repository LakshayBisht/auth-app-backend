const router = require('express').Router();

const auth = require('../middlewares/auth');
const {homeRoute} = require('../controllers/home');

router.route('/').get(auth, homeRoute);

module.exports = router;
