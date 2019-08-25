const createError = require('http-errors'),
	express = require('express'),
	logger = require('morgan');

require('./constants');

const apiRouter = require('./routes/api');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	if (req.app.get('env') === 'development') {
		console.error(err);
	}

	// render the error page
	res.status(err.status || 500);
	res.json({
		message: err.message,
		error: err
	})
});

module.exports = app;
