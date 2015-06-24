function Runner(name, color, speed, endurance, shoe){
  this.name = name || "Johnny Rocket";
  this.color = color || "black";
  this.speed = speed || 10;
  this.endurance = endurance || 10;
  this.fatigue = 0;
  this.shoes = shoe || new Shoes();

  this.getShoes = function(shoe){
    this.shoes = eval(shoe);
  }

  this.train = function(training){
    var that = this;
    loadTemplate('animatedRunner', that, $('.singleTrainingPage'));
    if(Math.floor(Math.random() * 30) <= training.injuryRisk){
      this.speed -= Math.ceil(Math.random() * training.speedMultipler * 10) / 10;
      this.endurance -= Math.ceil(Math.random() * training.enduranceMultipler * 10) / 10;
      setTimeout(function(){
        $('.singleTrainingPage').empty();
        loadTemplate('trainingDecreasedResults', that, $('.singleTrainingPage'));
      }, 5000);
    } else{
      this.speed += Math.ceil(Math.random() * training.speedMultipler * 10) / 10;
      this.endurance += Math.ceil(Math.random() * training.enduranceMultipler * 10) / 10;
      setTimeout(function(){
        $('.singleTrainingPage').empty();
        loadTemplate('trainingImprovedResults', that, $('.singleTrainingPage'));
      }, 5000);
    }
  };

  this.runRace = function(course){
    var that = this;
    for(var timeCount = 1; course.distance > 0; timeCount++){
      var humanSpeed = this.speed * course.speedMultipler - this.fatigue * course.speedMultipler;
      var movement = Math.floor((Math.random() * humanSpeed) + (Math.random() * this.shoes.speed));
      course.distance -= movement;
      var hours = 0;
      if(course.distance <= 0){
        if(timeCount === 1){
          timeCount = "06";
        }else if(timeCount < 10){
          timeCount = timeCount * 6;
        }else if(timeCount % 10 === 0){
          hours = Math.floor(timeCount / 10);
          timeCount = "00";
        }else if(timeCount % 10 === 1){
          hours = Math.floor(timeCount / 10);
          timeCount = "06";
        }else{
          hours = Math.floor(timeCount / 10);
          timeCount = timeCount % 10 * 6;
        }
        loadTemplate('animatedRunner', that, $('.singleRacePage'));
        loadTemplate('animatedRacer', that, $('.singleRacePage'));
        setTimeout(function(){
          $('.singleRacePage').empty();
          loadTemplate('raceCompletedResults', that, $('.singleRacePage'));
          loadTemplate('raceTimeResults', {hours: hours, timeCount: timeCount}, $('.singleRacePage'));
        }, 5500);
        this.fatigue = 0;
        course.resetDistance();
        break;
      }
      if(movement <= 0){
        loadTemplate('animatedRunnerDNF', that, $('.singleRacePage'));
        loadTemplate('animatedRacer', that, $('.singleRacePage'));
        var distanceRemaining = course.distance / 100;
        setTimeout(function(){
          $('.singleRacePage').empty();
          loadTemplate('raceDNFResults', that, $('.singleRacePage'));
          loadTemplate('raceDistanceRemaining', {distance: distanceRemaining}, $('.singleRacePage'));
        }, 5500);
        this.fatigue = 0;
        course.resetDistance();
        break;
      }
      if(timeCount >= 5 && timeCount < 10){
        if((Math.floor(Math.random() * this.endurance)) < (Math.floor(Math.random() * this.endurance) * 2)){
          this.fatigue += 2;
        }
      }else if(timeCount >=10){
        if((Math.floor(Math.random() * this.endurance)) < (Math.floor(Math.random() * this.endurance) * 3)){
          this.fatigue += 3;
        }
      }else{
        if((Math.floor(Math.random() * this.endurance)) < (Math.floor(Math.random() * this.endurance) * 1.5)){
          this.fatigue += 1;
        }
      }
    }
  };
};

