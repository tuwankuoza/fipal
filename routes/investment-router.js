const Controller = require('../controllers/controller');
const investmentRouter = require('express').Router();

// investment page, berisi list investment yang tersedia
investmentRouter.get('/investment', Controller);

module.exports = investmentRouter