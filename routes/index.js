const router = require('express').Router();
const userRouter = require('./user-router')
const investmentRouter = require('./investment-router')

// homepage
router.get('/', (req, res) => {
  res.render('homepage');
});

// userpage
router.use('/user', userRouter);

// investment page
// router.use('/investment', investmentRouter);

module.exports = router;