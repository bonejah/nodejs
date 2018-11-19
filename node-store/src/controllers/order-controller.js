'use strict'
const repository = require('../repositories/order-repository');
const guid = require('guid');
const authService = require('../services/auth-service');

exports.get = async (req, res, next) => {
  try {
    const data = await repository.get();
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Falha ao processar a requisiçã0', data: error });
  }
}

exports.post = async (req, res, next) => {
  try {
    // Recupera o token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    // Decodigica o token
    const data = await authService.decodeToken(token);

    await repository.create({
      customer: data.id,
      number: guid.raw().substring(0, 6),
      items: req.body.items
    });
    res.status(201).send({ message: 'Pedido cadastrado com sucesso.' });
  } catch (error) {
    res.status(400).send({ message: 'Falha ao cadastrar o pedido.', data: error });
  }
}