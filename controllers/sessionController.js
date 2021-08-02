const { Op } = require('sequelize')
const { Sessions, User } = require('../models')

class sessionsController {
    static showAllByUser(req,res,next) {
        Sessions.findAll({
            where: {
                userID: +req.params.user
            },
            order: [['start', 'ASC']],
            include: {
                model: User,
                attributes: ["id", "name"]
            }
        })
        .then(sessions => {
            res.status(200).json(sessions)
        })
        .catch(err => {
            console.log(err)
            next({
                code: 500,
                message: "Internal server error"
            })
        })
    }

    static showAllByKeyword(req,res,next) {
        Sessions.findAll({
            where: {
                [Op.or]: [
                    { description: { [Op.iLike]: `%${req.params.keyword}%` } },
                  ]
            },
            order: [['start', 'ASC']],
            include: {
                model: User,
                attributes: ["id", "name"]
            }
        })
        .then(sessions => {
            res.status(200).json(sessions)
        })
        .catch(err => {
            next({
                code: 500,
                message: "Internal server error"
            })
        })
    }

    static showAllByDurasi(req,res,next) {
        Sessions.findAll({
            where: {
                duration: +req.params.durasi
            },
            order: [['start', 'ASC']],
            include: {
                model: User,
                attributes: ["id", "name"]
            }
        })
        .then(sessions => {
            res.status(200).json(sessions)
        })
        .catch(err => {
            console.log(err)
            next({
                code: 500,
                message: "Internal server error"
            })
        })
    }

    static findId(req,res,next) {
        Sessions.findOne({
            where: {
                id: +req.params.id
            }
        })
        .then(sessions => {
            if (sessions !== null) {
                res.status(200).json(sessions)
            } else {
                next({
                    code: 404,
                    message: "Error, Data Not Found",
                })
            }
        })
        .catch(err => {
            next({
                code: 500,
                message: err
            })
        })
    }

    static addPost(req,res,next) {
        const data = req.body.date +', ' + req.body.time
        const newSessions = {
            name: req.body.name,
            description: req.body.description,
            start: new Date(data),
            duration: req.body.duration,
            userID: req.currentUser.id
        }
        Sessions.create(newSessions)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            if(err.message) {
                console.log(err.message)
                next({
                    code: 400,
                    message: err.message
                })
            }
            else {
              next({
                  code: 500,
                  message: err
              })
            }
        })
      }

    static update(req,res,next) {
        const data = req.body.date +', ' + req.body.time
        const updateSessions = {
            name: req.body.name,
            description: req.body.description,
            start: new Date(data),
            duration: req.body.duration,
            userID: req.currentUser.id
        }
        Sessions.update(updateSessions, {
            where: {
                id: +req.params.id
            },
            returning: true
        })
        .then(data => {
            res.status(200).json({message: "Succeess Update", data})
        })
        .catch(err => {
            next({
                code: 404,
                message: "Data not Found"
            })
        })
    }

    static delete(req,res,next) {
        Sessions.destroy({
            where: {
                id: +req.params.id
            }
        })
        .then(sessions => {
            res.status(200).json({ message: "Sessions success to delete"})
        })
        .catch(err => {
            next({
                code: 404,
                message: "Data not Found"
            })
            res.status(404).json({ message: "Error, Not Found", detailError: err })
        })
    }
}

module.exports = sessionsController