const express = require('express');
const { getClientes, createCliente, updateCliente, deleteCliente } = require('../controllers/clientesController');
const router = express.Router();


router.get('/', getClientes);


router.post('/', createCliente);


router.put('/:id', updateCliente);


router.delete('/:id', deleteCliente);

module.exports = router;
