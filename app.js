let express = require("express");
let path = require("path");

let app = express();
let PORT = process.env.PORT || 3000;

app.get("/",function(req,res){
    res.sendFile(path.join(__dirname,"/public/home.html"));
});
app.get("/make",function(req,res){
    res.sendFile(path.join(__dirname,"/public/make.html"));
});
app.get("/view",function(req,res){
    res.sendFile(path.join(__dirname,"/public/view.html"));
});

app.listen(PORT,function(){
    console.log("App is listening" + PORT)
});