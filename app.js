const express = require('express');

const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');

const PORT = 8080;

const app = express();

app.use(express.json());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, PATCH, DELETE'
	);
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Content-Type, Authorization'
	);

	next();
});

app.use(indexRoutes);
app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
	console.log(error);
	const status = error.statusCode || 500;
	const message = error.message;
	//data passed in case of validation errors
	const data = error.data;
	res.status(status).json({
		message: message,
		data: data,
	});
});

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});

process.on('SIGINT', () => {
	console.log('\nShutting down');
	process.exit(1);
});
