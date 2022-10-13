const express = require('express');
const routesController = require('../Controller/viewsController');
const { verifyToken } = require('../authentifications/authentication');
const viewRouter = express.Router();


viewRouter.get("/", routesController.getRedirect);
viewRouter.get("/login", routesController.getLoginForm);
viewRouter.get("/register", routesController.getRegisterForm);
viewRouter.get("/home", verifyToken, routesController.getHome);
viewRouter.get("/sports", verifyToken, routesController.getSports);
viewRouter.get("/contact", verifyToken, routesController.getContactUs);
viewRouter.get("/aboutUs", verifyToken, routesController.getAboutUs);
viewRouter.get("/addNewsForm", verifyToken, routesController.getaddNewsForm);
viewRouter.get("/news", verifyToken, routesController.getNews);
viewRouter.get('/news/:id', verifyToken, routesController.getEditNews);
viewRouter.get('/chatForm', verifyToken, routesController.getChatForm);

module.exports = viewRouter;