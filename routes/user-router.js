const Controller = require('../controllers/controller');
const userRouter = require('express').Router();
const loginCheck = require('../middlewares/logincheck');

// login page
userRouter.get('/login', Controller.getLogin);
userRouter.post('/login', Controller.postLogin);

// register page
userRouter.get('/register', Controller.getRegister);
userRouter.post('/register', Controller.postRegister);

userRouter.use(loginCheck) // cek status login

// User page
userRouter.get('/', Controller.userDashboard);

// profile page, disini lengkapi data yang belum diisi, dan ubah data yang mau diubah
userRouter.get('/profile', Controller.getUserProfile);
userRouter.post('/profile', Controller.postUserProfile);

// user investment
userRouter.get('/invest', Controller.getUserInvest)

// tambahkan user investment
userRouter.get('/invest/add', Controller.getAddInvestment)
userRouter.post('/invest/add', Controller.postAddInvestment)

// // get recommendation berdasarkan data yang telah diisi
userRouter.get('/recommendation', Controller.getRecommendation);

userRouter.get('/chart/:id', Controller.seeChart);

// logout page
userRouter.get('/logout', Controller.logout);

module.exports = userRouter