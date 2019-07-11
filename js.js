var boardsMaster = ["Standard", "Elysium", "Hellas"];
var coloniesMaster = ["Callisto", "Ceres", "Enceladus", "Europa", "Ganymede", "Io", "Luna", "Miranda", "Pluto", "Titan", "Triton"];
var milestonesMaster = ["Builder", "Diversifier", "Ecologist", "Energizer", "Gardener", "Generalist", "Hoverlord", "Legend", "Mayor", "Planner", "Polar Explorer", "Rim Settler", "Specialist", "Tactician", "Terraformer", "Tycoon"];
var awardsMaster = ["Banker", "Benefactor", "Celebrity", "Contractor", "Cultivator", "Desert Settler", "Estate Dealer", "Excentric", "Global Warmer", "Industrialist", "Landlord", "Magnate", "Miner", "Scientist", "Space Baron", "Venuphile"];



function Main(numberOfPlayers, numberOfBoards, numberOfAwards, numberOfMilestones, AllowConflicts)
{
  var boardsActual = Object.create(boardsMaster);
  var coloniesActual = Object.create(coloniesMaster);
  var milestonesActual = Object.create(milestonesMaster);
  var awardsActual = Object.create(awardsMaster);

  var selectedBoards = SelectFromArray(boardsActual, numberOfBoards);
  if(!selectedBoards.includes("Elysium")) { RemoveFromArrayByValue(awardsActual, "Desert Settler"); }
  if(!selectedBoards.includes("Hellas")) { RemoveFromArrayByValue(milestonesActual, "Polar Explorer"); }
  
  var selectedAwards = SelectFromArray(awardsActual, numberOfAwards);
  var selectedMilestones = SelectFromArray(milestonesActual, numberOfMilestones);
  var numCols = Math.max(5, parseInt(numberOfPlayers) + 2);
  var selectedColonies = SelectFromArray(coloniesActual, (numberOfPlayers == 1 ? 4 : numCols));
  
  if(!AllowConflicts)
  {
    while(CheckConflicts(selectedAwards.concat(selectedMilestones)))
    {
      selectedAwards = SelectFromArray(awardsActual, numberOfAwards);
      selectedMilestones = SelectFromArray(milestonesActual, numberOfMilestones);
    }
  }
  console.log("Boards: " + selectedBoards);
  console.log("Awards: " + selectedAwards);
  console.log("Milestones: " + selectedMilestones);
  console.log("Colonies: " + selectedColonies);
  var outputNode = document.getElementById("output");
  var TextToAdd =    "<ol class='boardList'><li class='header icofont-globe'> Board:</li>";
  for(var i=0;i<selectedBoards.length;i++)
  {
    TextToAdd += "<li class='boardItem'>" + selectedBoards[i] + "</li>";
  }
  TextToAdd += "</ol>";
  
  TextToAdd += "<ol class='colonyList'><li class='header icofont-space-shuttle'> Colonies:</li>";
  for(var i=0;i<selectedColonies.length;i++)
  {
    TextToAdd += "<li class='colonyItem'>" + selectedColonies[i] + "</li>";
  }
  TextToAdd += "</ol>";
  
  TextToAdd += "<ol class='awardList'><li class='header icofont-trophy'> Awards:</li>";
  for(var i=0;i<selectedAwards.length;i++)
  {
    TextToAdd += "<li class='awardItem'>" + selectedAwards[i] + "</li>";
  }
  TextToAdd += "</ol>";
  
  TextToAdd += "<ol class='milestoneList'><li class='header icofont-badge'> Milestones:</li>";
  for(var i=0;i<selectedMilestones.length;i++)
  {
    TextToAdd += "<li class='milestoneItem'>" + selectedMilestones[i] + "</li>";
  }
  TextToAdd += "</ol>";
  
  outputNode.innerHTML =TextToAdd;
  console.log( outputNode.innerHTML);
}

function RemoveFromArrayByValue(arrayName, value)
{
  var posFound = arrayName.indexOf(value);
  if(posFound > 0)
    arrayName.splice(posFound, 1);
}

function SelectFromArray(whichArray, amount)
{
  var returnItems = [];
  var usingArray = Object.create(whichArray);
  
  for(var i=0; i<amount; i++)
  {
    returnItems.push(usingArray.splice(Math.floor(Math.random()*usingArray.length), 1)[0]);
  }
  returnItems.sort();
  return returnItems;
}

function CheckConflicts(selectedAwardMilestoneList)
{
  var conflicts = [
    ["Builder", "Contractor"],
    ["Gardener", "Cultivator"],
    ["Terraformer", "Benefactor"]
  ];
  
  for(var i=0;i<conflicts.length;i++)
  {
    if(selectedAwardMilestoneList.includes(conflicts[i][0]) && selectedAwardMilestoneList.includes(conflicts[i][1]))
    {
      return true;
    }
  }
  return false;
}





























