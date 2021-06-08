const UsersRepository = require('../../repositories/UserRepository');

module.exports = async (req, res, next) => {
  const { username, password } = req.headers;

  const user = await UsersRepository.findByUserAndPassword({
    username,
    password,
  });

  req.auth = user;
  return user ? next() : res.status(401).json({ message: 'Não autenticado!' });
};
