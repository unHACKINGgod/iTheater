var exp = require('express');
var mong= require('mongoose');
var handlebars= require('express-handlebars');
var bodyParser = require('body-parser');
mong.connect('mongodb://unc:landmine@ds117348.mlab.com:17348/itheater');
var moviedata = require('./api/movies.js');
app= exp()
app.use(bodyParser.urlencoded({'extended':false}));
app.use(bodyParser.json());
var moviemodel = mong.model("movies",{name:String,
city: String,
ratings: String});
app.engine('handlebars', handlebars.create({
  defaulLayout: 'main',
  layoutsDir: './views/layouts',
  partialDir: './views/partials'
}).engine);
app.set('view engine', 'handlebars');
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
Router.get('/movie/addpage', function(req,res){
  res.render('movieaddpage', {namePage: "form for movies"});
});
Router.get('/movie/add', function(req,res){
  var movieFromRoute=req.query;
  var movie = new moviemodel({name:movieFromRoute.moviename, city: movieFromRoute.city, ratings: movieFromRoute.ratings });
  movie.save(function(err){
    if(err){
      console.log(err);
    }
    res.redirect('/movie/addpage');
  });
});
app.use(Router);
app.use('/public', exp.static('public'));
app.listen(5000,function(){
  console.log('I\'m alive');
});
