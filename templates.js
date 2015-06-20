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

templates.individualRace = [
  "<div class='individualRace'><h1><%= name %> in progress...</h1></div>"
].join("");

templates.animatedRunner = [
  "<div class='animatedRunner'><img src='assets/runner<%= color %>.png'></div>"
].join("");

templates.animatedRacer = [
"<div class='animatedRacer'><img src='assets/runnerBlack.png'></div>"
].join("");
