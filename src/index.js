// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const { env } = require('./config/vars');
const logger = require('./config/logger');
const app = require('./config/express');
const mongoose = require('./config/mongoose');

// open mongoose connection
mongoose.connect();

// listen to requests
app.listen(process.env.PORT, () => logger.info(`server started on port ${process.env.PORT} (${env})`));

/**
* Exports express
* @public
*/
module.exports = app;
