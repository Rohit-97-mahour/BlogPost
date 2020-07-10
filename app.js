const express = require('express');
const app = new express();
//const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//const BlogPost = require('./models/BlogPost');
const fileUpload = require('express-fileupload'); // To upload a file
const validateMiddleware = require('./middleware/validationMiddleware');
const expressSession = require('express-session');
const flash = require('connect-flash');

app.set('view engine','ejs');
app.use(express.static('public')); // To Serve Static File
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());
app.use('posts/store',validateMiddleware);
app.use(expressSession({
  secret: 'keyboard cat'
}));
// conditionally Display New Post, Login and New User links
global.loggedIn = null;
app.use('*',(req,res,next)=>{
  loggedIn = req.session.userId
  //console.log(loggedIn);
  next()
});
app.use(flash());

mongoose.connect('mongodb+srv://Rohit-mahour_12:Mahaur$1208@cluster0.19xqi.mongodb.net/my_database',{useNewUrlParser: true});
// app.get('/',async(req,res)=>{
//   //const blogposts = await BlogPost.find({});
//   //console.log(blogposts);
//   //res.render('index');
//   const blogposts = await BlogPost.find({});
//   //console.log(blogposts);
//   res.render('index',{
//     blogposts: blogposts
//   });
//   //console.log(blogposts);
// })
const homeController = require('./controllers/home');
app.get('/',homeController);

// app.get('/',(req,res)=>{
//   //res.sendFile(path.resolve(__dirname,'pages/index.html'));
//   res.render('index');
// });

// app.get('/about',(req,res)=>{
//   //res.sendFile(path.resolve(__dirname,'pages/about.html'));
//   res.render('about');
// });

// app.get('/contact',(req,res)=>{
//   //res.sendFile(path.resolve(__dirname,'pages/contact.html'));
//   res.render('contact');
// });

// app.get('/post/:id',async(req,res)=>{
//   //res.sendFile(path.resolve(__dirname,'pages/post.html'));
//   const blogpost = await BlogPost.findById(req.params.id)
//   res.render('post',{
//     blogpost: blogpost
//   });
//   //console.log(blogpost);
// });

const getPostController = require('./controllers/getPost');
app.get('/post/:id',getPostController);

// app.get('/posts/new',(req,res)=>{
//   res.render('create');
// });
const newPostController = require('./controllers/newPost');
const authMiddleware = require('./middleware/authMiddleware.js');
app.get('/posts/new',authMiddleware,newPostController);

//prevent Login/Register if Logged in
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware.js');

// app.post('/posts/store',(req,res)=>{
//   //console.log(req.body.title);
//   //console.log(req.body.uname);
//   //console.log(req.body);
//   let image = req.files.image;
//   image.mv(path.resolve(__dirname,'public/img',image.name),async(error)=>{
//       await BlogPost.create({
//         ...req.body,
//         image: '/img/' + image.name
//       })
//       res.redirect('/')
//     });
// });
const storePostController = require('./controllers/storePost');
app.post('/posts/store',authMiddleware,storePostController);

// New User register

const newUserController = require('./controllers/newUser.js');
app.get('/auth/register',redirectIfAuthenticatedMiddleware,newUserController);

const storeUserController = require('./controllers/storeUser.js');
app.post('/users/register',redirectIfAuthenticatedMiddleware,storeUserController);

// Login Users

const loginController = require('./controllers/login.js');
app.get('/auth/login',redirectIfAuthenticatedMiddleware,loginController);

const loginUserController = require('./controllers/loginUser.js');
app.post('/users/login',redirectIfAuthenticatedMiddleware,loginUserController);

// Logout Users

const logoutController = require('./controllers/logout.js');
app.get('/auth/logout', logoutController);

app.use((req,res)=>{res.render('notfound')});

let port = process.env.PORT;
if(port == null || port == ""){
  port = 4000;
}
app.listen(port,(req,res)=>{
  console.log('App listening...');
});
