const { verifyToken } = require('../helpers/jwt')
const { User, Sessions } = require('../models')

const authenticate = (req,res, next) => {
    if (!req.headers.access_token) {
        res.status(401).json({ message: "Unathororize !, Please Login First!"})
    } else {
        const verify = verifyToken(req.headers.access_token)
        User.findOne({
            where: {id: verify.id, email: verify.email}
        })
        .then(user => {
            if (!user) {
                res.status(401).json({ message: "Invalid access token"})    
            } else {
                req.currentUser = { id: user.id, name:user.name, email: user.mail}
                next()
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Internal Server Error"})
        })
    }
}

const authorize = (req, res, next) => {
    Sessions.findByPk(req.params.id)
        .then(data => {
            if (data) {
                let validUser = req.currentUser.id === data.userID
                if (validUser) {
                    next()
                } else {
                    res.status(401).json({ message: "Unauthorize! Bukan punya anda !"})
                }
            } else {
                res.status(401).json({ message: "Data not found"})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({ message: err.msg })
        })
}


module.exports = {
    authenticate,
    authorize
}