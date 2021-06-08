const fetch = require('node-fetch');

const key = process.env.SHOPIFY_KEY;
const pass = process.env.SHOPIFY_PASS;

module.exports = async () => {
  const response = await fetch(
    `https://${key}:${pass}@send4-avaliacao.myshopify.com/admin/api/2021-04/products.json`
  );

  const json = await response.json();
  return json.products.map((product) => {
    return {
      id: product.id,
      title: product.title,
      images: product.images.map((image) => ({ src: image.src })),
    };
  });
};
