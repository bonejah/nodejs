'use strict'
const ValidationContrat = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');
const md5 = require('md5');
const emailService = require('../services/email-service');
const authService = require('../services/auth-service');

exports.post = async (req, res, next) => {
  let contract = new ValidationContrat();
  contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres!');
  contract.isEmail(req.body.email, 'O e-mail informado é inválido!');
  contract.hasMinLen(req.body.password, 6, 'A senha deve conter pelo menos 6 caracteres!');

  // Se os dados forem inválidos
  if (!contract.isValid) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  try {
    await repository.create({
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY),
      roles: ['user']
    });

    emailService.send(
      req.body.email,
      'Bem vindo ao Node Store',
      global.EMAIL_TMPL.replace('{0}', req.body.name));

    res.status(201).send({ message: 'Cliente cadastrado com sucesso.' });
  } catch (error) {
    res.status(400).send({ message: 'Falha ao cadastrar o cliente.', data: error });
  }
}

exports.authenticate = async (req, res, next) => {
  try {
    const customer = await repository.authenticate({
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY)
    });

    console.log(customer)

    if (!customer) {
      res.status(404).send({ message: 'Usuário/Senha Inválidos.', data: error });
      return;
    }

    const token = await authService.generateToken({
      id: customer._id,
      email: customer.email,
      name: customer.name,
      roles: customer.roles
    });

    res.status(201).send({
      token: token,
      data: {
        id: customer._id,
        email: customer.email,
        name: customer.name
      },
      message: 'Cliente autenticado com sucesso.'
    });
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: 'Falha ao autenticar o cliente.', data: error });
  }
}

exports.refreshToken = async (req, res, next) => {
  try {
    // Recupera o token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    // Decodigica o token
    const data = await authService.decodeToken(token);

    const customer = await repository.getById(data.id);
    console.log(customer)

    if (!customer) {
      res.status(404).send({ message: 'Cliente não encontrado', data: error });
      return;
    }

    const tokenData = await authService.generateToken({
      id: customer._id,
      email: customer.email,
      name: customer.name,
      roles: customer.roles
    });

    res.status(201).send({
      token: tokenData,
      data: {
        id: customer._id,
        email: customer.email,
        name: customer.name
      },
      message: 'Cliente autenticado com sucesso.'
    });
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: 'Falha ao autenticar o cliente.', data: error });
  }
}