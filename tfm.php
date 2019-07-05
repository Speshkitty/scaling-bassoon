<?php
$numPlayers = $_GET['players'];
$conflicts = $_GET['conflicts'];
$solo = $numPlayers == 1;

$boards = array("Standard", "Elysium", "Hellas");
$colonies = array("Callisto", "Ceres", "Enceladus", "Europa", "Ganymede", "Io", "Luna", "Miranda", "Pluto", "Titan", "Triton");
$milestones = array("Builder", "Diversifier", "Ecologist", "Energizer", "Gardener", "Generalist", "Hoverlord", "Legend", "Mayor", "Planner", "Polar Explorer", "Rim Settler", "Specialist", "Tactician", "Terraformer", "Tycoon");
$awards = array("Banker", "Benefactor", "Celebrity", "Contractor", "Cultivator", "Desert Settler", "Estate Dealer", "Excentric", "Global Warmer", "Industrialist", "Landlord", "Magnate", "Miner", "Scientist", "Space Baron", "Venuphile");

$selectedBoard = SelectFromArray($boards, 1)[0];
if($selectedBoard != "Elysium") { $awards = RemoveFromArray($awards, "Desert Settler"); }
if($selectedBoard != "Hellas") { $milestones = RemoveFromArray($milestones, "Polar Explorer"); }

$selectedAwards = SelectFromArray($awards, 6);
$selectedMilestones = SelectFromArray($milestones, 6);
$selectedColonies = SelectFromArray($colonies, ($solo ? 4 : max(5, $numPlayers + 2)));


//reroll
if($conflicts!="on")
while(CheckConflicts($selectedAwards, $selectedMilestones))
{
  $selectedAwards = SelectFromArray($awards, 6);
  $selectedMilestones = SelectFromArray($milestones, 6);
}

function CheckConflicts($selectedAwards, $selectedMilestones)
{
  $conflicts = array(
    array("Builder", "Contractor"),
    array("Gardener", "Cultivator"),
    array("Terraformer", "Benefactor")
  );

  foreach ($conflicts as $conflict)
  {
    $firstInArray = (in_array($conflict[0], $selectedAwards) || in_array($conflict[0], $selectedMilestones));
    if ($firstInArray == false) continue; //skip checking this if the first item isn't there
    
    $secondInArray = (in_array($conflict[1], $selectedAwards) || in_array($conflict[1], $selectedMilestones));
    if($firstInArray && $secondInArray) return true;
  }
  
  return $firstInArray && $secondInArray;
}

function RemoveFromArray($arr, $value)
{
  if (($key = array_search($value, $arr)) !== false) 
  {
    unset($arr[$key]);
  }
  $arr = array_values($arr);
  return $arr;
}

function SelectFromArray($arr, $amount)
{
  $returnItems = array();
  for($i=0; $i<$amount; $i++)
  {
    $pickedItem = false;
    while($pickedItem == false)
      $pickedItem = $arr[rand(0,count($arr))];
    
    array_push($returnItems, $pickedItem);
    
    $arr = RemoveFromArray($arr, $pickedItem);
    
  }
  sort($returnItems);
  return $returnItems; 
}
?>
<form method="get">
Number of players:
<select name="players">
<?php 

$optionToSelect = (isset($numPlayers) ? $numPlayers : 2);

for($i=1;$i<=8;$i++)
{ 
  echo "  <option".($i==$optionToSelect ? " selected" : "").">".($i)."</option>\n";
} 
?>
</select>
<br>
Allow certain combinations of awards and milestones<input type="checkbox" name="conflicts"<?php echo $conflicts=="on" ? " checked" : "";?>><br>
<input type="submit">
</form>

<ol>
<b>Board: </b> 
<?php echo $selectedBoard; ?>
<br>
</ol>
<ol>
<b>Colonies: </b>
<?php
if($solo){ echo "<br>Select three of the four below\n"; }

foreach($selectedColonies as $col){ echo "  <li>" . $col . "</li>\n"; }
?>
</ol>
<ol>
<b>Milestones: </b>
<?php foreach($selectedMilestones as $col) { echo "  <li>" . $col . "</li>\n"; } ?>
</ol>
<ol>
<b>Awards: </b>
<?php foreach($selectedAwards as $col){ echo "  <li>" . $col . "</li>\n";} ?>
</ol>