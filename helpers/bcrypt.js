const bcrypt = require('bcrypt')
let salt = bcrypt.genSaltSync(10);

function hashPassword(originalPassword) {
  return bcrypt.hashSync(originalPassword, salt)
}

function verifyPassword(originalPassword, hashedPassword) {
  return bcrypt.compareSync(originalPassword, hashedPassword)
}

module.exports = {hashPassword, verifyPassword}