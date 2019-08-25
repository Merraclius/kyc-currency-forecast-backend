const path = require('path'),
	express = require('express'),
	router = express.Router(),
	MainController = require(path.join(__controllers, 'main'));

router.get('/currencies', (req, res, next) => {
	const list = MainController.getCurrencyList();

	return res.json(list);
});

router.post('/calculate-forecast', async (req, res, next) => {
	const baseCurrency = req.body.baseCurrency,
		targetCurrency = req.body.targetCurrency,
		maxWeekInterval = req.body.maxWeekInterval,
		includePast = !!req.body.includePast;

	try {
		const result = await MainController.calculateForecast(baseCurrency, targetCurrency, maxWeekInterval, includePast);

		res.json(result);
	} catch(err) {
		next(err, req, res, next);
	}
});

module.exports = router;
