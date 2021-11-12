const router = require('express').Router();
const User = require('mongoose').model('User');

const homeRoute = async (req, res, next) => {
	try {
		const user = await User.findById(req.payload.id);
		if (!user) {
			return res.status(401).json({error: 'User is not authorize'});
		}
		return res.status(200).json({
			message: 'User is authenticated',
			user: user.toAuthJSON(),
		});
	} catch (error) {
		res.status(404).json({error: error.message});
	}
};

module.exports = {homeRoute};
