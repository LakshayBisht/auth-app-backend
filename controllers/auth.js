const mongoose = require('mongoose');

const User = mongoose.model('User');

const register = async (req, res, next) => {
	const {username, email, password} = req.body;

	try {
		const user = await User.create({username, email, password});
		res.status(201).json(user.toAuthJSON());
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

const login = async (req, res, next) => {
	const {email, password} = req.body;
	if (!email || !password) {
		res
			.status(400)
			.json({success: false, error: "Email and Password can't be empty"});
	}

	try {
		const user = await User.findOne({email}).select('+password');

		if (!user) {
			res.status(404).json({success: false, error: 'Invalid credentials.'});
		}
		const isMatch = await user.validatePassword(password);

		if (!isMatch) {
			res.status(404).json({success: false, error: 'Invalid credentials.'});
		}

		res.status(200).json(user.toAuthJSON());
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

module.exports = {register, login};
