const path = require('path'),
	tester = require(path.join('..', '..', 'utils', 'unit-tester')),
	{ CurrencyRates } = require(path.join(__modules, 'currency-rates'));

describe(
	'CurrencyRates', function () {
		describe(
			'validate', function () {
				let dataProviders = {
					'correct': {
						data: {
							baseCurrency: 'USD',
							targetCurrency: 'EUR',
							maxWeekInterval: 10
						},
						isValid: true
					},
					'without baseCurrency': {
						data: {
							baseCurrency: null,
							targetCurrency: 'EUR',
							maxWeekInterval: 10
						},
						isValid: false
					},
					'without targetCurrency': {
						data: {
							baseCurrency: 'USD',
							targetCurrency: null,
							maxWeekInterval: 10
						},
						isValid: false
					},
					'without maxWeekInterval': {
						data: {
							baseCurrency: 'USD',
							targetCurrency: 'EUR',
							maxWeekInterval: null
						},
						isValid: false
					},
					'with maxWeekInterval less than 1': {
						data: {
							baseCurrency: 'USD',
							targetCurrency: 'EUR',
							maxWeekInterval: 0
						},
						isValid: false
					},
					'with maxWeekInterval more than 250': {
						data: {
							baseCurrency: 'USD',
							targetCurrency: 'EUR',
							maxWeekInterval: 251
						},
						isValid: false
					}
				};

				for (let dataName in dataProviders) {
					const dataProvider = dataProviders[dataName].data,
						isValid = dataProviders[dataName].isValid;

					it(
						'validate ' + dataName, async () => {
							const currencyRate = new CurrencyRates(dataProvider.baseCurrency, dataProvider.targetCurrency, dataProvider.maxWeekInterval);

							tester.expect(currencyRate.validate()).is.eq(isValid);
						}
					);
				}
			}
		);

	}
);
