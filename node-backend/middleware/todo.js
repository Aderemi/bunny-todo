const Query = require("../db/queries");
const user = new Query("user");

function validateTodo(req, res, next) {
    if(!req.body.description || !req.body.user_id){
        return res.status(400).json({
            "message": "Invalid todo data: description or user_id cannot be empty"
        });
    }

    user.getOneBy({"id" : req.body.user_id})
        .then(user =>{
            if(user){
                next();
            }else{
                return res.status(400).json({
                    "message": "Invalid todo data: cannot add todo.js for user not in existence"
                });
            }
        }).catch(err => res.status(500).json({message: err}));
}

module.exports = validateTodo;