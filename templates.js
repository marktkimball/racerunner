var templates = {};

templates.userStats = [
  "<div class='currentStats'>",
  "<img src='assets/runner<%= color %>.png'><br>",
  "<h3><%= name %></h3>",
  "<p>Speed: <%= speed %>, Endurance: <%= endurance %></p>",
  "<p>Currently wearing: <%= shoes.name %> which have a speed of <%= shoes.speed %>.</div>"
].join("");

templates.trainingPage = [
  "<div class='trainingPlan'><h3><a href='#'><%= name %></a></h3>",
  "<p>Speed: <%= speedMultipler %>, Endurance: <%= enduranceMultipler %>, Injury Risk: <%= injuryRisk %></p></div>"
].join("");

templates.racePage = [
  "<div class='race'><h3><a href='#'><%= name %></a></h3>",
  "<p><%= displayDistance %> on <%= terrain %>, Speed: <%= speedMultipler %></p></div>"
].join("");

templates.individualTraining = [
  "<div class='individualTraining'><h1><%= name %> in progress...</h1></div>"
].join("");

templates.trainingImprovedResults = [
  "<div class ='trainingResults'><h1>RESULTS</h1>",
  "<h2><%= name %></h2>",
  "<p>Speed increased to: <%= speed %></p>",
  "<p>Endurance increased to: <%= endurance %></p></div>"
].join("");

templates.trainingDecreasedResults = [
  "<div class ='trainingResults'><h1>RESULTS</h1>",
  "<h2><%= name %> was injured in training!</h2>",
  "<p>Speed decreased to: <%= speed %></p>",
  "<p>Endurance decreased to: <%= endurance %></p></div>"
].join("");

templates.individualRace = [
  "<div class='individualRace'><h1><%= name %> in progress...</h1></div>"
].join("");

templates.raceCompletedResults = [
  "<div class ='raceResults'><h1>RESULTS</h1>",
  "<h2><%= name %></h2>",
  "<p>Completed the race with a time of: "
].join("");

templates.raceDNFResults = [
  "<div class ='raceResults'><h1>RESULTS</h1>",
  "<h2><%= name %> DNFed due to fatigue!</h2>"
].join("");

templates.raceTimeResults = [
"<%= hours %> : <%= timeCount %> : 00 !!</p>"
].join("");

templates.raceDistanceRemaining = [
  "<p><%= distance %> miles were remaining in the race.</p>"
].join("");

templates.animatedRunner = [
  "<div class='animatedRunner'><img src='assets/runner<%= color %>.png'></div>"
].join("");

templates.animatedRunnerDNF = [
  "<div class='animatedRunnerDNF'><img src='assets/runner<%= color %>.png'></div>"
].join("");

templates.animatedRacer = [
"<div class='animatedRacer'><img src='assets/runnerBlack.png'></div>"
].join("");
