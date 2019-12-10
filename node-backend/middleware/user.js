const Query = require("../db/queries");
const user = new Query("user");

function validateUser(req, res, next) {
    if(!req.body.name){
        return res.status(400).json({
            "message": "Invalid user data: user name cannot be empty"
        });
    }

    user.getOneBy({"name" : req.body.name})
        .then(user =>{
            if(user){
                return res.status(400).json({
                    "message": "Invalid user data: user is already existing"
                });
            }else{
                next();
            }
        }).catch(err => res.status(500).json({message: "Unknown error"}));
}

module.exports = validateUser;