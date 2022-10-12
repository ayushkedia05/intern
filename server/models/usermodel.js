const mongoose = require('mongoose');
const validator = require('validator');
const jwt=require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please tell your name']
  },
  email: {
    type: String,
    required: [true, 'provide an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'please provide a vaild email']
  },
  role:{
    type:String,default:'user'
  },

  phonenumber:{
    type:Number
  },
  teacher:{
   type: [String]
  },
 
  password: {
    type: String,
    required: [true, 'please give password'],
    minlength: 8,
    select: false
  },
    passwordconfirm: {
      type: String,
     
      validate: {
        // This always work on save and create

        validator: function(el) {
          return el === this.password;
        }
      }
    },
    tokens:[{
      token:{
          type:String,
          required:true,
      }
  }]
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); // ren function if password is modified

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordconfirm = undefined;
  next();
}); 


userSchema.methods.generateAuthToken = async function(){
  try{
      const token = jwt.sign({_id:this._id.toString()}, process.env.JWT_SECRET);
      this.tokens = this.tokens.concat({token:token});
      await this.save();
      return token;
  }catch(err){
      console.log(err)
  }
}

userSchema.methods.correctpassword = async function(
  candidatepassword,
  userpassword
) {
  console.log(candidatepassword,userpassword);
  return await bcrypt.compare(candidatepassword, userpassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
