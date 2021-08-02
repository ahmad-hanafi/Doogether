const { User } = require('../models')
const bcrypt = require('bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
    static register(req, res, next) {
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        User.create(newUser)
            .then(user => {
                res.status(201).json({ name: user.name, email: user.email })
            })
            .catch(err => {
                next(err)
            })
    }

    static login(req, res, next) {
        if (req.body.email === '') {
            next({
                code: 400,
                message: "Email cannot be empty"
            })
        } else if (req.body.password === '') {
            next({
                code: 400,
                message: "Password cannot be empty"
            })
        } else {
            User.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then(user => {
                if (user) {
                    const isValidPassword = bcrypt.compareSync(req.body.password, user.password)
                    if (isValidPassword) {
                    let payload = { id: user.id, email: user.email, name: user.name }
                    res.status(200).json({ ...payload, access_token: generateToken(payload) })

                } else {
                    next({
                        code: 400,
                        message: "invalid email or password"
                    })
                }
            } else {
                        next({
                            code: 400,
                            message: "invalid email or password"
                        })
            }
        })
        .catch(err => {
            console.log(err)
            next({
                code: 500,
                msg: err
            })
        })
    }
    }
}

module.exports = UserController