function Runner(name, speed){
  this.name = name;
  this.speed = speed || 5;
  this.fatigue = 0;

  this.wearShoes = function(name, speed){
    this.shoes = new Shoes(name, speed);
  };

  this.runRace = function(course, shoes){
    var humanSpeed = speed * course.speedMultipler - this.fatigue * course.speedMultipler;
    var movement = Math.floor((Math.random() * speed) + (Math.random() * shoes.speed));
    course.distance -= movement;
    if(course.distance <= 0){
      console.log("Congrats! " + name + " completed the " + course.name + "!");
      this.fatigue = 0;
      course.resetDistance();
    }
    if(movement === 0){
      console.log("Uh oh! " + name +" DNFed from fatigue!")
      this.fatigue = 0;
      course.resetDistance();
    }
    if((Math.floor(Math.random() * 5)) === 4){
      this.fatigue += 1;
    }
  }
};

function Shoes(name, speed){
  this.name = name || "barefoot";
  this.speed = speed || 5;
};

function Course(name, terrain, distance, speedMultipler){
  this.name = name;
  this.terrain = terrain;
  this.distance = distance;
  this.speedMultipler = speedMultipler;
  this.resetDistance = function(){
    this.distance = distance;

  }
}

//Create some runners
var sage = new Runner("Sage", 20);
var vargo = new Runner("Vargo", 15);
var ginger = new Runner("Ginger Runner", 10);
var mark = new Runner("Mark", 5);


//Create some shoes
var chucks = new Shoes("Chucks", 10);
var brooks = new Shoes("Brooks", 20);
var nikes = new Shoes("Nike", 25);
var scaucony = new Shoes("Scaucony", 30);
var hoka = new Shoes("Hoka One One", 35);


//Create some courses
var roadMarathon = new Course("Road Marathon", "asphalt", 2600, 5);
var fiveK = new Course("Elite 5K", "asphalt", 500, 10);
var ultraMarathon = new Course("Western States 100", "trail", 10000, 1);
var mile = new Course("USTAF Invitational", "track", 100, 15);
