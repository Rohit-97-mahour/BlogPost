const User = require('../models/User.js');
const path = require('path');

module.exports = (req,res) => {
  User.create(req.body, (error,user)=>{
    if(error){
      //console.log(error);
      //console.log(Object.keys(error.errors));
      const validationerrors = Object.keys(error.errors).map(key=>error.errors[key].message);
      //req.session.validationerrors = validationerrors;
      req.flash('validationerrors',validationerrors);
      req.flash('data',req.body);
      return res.redirect('/auth/register');
    }
    //console.log(error, user);
    res.redirect('/');
  });
}
