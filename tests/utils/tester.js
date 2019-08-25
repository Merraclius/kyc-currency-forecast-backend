const chai = require('chai'),
	chaiHttp = require('chai-http');

process.env.NODE_ENV = 'test';
require('./../../constants');

chai.use(chaiHttp);

module.exports = {
	expect: chai.expect
};
