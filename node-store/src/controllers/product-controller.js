'use strict'
const ValidationContrat = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');
const azure = require('azure-storage')
const config = require('../config')
const guid = require('guid');

exports.get = async (req, res, next) => {
	try {
		const data = await repository.get();
		res.status(200).send(data);
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: 'Falha ao processar a requisiçã0', data: error });
	}
}

exports.getBySlug = async (req, res, next) => {
	try {
		const data = await repository.getBySlug(req.params.slug);
		res.status(200).send(data);
	} catch (error) {
		console.log(error);
		res.status(400).send({ message: 'Falha ao listar o(s) produto(s).', data: error })
	}
}

exports.getById = async (req, res, next) => {
	try {
		const data = await repository.getById(req.params.id);
		res.status(200).send(data);
	} catch (error) {
		console.log(error);
		res.status(400).send({ message: 'Falha ao listar o(s) produto(s).', data: error })
	}
}

exports.getByTag = async (req, res, next) => {
	try {
		const data = await repository.getByTag(req.params.tag);
		res.status(200).send(data);
	} catch (error) {
		console.log(error);
		res.status(400).send({ message: 'Falha ao listar o(s) produto(s).', data: error })
	}
}

exports.post = async (req, res, next) => {
	let contract = new ValidationContrat();
	contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres!');
	contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres!');
	contract.hasMinLen(req.body.description, 3, 'O Descrição deve conter pelo menos 3 caracteres!');

	// Se os dados forem inválidos
	if (!contract.isValid) {
		res.status(400).send(contract.errors()).end();
		return;
	}

	try {
		// Cria o blob Service
		// const blobSvc = azure.BlobService(config.containerConnectionString);
		// let fileName = guid.raw().toString() + '.jpg';
		// let rawData = req.body.image;
		// let matches = rawData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
		// let type = matches[1];
		// let buffer = new Buffer(matches[2], 'base64');

		// Salva a imagem
		// await blobSvc.createBlockBlobFromText('product-images', fileName, buffer, {
		// 	contentType: type
		// }, function (error, result, response) {
		// 	if (error)
		// 		fileName = 'default-product.png';
		// });

		await repository.create({
			title: req.body.title,
			slug: req.body.slug,
			description: req.body.description,
			price: req.body.price,
			active: true,
			tags: req.body.tags,
			// image: 'https://nodestore.blob.core.windows.net/product-images/' + fileName
			image: global.IMG_BASE
		});
		res.status(201).send({ message: 'Produto cadastrado com sucesso.' });
	} catch (error) {
		console.log(error)
		res.status(400).send({ message: 'Falha ao cadastrar o produto.', data: error });
	}
}

exports.put = async (req, res, next) => {
	try {
		await repository.update(req.params.id, req.body);
		res.status(200).send({ message: 'Produto alterado com sucesso.' });
	} catch (error) {
		res.status(400).send({ message: 'Falha ao atualizar o produto.', data: error });
	}
}

exports.delete = async (req, res, next) => {
	try {
		await repository.delete(req.body.id);
		res.status(200).send({ message: 'Produto removido com sucesso.' });
	} catch (error) {
		res.status(400).send({ message: 'Falha ao remover o produto.', data: error });
	}
}
