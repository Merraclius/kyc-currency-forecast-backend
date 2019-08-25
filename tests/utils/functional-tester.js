const path = require('path'),
	tester = require('./tester'),
	server = require(path.join(__bin, 'www')),
	request = require('supertest'),
	agent = request.agent(server);

tester.client = function () {
	return agent;
};

module.exports = tester;
