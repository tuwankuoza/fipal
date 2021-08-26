function loginCheck(req, res, next) {
  if(req.session.isLogin) {
    next()
  } else {
    res.redirect('/user/login')
  }
}

module.exports = loginCheck