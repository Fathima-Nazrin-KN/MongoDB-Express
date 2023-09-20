const express = require ('express');
const app = express();
const PORT= 5000;
const mongoose = require("mongoose");


app.use(express.urlencoded({extended:true}));

mongoose.connect("mongodb://127.0.0.1:27017/notes_Sample",{useNewUrlParser:true},{useUnifiedTopology:true})
.then((data)=>console.log(`Database connected with ${data.connection.host}`))
.catch((err)=>console.log(err.message));

const postSchema = new mongoose.Schema({
    title:String,
    content:String
});

let Post = mongoose.model('Post',postSchema)

app.get('/',(req,res)=>{

   res.sendFile(__dirname+'/index.html')
})

app.post('/',(req,res)=>{

    let newPost = new Post({
        title:req.body.title,
        content:req.body.content
    })
    newPost.save();

    
  
    res.send('post submitted')
})
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})