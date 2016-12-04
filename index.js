var exp = require('express');
var mong= require('mongoose');
var handlebars= require('express-handlebars');
var bodyParser = require('body-parser');
var request = require('request')
mong.connect('mongodb://unc:landmine@ds117348.mlab.com:17348/itheater');
var moviedata = require('./api/movies.js');
app= exp();
app.use(bodyParser.urlencoded({'extended':false}));
app.use(bodyParser.json());
var moviemodel = mong.model("movies",{name:String,
city: String,
ratings: String});

var registrationModel = mong.model('registration',{FirstName:String,
LastName: String,
Email: String,
Password: String});

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
Router.get('/movie/register', function(req,res){
  res.render("registeraddpage", {namePage: "Register To iTheater"});
});
Router.get('/movie/add', function(req,res){
    var registrationFromRoute=req.query;
    var registration= new registrationModel ({FirstName:registrationFromRoute.FirstName, LastName: registrationFromRoute.LastName, Email: registrationFromRoute.Email, Password: registrationFromRoute.Password });
    registration.save(function(err){
      if(err){
        console.log(err);
      }
      res.redirect('/movie/addpage');
    });
});

Router.get('/movie/search/:search', function(req,res){
  var search=req.params.search;
  /// http://www.omdbapi.com?s=
  var options={
      url: "http://www.omdbapi.com",
      qs: {
        s: search
      },
      json: true
  };
  request(options, function(err, response, body){
    res.render('movie/search', {movieList: body['Search']});
  })
  // res.render('moviesearch'), {namePage: "search For Movies"});
});
Router.get('/movie/add', function(req,res){
    var registrationFromRoute=req.query;
    var registration= new registrationModel ({FirstName:registrationFromRoute.FirstName, LastName: registrationFromRoute.LastName, Email: registrationFromRoute.Email, Password: registrationFromRoute.Password });
    registration.save(function(err){
      if(err){
        console.log(err);
      }
      res.redirect('/movie/addpage');
    });
});
Router.get('/movie/addpage', function(req,res){
  res.render('movieaddpage', {namePage: "Form For Movies"});
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
