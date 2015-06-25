$(document).ready(function(){
  page.init();
});

var page ={
  userRunner : {},

  shoes : {},

  runners: {},

  courses : {},

  trainingPlans : {},

  init:function(arguments){
    page.initStyling();
    page.initEvents();
  },

  initStyling: function(arguments){
    //Create some shoes
    page.shoes.barefoot = new page.Shoes("Barefoot", 5);
    page.shoes.chucks = new page.Shoes("Chucks", 10);
    page.shoes.brooks = new page.Shoes("Brooks", 40);
    page.shoes.nike = new page.Shoes("Nike", 45);
    page.shoes.scaucony = new page.Shoes("Scaucony", 50);
    page.shoes.hoka = new page.Shoes("Hoka One One", 55);

    //Create some runners
    page.runners.sage = new page.Runner("Sage Canaday", "green", 60, 140, page.shoes.hoka);
    page.runners.vargo = new page.Runner("Chris Vargo", "blue", 65, 130, page.shoes.nike);
    page.runners.meb = new page.Runner("Meb Keflezighi", "red", 90, 95, page.shoes.brooks);
    page.runners.ginger = new page.Runner("Ginger Runner", "orange", 50, 100, page.shoes.scaucony);

    //Create some courses
    page.courses.mile = new page.Course("Mile track meet", "track", "1 mile", 100, 10);
    page.courses.fiveK = new page.Course("5K race", "asphalt", "3.1 miles", 310, 8);
    page.courses.tenK = new page.Course("10K race", "asphalt", "6.2 miles",  620, 6);
    page.courses.halfMarathon = new page.Course("Half Marathon", "asphalt", "13.1 miles", 1310, 4);
    page.courses.marathon = new page.Course("Marathon", "asphalt", "26.2 miles", 2620, 3);
    page.courses.ultraMarathon50K = new page.Course("50K Ultra Marathon", "trail", "31.1 miles", 3110, 2);
    page.courses.ultraMarathon50M = new page.Course("50 Mile Ultra Marathon", "trail", "50 miles", 5000, 1);
    page.courses.ultraMarathon100K = new page.Course("100K Ultra Marathon", "trail", "62.2 miles", 6220, 0.75);
    page.courses.ultraMarathon100M = new page.Course("100 Mile Ultra Marathon", "trail", "100 miles", 10000, 0.5);

    //Create some training plans
    page.trainingPlans.easyRun = new page.Training("Easy run", 1, 1, 1);
    page.trainingPlans.longRun = new page.Training("Long run", 2, 5, 3);
    page.trainingPlans.tempoRun = new page.Training("Tempo run", 4, 3, 6);
    page.trainingPlans.intervalRun = new page.Training("Intervals", 6, 1, 8);

    //Load some templates
    _.each(page.trainingPlans, function(el){
      page.loadTemplate('trainingPage', el, $('.trainingPage'));
    });

    _.each(page.courses, function(el){
      page.loadTemplate('racePage', el, $('.racePage'));
    });

  },

  initEvents: function(arguments){
    $('.landingPage').on('click', 'input[name=colorSelect]', page.colorOfRunner);
    $('body').on('click', '.topBar', page.pageReloadLogo);
    $('.createRunner').on('click', '.btn', page.createNewRunner);
    $('.selectPresetRunner').on('click', '.btn', page.usePremadeRunner);
    $('.menu').on('click', 'a', page.navigateMenu);
    $('.racePage').on('click', 'a', page.raceSelection);
    $('.trainingPage').on('click', 'a', page.trainingSelection);
    $('.shoePage').on('click', '.btn', page.shoeSelection);
  },

  Runner: function(name, color, speed, endurance, shoe){
    this.name = name || "Johnny Rocket";
    this.color = color || "black";
    this.speed = speed || 10;
    this.endurance = endurance || 10;
    this.fatigue = 0;
    this.shoes = shoe || new page.Shoes();

    this.getShoes = function(shoe){
      this.shoes = eval(shoe);
    }

    this.train = function(training){
      var that = this;
      page.loadTemplate('animatedRunner', that, $('.singleTrainingPage'));
      if(Math.floor(Math.random() * 30) <= training.injuryRisk){
        this.speed -= Math.ceil(Math.random() * training.speedMultipler * 10) / 10;
        this.endurance -= Math.ceil(Math.random() * training.enduranceMultipler * 10) / 10;
        setTimeout(function(){
          $('.singleTrainingPage').empty();
          page.loadTemplate('trainingDecreasedResults', that, $('.singleTrainingPage'));
        }, 5000);
      } else{
        this.speed += Math.ceil(Math.random() * training.speedMultipler * 10) / 10;
        this.endurance += Math.ceil(Math.random() * training.enduranceMultipler * 10) / 10;
        setTimeout(function(){
          $('.singleTrainingPage').empty();
          page.loadTemplate('trainingImprovedResults', that, $('.singleTrainingPage'));
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
          page.loadTemplate('animatedRunner', that, $('.singleRacePage'));
          page.loadTemplate('animatedRacer', that, $('.singleRacePage'));
          setTimeout(function(){
            $('.singleRacePage').empty();
            page.loadTemplate('raceCompletedResults', that, $('.singleRacePage'));
            page.loadTemplate('raceTimeResults', {hours: hours, timeCount: timeCount}, $('.singleRacePage'));
          }, 5500);
          this.fatigue = 0;
          course.resetDistance();
          break;
        }
        if(movement <= 0){
          page.loadTemplate('animatedRunnerDNF', that, $('.singleRacePage'));
          page.loadTemplate('animatedRacer', that, $('.singleRacePage'));
          var distanceRemaining = course.distance / 100;
          setTimeout(function(){
            $('.singleRacePage').empty();
            page.loadTemplate('raceDNFResults', that, $('.singleRacePage'));
            page.loadTemplate('raceDistanceRemaining', {distance: distanceRemaining}, $('.singleRacePage'));
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
  },

  Shoes: function(name, speed){
    this.name = name || "barefoot";
    this.speed = speed || 10;
  },

  Course: function(name, terrain, displayDistance, distance, speedMultipler){
    this.name = name;
    this.terrain = terrain;
    this.distance = distance;
    this.displayDistance = displayDistance;
    this.speedMultipler = speedMultipler;
    this.resetDistance = function(){
      this.distance = distance;
    }
  },

  Training: function(name, speedMultipler, enduranceMultipler, injuryRisk){
    this.name = name;
    this.speedMultipler = speedMultipler;
    this.enduranceMultipler = enduranceMultipler;
    this.injuryRisk = injuryRisk;
  },

  //Change color of runner icon on radio select
  colorOfRunner: function(event){
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
  },

  //Logo click to home
  pageReloadLogo: function(){
    location.reload();
  },

  //Create new runner
  createNewRunner: function(){
    var name = $('input[name=nameField]').val();
    var color =  $("input[name=colorSelect]:checked").val();
    page.userRunner = new page.Runner(name, color);

    page.loadTemplate('userStats', page.userRunner, $('.menu'));

    $('.landingPage').addClass('hide');
    $('.menu').removeClass('hide');
    return page.userRunner;
  },

  //Select pre-made runner
  usePremadeRunner: function(){
    $('html,body').scrollTop(0);
    page.userRunner = eval($("input[name=runnerSelect]:checked").val());
    page.loadTemplate('userStats', page.userRunner, $('.menu'));
    $('.landingPage').addClass('hide');
    $('.menu').removeClass('hide');
    return page.userRunner;
  },

  //Menu select
  navigateMenu: function(){
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
  },

  //Race selection
  raceSelection: function(runner, course){
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
      page.loadTemplate('individualRace', page.courses.mile, $('.singleRacePage'));
      page.userRunner.runRace(page.courses.mile);
    }else if($(this).text() === "5K race"){
      page.loadTemplate('individualRace', page.courses.fiveK, $('.singleRacePage'));
      page.userRunner.runRace(page.courses.fiveK);
    }else if($(this).text() === "10K race"){
      page.loadTemplate('individualRace', page.courses.tenK, $('.singleRacePage'));
      page.userRunner.runRace(page.courses.tenK);
    }else if($(this).text() === "Half Marathon"){
      page.loadTemplate('individualRace', page.courses.halfMarathon, $('.singleRacePage'));
      page.userRunner.runRace(page.courses.halfMarathon);
    }else if($(this).text() === "Marathon"){
      page.loadTemplate('individualRace', page.courses.marathon, $('.singleRacePage'));
      page.userRunner.runRace(page.courses.marathon);
    }else if($(this).text() === "50K Ultra Marathon"){
      page.loadTemplate('individualRace', page.courses.ultraMarathon50K, $('.singleRacePage'));
      page.userRunner.runRace(page.courses.ultraMarathon50K);
    }else if($(this).text() === "50 Mile Ultra Marathon"){
      page.loadTemplate('individualRace', page.courses.ultraMarathon50M, $('.singleRacePage'));
      page.userRunner.runRace(page.courses.ultraMarathon50M);
    }else if($(this).text() === "100K Ultra Marathon"){
      page.loadTemplate('individualRace', page.courses.ultraMarathon100K, $('.singleRacePage'));
      page.userRunner.runRace(page.courses.ultraMarathon100K);
    }else{
      page.loadTemplate('individualRace', page.courses.ultraMarathon100M, $('.singleRacePage'));
      page.userRunner.runRace(page.courses.ultraMarathon100M);
    }
  },

  //Training selection
  trainingSelection: function(){
    $('.trainingPage').addClass('hide');
    $('.singleTrainingPage').removeClass('hide');
    $('.singleTrainingPage').empty();
    setTimeout(function(){
      page.loadTemplate('userStats', page.userRunner, $('.menu'));
      $('.menu').removeClass('hide');
      $('.singleTrainingPage').addClass('hide');
    }, 10000);
    if($(this).text() === "Easy run"){
      page.loadTemplate('individualTraining', page.trainingPlans.easyRun, $('.singleTrainingPage'));
      page.userRunner.train(page.trainingPlans.easyRun);
    }else if($(this).text() === "Long run"){
      page.loadTemplate('individualTraining', page.trainingPlans.longRun, $('.singleTrainingPage'));
      page.userRunner.train(page.trainingPlans.longRun);
    }else if($(this).text() === "Tempo run"){
      page.loadTemplate('individualTraining', page.trainingPlans.tempoRun, $('.singleTrainingPage'));
      page.userRunner.train(page.trainingPlans.tempoRun);
    }else{
      page.loadTemplate('individualTraining', page.trainingPlans.intervalRun, $('.singleTrainingPage'));
      page.userRunner.train(page.trainingPlans.intervalRun);
    }
  },

  //Shoe selection
  shoeSelection: function(){
    page.userRunner.getShoes($("input[name=shoeSelect]:checked").val());
    $('.currentStats').remove();
    page.loadTemplate('userStats', page.userRunner, $('.menu'));
    $('.menu').removeClass('hide');
    $('.shoePage').addClass('hide');
    return page.userRunner;
  },

  //Template stuff
  getTemplate: function(name){
    return templates[name];
  },

  loadTemplate: function(tmplName, data, $target){
    var compiledTmpl = _.template(page.getTemplate(tmplName));
    $target.append(compiledTmpl(data));
  }

};
