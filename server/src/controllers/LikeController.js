const LikeRepository = require('../repositories/LikeRepository');
const UserRepository = require('../repositories/UserRepository');
const { sendEmail } = require('../services/mailer');
const getProducts = require('../services/shopify');

const likedMessage = async (product_id, username) => {
  const products = await getProducts();

  const [product] = products.filter(
    (product) => String(product.id) === product_id
  );

  return {
    text: `${username}, você acaba de curtir o produto ${product.title} em sua conta no app Desafio Shopify. Obrigado por usar nosso app :)`,
    html: `<h4>Ei, recebemos sua curtida!</h4>
      <hr />
      <p>${username},</p><br /> 
      <p>recebemos sua curtida no produto ${product.title}</p><br />
      <p><b>Obrigado por usar nosso app :)</b></p> <br /><br />
      <a target="_blank" href="https://api.whatsapp.com/send?phone=5519974198800&text=Obrigado%20pelo%20sistema%20%3A)">Agradecer ao criador do sistema</a>
    `,
  };
};

const unlikedMessage = async (product_id, username) => {
  const products = await getProducts();

  const [product] = products.filter(
    (product) => String(product.id) === product_id
  );

  return {
    text: `${username}, você acaba de descurtir o produto ${product.title} em sua conta no app Desafio Shopify. Obrigado por usar nosso app :)`,
    html: `<h4>Ei, algo de errado ocorreu?</h4>
      <hr />
      <p>${username},</p><br /> 
      <p>recebemos sua descurtida no produto ${product.title}</p><br />
      <p><b>Obrigado por usar nosso app :)</b></p> <br /><br />
      <a target="_blank" href="https://api.whatsapp.com/send?phone=5519974198800&text=Obrigado%20pelo%20sistema%20%3A)">Agradecer ao criador do sistema</a>
    `,
  };
};

const sendEmailUpdate = ({ to, subject, message }) => {
  return sendEmail({
    to,
    subject,
    message,
  }).catch(console.error);
};

class LikeController {
  async index(req, res) {
    const { id: user_id } = req.auth;
    const likes = await LikeRepository.findAll({ user_id });
    res.json(likes);
  }

  async create(req, res) {
    const { product: product_id } = req.params;
    const { id: user_id, email, username } = req.auth;

    const alreadyLiked = await LikeRepository.findOne({ product_id, user_id });

    if (alreadyLiked) {
      return res.status(400).json({ message: 'post already liked' });
    }

    const like = await LikeRepository.create({ product_id, user_id });
    if (like) {
      const message = await likedMessage(product_id, username);

      sendEmailUpdate({
        to: email,
        subject: 'Nova curtida no app Desafio Shopify',
        message,
      });

      return res.json(like);
    }
  }

  async delete(req, res) {
    const { product: product_id } = req.params;
    const { id: user_id, email, username } = req.auth;

    const alreadyLiked = await LikeRepository.findOne({
      product_id,
      user_id,
    });

    if (!alreadyLiked) {
      return res.status(400).json({ message: 'this product is not liked' });
    }

    await LikeRepository.delete({ product_id, user_id });
    const message = await unlikedMessage(product_id, username);

    sendEmailUpdate({
      to: email,
      subject: 'Descurtida no app Desafio Shopify',
      message,
    });

    return res.sendStatus(204);
  }
}

module.exports = new LikeController();
