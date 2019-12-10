const express = require('express');
const router = express.Router();
const validateUser = require('../middleware/user');

const queries = require('../db/queries');
const user = new queries("user");

const getAllUsers = (req, res) => {
    user
        .getAll()
        .then(users => {
            res.status(200).json({ users: users });
        }).catch(err => res.status(400).json({message: err}));
};

const createUser = (req, res) => {
    console.log("going POST '/' route");
    user.create({
        name: req.body.name,
    }).then(id =>{
        res.status(201).json({ user: {
            id: id[0],
            name: req.body.name
        }})
    }).catch(
        err => res.status(400).json({message: err})
    );
};

const updateUser = (req, res) => {
    console.log(`going PUT '/${req.params.id}'`);
    user.update(req.params.id, {
        name: req.body.name
    }).then(id => {
        res.status(201).json({ user: {
            id: id[0],
            name: req.body.name,
        }});
    }).catch(err => res.status(400).json({message: err}));
};

const deleteUser = (req, res) => {
    console.log(`going DELETE '/${req.params.id}`);
    user.delete(req.params.id)
        .then((id) => res.status(200).json({message: "successfully deleted"}))
        .catch(err => res.status(400).json({message: err}));
};

module.exports = {deleteUser, updateUser, createUser, getAllUsers};