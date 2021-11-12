const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

function getTokenFromHeader(authorization) {
	if (
		(authorization && authorization.split(' ')[0] === 'Token') ||
		(authorization && authorization.split(' ')[0] === 'Bearer')
	) {
		return authorization.split(' ')[1];
	}

	return null;
}

const auth = (req, res, next) => {
	const token = getTokenFromHeader(req.headers.authorization);
	if (!token) {
		res.status(401).json({error: 'token is required'});
	}
	const decoded = jwt.verify(token, secret);
	req.payload = decoded;
	next();
};

module.exports = auth;
