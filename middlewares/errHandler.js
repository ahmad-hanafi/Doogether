let errHandler = (err, req, res, next) => {

    if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({
            message: err.message,
            detail: err.errors[0].message
        })
    } else if (err.code === 400) {
        if (err.message.errors) {
            res.status(400).json({
                message: err.message.errors[0].message
            })  
        } else {
            res.status(400).json({ message: err.message})
        }
    } else if (err.code === 401 || err.name == "JsonWebTokenError") {
        res.status(401).json({message: err.message})
    } else if (err.code === 404) {
        res.status(404).json({message: err.message})
    } else {
        res.status(500).json({message : err})
    }
}

module.exports = errHandler