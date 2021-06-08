const { v4: uuid } = require('uuid');
const UserRepository = require('../repositories/UserRepository');

class UserController {
  async find(req, res) {
    const users = await UserRepository.findAll();
    console.log(users);
    res.send('opa');
  }

  async create(req, res) {
    const { username, email, password } = req.body;
    const id = uuid();

    const isMissing = (param, res) => {
      return param
        ? true
        : res.status(400).json({ message: 'faltando parametros' });
    };

    isMissing(username, res);
    isMissing(email, res);
    isMissing(password, res);

    const userAlreadyExists = await UserRepository.findByUsername(username);
    const emailAlreadyInUse = await UserRepository.findByEmail(email);

    if (userAlreadyExists) {
      return res.status(400).json({ message: 'nome de usuario já em uso' });
    }

    if (emailAlreadyInUse) {
      return res.status(400).json({ message: 'email já registrado' });
    }

    const user = await UserRepository.create({
      id,
      username,
      email,
      password,
    });

    res.json(user);
  }
}

module.exports = new UserController();
