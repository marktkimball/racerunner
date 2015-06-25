describe('Constructors', function(){
  describe('Runner Constructor', function(){
    it('should use default values if no arguments passed', function(){
      before(this.defaultRunner = new page.Runner());
      expect(this.defaultRunner.name).to.equal("Johnny Rocket");
      expect(this.defaultRunner.color).to.equal("black");
      expect(this.defaultRunner.speed).to.equal(10);
      expect(this.defaultRunner.endurance).to.equal(10);
      expect(this.defaultRunner.fatigue).to.equal(0);
      expect(this.defaultRunner.shoes.name).to.equal("barefoot");
      expect(this.defaultRunner.shoes.speed).to.equal(10);
    });
    it('should be an object', function(){
      before(this.defaultRunner = new page.Runner());
      expect(this.defaultRunner).to.be.an('Object');
    })
    it('should be instance of Runner', function(){
      before(this.defaultRunner = new page.Runner());
      expect(this.defaultRunner).to.be.instanceOf(page.Runner);
    })
    it('should have the proper types', function(){
      before(this.defaultRunner = new page.Runner());
      expect(this.defaultRunner.name).to.be.a("String");
      expect(this.defaultRunner.color).to.be.a("String");
      expect(this.defaultRunner.speed).to.be.a("Number");
      expect(this.defaultRunner.endurance).to.be.a("Number");
      expect(this.defaultRunner.fatigue).to.be.a("Number");
      expect(this.defaultRunner.shoes.name).to.be.a("String");
      expect(this.defaultRunner.shoes.speed).to.be.a("Number");
    })
    it('getShoes is a function of Runner constructor', function(){
      before(this.defaultRunner = new page.Runner());
      expect(this.defaultRunner.getShoes).is.a('Function');
    })
    it('should be able to use getShoes function and shoes update', function(){
      before(this.defaultRunner = new page.Runner());
      before(this.defaultShoes = new page.Shoes("Chucks", 10));
      before(this.defaultRunner.getShoes(this.defaultShoes));
      expect(this.defaultRunner.shoes.name).to.equal("Chucks");
      expect(this.defaultRunner.shoes.speed).to.equal(10);
    })
    it('train is a function of Runner constructor', function(){
      before(this.defaultRunner = new page.Runner());
      expect(this.defaultRunner.train).is.a('Function');
    })
    it('should call train once when executed', function(){
      before(this.defaultRunner = new page.Runner());
      before(this.defaultTraining = new page.Training("Long Run", 2, 5, 31));
      sinon.spy(this.defaultRunner, 'train');
      this.defaultRunner.train(this.defaultTraining);
      expect(this.defaultRunner.train).to.have.been.calledOnce;
    })
    it('should call train with correct training', function(){
      before(this.defaultRunner = new page.Runner());
      before(this.defaultTraining = new page.Training("Long Run", 2, 5, 31));
      var spy = sinon.spy(this.defaultRunner, 'train');
      this.defaultRunner.train(this.defaultTraining);
      expect(spy.calledWith(this.defaultTraining)).to.be.ok;
    })
    it('should get injured in training when injury risk of training is greater than random number', function(){
      before(sinon.stub(Math, "random", function(){return 1;}));
      before(this.defaultRunner = new page.Runner());
      before(this.defaultTraining = new page.Training("Long Run", 2, 5, 31));
      before(this.defaultRunner.train(this.defaultTraining));
      expect(this.defaultRunner.speed).to.equal(8);
      expect(this.defaultRunner.endurance).to.equal(5);
    })
    it('should increase stats in training when injury risk of training is less than random number', function(){
      before(this.defaultRunner = new page.Runner());
      before(this.defaultTraining = new page.Training("Long Run", 2, 5, 3));
      before(this.defaultRunner.train(this.defaultTraining));
      expect(this.defaultRunner.speed).to.equal(12);
      expect(this.defaultRunner.endurance).to.equal(15);
      after(Math.random.restore());
    })
    it('should execute new template twice when train function executed', function(){
      before(this.defaultRunner = new page.Runner());
      before(this.defaultTraining = new page.Training("Long Run", 2, 5, 3));
      before(this.defaultRunner.train(this.defaultTraining));
      expect(page.loadTemplate).twice;
    })
    it('runRace is a function of Runner constructor', function(){
      before(this.defaultRunner = new page.Runner());
      expect(this.defaultRunner.runRace).is.a('Function');
    })
    it('should execute new template when runRace function executed', function(){
      before(this.defaultRunner = new page.Runner());
      before(this.defaultCourse = new page.Course("Marathon", "asphalt", "26.2 miles", 2620, 3));
      before(this.defaultRunner.runRace(this.defaultCourse));
      expect(page.loadTemplate).twice;
    })
    it('should call runRace once when executed', function(){
      before(this.defaultRunner = new page.Runner());
      before(this.defaultCourse = new page.Course("Marathon", "asphalt", "26.2 miles", 2620, 3));
      sinon.spy(this.defaultRunner, 'runRace');
      this.defaultRunner.runRace(this.defaultCourse);
      expect(this.defaultRunner.runRace).to.have.been.calledOnce;
    })
    it('should call runRace with correct course', function(){
      before(this.defaultRunner = new page.Runner());
      before(this.defaultCourse = new page.Course("Marathon", "asphalt", "26.2 miles", 2620, 3));
      var spy = sinon.spy(this.defaultRunner, 'runRace');
      this.defaultRunner.runRace(this.defaultCourse);
      expect(spy.calledWith(this.defaultCourse)).to.be.ok;
    })
  })

  describe('Shoes Constructor', function(){
    it('should use default values if no arguments passed', function(){
      before(this.defaultShoes = new page.Shoes());
      expect(this.defaultShoes.name).to.equal("barefoot");
      expect(this.defaultShoes.speed).to.equal(10);
    })
    it('should be an object', function(){
      before(this.defaultShoes = new page.Shoes());
      expect(this.defaultShoes).to.be.an('Object');
    })
    it('should be instance of Shoes', function(){
      before(this.defaultShoes = new page.Shoes());
      expect(this.defaultShoes).to.be.instanceOf(page.Shoes);
    })
    it('should have the proper types', function(){
      before(this.defaultShoes = new page.Shoes());
      expect(this.defaultShoes.name).to.be.a("String");
      expect(this.defaultShoes.speed).to.be.a("Number");
    })
  })

  describe('Course Constructor', function(){
    it('should be an object', function(){
      before(this.defaultCourse = new page.Course());
      expect(this.defaultCourse).to.be.an('Object');
    })
    it('should be instance of Course', function(){
      before(this.defaultCourse = new page.Course("Marathon", "asphalt", "26.2 miles", 2620, 3));
      expect(this.defaultCourse).to.be.instanceOf(page.Course);
    })
    it('should have the proper types', function(){
      before(this.defaultCourse = new page.Course("Marathon", "asphalt", "26.2 miles", 2620, 3));
      expect(this.defaultCourse.name).to.be.a("String");
      expect(this.defaultCourse.terrain).to.be.a("String");
      expect(this.defaultCourse.displayDistance).to.be.a("String");
      expect(this.defaultCourse.distance).to.be.a("Number");
      expect(this.defaultCourse.speedMultipler).to.be.a("Number");
    })
    it('should not have default values if no arguments passed', function(){
      before(this.defaultCourse = new page.Course());
      expect(this.defaultCourse.name).to.equal(undefined);
      expect(this.defaultCourse.terrain).to.equal(undefined);
      expect(this.defaultCourse.displayDistance).to.equal(undefined);
      expect(this.defaultCourse.distance).to.equal(undefined);
      expect(this.defaultCourse.speedMultipler).to.equal(undefined);
    })
    it('should reset distance', function(){
      before(this.defaultCourse = new page.Course("Marathon", "asphalt", "26.2 miles", 2620, 3));
      before(this.defaultCourse.distance -= 1000);
      expect(this.defaultCourse.distance).to.equal(1620);
      before(this.defaultCourse.resetDistance());
      expect(this.defaultCourse.distance).to.equal(2620);
    })
  })

  describe('Training Constructor', function(){
    it('should be an object', function(){
      before(this.defaultTraining = new page.Training());
      expect(this.defaultTraining).to.be.an('Object');
    })
    it('should be instance of Training', function(){
      before(this.defaultTraining = new page.Training("Long Run", 2, 5, 3));
      expect(this.defaultTraining).to.be.instanceOf(page.Training);
    })
    it('should have the proper types', function(){
      before(this.defaultTraining = new page.Training("Long Run", 2, 5, 3));
      expect(this.defaultTraining.name).to.be.a("String");
      expect(this.defaultTraining.speedMultipler).to.be.a("Number");
      expect(this.defaultTraining.enduranceMultipler).to.be.a("Number");
      expect(this.defaultTraining.injuryRisk).to.be.a("Number");
    })
    it('should not have default values if no arguments passed', function(){
      before(this.defaultTraining = new page.Training());
      expect(this.defaultTraining.name).to.equal(undefined);
      expect(this.defaultTraining.speedMultipler).to.equal(undefined);
      expect(this.defaultTraining.enduranceMultipler).to.equal(undefined);
      expect(this.defaultTraining.injuryRisk).to.equal(undefined);
    })
  })
});
