const getProducts = require('../services/shopify');

class ProductController {
  async index(req, res) {
    const products = await getProducts();

    res.json(products);
  }
}

module.exports = new ProductController();
