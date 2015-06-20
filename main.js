function Runner(name, color, speed, endurance, shoe){
  this.name = name || "Johnny Rocket";
  this.color = color || "black";
  this.speed = speed || 5;
  this.endurance = endurance || 5;
  this.fatigue = 0;
  this.shoes = shoe || new Shoes();

  this.getShoes = function(shoe){

    this.shoes = eval(shoe);
  }

  this.train = function(training){
    if(Math.floor(Math.random() * 30) <= training.injuryRisk){
      this.speed -= Math.random() * training.speedMultipler;
      this.endurance -= Math.random() * training.enduranceMultipler;
      console.log(name + " got injured in training!");
    } else{
      this.speed += Math.random() * training.speedMultipler;
      this.endurance += Math.random() * training.enduranceMultipler;
    }
  };

  this.runRace = function(course, shoes){
    var humanSpeed = this.speed * course.speedMultipler - this.fatigue * course.speedMultipler;
    var movement = Math.floor((Math.random() * humanSpeed) + (Math.random() * shoes.speed));
    course.distance -= movement;
    if(course.distance <= 0){
      console.log("Congrats! " + this.name + " completed the " + course.name + "!");
      this.fatigue = 0;
      course.resetDistance();
    }
    if(movement === 0){
      console.log("Uh oh! " + this.name +" DNFed from fatigue!")
      this.fatigue = 0;
      course.resetDistance();
    }
    if((Math.floor(Math.random() * this.endurance)) < (Math.floor(Math.random() * this.endurance))){
      console.log(this.name +" gained fatigue by 1!")
      this.fatigue += 1;
    }
  }
};

function Shoes(name, speed){
  this.name = name || "barefoot";
  this.speed = speed || 5;
};

function Course(name, terrain, displayDistance, distance, speedMultipler){
  this.name = name;
  this.terrain = terrain;
  this.distance = distance;
  this.displayDistance = displayDistance;
  this.speedMultipler = speedMultipler;
  this.resetDistance = function(){
    this.distance = distance;
  }
};

function Training(name, speedMultipler, enduranceMultipler, injuryRisk){
  this.name = name;
  this.speedMultipler = speedMultipler;
  this.enduranceMultipler = enduranceMultipler;
  this.injuryRisk = injuryRisk;
}

//Create some shoes
var shoes = {};
shoes.chucks = new Shoes("Chucks", 3);
shoes.brooks = new Shoes("Brooks", 20);
shoes.nike = new Shoes("Nike", 25);
shoes.scaucony = new Shoes("Scaucony", 30);
shoes.hoka = new Shoes("Hoka One One", 35);

//Create some runners
var sage = new Runner("Sage Canaday", "green", 20, 15, shoes.hoka);
var vargo = new Runner("Chris Vargo", "blue", 15, 15, shoes.nike);
var ginger = new Runner("Ginger Runner", "orange", 10, 12, shoes.scaucony);
var userRunner;

//Create some courses
var courses = {};
courses.mile = new Course("Mile track meet", "track", "1 mile", 100, 15);
courses.fiveK = new Course("5K race", "asphalt", "3.1 miles", 310, 10);
courses.tenK = new Course("10K race", "asphalt", "6.2 miles",  620, 8);
courses.halfMarathon = new Course("Half Marathon", "asphalt", "13.1 miles", 1310, 6);
courses.marathon = new Course("Marathon", "asphalt", "26.2 miles", 2620, 5);
courses.ultraMarathon50K = new Course("50K Ultra Marathon", "trail", "31.1 miles", 3110, 4);
courses.ultraMarathon50M = new Course("50 Mile Ultra Marathon", "trail", "50 miles", 5000, 2);
courses.ultraMarathon100K = new Course("100K Ultra Marathon", "trail", "62.2 miles", 6220, 1);
courses.ultraMarathon100M = new Course("100 Mile Ultra Marathon", "trail", "100 miles", 10000, 0.5);

//Create some training sessions
var trainingPlans = {};
trainingPlans.easyRun = new Training("Easy run", 1, 1, 1);
trainingPlans.longRun = new Training("Long run", 2, 5, 3);
trainingPlans.tempoRun = new Training("Tempo run", 4, 3, 6);
trainingPlans.intervalRun = new Training("Intervals", 5, 2, 8);

//Change color of runner icon on radio select
$('.landingPage').on('click', 'input[name=colorSelect]', function(event){
  if($(this).attr('value') === "Black"){
    $(this).siblings('img').addClass('hide');
    $('.blackSelect').removeClass('hide');
  }else if($(this).attr('value') === "Blue"){
    $(this).siblings('img').addClass('hide');
    $('.blueSelect').removeClass('hide');
  }else if($(this).attr('value') === "Green"){
    $(this).siblings('img').addClass('hide');
    $('.greenSelect').removeClass('hide');
  }else if($(this).attr('value') === "Pink"){
    $(this).siblings('img').addClass('hide');
    $('.pinkSelect').removeClass('hide');
  }else if($(this).attr('value') === "Orange"){
    $(this).siblings('img').addClass('hide');
    $('.orangeSelect').removeClass('hide');
  }else{
    $(this).siblings('img').addClass('hide');
    $('.redSelect').removeClass('hide');
  }
});

//Logo click to home
$('body').on('click', '.topBar', function(){
  location.reload();
});

//Create new runner
$('.createRunner').on('click', '.btn', function(){
  var name = $('input[name=nameField]').val();
  var color =  $("input[name=colorSelect]:checked").val();
  userRunner = new Runner(name, color);

  loadTemplate('userStats', userRunner, $('.menu'));

  $('.landingPage').addClass('hide');
  $('.menu').removeClass('hide');
  return userRunner;
});

//Select pre-made runner
$('.selectPresetRunner').on('click', '.btn', function(){
  userRunner = window[$("input[name=runnerSelect]:checked").val()];
  loadTemplate('userStats', userRunner, $('.menu'));
  $('.landingPage').addClass('hide');
  $('.menu').removeClass('hide');
  return userRunner;
});

//Menu select
$('.menu').on('click', 'a', function(){
  if($(this).text() === "TRAIN"){
    $('.menu').addClass('hide');
    $('.trainingPage').removeClass('hide');
  }else if($(this).text() === "RACE"){
    $('.menu').addClass('hide');
    $('.racePage').removeClass('hide');
  }else{
    $('.menu').addClass('hide');
    $('.shoePage').removeClass('hide');
  }
});

//Training selection
$('.trainingPage').on('click', 'a', function(){
  if($(this).text() === "Easy run"){
    console.log("Easy");
  }else if($(this).text() === "Long run"){
    console.log("Long");
  }else if($(this).text() === "Tempo run"){
    console.log("Tempo");
  }else{
    console.log("Intervals");
  }
});

//Shoe selection
$('.shoePage').on('click', '.btn', function(){
  userRunner.getShoes($("input[name=shoeSelect]:checked").val());
  $('.currentStats').remove();
  loadTemplate('userStats', userRunner, $('.menu'));
  $('.menu').removeClass('hide');
  $('.shoePage').addClass('hide');
  return userRunner;
});


//Template stuff
function getTemplate(name){
  return templates[name];
};

function loadTemplate(tmplName, data, $target){
  var compiledTmpl = _.template(getTemplate(tmplName));
  $target.append(compiledTmpl(data));
};

_.each(trainingPlans, function(el){
  loadTemplate('trainingPage', el, $('.trainingPage'));
});

_.each(courses, function(el){
  loadTemplate('racePage', el, $('.racePage'));
});
