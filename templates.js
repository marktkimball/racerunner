var templates = {};

templates.userStats = [
  "<div class='currentStats'>",
  "<img src='assets/runner<%= color %>.png'><br>",
  "<h3><%= name %></h3>",
  "<p>Speed: <%= speed %>, Endurance: <%= endurance %></p></div>"
].join("");

templates.trainingPage = [
  "<div class='trainingPlan'><h3><a href='#'><%= name %></a></h3>",
  "<p>Speed: <%= speedMultipler %>, Endurance: <%= enduranceMultipler %>, Injury Risk: <%= injuryRisk %></p></div>"
].join("");

templates.racePage = [
  "<div class='race'><h3><a href='#'><%= name %></a></h3>",
  "<p>Distance: <%= distance %> miles on <%= terrain %>, Speed: <%= speedMultipler %></p></div>"
].join("");
