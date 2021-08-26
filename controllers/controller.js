const {User, Investment, UserInvestment} = require('../models/index')
const { verifyPassword } = require('../helpers/bcrypt')
const { addPercent, addTahun, idrFormatter } = require('../helpers/addSymbol')
const { investmentAdvisor } = require('../helpers/advisor')
const {calculateGain, proyeksiUsia} = require('../helpers/calculateGain')

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
    let id = Number(req.session.userId)
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
    let id = Number(req.session.userId)
    User.findByPk(id)
    .then(data => res.render('user-dashboard', {data}))
    .catch(err => res.send(err))
  }
  // chart
  static seeChart(req, res) {
    let investId = Number(req.params.id)
    let userId = Number(req.session.userId)

    let userData;
    User.findByPk(userId)
    .then(data => {
      userData = data
      return Investment.findByPk(investId)
    })
    .then(data => {
      // Pake helper untuk dapetin data chart
      let gainArr = calculateGain(userData.income, userData.expense, data.gain, 10)
      let usiaArr = proyeksiUsia(userData.age, 10)
      res.render('chart', {userData, data, gainArr, usiaArr, idrFormatter})
    })
  }
  // user investment
  static getUserInvest(req, res) {
    let id = Number(req.session.userId)
    User.findByPk(id, {
      include: [Investment]
    })
    .then(data => {
      res.render('user-investment', {data, addPercent, addTahun})
    })
    .catch(err => res.send(err))
  }
  // add user investment
  static getAddInvestment(req, res) {
    let id = Number(req.session.userId)
    let investmentData;

    Investment.findAll()
    .then(data => {
      investmentData = data
      return User.findByPk(id, {
        include: [Investment]
      })
    })
    .then(data => res.render('user-investment-add', {investmentData, data}))
    .catch(err => res.send(err))
  }
  static postAddInvestment(req, res) {
    let userId = Number(req.session.userId)
    let {period, InvestmentId} = req.body
    UserInvestment.create({
      period: Number(period),
      UserId: userId,
      InvestmentId: Number(InvestmentId),
      createdAt: new Date (),
      updatedAt: new Date ()
    })
    .then(() => res.redirect('/user/invest'))
  }
  static getRecommendation(req, res) {
    let userId = Number(req.session.userId)
    let userData;
    User.findByPk(userId, {
      include: [Investment]
    })
    .then(data => {
      userData = data
      // Dapatin Rekomendasi Finansial
      let advice = investmentAdvisor(data.income, data.expense, data.age)
      return Investment.findAll({
        where: {name:advice}
      })
    })
    .then(data => {
      // Masukin rekomendasi investasi ke dalam UserInvestment
      data.forEach(each => {
        UserInvestment.create({
          period: 10,
          UserId: userId,
          InvestmentId: Number(each.id),
          createdAt: new Date (),
          updatedAt: new Date ()
        })
      });
      // return User.findByPk(userId, {
      //   include: [Investment]
      // })
    })
    .then(() => {
      res.redirect('/user/invest')
    })
    .catch(err => res.send(err))
  }
}


module.exports = Controller