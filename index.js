var http=require('http');

var proccess = function(req,res){
  res.end('<b> David is good</b>')
}

var server = http.createServer(proccess);

server.listen(3000);
