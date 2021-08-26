const express = require('express');
const app = express();
const port = 2000;
const router = require('./routes/index')
const session = require('express-session')

app.set('view engine', 'ejs');
app.use('/', express.static('public'));
app.use('/', express.urlencoded({ extended: true }));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use('/', router);

app.listen(port, () => {
  console.log('running on port', port);
});