const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "can't be blank"],
	},
	email: {
		type: String,
		lowercase: true,
		unique: true,
		required: [true, "can't be blank"],
		match: [/\S+@\S+\.\S+/, 'is invalid'],
		index: true,
	},
	password: {
		type: String,
		required: [true, "can't be blank"],
		minlength: 6,
		select: false,
	},
});

UserSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

UserSchema.methods.validatePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateJWT = function () {
	const today = new Date();
	const exp = new Date(today);
	exp.setDate(today.getDate() + 60);

	return jwt.sign(
		{
			id: this._id,
			username: this.username,
			email: this.email,
			exp: parseInt(exp.getTime() / 1000),
		},
		secret
	);
};

UserSchema.methods.toAuthJSON = function () {
	return {
		id: this._id,
		username: this.username,
		email: this.email,
		token: this.generateJWT(),
	};
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
