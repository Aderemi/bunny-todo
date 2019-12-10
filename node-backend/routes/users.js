const {createUser, getAllUsers, updateUser, deleteUser} = require("../controller/user");

const express = require('express');
const router = express.Router();
const validateUser = require('../middleware/user');

const queries = require('../db/queries');
const user = new queries("user");

router.get('/', getAllUsers);

router.post('/', validateUser, createUser);

router.put('/:id', validateUser, updateUser);

router.delete('/:id', deleteUser);

module.exports = router;