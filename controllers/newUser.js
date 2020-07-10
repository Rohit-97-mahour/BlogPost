module.exports = (req,res) =>{
  var username = "";
  var password = "";

  const data = req.flash('data')[0];
  if(typeof data != "undefined"){
    username = data.username;
    password = data.password;
  }

  //console.log(data)
  res.render('register',{
    errors : req.flash('validationerrors'),
    username: username,
    password: password
  });    //render register.ejs
}
