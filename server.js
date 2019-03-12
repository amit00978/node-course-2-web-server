const express=require('express');
const hbs = require('hbs');
const fs=require('fs');
const port = process.env.PORT || 3000;
// hbs.registerPartials(__dirname +'/views/partials');
 hbs.registerPartials(__dirname + '/views/partials');
var app=express();
app.set('view engine','hbs')

hbs.registerHelper('getcurrentYear',()=>{
    return new Date().getFullYear();
});

app.use((req,res,next)=>{
var now=new Date().toString();
var log=`${now} ${req.method} ${req.url}`;
console.log(log);
fs.appendFile('server.log',log +'\n',(err)=>{
    if(err){
        console.log("unable to append the file");
    }
});
    next();
});
// app.use((req,res,next)=>{
// res.render('maintance.hbs');
// });
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('scrumit',(message)=>{

    return message.toUpperCase(); 
});

app.get('/',(req,res)=>{
res.render('home.hbs',{
    welcome:"Weclome to the home page",
    pageTitle:"Home"
});

});

app.get('/about',(req,res)=>{
   res.render('about.hbs',{
       pageTitle: 'about page'
   });
})
app.get('/bad',(req,res)=>{

    res.send({
        errormessage: "unable to handle the request"
    });
})
app.listen( port,()=>{
    console.log(`server is up on port ${port}`);
});

