require('dotenv').config({path: './config.env'});
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

require('./models/User');

app.use('/api/auth', require('./routes/auth'));
app.use('/api/home', require('./routes/home'));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
