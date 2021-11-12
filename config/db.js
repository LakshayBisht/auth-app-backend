const mongoose = require('mongoose');

const connectDB = async () => {
	const URI = process.env.MONGO_URI;

	try {
		const conn = await mongoose.connect(URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			// useCreateIndex: true,
			// useFindAndModify: true,
		});
		console.log(`MongoDB Connected : ${conn.connection.host}`);
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

module.exports = connectDB;
