const {User, Investment, UserInvestment} = require('../models/index')
const { verifyPassword } = require('../helpers/bcrypt')

class Controller {
  // login
  static getLogin(req, res) {
    res.render('user-login')
  }
  static postLogin(req, res) {
    let { email, password } = req.body
    User.findOne({
      where: {email}
    })
    .then(data => {
      if(data) {
        // verifikasi password
        let verification = verifyPassword(password, data.password)
        if(verification) {
          req.session.isLogin = true
          req.session.email = data.email
          req.session.userId = data.id
          res.redirect('/user')
        } else {
          res.send('Email/password salah')
        }
      } else {
        res.send('Email tidak terdaftar')
      }
    })
    .catch(err => res.send(err))
  }
  // logout
  static logout(req, res) {
    req.session.destroy()
    res.redirect('/user/login')
  }
  // register
  static getRegister(req, res) {
    res.render('user-register')
  }
  static postRegister(req, res) {
    let { email, password } = req.body
    User.create({
      email: email,
      password: password,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    req.session.email = email
    res.redirect('/user/login')
  }
  // profile
  static getUserProfile(req, res) {
    let id = req.session.userId
    User.findByPk(id)
    .then(data => {
      res.render('user-profile', {data})
    })
    .catch(err => res.send(err))
  }
  static postUserProfile(req, res) {
    let id = req.session.userId
    let {name, age, profession, city, phone, income, expense} = req.body
    User.update({
      name: name,
      age: age,
      profession: profession,
      city: city,
      phone: phone,
      income: income,
      expense: expense,
      updatedAt: new Date()
    }, {
      where: {id}
    })
    res.redirect('/user')
  }
  // user dashboard
  static userDashboard (req, res) {
    let id = req.session.userId
    User.findByPk(id)
    .then(data => res.render('user-dashboard', {data}))
    .catch(err => res.send(err))
  }
}


module.exports = Controller