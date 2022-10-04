// const req = require('express/lib/request');
const User = require('../models/usermodel.js');
const jwt = require('jsonwebtoken');
const {promisify}=require('util');
const Apperror = require('../appError.js');


const catchAsync = require('./../catchAsync');
const AppError = require('./../appError');


exports.signup = async (req, res, next) => {
  try {
    
    const newUser = await User.create(req.body);

    res.status(201).json({
      status: 'success',
     
      data: {
        newUser
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(new Date().getFullYear());

    const date=[new Date().getFullYear(),new Date().getMonth(),new Date().getDate()];
  // if email password exist
  if (!email || !password) {
    return next(new Apperror('please provide email and password', 400));
  }

  try {
    const user = await User.findOne({ email }).select('+password');
  
    console.log(password);
    console.log('ff');
    console.log(user.time);

    const correct = await user.correctpassword(password, user.password);

    console.log(correct);

    if (!user || !correct) {
      return next(new Apperror('Incorrect email or password', 401));
    }

    console.log(user.password);

    console.log(correct);

     if(!user.time.includes(date))
     {
      user.time.push(date);
      console.log(user.time);
      const getuser= await User.updateOne({"email":email},{$set:{"time":user.time}});
     }

    console.log('sffs');
    res.status(200).json({
      status: 'success',
      token
    });
  } catch (err) {
    status: 'fail', err;
  }
});


