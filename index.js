var exp = require('express');
var mong= require('mongoose');
mong.connect('mongodb://unc:landmine@ds117348.mlab.com:17348/itheater');
var moviedata = require('./api/movies.js');
app= exp();
app.set('view engine', 'pug')
// mongodb://<dbuser>:<dbpassword>@ds117348.mlab.com:17348/itheater
// console.log(moviedata);
var Router = exp.Router();
var cityModel = mong.model('cities', {name: String});
Router.get('/city/:moscow', function(req,res){
  var seasionname=req.params.moscow;
  var city = new cityModel({name: seasionname});
  city.save(function(error){
    res.render('index',{moscow: 'this ' +seasionname+', is good', moviedataInsideTemplate: moviedata, issave: error ? "record is not save":"Welcome To iTheater"})
  });

});
app.use(Router);
app.use('/public', exp.static('public'));
app.listen(5000,function(){
  console.log('I\'m alive');
});
