const bcrypt = require('bcrypt')

function hashPassword(password) {
    const hash = bcrypt.hashSync(password, 10)

    return hash
}

module.exports = { hashPassword }