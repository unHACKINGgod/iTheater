var theater={
  name: "moscow best theater",
  capacity: "200 people"
};

console.log(theater.name +' has capacity '+theater.capacity);
var movies={
  name:"blacklist",
  type:"Action, Drama",
  discription:"raymond reddinton list of underworld criminals."
};
console.log(movies.name);
console.log(movies.type);
console.log(movies.discription);
//====== arrays
var theater1={
  name: "moscow best theater",
  capacity: "200 people"
};
var theater2={
  name: "czech best theater",
  capacity: "100 people"
};
var arrayOfNumber=[theater1,theater2];//6
for(var i=0;i<arrayOfNumber.length;i++){
  var theater=arrayOfNumber[i];
  console.log(theater.name +' has capacity '+theater.capacity);
}
