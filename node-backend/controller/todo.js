const express = require('express');
const router = express.Router();
const validateTodo = require('../middleware/todo');

const queries = require('../db/queries');
const todo = new queries("todo");

const getAllTodos = (req, res) => {
    todo
        .getAll()
        .then(todos => {
            res.status(200).json({ todos: todos });
        }).catch(err => res.status(400).json({message: err}));
};

const getUserTodos = (req, res) => {
    console.log(`going GET '/${req.params.user_id}`);
    todo
        .getAllBy({user_id: req.params.user_id})
        .then(todos => {
            res.status(200).json({ todos: todos });
        }).catch(err => res.status(400).json({message: err}));
};

const createTodo = (req, res) => {
    console.log("going POST '/' route");
    todo.create({
        user_id: req.body.user_id,
        description: req.body.description
    }).then(id =>{
        res.status(201).json({ todo: {
            id: id[0],
            user_id: req.body.user_id,
            description: req.body.description,
            status: "to do"
        }});
    }).catch(err => res.status(400).json({message: err}));
};

const updateTodo = (req, res) => {
    console.log(`going PUT '/${req.params.id}`);
    todo.update(req.params.id, {
        description: req.body.description
    }).then(data =>{
        res.status(201).json({ todo: {
            id: data[0],
            user_id: data[1],
            description: data[2],
            status: data[3]
        }});
    }).catch(err => res.status(400).json({message: err}));
};

const markCompleted = (req, res) => {
    console.log(`going PUT '/${req.params.id}`);
    todo.update(req.params.id, {
        status: req.body.status
    }).then(data =>{
        res.status(201).json({ todo: {
            id: data[0],
            user_id: data[1],
            description: data[2],
            status: data[3]
        }});
    }).catch(err => res.status(400).json({message: err}));
};

const deleteTodo = (req, res) => {
    console.log(`going DELETE '/${req.params.id}`);
    todo.delete(req.params.id)
        .then((id) => res.status(200).json({message: "successfully deleted"}))
        .catch(err => res.status(400).json({message: err}));
};

module.exports = {deleteTodo, markCompleted, updateTodo, createTodo, getUserTodos, getAllTodos};