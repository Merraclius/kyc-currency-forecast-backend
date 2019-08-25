const moment = require('moment'),
	{ currencies, exchangeRates } = require('exchange-rates-api');

/**
 * Temporary object for caching. Should be replaced with some more appropriate methods
 * @type {{}}
 */
const ratesCache = {};

/**
 * Class for fetching currency rates and generating forecast values
 *
 * @method calculateForecast - Calculate currency forecast rates (also can return past rates, depends on input argument)
 */
class CurrencyRates {
	constructor(baseCurrency, targetCurrency, maxWeekInterval) {
		this.baseCurrency = baseCurrency;
		this.targetCurrency = targetCurrency;
		this.maxWeekInterval = maxWeekInterval;
		this.errors = [];
	}

	/**
	 * Validating model and in case it not valid return false.
	 * Errors accessible in property {errors}
	 *
	 * @returns {boolean}
	 */
	validate() {
		this.errors = [];
		const currenciesArray = Object.keys(currencies);

		if (!this.baseCurrency || !~currenciesArray.indexOf(this.baseCurrency)) {
			this.errors.push('Wrong base currency');
		}

		if (!this.targetCurrency || !~currenciesArray.indexOf(this.targetCurrency)) {
			this.errors.push('Wrong target currency');
		}

		if (!this.maxWeekInterval || this.maxWeekInterval < 1 || this.maxWeekInterval > 250) {
			this.errors.push('Wrong maximum interval');
		}

		return !this.errors.length;
	}

	/**
	 * Creating weeks intervals and fetch currency rates for that intervals
	 *
	 * @returns {Promise<[]>}
	 */
	async _getPastRates() {
		const rates = [];

		for (let week = 1; week <= this.maxWeekInterval; week++) {
			const startDay = week * 7;

			const startDate = moment().subtract(startDay, 'days').startOf('isoWeek').format('YYYY-MM-DD'),
				endDate = moment(startDate).add(6, 'days').format('YYYY-MM-DD');

			const rate = await this._fetchRate(startDate, endDate, this.baseCurrency, this.targetCurrency);

			rates.push(rate);
		}

		return rates;
	}

	/**
	 * Fetching rates from exchange rates api and cached it.
	 * If combination of input arguments already exists in cache returned it
	 *
	 * @param startDate
	 * @param endDate
	 * @param baseCurrency
	 * @param targetCurrency
	 * @returns {{startDate, endDate, factor}}
	 */
	async _fetchRate(startDate, endDate, baseCurrency, targetCurrency) {
		const key = [startDate, endDate, baseCurrency, targetCurrency].join(':');

		if (!ratesCache[key]) {
			const rawFactor = await exchangeRates()
				.from(startDate)
				.to(endDate)
				.base(baseCurrency)
				.symbols(targetCurrency)
				.avg(3);

			ratesCache[key] = { startDate: startDate, endDate: endDate, factor: rawFactor };
		}

		return ratesCache[key];
	}

	/**
	 * Generate forecast rates based on past rates.
	 * Currently just randomize past currency factors.
	 * ToDo: add actual prediction algorithm for generating rate forecast
	 *
	 * @param pastRates
	 * @returns {Array<{startDate, endDate, factor}>}
	 */
	async _generateForecastRates(pastRates) {
		return pastRates.map(
			rate => {
				const startOfWeekDate = moment().startOf('isoWeek'),
					startDate = startOfWeekDate.add(startOfWeekDate.diff(rate.startDate)).format('YYYY-MM-DD'),
					endDate = moment(startDate).add(6, 'days').format('YYYY-MM-DD');

				return {
					startDate: startDate,
					endDate: endDate,
					factor: Math.round((rate.factor + ((Math.random() - 0.5) / 100)) * 1000) / 1000
				};
			}
		);
	}

	/**
	 * Calculate currency forecast rates and return.
	 *
	 * @param {boolean} includePast - In case "true" also prepend result with past values
	 * @returns {Promise<*[]>}
	 */
	async calculateForecast(includePast) {
		if (!this.validate()) {
			throw new Error('Form is not valid: ' + JSON.stringify(this.errors));
		}

		const pastRates = await this._getPastRates();
		const forecastRates = await this._generateForecastRates(pastRates);

		return includePast ? pastRates.concat(forecastRates) : forecastRates;
	}
}

module.exports = { CurrencyRates };
