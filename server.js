const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

var app=express();

hbs.registerPartials(__dirname + '/views/partials' );
app.set('view engine','hbs');
app.use((req,res,next) =>{
    var now =new Date().toString();
   var log=`${now} : ${req.method} ${req.path}`;
    fs.appendFile('server.log',log + '\n',(err)=>{
        if(err)
        {
            console.log("unable to add to server log file");
        }
    })
    
next();
})

app.use((req,res,next)=>{
    res.render('maintainance.hbs');
})


app.use(express.static(__dirname + '/public'));

app.get('/',(req,res)=>{

   res.render('home.hbs',
      {
          PageTitle:'Home page',
          Greet :'Welcome'
    })

});


app.get('/bad',(req,res)=>{
  
    res.send({
        errorMessage : "Bad request"
    });
})

app.get('/about',(req,res)=>
{
    res.render('about.hbs',
{
    PageTitle : 'AboutPage',
    CurrentYear : new Date().getFullYear()
});
})

app.listen(3000);