const express = require('express');
const path = require('path');

const authMiddleware = require('./services/middlewares/authMiddleware');

const UserController = require('./controllers/UserController');
const ProductController = require('./controllers/ProductController');
const LikeController = require('./controllers/LikeController');

const routes = express.Router();

routes.post('/users', UserController.create);

routes.use(authMiddleware);

routes.get('/login', (req, res) => res.send(req.auth));

routes.get('/products', ProductController.index);

routes.get('/likes', LikeController.index);
routes.post('/likes/:product', LikeController.create);
routes.delete('/likes/:product', LikeController.delete);

module.exports = routes;
