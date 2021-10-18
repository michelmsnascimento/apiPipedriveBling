const express = require('express');
const routes = express.Router();

const ApiController = require('./controllers/dealsController');

// Controllers
routes.post('/deals', ApiController.dealsBling);
routes.get('/deals', ApiController.getDeals);
routes.post('/deals/orders', ApiController.createDeals);

module.exports = routes;
