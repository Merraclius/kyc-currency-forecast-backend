const path = require('path'),
	{ CurrencyRates } = require(path.join(__modules, 'currency-rates'));

const getCurrencyList = () => {
	return [
		{ key: 'AUD', name: 'Australian dollar' },
		{ key: 'BGN', name: 'Bulgarian lev' },
		{ key: 'BRL', name: 'Brazilian real' },
		{ key: 'CAD', name: 'Canadian dollar' },
		{ key: 'CHF', name: 'Swiss franc' },
		{ key: 'CNY', name: 'Chinese yuan renminbi' },
		{ key: 'CZK', name: 'Czech koruna' },
		{ key: 'DKK', name: 'Danish krone' },
		{ key: 'EUR', name: 'European euro' },
		{ key: 'GBP', name: 'Pound sterling' },
		{ key: 'HKD', name: 'Hong Kong dollar' },
		{ key: 'HRK', name: 'Croatian kuna' },
		{ key: 'HUF', name: 'Hungarian forint' },
		{ key: 'IDR', name: 'Indonesian rupiah' },
		{ key: 'ILS', name: 'Israeli shekel' },
		{ key: 'INR', name: 'Indian rupee' },
		{ key: 'JPY', name: 'Japanese yen' },
		{ key: 'KRW', name: 'South Korean won' },
		{ key: 'MXN', name: 'Mexican peso' },
		{ key: 'MYR', name: 'Malaysian ringgit' },
		{ key: 'NOK', name: 'Norwegian krone' },
		{ key: 'NZD', name: 'New Zealand dollar' },
		{ key: 'PHP', name: 'Philippine peso' },
		{ key: 'PLN', name: 'Polish zloty' },
		{ key: 'RON', name: 'Romanian leu' },
		{ key: 'RUB', name: 'Russian rouble' },
		{ key: 'SEK', name: 'Swedish krona' },
		{ key: 'SGD', name: 'Singapore dollar' },
		{ key: 'THB', name: 'Thai baht' },
		{ key: 'TRY', name: 'Turkish lira' },
		{ key: 'USD', name: 'US dollar' },
		{ key: 'ZAR', name: 'South African rand' }
	];
};

const calculateForecast = (baseCurrency, targetCurrency, maxWeekInterval, includePast) => {
	const currencyRates = new CurrencyRates(baseCurrency, targetCurrency, maxWeekInterval);

	return currencyRates.calculateForecast(includePast);
};

module.exports = {
	getCurrencyList,
	calculateForecast
};
