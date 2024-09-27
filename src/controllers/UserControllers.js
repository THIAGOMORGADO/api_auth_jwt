const User = require('../models/User');
const { v4: uuidv4 } = require("uuid")
const hashPassword = require('../utils/crypt');

const UserControllers = {
  async ShowAllUser(req, res) {
    const { id } = req.params
    const user = await User.findAll(id)

    if (user) {
      return res.json(user)
    }
    return res.json({ message: "user not found" })
  },

  async CreateUser(req, res) {
    const { name, password, email, role } = req.body;

    if (!name || !password || !email || !role) {
      return res.status(400).send('Por favor, forneça todos os campos obrigatórios.');
    }
    const userExists = await User.findOne({ where: { email } });
    const dataUser = {
      id: uuidv4(),
      name,
      password: await hashPassword(password),
      email,
      role
    }

    if (!userExists) {
      const user = await User.create(dataUser);
      return res.status(201).json(user);
    }

    return res.status(409).json({ message: 'Já existe um usuário com esse email.' });
  },

  async UpdateUser(req, res) {
    const { id } = req.params;
    const { password } = req.body;

    if (!id) {
      return res.status(400).send('Por favor, forneça pelo menos um campo para atualizar.');
    }
    const user = await User.findByPk(id);

    const newPassword = password ? await hashPassword(password) : user.password;

    return res.status(200).json(await user.update({ password: newPassword }));

  },
  async DeleteUser(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send('Usuário não encontrado.');
    }

    await user.destroy();
    return res.status(200).send('Usuário excluído com sucesso.');


  }
}

module.exports = UserControllers;