function Shoes(name, speed){
  this.name = name || "barefoot";
  this.speed = speed || 10;
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
shoes.barefoot = new Shoes("Barefoot", 5);
shoes.chucks = new Shoes("Chucks", 10);
shoes.brooks = new Shoes("Brooks", 40);
shoes.nike = new Shoes("Nike", 45);
shoes.scaucony = new Shoes("Scaucony", 50);
shoes.hoka = new Shoes("Hoka One One", 55);

//Create some runners
var sage = new Runner("Sage Canaday", "green", 60, 140, shoes.hoka);
var vargo = new Runner("Chris Vargo", "blue", 65, 130, shoes.nike);
var meb = new Runner("Meb Keflezighi", "red", 90, 95, shoes.brooks);
var ginger = new Runner("Ginger Runner", "orange", 50, 100, shoes.scaucony);
var userRunner;

//Create some courses
var courses = {};
courses.mile = new Course("Mile track meet", "track", "1 mile", 100, 10);
courses.fiveK = new Course("5K race", "asphalt", "3.1 miles", 310, 8);
courses.tenK = new Course("10K race", "asphalt", "6.2 miles",  620, 6);
courses.halfMarathon = new Course("Half Marathon", "asphalt", "13.1 miles", 1310, 4);
courses.marathon = new Course("Marathon", "asphalt", "26.2 miles", 2620, 3);
courses.ultraMarathon50K = new Course("50K Ultra Marathon", "trail", "31.1 miles", 3110, 2);
courses.ultraMarathon50M = new Course("50 Mile Ultra Marathon", "trail", "50 miles", 5000, 1);
courses.ultraMarathon100K = new Course("100K Ultra Marathon", "trail", "62.2 miles", 6220, 0.75);
courses.ultraMarathon100M = new Course("100 Mile Ultra Marathon", "trail", "100 miles", 10000, 0.5);

//Create some training sessions
var trainingPlans = {};
trainingPlans.easyRun = new Training("Easy run", 1, 1, 1);
trainingPlans.longRun = new Training("Long run", 2, 5, 3);
trainingPlans.tempoRun = new Training("Tempo run", 4, 3, 6);
trainingPlans.intervalRun = new Training("Intervals", 6, 1, 8);

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
  $('html,body').scrollTop(0);
  userRunner = window[$("input[name=runnerSelect]:checked").val()];
  loadTemplate('userStats', userRunner, $('.menu'));
  $('.landingPage').addClass('hide');
  $('.menu').removeClass('hide');
  return userRunner;
});

//Menu select
$('.menu').on('click', 'a', function(){
  if($(this).text() === "TRAIN"){
    $('.currentStats').remove();
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

//Race selection
$('.racePage').on('click', 'a', function(runner, course){
  $('.racePage').addClass('hide');
  $('.singleRacePage').removeClass('hide');
  $('.singleRacePage').empty();
  setTimeout(function(){
    $('.animatedRunner').remove();
    $('.animatedRunnerDNF').remove();
  }, 5000);
  setTimeout(function(){
    $('.menu').removeClass('hide');
    $('.singleRacePage').addClass('hide');
  }, 10500);
  if($(this).text() === "Mile track meet"){
    loadTemplate('individualRace', courses.mile, $('.singleRacePage'));
    userRunner.runRace(courses.mile);
  }else if($(this).text() === "5K race"){
    loadTemplate('individualRace', courses.fiveK, $('.singleRacePage'));
    userRunner.runRace(courses.fiveK);
  }else if($(this).text() === "10K race"){
    loadTemplate('individualRace', courses.tenK, $('.singleRacePage'));
    userRunner.runRace(courses.tenK);
  }else if($(this).text() === "Half Marathon"){
    loadTemplate('individualRace', courses.halfMarathon, $('.singleRacePage'));
    userRunner.runRace(courses.halfMarathon);
  }else if($(this).text() === "Marathon"){
    loadTemplate('individualRace', courses.marathon, $('.singleRacePage'));
    userRunner.runRace(courses.marathon);
  }else if($(this).text() === "50K Ultra Marathon"){
    loadTemplate('individualRace', courses.ultraMarathon50K, $('.singleRacePage'));
    userRunner.runRace(courses.ultraMarathon50K);
  }else if($(this).text() === "50 Mile Ultra Marathon"){
    loadTemplate('individualRace', courses.ultraMarathon50M, $('.singleRacePage'));
    userRunner.runRace(courses.ultraMarathon50M);
  }else if($(this).text() === "100K Ultra Marathon"){
    loadTemplate('individualRace', courses.ultraMarathon100K, $('.singleRacePage'));
    userRunner.runRace(courses.ultraMarathon100K);
  }else{
    loadTemplate('individualRace', courses.ultraMarathon100M, $('.singleRacePage'));
    userRunner.runRace(courses.ultraMarathon100M);
  }
});

//Training selection
$('.trainingPage').on('click', 'a', function(){
  $('.trainingPage').addClass('hide');
  $('.singleTrainingPage').removeClass('hide');
  $('.singleTrainingPage').empty();
  setTimeout(function(){
    loadTemplate('userStats', userRunner, $('.menu'));
    $('.menu').removeClass('hide');
    $('.singleTrainingPage').addClass('hide');
  }, 10000);
  if($(this).text() === "Easy run"){
    loadTemplate('individualTraining', trainingPlans.easyRun, $('.singleTrainingPage'));
    userRunner.train(trainingPlans.easyRun);
  }else if($(this).text() === "Long run"){
    loadTemplate('individualTraining', trainingPlans.longRun, $('.singleTrainingPage'));
    userRunner.train(trainingPlans.longRun);
  }else if($(this).text() === "Tempo run"){
    loadTemplate('individualTraining', trainingPlans.tempoRun, $('.singleTrainingPage'));
    userRunner.train(trainingPlans.tempoRun);
  }else{
    loadTemplate('individualTraining', trainingPlans.intervalRun, $('.singleTrainingPage'));
    userRunner.train(trainingPlans.intervalRun);
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
