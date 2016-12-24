var exp = require('express');
var mong= require('mongoose');
var handlebars= require('express-handlebars');
var bodyParser = require('body-parser');
var request = require('request')
mong.connect('mongodb://unc:landmine@ds117348.mlab.com:17348/itheater');
var moviedata = require('./api/movies.js');
var imdb = require('imdb-api');


app= exp();
app.use(bodyParser.urlencoded({'extended':false}));
app.use(bodyParser.json());

// var imdbIDs = {
//   imdbID: "{{imdbID}}",
// };
//
// var imdbinfo = imdb.getReq({ id: 'imdbID' }, function(err, things) {
//     var  imdbmovie = things
//     console.log(imdbmovie);
//         json:true
//     request(imdbmovie, function(err, response, body){
//       if (err){
//         console.log("something is worng");
//       }
//      else {
//           res.render('movie/search', {movieList: body['Search']})
//         };
//       });
//
//     });

var moviemodel = mong.model("movies",{name:String,
city: String,
ratings: String});

var registrationModel = mong.model('registration',{FirstName:String,
LastName: String,
Email: String,
Password: String});

var searchModel = {
  moviename: String
};

app.engine('handlebars', handlebars.create({
  defaulLayout: 'main',
  layoutsDir: './views/layouts',
  partialDir: './views/partials',
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
      res.redirect('/movie/search');
    });
});
Router.get('/movie/moviepage', function(req,res){
  res.render('movie/moviepage')

});
Router.get('/movie/login', function(req,res){
  res.render('movie/login');
});


Router.get('/movie/moviepage', function(req,res){

});


Router.get('/movie/search/', function(req,res){
  var search=req.query;
  var options={
      url: "http://www.omdbapi.com",
      qs: {
        s: search.moviename
      },
      json: true
    };
    request(options, function(err, response, body){
      console.log(body['Search']);
      res.render('movie/search', {movieList: body['Search']})
    })
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
Router.get('movie/home', function(req,res){
  res.render('movie/home');
});
app.use(Router);

app.get("*", function(req, res) {
  res.redirect('/movie/search');
});

app.use('/public', exp.static('public'));
app.listen(process.env.PORT || 5000,function(){
  console.log(process.env.PORT);
});
