const express = require('express');
const userController = require('./../controllers/userController');
const Authcontroller = require('../controllers/Authcontroller.js');
// const { signup } = require('../controllers/Authcontroller.js');

const router = express.Router();
// router.use(Authcontroller.islogedin);

  router.post('/signup', Authcontroller.signup);
  router.post('/login', Authcontroller.login);
  router.post('/add',Authcontroller.Addteacher);
  router.post('/remove',Authcontroller.Removeteacher);
  router.post('/getdata',Authcontroller.getdata);




module.exports = router;
