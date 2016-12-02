var exp = require('express');
var mong= require('mongoose');
mong.connect('mongodb://unc:landmine@ds117348.mlab.com:17348/itheater')
var Cat = mong.model('Cat', { name: String });

var kitty = new Cat({ name: 'unc' });
kitty.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('meow');
  }
});

// design
var movie = mong.model('movies',{name: String, type: String, ratings: String});

// implementation
var movie1=new movie({name: "MOvie1", type:"horro", ratings:10});

movie1.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('meow');
  }
});

var reg2 = {name: "unc"}
var reg = mong.model('registration',{name: String, email:String, password: String});

var user = new reg({name: "unc", email:"unc@delandev.com", passwor:"landmine"});

user.save(function(err){
  if (err) {
    console.log("Oooh" + reg2.name + "you have no idea what you doing");
  }else{
    console.log("Good Job Boy");
  }
});
var moviedata = require('./api/movies.js');
app= exp();
app.set('view engine', 'pug')
// mongodb://<dbuser>:<dbpassword>@ds117348.mlab.com:17348/itheater
console.log(moviedata);
var Router = exp.Router();
Router.get('/city/:moscow', function(req,res){
  var seasionname=req.params.moscow;
  res.render('index',{moscow: 'this ' +seasionname+', is good', moviedataInsideTemplate: moviedata})
});
app.use(Router);
app.use('/public', exp.static('public'));
app.listen(5000,function(){
  console.log('I\'m alive');
});
