const nodemailer = require('nodemailer');

const user = {
  user: process.env.MAILER_USER,
  password: process.env.MAILER_PASSWORD,
};

const transporter = nodemailer.createTransport({
  host: 'in-v3.mailjet.com',
  port: 587,
  secure: false,
  auth: user,
});

async function sendEmail({ to, subject, message }) {
  return setTimeout(async () => {
    let info = await transporter.sendMail({
      from: '"Desafio Shopify" <binhopersio@gmail.com>',
      to,
      subject,
      text: message.text,
      html: message.html,
    });

    console.log('Message sent: %s', info.messageId);
    return true;
  }, 1000 * 60 * 2);
}

module.exports = { sendEmail };
