const express = require('express');

const router = express.Router();
const {createTodo, deleteTodo, getAllTodos, getUserTodos, markCompleted, updateTodo} = require("../controller/todo");
const validateTodo = require('../middleware/todo');

const queries = require('../db/queries');
const todo = new queries("todo");

router.get('/', getAllTodos);

router.get('/user/:user_id', getUserTodos);

router.post('/', validateTodo, createTodo);

router.put('/:id', validateTodo, updateTodo);

router.put('/:id/completed', markCompleted);

router.delete('/:id', deleteTodo);

module.exports = router;