/*
VFW Project 3
David Clark
02/24/13
*/

window.addEventListener("DOMContentLoaded", function(){

	function $(x){
		var theInput = document.getElementById(x);
		return theInput;
	}
	
		function createWeapons (){
		var formTag = document.getElementsByTagName("form"),
			selectLi = $('select'),
			createSelect = document.createElement('select');
			createSelect.setAttribute("id", "weaponChoices");
		for (var i=0, j=weaponChoices.length; i<j; i++){
			var makeOption = document.createElement("option");
			var optText = weaponChoices[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			createSelect.appendChild(makeOption);
		}
		selectLi.appendChild(createSelect);
	}
	
		function getGrenadeValue (){
		if($('grenade').checked){
			grenadeValue = $('grenade').value;
		}else{
			grenadeValue = "No";
		}
	}
	
		function getFoodValue (){
		if($('food').checked){
			foodValue = $('food').value;
		}else{
			foodValue = "No";
		}
	}
	
		function getDrinkValue (){
		if($('drink').checked){
			drinkValue = $('drink').value;
		}else{
			drinkValue = "No";
		}
	}
	
		function getMedicineValue (){
		if($('medicine').checked){
			medicineValue = $('medicine').value;
		}else{
			medicineValue = "No";
		}
	}
	
	function storeLoadout (key){
		if(!key){
			var keyGen					= Math.floor(Math.random()*100001);
		}else{
			id = key;
		}
		getGrenadeValue();
		getFoodValue();
		getDrinkValue();
		getMedicineValue();
		var loadout					= {};
			loadout.name			= ["Loadout Creator:", $('name').value];
			loadout.gearName		= ["Loadout Name:", $('gearName').value];
			loadout.dateAdded		= ["Creation Date:", $('dateAdded').value];
			loadout.weaponChoices	= ["Weapon Choice:", $('weaponChoices').value];
			loadout.magAmount		= ["Magazine Quanity:", $('magAmount').value];			
			loadout.grenade			= ["Grenade?", grenadeValue];
			loadout.food			= ["Food?", foodValue];
			loadout.drink			= ["Drink?", drinkValue];
			loadout.medicine		= ["Medicine?", medicineValue];
			loadout.comments		= ["Comments:", $('comments').value];
		localStorage.setItem(id, JSON.stringify(loadout));
		alert("Loadout has been saved.");
	}
	
	function toggleNavControls (n){
		switch(n){
			case "on":
				$('addGear').style.display = "none";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "none";
				$('addNewLoadout').style.display= "inline";
				break;
			case "off":
				$('addGear').style.display = "block";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "inline";
				$('addNewLoadout').style.display= "none";
				$('items').style.display = "display";
				break;
			default:
				return false;
		}
	}
	
	function getLoadouts (){
		toggleNavControls("on");
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('items').style.display = "block";
		for(var i=0, j=localStorage.length; i<j;i++){
			var makeLi = document.createElement('li');
			var makeLinkLi = document.createElement('li');
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeLi.appendChild(makeSubList);
			for(var n in obj){
				var makeSubLi = document.createElement('li');
				makeSubList.appendChild(makeSubLi);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubLi.innerHTML = optSubText;
				makeSubList.appendChild(makeLinkLi);
			}
			makeItemLinks(localStorage.key(i), makeLinkLi);
		}
	}
	
	function makeItemLinks (key, makeLinkLi){
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit loadout";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		makeLinkLi.appendChild(editLink);
		
		var breakTag = document.createElement('br');
		makeLinkLi.appendChild(breakTag);
		
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete loadout";
		deleteLink.addEventListener("click", deleteLoadout);
		deleteLink.innerHTML = deleteText;
		makeLinkLi.appendChild(deleteLink);
	}
	
	function editItem (){
		var value = localStorage.getItem(this.key);
		var loadout = JSON.parse(value);
		toggleNavControls("off");
		$('name').value = loadout.name[1];
		$('gearName').value = loadout.gearName[1];
		$('dateAdded').value = loadout.dateAdded[1];
		$('weaponChoices').value = loadout.weaponChoices[1];
		$('magAmount').value = loadout.magAmount[1];
		if(loadout.grenade[1] == "Grenade"){
			$('grenade').setAttribute("checked", "checked");
		}
		if(loadout.food[1] == "Food"){
			$('food').setAttribute("checked", "checked");
		}
		if(loadout.drink[1] == "Drink"){
			$('drink').setAttribute("checked", "checked");
		}
		if(loadout.medicine[1] == "Medicine"){
			$('medicine').setAttribute("checked", "checked");
		}
		$('comments').value = loadout.comments[1];
		submit.removeEventListener("click", storeLoadout);
		$('submit').value = "Edit Loadout";
		var editSubmit = $('submit');
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	}
	
	function deleteLoadout (){
		var ask = confirm("Are you sure you want to delete this loadout?");
		if (ask){
			localStorage.removeItem(this.key);
			alert("Loadout was deleted.");
			window.location.reload();
		}else {
			alert("Loadout wasn't deleted.");
		}
	}
	
	function clearLoadouts (){
		if(localStorage.length === 0){
			alert("There are no saved loadouts to delete.");
		}else{
			localStorage.clear();
			alert("All loadouts have been deleted.");
			window.location.reload();
			return false;
		}
	}
	
	function validate (e){
		var getName 			= $('name');
		var getGearName 		= $('gearName');
		var getDateAdded 		= $('dateAdded');
		var getWeaponChoices 	= $('weaponChoices');
		
		errorMsg.innerHTML = "";
		getName.style.border = "1px solid black";
		getGearName.style.border = "1px solid black";
		getDateAdded.style.border = "1px solid black";
		getWeaponChoices.style.border = "1px solid black";
		
		var errorArray = [];
		if(getName.value === ""){
			var nameError = "Please add your name.";
			getName.style.border = "1px solid red";
			errorArray.push(nameError);
		}
		
		if(getGearName.value === ""){
			var gearNameError = "Please add a loadout name.";
			getGearName.style.border = "1px solid red";
			errorArray.push(gearNameError);
		}
		
		if(getDateAdded.value === ""){
			var dateAddedError = "Please add a date.";
			getDateAdded.style.border = "1px solid red";
			errorArray.push(dateAddedError);
		}
		
		if(getWeaponChoices.value === "--Select a Weapon--"){
			var weaponChoicesError = "Please select a weapon.";
			getWeaponChoices.style.border = "1px solid red";
			errorArray.push(weaponChoicesError);
		}
		
		if(errorArray.length >= 1){
			for(var i=0, j=errorArray.length; i < j; i++){
				var txt = document.createElement('li');
				txt.innerHTML = errorArray[i];
				errorMsg.appendChild(txt);
			}
			e.preventDefault();
			return false;
		}else{
			storeLoadout(this.key);
		}
		
	}
	
	var weaponChoices = [
		"--Select a Weapon--",
		"Compound Crossbow",
		"M1014",
		"Remington 870",
		"Double-barreled Shotgun",
		"Winchester 1866",
		"Bizon PP-19 SD",
		"MP5A5",
		"MP5SD6",
		"AK-74",
		"AKS-74",
		"AKS-74U",
		"L85A2 AWS",
		"M4A1",
		"M4A1 CCO",
		"M4A1 CCO SD",
		"M4A1 Holo",
		"M4A3 CCO",
		"M16A2",
		"M16A2 M203",
		"M16A4 ACOG",
		"AKM",
		"Lee Enfield",
		"FN FAL",
		"FN FAL AN/PVS4",
		"M249 SAW",
		"M240",
		"Mk 48 Mod 0",
		"CZ 550",
		"DMR",
		"M14 AIM",
		"M24",
		"SVD Camo",
		"M107",
		"AS50",
		"M136"
	],
		grenadeValue = "No",
		foodValue = "No",
		drinkValue = "No",
		medicineValue = "No",
		errorMsg = $('errors');
	
	createWeapons();

	
	
	var clearDataLink = $("clear");
	clearDataLink.addEventListener("click", clearLoadouts);
	
	var displayDataLink = $('displayLink');
	displayDataLink.addEventListener("click", getLoadouts);
	
	var submit = $('submit');
	submit.addEventListener("click", validate);
	



	
});
