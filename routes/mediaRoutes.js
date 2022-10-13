const express = require('express');
const routesController = require('../Controller/mediaRouteController');
const { verifyToken } = require('../authentifications/authentication.js');
const route = express.Router();



route.get("/news", verifyToken, routesController.getNews);
route.post('/addNews', verifyToken, routesController.addNews);
route.patch('/news/:id', verifyToken, routesController.updateNews);
route.delete('/news/:id', verifyToken, routesController.deleteNews);

module.exports = route;