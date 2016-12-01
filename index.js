var exp = require('express');
var moviedata = require('./api/movies.js');
app= exp();
app.set('view engine', 'pug')
console.log(moviedata);
var Router = exp.Router();
Router.get('/city/:moscow', function(req,res){
  var seasionname=req.params.moscow;
  res.render('index',{moscow: 'this ' +seasionname+', is good', moviedataInsideTemplate: moviedata})
});
app.use(Router);
app.listen(5000,function(){
  console.log('I\'m alive');
});
