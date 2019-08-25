let path = require('path'),
	tester = require(path.join('..', 'utils', 'functional-tester')),
	httpClient = tester.client();

describe(
	'Api routes', function () {
		describe('#currencies', function () {
			it(
				'return correct number of currencies', async () => {
					let res = await httpClient
						.get('/api/currencies')
						.expect(200);

					tester.expect(res.body).to.have.lengthOf(32);
				}
			);
		});
	}
);
