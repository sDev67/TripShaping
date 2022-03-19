const
	express = require('express'),
	cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// register routes
require('./routes')(app);

// register error handling middleware
app.use(function (err, req, res, next) {
	if (err.status === undefined) {
		return res.status(500).send(err.message);
	} else {
		return res.status(err.status).send(err.message);
	}
});

// launch server
const server = app.listen(4200, function () {
	const host = server.address().address;
	const port = server.address().port;
	console.log('App listening at http://%s:%s', host, port);
});