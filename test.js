const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');

mongoose.connect('mongodb://localhost:27017/my_database',{useNewUrlParser: true});

// BlogPost.create({
//   title: "Hey MongoDB Compass",
//   body: "MongoDB Compass is a famous for storing the data"
// });

// BlogPost.findById({_id: '5ef39345e5456117b8fd091e'},(error, blogpost)=>{
//   console.log(error, blogpost);
// });

BlogPost.findByIdAndDelete({_id: '5ef39345e5456117b8fd091e'}, (error, blogpost)=>{
  console.log(error, blogpost);
});
