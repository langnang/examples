version = "v.0.2 (Beta)"

clicks = 0;

goomies = 0;
total_goomies = 0;

gps = 0;
gpc = 1;


gcm_bonus = 0;
click_mult = 1;
global_mult = 1;

expps = 0;

goomy = {
	"exp": 0,
	"level": 1
};





function digitgroup(x, d) {
	d = typeof d !== "undefined" ? d : 0;
	var parts = x.toFixed(d).split(".");
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return parts.join(".");
}





function init_game(){

	// load item data
	for(item in items){

		items[item].cost = items[item].base_cost;

		$("#rightbar").append(
			sprintf("<div id='%s'></div>", item)
		);
		$(sprintf("#%s", item)).append("<table></table>");
		$(sprintf("#%s table", item)).append(sprintf("<tr><td rowspan='3'><src='%s' /></td><td>%s<span id='%s_count'></span></td></tr><tr><td class='itemgps' id='%s_gps'></td></tr><tr><td class='cost'>%s</td></tr>", item, items[item].name, item, item, digitgroup(items[item].cost)));

		function bi(item){
			return function(){
				buy_item(item);
			}
		}

		$(sprintf("#%s", item)).click(bi(item));
	}


	for(var a = 0; a < upgrades.length; ++a){
		$("#upgrade_bar").append(sprintf("<div id='upgrade%d'></div>", a));
		$(sprintf("#upgrade%d", a)).append("<table></table>");
		$(sprintf("#upgrade%d", a)).prop("title", upgrades[a].ftext);
		$(sprintf("#upgrade%d table", a)).append(sprintf("<tr><td>%s - %s Items</td></tr><tr><td class='udesc'>%s</td></tr>", upgrades[a].name, digitgroup(upgrades[a].cost), upgrades[a].description));
		$(sprintf("#upgrade%d", a)).hide();

		function bu(upgrade){
			return function(){
				buy_upgrade(upgrade);
			}
		}
		$(sprintf("#upgrade%d", a)).click(bu(a));

	}

	$("#collection_container").click(function(e){
		click_on_goomy(e.pageX - $("#collection_container").offset().left, e.pageY - $("#collection_container").offset().top);
	});
	$("#collection_container").mousedown(function(){
		$("#great_collection").css({"height": "360px", "top": "20px", "left": "50px"});
	});
	$("#collection_container").mouseup(function(){
		$("#great_collection").css({"height": "400px", "top": "0px", "left": "30px"});
	});

	// if loading is available, load the game data.
	load_game();

	$("#save_button").click(save_game);
	$("#export_button").click(export_save);
	$("#import_button").click(show_import);
	$("#close_export").click(close_export);
	$("#import_savefile").click(import_save);

	update();
	setInterval(save_game, 60000);

	$(".version").html(version);

}










function buy_item(item){

	if(goomies < items[item].cost) return;

	goomies -= items[item].cost;
	items[item].count += 1;

	recalc();

}


function buy_upgrade(upgrade_id){

	if(upgrades[upgrade_id].bought == true) return;
	if(goomies < upgrades[upgrade_id].cost) return;
	if(goomy.level < upgrades[upgrade_id].unlock_level) return;

  
   
  
	upgrades[upgrade_id].bought = true;
	goomies -= upgrades[upgrade_id].cost;

	$("#upgrade" + upgrade_id).hide();

  

	recalc();

}





// actual clicking function

function click_on_goomy(x, y){

	clicks += 1;
	plus_goomies = gpc * click_mult * global_mult;

	goomies += plus_goomies;
	total_goomies += plus_goomies;
	plus_markers.push(new plus_marker(x, y, plus_goomies));

	goomy.exp += Math.sqrt(goomy.level);

	display_exp();

}




// Graphics and interface

plus_markers = [];
marker_id = 0;

plus_marker_anims = 1000;
plus_marker_anidist = 100;
plus_marker_origradius = 100;

function plus_marker(x, y, number){

	this.anims = plus_marker_anims;
	this.number = number;
	this.id = marker_id;
	marker_id += 1;

	this.init_pos_y = y - plus_marker_origradius / 2 + Math.random() * plus_marker_origradius;

	this.pos_x = x - plus_marker_origradius / 2 + Math.random() * plus_marker_origradius;
	this.pos_y = y - plus_marker_origradius / 2 + Math.random() * plus_marker_origradius;

	this.update = update;
	function update(ms){
		if(this.anims - ms <= 0){
			// delete it
			$("#plus_marker" + this.id).remove();
			delete plus_markers[this.id];
		}

		this.anims -= ms;
		var aniprop = this.anims / plus_marker_anims;

		this.pos_y = this.init_pos_y - plus_marker_anidist + (aniprop * aniprop * plus_marker_anidist);
		$("#plus_marker" + this.id).css("top", this.pos_y + "px");
	}

	$("#collection_container").append(sprintf(
		"<div id='plus_marker%s' class='plus_marker'>+%s</div>",
		this.id, digitgroup(this.number)
	));
	$("#plus_marker" + this.id).css("top", this.pos_y + "px");
	$("#plus_marker" + this.id).css("left", this.pos_x - $("#plus_marker" + this.id).width() / 2) + "px";

	return this;

}



function display_exp(){

	if(goomy.exp >= goomy.level * goomy.level * 100){
		goomy.level += 1;
		$("#level").html(goomy.level);
		recalc();
	}

	$("#expbar").attr("max", ((goomy.level * 2 - 1) * 100));
	$("#expbar").attr("value", goomy.exp - ((goomy.level - 1) * (goomy.level - 1) * 100));

}




last_update_time = new Date();


function update(){

	var curtime = new Date();
	delta_ms = curtime.getTime() - last_update_time.getTime();
	last_update_time.setTime(curtime.getTime());

	goomies += gps * global_mult * (delta_ms / 1000);
	total_goomies += gps * global_mult * (delta_ms / 1000);
	goomy.exp += expps * (delta_ms / 1000);

	$("#goomycount").html(sprintf("%s Items", digitgroup(Math.floor(goomies))));
  
	$("#gps").html(sprintf("%s Items per second", digitgroup(gps * global_mult, 1)));

	display_exp();

	for(marker in plus_markers){
		plus_markers[marker].update(delta_ms);
	}

	// Scale info, from scale.js
	$("#info_goomycount").html(digitgroup(Math.floor(goomies)));
	$("#length_comparison").html(compare_length(goomy_length * Math.floor(goomies)));
	$("#total_volume").html(repr_volume(goomy_volume * Math.floor(goomies)));
	$("#volume_comparison").html(compare_volume(goomy_volume * Math.floor(goomies)));
	$("#total_weight").html(repr_weight(goomy_weight * Math.floor(goomies)));
	$("#weight_comparison").html(compare_weight(goomy_weight * Math.floor(goomies)));

	setTimeout(update, 20);	

}
items = {

	"cursor":{
		"name": "Bot",
		"base_cost": 10,
		"gps": 0.2,
		"gpslist": [0.2],
		"count": 0
    
	},

	"monsterslayer":{
		"name": "Monster Slayer",
		"base_cost": 50,
		"gps": 1.0,
		"gpslist": [1.0, 1.5, 3.0, 6.0, 12.0, 24.0, 48.0, 96.0, 192.0, 384.0, 768.0, 1536.0, 6144.0, 24864.0, 99456.0, 397824.0],
		"count": 0
	},

	"merchant":{
		"name": "Merchanter",
		"base_cost": 200,
		"gps": 2.5,
		"gpslist": [2.5, 3.0, 6.0, 12.0, 24.0, 48.0, 96.0, 192.0, 384.0, 768.0],
		"count": 0
	},

	"pvper":{
		"name": "PvPer",
		"base_cost": 1500,
		"gps": 10,
		"gpslist": [10, 14, 28, 56, 112, 224, 448, 896, 1792],
		"count": 0
	},

	"scammer":{
		"name": "Scammer",
		"base_cost": 8000,
		"gps": 25,
		"gpslist": [25, 40, 80, 160, 320, 640, 1280, 2560, 5120],
		"count": 0
	},

	"hacker":{
		"name": "Hacker",
		"base_cost": 36000,
		"gps": 60,
		"gpslist": [60, 90, 180, 360, 720, 1440, 2880, 5760, 11520],
		"count": 0
	},

	"admin":{
		"name": "Admin",
		"base_cost": 150000,
		"gps": 200,
		"gpslist": [200, 300, 600, 1200, 2400, 4800, 9600, 19200, 38400],
		"count": 0
	},

	"official":{
		"name": "Internet Official",
		"base_cost": 999999,
		"gps": 1200,
		"gpslist": [1200, 1800, 3600, 7200, 14400, 28800],
		"count": 0
	},

	"master":{
		"name": "Dungeon Master",
		"base_cost": 5432100,
		"gps": 5432,
		"gpslist": [5432, 9000, 18000, 36000, 72000, 144000],
		"count": 0
	},
  
  "replicator":{
		"name": "Replicator",
		"base_cost": 11390255,
		"gps": 15250,
		"gpslist": [15250, 30500, 61000, 122000, 244000, 488000],
		"count": 0
	},

	"rngabuser":{
		"name": "RNG Abuser",
		"base_cost": 33444555,
		"gps": 33344,
		"gpslist": [33344, 65536, 131072, 262144, 524288, 1048576],
		"count": 0
	},

	"gameengine":{
		"name": "Game Engine",
		"base_cost": 257997520,
		"gps": 212121,
		"gpslist": [212121, 299792, 599584, 1199168, 2398336, 4796672, 9593344, 19186688],
		"count": 0
	},

  "blackhole":{
		"name": "Black Hole",
		"base_cost": 1432533829,
		"gps": 650000,
		"gpslist": [650000, 1300000, 2600000, 5200000, 10400000, 20800000, 41600000, 83200000],
		"count": 0
	},
  
  "whitehole":{
		"name": "White Hole",
		"base_cost": 10000000000,
		"gps": 1000000,
		"gpslist": [1000000],
		"count": 0
	},
  
   "timetravel":{
		"name": "Time Traveler",
		"base_cost": 32000000000,
		"gps": 3000000,
		"gpslist": [3000000],
		"count": 0
	},
  
    "itemminipulator":{
		"name": "Item Manipulator",
		"base_cost": 90000000000,
		"gps": 6500000,
		"gpslist": [6500000],
		"count": 0
	},
  
  
    "alternateuniverse":{
		"name": "Alternate Universe",
		"base_cost": 140000000000,    
		"gps": 9050000,
		"gpslist": [9050000],
		"count": 0
      
	},
};


upgrades = [

	// Monster Slayer
 

  {
		"name": "Great Axe",
		"description": "Makes Monster Slayers gain <b>0.5</b> base Items per Second.",
		"ftext": "Weapons make collecting Items even more faster!",
		"upgrades": ["monsterslayer"],
		"cost": 200,
		"unlock_level": 2,
		"bought": false
	},
	{
		"name": "Spiffy Helmet",
		"description": "Makes Monster Slayers <b>twice</b> as efficient.",
		"ftext": "Easy to wear and helps slay enemies!",
		"upgrades": ["monsterslayer"],
		"cost": 1000,
		"unlock_level": 4,
		"bought": false
	},

	{
		"name": "Spectral Shield",
		"description": "Makes Monster Slayers <b>twice</b> as efficient.",
		"ftext": "Shields give a boost when Item hunting!",
		"upgrades": ["monsterslayer"],
		"cost": 2000,
		"unlock_level": 7,
		"bought": false
	},


	{
		"name": "Taste for Blood",
		"description": "Makes Monster Slayers <b>twice</b> as efficient.",
		"ftext": "With a Taste for Blood, I can seek out targets with greater loot.",
		"upgrades": ["monsterslayer"],
		"cost": 5000,
		"unlock_level": 12,
		"bought": false
	},


	{
		"name": "Live Bait",
		"description": "Makes Monster Slayers <b>twice</b> as efficient.",
		"ftext": "I can set out live bait as a trap, and monsters will be attracted to it",
		"upgrades": ["monsterslayer"],
		"cost": 20000,
		"unlock_level": 17,
		"bought": false
	},


	{
		"name": "Bounty Hunters",
		"description": "Makes Monster Slayers <b>twice</b> as efficient.",
		"ftext": "I have a full team of Hunters, they will surely find the best items!",
		"upgrades": ["monsterslayer"],
		"cost": 120000,
		"unlock_level": 24,
		"bought": false
	},


	{
		"name": "Golden Axe",
		"description": "Makes Monster Slayers <b>twice</b> as efficient.",
		"ftext": "Better weapons means faster kills, which in turn will give more items!",
		"upgrades": ["monsterslayer"],
		"cost": 800000,
		"unlock_level": 29,
		"bought": false
	},


	{
		"name": "Axe of the Gods",
		"description": "Makes Monster Slayers <b>twice</b> as efficient.",
		"ftext": "Why use normal weapons when weapons used by the gods are available?",
		"upgrades": ["monsterslayer"],
		"cost": 4000000,
		"unlock_level": 34,
		"bought": false
	},


	{
		"name": "Shield of Diamond",
		"description": "Makes Monster Slayers <b>twice</b> as efficient.",
		"ftext": "Slaying is life, and now you are the perfect slayer",
		"upgrades": ["monsterslayer"],
		"cost": 30000000,
		"unlock_level": 40,
		"bought": false
	},


	{
		"name": "Slaying Clone",
		"description": "Makes Monster Slayers <b>twice</b> as efficient.",
		"ftext": "I have the perfect army of soldiers, now all thats left is to clone them all",
		"upgrades": ["monsterslayer"],
		"cost": 324000000,
		"unlock_level": 50,
		"bought": false
	},


	{
		"name": "Muscles Up!",
		"description": "Makes Monster Slayers <b>twice</b> as efficient.",
		"ftext": "It was thought the slayers were perfect, but in reality, the armor was perfect. Time to beef up these slayers!",
    "upgrades": ["monsterslayer"],
		"cost": 1825000000,
		"unlock_level": 60,
		"bought": false
	},


	{
		"name": "Enhancement of the Gods",
		"description": "Makes Monster Slayers <b>twice</b> as efficient.",
		"ftext": "All your soldiers have been bulked up, but its not going fast enough.",
    "upgrades": ["monsterslayer"],
		"cost": 18400000000,
		"unlock_level": 70,
		"bought": false
	},


	{
		"name": "Inpenetrable Skin",
		"description": "Makes Monster Slayers <b>four times</b> as efficient.",
		"ftext": "The Slayers are truely perfect now.",
		"upgrades": ["monsterslayer"],
		"cost": 400000000000,
		"unlock_level": 80,
		"bought": false
	},

	{
		"name": "Spawn Enemys",
		"description": "Makes Monster Slayers <b>four times</b> as efficient.",
		"ftext": "These Slayers are beyond perfect that they have killed every creature on the planet, the gods may be able to grant the gift of spawning creatures.",
		"upgrades": ["monsterslayer"],
		"cost": 4000000000000,
		"unlock_level": 90,
		"bought": false
	},


	{
		"name": "Teleportation",
    "description": "Makes Monster Slayers <b>four times</b> as efficient.",
		"ftext": "Even with the ability to spawn infinite amounts of creatures, it is not enough for the slayers. Perhaps more lies on planets beyond our galaxy?",
		"upgrades": ["monsterslayer"],
		"cost": 1000000000000000,
		"unlock_level": 100,
		"bought": false
	},

	// Merchant

	{
		"name": "Basic Store",
		"description": "Makes Merchants gain <b>0.5</b> base Items per Second.",
		"ftext": "If we start a store, we can gain money and items from local traders",
		"upgrades": ["merchant"],
		"cost": 1000,
		"unlock_level": 6,
		"bought": false
	},

	{
		"name": "Investing Agents",
		"description": "Makes Merchants <b>twice</b> as efficient.",
		"ftext": "These Merchants will be gaining special assistance in gathering items.",
		"upgrades": ["merchant"],
		"cost": 3000,
		"unlock_level": 10,
		"bought": false
	},

	{
		"name": "Item Market",
		"description": "Makes Merchants <b>twice</b> as efficient.",
		"ftext": "Start up a full sized market and gather all the local items.",
		"upgrades": ["merchant"],
		"cost": 15000,
		"unlock_level": 16,
		"bought": false
	},

	{
		"name": "Expansion Program",
		"description": "Makes Merchants <b>twice</b> as efficient.",
		"ftext": "Merchant will be able to move out of his local town and setup markets in all the local towns.",
		"upgrades": ["merchant"],
		"cost": 80000,
		"unlock_level": 22,
		"bought": false
	},

	{
		"name": "Hiring Company",
		"description": "Makes Merchants <b>twice</b> as efficient.",
		"ftext": "Merchants have become very successful, all thats left now is to hire more merchants.",
		"upgrades": ["merchant"],
		"cost": 600000,
		"unlock_level": 28,
		"bought": false
	},
  
  {
		"name": "Highest Government Position",
		"description": "Makes Merchants <b>twice</b> as efficient.",
		"ftext": "Merchants have risen to the top, now demanding a tax of items that must be given to the government.",
		"upgrades": ["merchant"],
		"cost": 2000000,
		"unlock_level": 35,
		"bought": false
	},

  {
		"name": "Black Market",
		"description": "Makes Merchants <b>twice</b> as efficient.",
		"ftext": "Travel into the depths of the black markets and find the most unique of items.",
		"upgrades": ["merchant"],
		"cost": 3400000,
		"unlock_level": 43,
		"bought": false
	},
  
  {
		"name": "World Dominator",
		"description": "Makes Merchants <b>twice</b> as efficient.",
		"ftext": "The Merchants have created their own country to country trade route.",
		"upgrades": ["merchant"],
		"cost": 6900000,
		"unlock_level": 52,
		"bought": false
	},
  
  {
		"name": "Planetary Explorers",
		"description": "Makes Merchants <b>twice</b> as efficient.",
		"ftext": "Since Earth is completely ran my merchants, how about they find other planets to trade with?",
		"upgrades": ["merchant"],
		"cost": 13300000,
		"unlock_level": 65,
		"bought": false
	},




	// PvPer

	{
		"name": "Magical Bonus",
		"description": "Makes PvPers gain <b>4</b> base Items per Second.",
		"ftext": "Enemies will fall faster due to the new pvpers power.",
		"upgrades": ["pvper"],
		"cost": 10000,
		"unlock_level": 15,
		"bought": false
	},

	{
		"name": "Healing Potions",
		"description": "Makes PvPers <b>twice</b> as efficient.",
		"ftext": "Allow your pvpers to survive.",
		"upgrades": ["pvper"],
		"cost": 90000,
		"unlock_level": 23,
		"bought": false
	},

	{
		"name": "Stat Increase",
		"description": "Makes PvPers <b>twice</b> as efficient.",
		"ftext": "PvPers can now gain more Attack and Defence stats!",
		"upgrades": ["pvper"],
		"cost": 400000,
		"unlock_level": 27,
		"bought": false
	},

	{
		"name": "Armor ",
		"description": "Makes PvPers <b>twice</b> as efficient.",
		"ftext": "PvPers are now set with a full suit of armor!",
		"upgrades": ["pvper"],
		"cost": 1600000,
		"unlock_level": 32,
		"bought": false
	},

	{
		"name": "Secret Society of PvPers",
		"description": "Makes PvPers <b>twice</b> as efficient.",
		"ftext": "Have a full army of PvPers who will recruit and train those who show PvP qualities.",
		"upgrades": ["pvper"],
		"cost": 5000000,
		"unlock_level": 39,
		"bought": false
	},
  
  {
		"name": "PvP Guild",
		"description": "Makes PvPers <b>twice</b> as efficient.",
		"ftext": "The Elders of the PvPers have established a guild which will conduct a routinely ceremony to make every PvPer stronger.",
		"upgrades": ["pvper"],
		"cost": 9200000,
		"unlock_level": 46,
		"bought": false
	},
  
  {
		"name": "PvP Merch Alliance",
		"description": "Makes PvPers <b>twice</b> as efficient.",
		"ftext": "PvPers have agreed to work with the Merchants to gain better Items which will allow them to defeat more foes!",
		"upgrades": ["pvper"],
		"cost": 22000000,
		"unlock_level": 52,
		"bought": false
	},
  
  {
		"name": "Sacred Altar of the PvP God",
		"description": "Makes PvPers <b>twice</b> as efficient.",
		"ftext": "After years of searching the altar of the pvp gods has been found, the pvpers will grow stronger every visit to this altar.",
		"upgrades": ["pvper"],
		"cost": 5000000,
		"unlock_level": 60,
		"bought": false
	},

	// Scammer

	{
		"name": "Child Manipulation",
		"description": "Makes Scammers gain <b>15</b> base Items per Second.",
		"ftext": "Trick the children into giving you rare items, in return you will the them a special secret.",
		"upgrades": ["scammer"],
		"cost": 50000,
		"unlock_level": 20,
		"bought": false
	},

	{
		"name": "Item Morpher",
		"description": "Makes Scammers <b>twice</b> as efficient.",
		"ftext": "Scammers can now make ordinary things morph into what appears to be rare items.",
		"upgrades": ["scammer"],
		"cost": 256000,
		"unlock_level": 26,
		"bought": false
	},

	{
		"name": "Enhanced Visual Abilities",
		"description": "Makes Scammers <b>twice</b> as efficient.",
		"ftext": "Scammers will now be able to detect who has the most items.",
		"upgrades": ["scammer"],
		"cost": 1250000,
		"unlock_level": 31,
		"bought": false
	},

	{
		"name": "Evil Trickery",
		"description": "Makes Scammers <b>twice</b> as efficient.",
		"ftext": "Effectively allow Scammers to 'borrow' Items from others.",
		"upgrades": ["scammer"],
		"cost": 24000000,
		"unlock_level": 39,
		"bought": false
	},

	{
		"name": "Threats of Doom",
		"description": "Makes Scammers <b>twice</b> as efficient.",
		"ftext": "If the local civilians will not trade with the Scammers, there are other ways of making them do what you want.",
		"upgrades": ["scammer"],
		"cost": 400000000,
		"unlock_level": 52,
		"bought": false
	},

  {
		"name": "Admin Extortion",
		"description": "Makes Scammers <b>twice</b> as efficient.",
		"ftext": "The scammers have grown strong and now find the courage to take the most powerful items directly from the Admins themselves.",
		"upgrades": ["scammer"],
		"cost": 830000000,
		"unlock_level": 60,
		"bought": false
	},
  
  {
		"name": "Admin Scam Alliance",
		"description": "Makes Scammers <b>twice</b> as efficient.",
		"ftext": "The Admins have agreed that since they are working for the same ruler, they should work together allowing the scammers full access to items.",
		"upgrades": ["scammer"],
		"cost": 1500000000,
		"unlock_level": 68,
		"bought": false
	},
  
  {
		"name": "Cross Game Rulers",
		"description": "Makes Scammers <b>twice</b> as efficient.",
		"ftext": "The Scammers are now able to scam the items of other games and bring them to the Item vault.",
		"upgrades": ["scammer"],
		"cost": 4200000000,
		"unlock_level": 75,
		"bought": false
	},
  
	// Hacker

	{
		"name": "Account Stealer",
		"description": "Makes Hackers gain <b>30</b> base Items per Second.",
		"ftext": "Hackers can now get into more accounts than ever before and take the items of others.",
		"upgrades": ["hacker"],
		"cost": 180000,
		"unlock_level": 25,
		"bought": false
	},

	{
		"name": "Item Spawner",
		"description": "Makes Hackers <b>twice</b> as efficient.",
		"ftext": "Spawn Weapons directly into the game, the admins will never find out.",
		"upgrades": ["hacker"],
		"cost": 2000000,
		"unlock_level": 33,
		"bought": false
	},

	{
		"name": "Admin Powers",
		"description": "Makes Hackers <b>twice</b> as efficient.",
		"ftext": "Hackers and Admins have sided together, allowing the hackers to spawn items with no punishment.",
    "upgrades": ["hacker"],
		"cost": 12288000,
		"unlock_level": 39,
		"bought": false
	},

	{
		"name": "Automatic Computer",
		"description": "Makes Hackers <b>twice</b> as efficient.",
		"ftext": "Hackers have grown tired of spawning items each day, so they build an automatic computer to do it for them.",
		"upgrades": ["hacker"],
		"cost": 200000000,
		"unlock_level": 48,
		"bought": false
	},

	{
		"name": "Super Computer",
		"description": "Makes Hackers <b>twice</b> as efficient.",
		"ftext": "Automatic computers were not enough, the super computer can run hundreds of accounts at once along with making new accounts.",
		"upgrades": ["hacker"],
		"cost": 2800000000,
		"unlock_level": 62,
		"bought": false
	},
  
  {
		"name": "Alien Technology",
		"description": "Makes Hackers <b>twice</b> as efficient.",
		"ftext": "It has been a thought from every movie, that aliens have superior technology compaired to that of a human, It turns out that this was true and the hackers have gained this technology.",
		"upgrades": ["hacker"],
		"cost": 5800000000,
		"unlock_level": 71,
		"bought": false
	},
  
  {
		"name": "The Golden Ticket",
		"description": "Makes Hackers <b>twice</b> as efficient.",
		"ftext": "Hackers can now access every bit of technology that is held on earth with their new technology and can force all computers to gather items at will.",
		"upgrades": ["hacker"],
		"cost": 9800000000,
		"unlock_level": 80,
		"bought": false
	},
  
  {
		"name": "The Dark Ages",
		"description": "Makes Hackers <b>twice</b> as efficient.",
		"ftext": "Force all technilogical devices to go dark and immune from outside contact, while they show a blank screen to the confused owner they are secretly spawning items.",
		"upgrades": ["hacker"],
		"cost": 12800000000,
		"unlock_level": 88,
		"bought": false
	},

	// Admin

	{
		"name": "Abuse Powers",
		"description": "Makes Admins gain <b>100</b> base Items per Second.",
		"ftext": "The Admins have finally done it, used their powers for evil and are spawning thousands of items into your stash!",
		"upgrades": ["admin"],
		"cost": 1000000,
		"unlock_level": 30,
		"bought": false
	},

	{
		"name": "Hacker Co-op",
		"description": "Makes Admins <b>twice</b> as efficient.",
		"ftext": "After allowing hackers to roam free, the admins feel it would be beneficial to cooperate and gain an automatic item spawner?",
		"upgrades": ["admin"],
		"cost": 9600000,
		"unlock_level": 36,
		"bought": false
	},

	{
		"name": "Legendary Items",
		"description": "Makes Admins <b>twice</b> as efficient.",
		"ftext": "Admins now focus their attention of spawning Legendary items which are the equal to thousands of normal items.",
		"upgrades": ["admin"],
		"cost": 160000000,
		"unlock_level": 47,
		"bought": false
	},

	{
		"name": "Player Manipulation",
		"description": "Makes Admins <b>twice</b> as efficient.",
		"ftext": "Trick players into farming items in return for some special stat potions!",
		"upgrades": ["admin"],
		"cost": 1200000000,
		"unlock_level": 58,
		"bought": false
	},

	{
		"name": "Admin God",
		"description": "Makes Admins <b>twice</b> as efficient.",
		"ftext": "Admins were thought to be able to do anything in the game, but there were restrictions. Shall we remove them?",
		"upgrades": ["admin"],
		"cost": 33333333333,
		"unlock_level": 72,
		"bought": false
	},
  
  {
		"name": "Eternal Admin",
		"description": "Makes Admins <b>twice</b> as efficient.",
		"ftext": "The almighty admins have all the power, but they lack the energy to go forever, shall we grant them that also?",
		"upgrades": ["admin"],
		"cost": 75000000000,
		"unlock_level": 80,
		"bought": false
	},
  
  {
		"name": "Flawless Admin",
		"description": "Makes Admins <b>twice</b> as efficient.",
		"ftext": "Humans are indeed flawed in many ways, perhaps creating a new super admin with the mind of a computer can fix those flaws?",
		"upgrades": ["admin"],
		"cost": 120000000000,
		"unlock_level": 93,
		"bought": false
	},
  
  {
		"name": "Game Host",
		"description": "Makes Admins <b>twice</b> as efficient.",
		"ftext": "The Admins have grown so superior than any other that they are taking control of neighboring games and allowing bots to run amuck and farm items.",
		"upgrades": ["admin"],
		"cost": 30000000000,
		"unlock_level": 104,
		"bought": false
	},

	// Internet Official

	{
		"name": "Server Size Increase",
		"description": "Makes Internet Officials gain <b>600</b> base Items per Second.",
		"ftext": "We'll allow the player capacity to double in size, which will allow more bots in.",
		"upgrades": ["official"],
		"cost": 6666666,
		"unlock_level": 35,
		"bought": false
	},

	{
		"name": "Player Capacity Increase #2",
		"description": "Makes Internet Officials <b>twice</b> as efficient.",
		"ftext": "Another Increase of the maximum player size! Now the servers hold 4x more players!",
		"upgrades": ["official"],
		"cost": 128000000,
		"unlock_level": 46,
		"bought": false
	},

	{
		"name": "Website Ads",
		"description": "Makes Internet Officials <b>twice</b> as efficient.",
		"ftext": "Advertise the thrill of collecting items, which in turn will make others join in!",
		"upgrades": ["official"],
		"cost": 900000000,
		"unlock_level": 57,
		"bought": false
	},

	{
		"name": "Special Servers",
		"description": "Makes Internet Officials <b>twice</b> as efficient.",
		"ftext": "Forget about increasing player capacity, why not make your own server that runs at 2x normal speed?!.",
		"upgrades": ["official"],
		"cost": 10000000000,
		"unlock_level": 68,
		"bought": false
	},

	{
		"name": "Special Server Upgrade",
		"description": "Makes Internet Officials <b>twice</b> as efficient.",
		"ftext": "Upgrade the Special Servers so that they run 4x as fast!",
		"upgrades": ["official"],
		"cost": 300000000000,
		"unlock_level": 79,
		"bought": false
	},

	// Dungeon Master

	{
		"name": "Complete Charisma",
		"description": "Makes Dungeon Masters gain <b>3,160</b> base Items per Second.",
		"ftext": "Complete the hole in the players heart by filling it with the love, of Charisma.",
		"upgrades": ["master"],
		"cost": 90000000,
		"unlock_level": 45,
		"bought": false
	},

	{
		"name": "RPG Aspects",
		"description": "Makes Dungeon Masters <b>twice</b> as efficient.",
		"ftext": "Players can now gain stats faster and more efficiently which in turn will allow them to gain more items!",
		"upgrades": ["master"],
		"cost": 700000000,
		"unlock_level": 56,
		"bought": false
	},

	{
		"name": "Story Telling",
		"description": "Makes Dungeon Masters <b>twice</b> as efficient.",
		"ftext": "'Tells a short story' and thats why players can farm more items faster!",
		"upgrades": ["master"],
		"cost": 8000000000,
		"unlock_level": 67,
		"bought": false
	},

	{
		"name": "Dragon Riding",
		"description": "Makes Dungeon Masters <b>twice</b> as efficient.",
		"ftext": "Players may now ride the magical dragons which will allow more damage and faster movement!",
		"upgrades": ["master"],
		"cost": 200000000000,
		"unlock_level": 78,
		"bought": false
	},

	{
		"name": "Dungeon Master Control",
		"description": "Makes Dungeon Masters <b>twice</b> as efficient.",
		"ftext": "The Dungeon Master is infinite and will allow all players to do as they please!",
		"upgrades": ["master"],
		"cost": 2100000000000,
		"unlock_level": 87,
		"bought": false
	},
  
  // Replicator
  
  {
		"name": "Double Replication",
		"description": "Makes Replicators <b>twice</b> as efficient.",
		"ftext": "Throw an item in, two come out. Who can be sad about that?!",
		"upgrades": ["replicator"],
		"cost": 240000000,
		"unlock_level": 47,
		"bought": false
	},
  {
		"name": "Item Magnifier #1",
		"description": "Makes Replicators <b>twice</b> as efficient.",
		"ftext": "Normal Items now come out as Rare Items!",
		"upgrades": ["replicator"],
		"cost": 240000000,
		"unlock_level": 55,
		"bought": false
	},
  
  {
		"name": "Quadruple Replication",
		"description": "Makes Replicators <b>twice</b> as efficient.",
		"ftext": "Throw an item in, four come out. Fast and Easy!",
		"upgrades": ["replicator"],
		"cost": 240000000,
		"unlock_level": 68,
		"bought": false
	},
  
  {
		"name": "Item Magnifier #2",
		"description": "Makes Replicators <b>twice</b> as efficient.",
		"ftext": "Normal Items now come out as Legendary Items!",
		"upgrades": ["replicator"],
		"cost": 240000000,
		"unlock_level": 80,
		"bought": false
	},
  
  {
		"name": "Replicating Factory",
		"description": "Makes Replicators <b>twice</b> as efficient.",
		"ftext": "Forget using one Replicating machine, lets have a factory full of them!",
		"upgrades": ["replicator"],
		"cost": 240000000,
		"unlock_level": 92,
		"bought": false
	},
  
	// RNG Abuser

	{
		"name": "Lucky Charm",
		"description": "Makes RNG abusers <b>twice</b> as efficient.",
		"ftext": "Players can now take a lucky item of their choice which if enchanted, can give them great rewards!",
		"upgrades": ["rngabuser"],
		"cost": 536870912,
		"unlock_level": 55,
		"bought": false
	},

	{
		"name": "Future Computer",
		"description": "Makes RNG abusers <b>twice</b> as efficient.",
		"ftext": "Why use computers of the modern age when the future is better?",
		"upgrades": ["rngabuser"],
		"cost": 4294967296,
		"unlock_level": 65,
		"bought": false
	},

	{
		"name": "Petabyte Storage",
		"description": "Makes RNG abusers <b>twice</b> as efficient.",
		"ftext": "Able to store billions of Lucky Items",
		"upgrades": ["rngabuser"],
		"cost": 137438953472,
		"unlock_level": 77,
		"bought": false
	},

	{
		"name": "Boss Manipulation",
		"description": "Makes RNG abusers <b>twice</b> as efficient.",
		"ftext": "You've found an Exploit with the new boss, farm him until it is patched?",
		"upgrades": ["rngabuser"],
		"cost": 1099511627776,
		"unlock_level": 85,
		"bought": false
	},

	{
		"name": "Infinite Storage",
		"description": "Makes RNG abusers <b>twice</b> as efficient.",
		"ftext": "Whats better than a Petabyte? Infinite-byte",
		"upgrades": ["rngabuser"],
		"cost": 17952186044416,
		"unlock_level": 93,
		"bought": false
	},
  
  // Game Engine
  {
		"name": "Game Engine Engage?",
		"description": "Makes Game Engines produce <b>299,792</b> base Items Per Second.",
		"ftext": "The old game was becoming dull, with a new Game Engine everything can look new and mighty!",
		"upgrades": ["gameengine"],
		"cost": 1200000000,
		"unlock_level": 60,
		"bought": false
	},

  {
		"name": "Creature Capacity Upgrade",
		"description": "Makes Game Engines <b>twice</b> as efficient.",
		"ftext": "Allowing more creatures in the game can benefit everyone.",
		"upgrades": ["gameengine"],
		"cost": 3555555555,
		"unlock_level": 66,
		"bought": false
	},
  
  {
		"name": "Dynamic Detonation",
		"description": "Makes Game Engines <b>twice</b> as efficient.",
		"ftext": "Program the new game to have a blast of energy every hour destroying all creatures in the game allowing items to drop.",
		"upgrades": ["gameengine"],
		"cost": 9876543211,
		"unlock_level": 74,
		"bought": false
	},
  
  {
		"name": "Dynamic Sweep",
		"description": "Makes Game Engines <b>twice</b> as efficient.",
		"ftext": "The Detonations have worked! But players take to long to gather all the items dropped, shall we create another explosion which sweeps up all items?",
		"upgrades": ["gameengine"],
		"cost": 15888382972,
		"unlock_level": 82,
		"bought": false
	},
  
  {
		"name": "Dynamic Upgrade",
		"description": "Makes Game Engines <b>twice</b> as efficient.",
		"ftext": "Explosions seem to be the trick to major item finds, but the detonations only occur every so often. Maybe we should make it happen more often.",
		"upgrades": ["gameengine"],
		"cost": 28562918773,
		"unlock_level": 90,
		"bought": false
	},
  
  {
		"name": "Next Generation Content",
		"description": "Makes Game Engines <b>twice</b> as efficient.",
		"ftext": "Add even more content into the game. More Players, more creatures and even more detonations!",
		"upgrades": ["gameengine"],
		"cost": 42918627839,
		"unlock_level": 101,
		"bought": false
	},
  
  {
		"name": "Endless Bosses",
		"description": "Makes Game Engines <b>twice</b> as efficient.",
		"ftext": "The creators have implemented a new method of gathering items. Fight waves of endless monsters and bosses to find the most epic of loot!",
		"upgrades": ["gameengine"],
		"cost": 93829628482,
		"unlock_level": 111,
		"bought": false
	},
	// Black Hole

	{
		"name": "SuperNova",
		"description": "Makes Black Holes <b>twice</b> as efficient.",
		"ftext": "With Every explosion of the Supernova, a new black hole is formed",
		"upgrades": ["blackhole"],
		"cost": 58786252372,
		"unlock_level": 75,
		"bought": false
	},

	{
		"name": "Star Control",
		"description": "Makes Black Holes <b>twice</b> as efficient.",
		"ftext": "Stars take to long to die, lets speed up the process by controlling them.",
		"upgrades": ["blackhole"],
		"cost": 857142857142,
		"unlock_level": 83,
		"bought": false
	},

	{
		"name": "3-Star System",
		"description": "Makes Black Holes <b>twice</b> as efficient.",
		"ftext": "60% of stars are in a Binary System, why not make it 3 Stars instead of 2?",
		"upgrades": ["blackhole"],
		"cost": 8000000000000,
		"unlock_level": 91,
		"bought": false
	},

	{
		"name": "Endless Life",
		"description": "Makes Black Holes <b>twice</b> as efficient.",
		"ftext": "Like everything, Black Holes die, how about we change that?",
		"upgrades": ["blackhole"],
		"cost": 32000000000000,
		"unlock_level": 94,
		"bought": false
	},

	{
		"name": "Einstein's Theory",
		"description": "Makes Black Holes <b>twice</b> as efficient.",
		"ftext": "Use the great mind of Albert Einstein to find a way to make Black Holes even greater.",
		"upgrades": ["blackhole"],
		"cost": 135000000000000,
		"unlock_level": 96,
		"bought": false
	},

	{
		"name": "Increased Gravitational Pull",
		"description": "Makes Black Holes <b>twice</b> as efficient.",
		"ftext": "Nothing can escape the Black Holes gravitational pull, not even Items. How about we increase it along with increasing the range?!",
		"upgrades": ["blackhole"],
		"cost": 316227766016838,
		"unlock_level": 98,
		"bought": false
	},

  {
		"name": "Black Hole Retriever",
		"description": "Makes Black Holes <b>twice</b> as efficient.",
		"ftext": "The Black Holes are gathering billions of Items, how about we build something to retrieve the items?",
		"upgrades": ["blackhole"],
		"cost": 1255544433322211,
		"unlock_level": 100,
		"bought": false
	},
];
  function recalc(){

 
	recalc_gps();
	recalc_gpc();
	recalc_click_mult();
	recalc_global_mult();
	for(item in items){
		recalc_itemcost(item);
	}
	unlock_upgrades();

}

  
function recalc_gpc(){

	var new_gpc = goomy.level;
	recalc_gcm();
	new_gpc += gcm_bonus;

	// After level 100, start giving click bonus as a proportion of GpS.
	if(goomy.level > 100){
		new_gpc += gps * (goomy.level / 100 - 1);
	}

	gpc = new_gpc;

}


function recalc_gps(){

	gps = 0;
	for (item in items){
		// calculate total upgraded cost
		upgraded = 0;
		for(var a = 0; a < upgrades.length; ++a){
			if(upgrades[a].bought == true && $.inArray(item, upgrades[a].upgrades) != -1){
				++upgraded;
			}
		}
		items[item].gps = items[item].gpslist[upgraded];

		if(item == "cursor"){
			gps += items[item].gps * goomy.level * click_mult * items[item].count;
			$(sprintf("#%s_gps", item)).html(sprintf("Produces %s Items per Second", digitgroup(items[item].gps * goomy.level * click_mult * global_mult, 1)));
		}else{
			gps += items[item].gps * items[item].count;
			$(sprintf("#%s_gps", item)).html(sprintf("Produces %s Items per Second", digitgroup(items[item].gps * global_mult, 1)));
		}
	}

	expps = items["cursor"].count / 5;
	$("#gps").html(sprintf("%s Items per second", digitgroup(gps * global_mult, 1)));

}



function recalc_gcm(){

	total_generators = 0;
	for (item in items){
		total_generators += items[item].count;
	}

	level_mult = 0;
	if(goomy.level >= 10 && goomy.level < 20)
		level_mult = (goomy.level - 10) * 0.1 + 0;
	else if(goomy.level >= 20 && goomy.level < 40)
		level_mult = (goomy.level - 20) * 0.2 + 1;
	else if(goomy.level >= 40 && goomy.level < 60)
		level_mult = (goomy.level - 40) * 0.5 + 5;
	else if(goomy.level >= 60 && goomy.level < 70)
		level_mult = (goomy.level - 60) * 1.0 + 15;
	else if(goomy.level >= 70 && goomy.level < 90)
		level_mult = (goomy.level - 70) * 2.5 + 25;
	else if(goomy.level >= 90 && goomy.level < 100)
		level_mult = (goomy.level - 90) * 5.0 + 75;
	else if(goomy.level >= 100)
		level_mult = 125;

	gcm_bonus = total_generators * level_mult;

	// 0, 1, 3, 5, 10, 15, 25, 50, 75, 125

}


function recalc_click_mult(){

	click_mult = 1;
	if(goomy.level >= 30 && goomy.level < 80)
		click_mult = (goomy.level - 30) * 0.1 + 1;
	else if(goomy.level >= 80 && goomy.level < 100)
		click_mult = (goomy.level - 80) * 0.2 + 6;
	else if(goomy.level >= 100)
		click_mult = 10;

}


function recalc_global_mult(){

	global_mult = Math.max(1, (goomy.level) * 0.02);

}



function recalc_itemcost(item){

	
	var damping_factor = 10;
	items[item].cost = Math.floor( items[item].base_cost * Math.pow(2, Math.pow(items[item].count + damping_factor, 0.5) - Math.pow(damping_factor, 0.5)) )

	$("#" + item + "_count").html(" - " + items[item].count);
	$("#" + item).find(".cost").html(digitgroup(items[item].cost));

}


function unlock_upgrades(){

	for(var a = 0; a < upgrades.length; ++a){
		if(upgrades[a].unlock_level <= goomy.level && upgrades[a].bought == false){
			$("#upgrade" + a).show();
		}else{
			$("#upgrade" + a).hide();
		}
	}

}
function save_game(){

	// store all saved data.

	localStorage["goomyclicker.goomy.level"] = goomy.level;
	localStorage["goomyclicker.goomy.exp"] = goomy.exp;
	localStorage["goomyclicker.goomies"] = goomies;
	localStorage["goomyclicker.total_goomies"] = total_goomies;

	for(item in items){
		localStorage["goomyclicker.items." + item + ".count"] = items[item].count;
	}

	for(var a = 0; a < upgrades.length; ++a){
		localStorage["goomyclicker.upgrades." + a + ".bought"] = upgrades[a].bought;
	}

	$("#save_dialog").show();
	setTimeout(function(){$("#save_dialog").hide();}, 3000);
  

}


function load_game(){

	if(localStorage.getItem("goomyclicker.goomy.level") !== null)
		goomy.level = parseFloat(localStorage["goomyclicker.goomy.level"]);
	if(localStorage.getItem("goomyclicker.goomy.exp") !== null)
		goomy.exp = parseFloat(localStorage["goomyclicker.goomy.exp"]);
	if(localStorage.getItem("goomyclicker.goomies") !== null)
		goomies = parseFloat(localStorage["goomyclicker.goomies"]);
	if(localStorage.getItem("goomyclicker.total_goomies") !== null)
		total_goomies = parseFloat(localStorage["goomyclicker.total_goomies"]);

	for(item in items){
		if(localStorage.getItem("goomyclicker.items." + item + ".count") !== null){
			items[item].count = parseInt(localStorage["goomyclicker.items." + item + ".count"]);
			if(items[item].count > 0) $("#" + item + "_count").html(" - " + items[item].count);
		}
	}

	for(var a = 0; a < upgrades.length; ++a){
		if(localStorage.getItem("goomyclicker.upgrades." + a + ".bought") === "true"){
			upgrades[a].bought = true;
		}
	}

	recalc();

}


function reset_game(){
  
  
	goomy.level = 0; //Reverts Level to lowest possible, Meaning level 1
	goomy.exp = 0;

	goomies = 0;
	total_goomies = 0;
  
  
	for(item in items){
		items[item].count = 0;
    
 
	}
  
  for(var a = 0; a < upgrades.length; ++a){
		if(localStorage.getItem("goomyclicker.upgrades." + a + ".bought") === "true"){
			upgrades[a].bought = false;
		}

	recalc();
    
}
}

function query_reset(){

	if(confirm("*SAVE BEFORE YOU RESET* There is no reward for resetting currently. Are you sure you want to reset?")){
   
		reset_game();
   
	}

}




// Text import/export

savetextstring = "0123456789.-,|e`";
savetextmap = {
	"0": "0000",
	"1": "0001",
	"2": "0010",
	"3": "0011",
	"4": "0100",
	"5": "0101",
	"6": "0110",
	"7": "0111",
	"8": "1000",
	"9": "1001",
	".": "1010", // decimal
	"-": "1011", // negative
	",": "1100", // level 2 separator
	"|": "1101", // level 1 separator
	"e": "1110", // exponent
	"`": "1111"  // symbol escape
};

base64string = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/=";
// base64string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";






/////////
// Save export starts here.
/////////

function sstr_to_bin(sstr){
	var bin = "";
	for(var a = 0; a < sstr.length; ++a){
		if(sstr[a] == "+") continue; 
		if(savetextstring.indexOf(sstr[a]) == -1){
			return "Export error";
		}
		bin += savetextmap[sstr[a]];
	}
	return bin;
}

function bin_to_b64(bin){

	if(bin == "Export error") return bin;
	if(bin.length % 2 != 0){
		return "Export error";
	}

	var b64 = "";
	var padding = "";

	while(bin.length % 6 != 0){
		bin += "00";
		padding += base64string[64];
	}

	var strlength = 0;
	for(; strlength < bin.length; strlength += 6){
		b64 += base64string[parseInt(bin.substr(strlength, 6), 2)];
	}

	return b64 + padding;
}

function sstr_to_b64(sstr){
	return bin_to_b64(sstr_to_bin(sstr));
}

function export_save(){

	var d01_level = goomy.level;
	var d02_exp = Math.floor(goomy.exp);
	var d03_goomies = Math.floor(goomies);

	var d04_items = "";
	for(item in items){
		d04_items += items[item].count + ",";
	}
	d04_items = d04_items.slice(0, -1); // remove trailing ,

	var d05_totalgoomies = Math.floor(total_goomies);

	var d06_upgrades = "";
	for(var a = 0; a < upgrades.length; ++a){
		if(upgrades[a].bought){
			d06_upgrades += a + ",";
		}
	}
	d06_upgrades = d06_upgrades.slice(0, -1); // remove trailing ,

	var save_string = sprintf("%s|%s|%s|%s|%s|%s", d01_level, d02_exp, d03_goomies, d04_items, d05_totalgoomies, d06_upgrades);

	$("#export_string").val(sstr_to_b64(save_string));
	$("#export_dialog").toggle();
	$("#import_dialog").hide();

}

function close_export(){
	$("#export_dialog").hide();
}


/////////
// Save import starts here.
/////////

function show_import(){
	$("#import_dialog").toggle();
	$("#export_dialog").hide();
}

function b64_to_bin(b64){
	var bin = "";
	for(var a = 0; a < b64.length; ++a){
		if(b64[a] == "="){
			bin = bin.slice(0, -2);
			continue;
		}
		for(var b = 0; b < 64; ++b){
			if(b64[a] == base64string[b]){
				bin += sprintf("%06b", b);
				break;
			}
		}
	}
	return bin;
}

function bin_to_sstr(bin){
	var sstr = "";
	for(var a = 0; a < bin.length; a += 4){
		sstr += savetextstring[parseInt(bin.substr(a, 4), 2)];
	}
	return sstr;
}

function b64_to_sstr(b64){
	return bin_to_sstr(b64_to_bin(b64));
}

function import_save(){

	var save_b64 = $("#import_string").val();
	var save_string = b64_to_sstr(save_b64);

	var data = save_string.split("|");

	var d01_level = parseInt(data[0]);
	if(isNaN(d01_level)) d01_level = 0;
		goomy.level = d01_level;

	var d02_exp = parseInt(data[1]);
	if(isNaN(d02_exp)) d02_exp = 0;
		goomy.exp = d02_exp;

	var d03_goomies = parseFloat(data[2]);
	if(isNaN(d03_goomies)) d03_goomies = 0;
		goomies = d03_goomies;

	var d04_items = data[3].split(",");
	var seeker = 0;
	for(item in items){
		if(typeof(d04_items[seeker]) != "undefined"){
			items[item].count = parseInt(d04_items[seeker]);
			seeker += 1;
		}else{
			items[item].count = 0;
		}
	}

	var d05_totalgoomies = parseFloat(data[4]);
	if(isNaN(d05_totalgoomies)) d05_totalgoomies = 0;
		total_goomies = d05_totalgoomies;

	if(data[5] != null){	
		var d06_upgrades = data[5].split(",");
		for(var a = 0; a < d06_upgrades.length; ++a){
			var upgrade = parseInt(d06_upgrades[a]);
			if(!isNaN(upgrade)){
				upgrades[upgrade] = true;
			}
		}
	}

	recalc();

	$("#import_dialog").hide();

}
goomy_volume = 0.01601725;  // volume in m^3
goomy_weight = 2.837961; // weight in kg
goomy_length = 0.2875;  // length in metres


function repr_volume(cu_m){
	if(cu_m > 500000000){
		return digitgroup(cu_m / 1000000000, 3) + " km&sup3;";
	}else{
		return digitgroup(cu_m, 3) + " m&sup3;";
	}
}

volume_comparisons = {



	"goomy": {
		"name_sing": "a Goomy",
		"name_pl": "%s Goomies",
		"volume": 0.016
	},

	"bathtub": {
		"name_sing": "a bathtub",
		"name_pl": "%s bathtubs",
		"volume": 0.159
	},

	"office_cubicle": {
		"name_sing": "an average-sized office cubicle",
		"name_pl": "%s average-sized office cubicles",
		"volume": 6.12
	},

	"loaded_truck": {
		"name_sing": "a loaded truck",
		"name_pl": "%s loaded trucks",
		"volume": 55
	},

	"wailord_blimp": {
		"name_sing": "a Wailord-sized blimp",
		"name_pl": "%s Wailord-sized blimps",
		"volume": 481.2
	},

	"average_house": {
		"name_sing": "a two-story house",
		"name_pl": "%s two-story houses",
		"volume": 1200
	},

	"olympic_pool": {
		"name_sing": "an Olympic-sized swimming pool",
		"name_pl": "%s Olympic-sized swimming pools",
		"volume": 2500
	},

	"oil_tanker": {
		"name_sing": "an oil supertanker",
		"name_pl": "%s oil supertankers",
		"volume": 318000
	},

	"football_field": {
		"name_sing": "a football field",
		"name_pl": "%s football fields",
		"volume": 570000
	},

	"wall_street": {
		"name_sing": "Wall Street",
		"name_pl": "",
		"volume": 999999
	},

	"empirestate_building": {
		"name_sing": "the entire Empire State Building",
		"name_pl": "%s Empire State Buildings",
		"volume": 1047720
	},

	"sydney_harbour": {
		"name_sing": "the Sydney Harbour",
		"name_pl": "the Sydney Harbour %s times",
		"volume": 5000000
	},

	"borg_cube": {
		"name_sing": "the Borg cube",
		"name_pl": "%s Borg cubes",
		"volume": 28000000000
	},

	"lake_ontario": {
		"name_sing": "Lake Ontario",
		"name_pl": "Lake Ontario %s times",
		"volume": 1640000000000
	},

	"world_oceans": {
		"name_sing": "the Earth's oceans",
		"name_pl": "the Earth's oceans %s times",
		"volume": 1.37e+18
	}

};

function compare_volume(cu_m){
	if(cu_m == 0) return "a thimble";

	var largest_comparison = "";
	for(comp in volume_comparisons){
		if(volume_comparisons[comp].volume <= cu_m){
			largest_comparison = comp;
		}else break;
	}
	var comp_ratio = cu_m / volume_comparisons[largest_comparison].volume;
	if(comp_ratio < 1.15 || volume_comparisons[largest_comparison].name_pl == ""){
		return volume_comparisons[largest_comparison].name_sing;
	}else if(largest_comparison == "goomy"){
		return sprintf(volume_comparisons[largest_comparison].name_pl, comp_ratio.toFixed(0));
	}else{
		return sprintf(volume_comparisons[largest_comparison].name_pl, comp_ratio.toFixed(1));
	}
}






function repr_weight(kg){
	if(kg > 1000000000){
		return digitgroup(kg / 1000000000, 3) + " Mt";
	}else if(kg > 1000){
		return digitgroup(kg / 1000, 3) + " t";
	}else{
		return digitgroup(kg, 1) + " kg";
	}
}


weight_comparisons = {

	

	"goomy": {
		"name_sing": "a Goomy",
		"name_pl": "%s Goomies",
		"weight": 2.8
	},

	"suitcase": {
		"name_sing": "a piece of checked airplane baggage",
		"name_pl": "%s pieces of checked airplane baggage",
		"weight": 22
	},

	"human": {
		"name_sing": "an adult human",
		"name_pl": "%s adult humans",
		"weight": 75
	},

	"hydreigon": {
		"name_sing": "a Hydreigon",
		"name_pl": "%s Hydreigons",
		"weight": 160
	},

	"turtle": {
		"name_sing": "a leatherback turtle",
		"name_pl": "%s leatherback turtles",
		"weight": 384
	},

	"groudon": {
		"name_sing": "Groudon",
		"name_pl": "%s Groudons",
		"weight": 950
	},

	"minivan": {
		"name_sing": "a minivan",
		"name_pl": "%s minivans",
		"weight": 2000
	},

	"elephant": {
		"name_sing": "an African elephant",
		"name_pl": "%s African elephants",
		"weight": 5500
	},

	"schoolbus": {
		"name_sing": "a fully loaded school bus",
		"name_pl": "%s fully loaded school buses",
		"weight": 16700
	},

	"bluewhale": {
		"name_sing": "a blue whale",
		"name_pl": "%s blue whales",
		"weight": 165000
	},

	"boeing747": {
		"name_sing": "a fully loaded Boeing 747 plane",
		"name_pl": "%s fully loaded Boeing 747 planes",
		"weight": 360000
	},

	"olympic_pool": {
		"name_sing": "the water in an Olympic-sized swimming pool",
		"name_pl": "the water in %s Olympic-sized swimming pools",
		"weight": 2500000
	},

	"uluru": {
		"name_sing": "Ayers Rock",
		"name_pl": "%s Ayers Rocks",
		"weight": 4000000000
	},



};

function compare_weight(kg){
	if(kg == 0) return "a gulp of air";

	var largest_comparison = "";
	for(comp in weight_comparisons){
		if(weight_comparisons[comp].weight <= kg){
			largest_comparison = comp;
		}else break;
	}
	var comp_ratio = kg / weight_comparisons[largest_comparison].weight;
	if(comp_ratio < 1.15 || weight_comparisons[largest_comparison].name_pl == ""){
		return weight_comparisons[largest_comparison].name_sing;
	}else if(largest_comparison == "goomy"){
		return sprintf(weight_comparisons[largest_comparison].name_pl, comp_ratio.toFixed(0));
	}else{
		return sprintf(weight_comparisons[largest_comparison].name_pl, comp_ratio.toFixed(1));
	}
}






function repr_length(kg){
	if(kg > 1000000000){
		return digitgroup(kg / 1000000000, 3) + " Mt";
	}else if(kg > 1000){
		return digitgroup(kg / 1000, 3) + " t";
	}else{
		return digitgroup(kg, 1) + " kg";
	}
}


length_comparisons = {

	

	"goomy": {
		"name_sing": "as far as one Goomy",
		"name_pl": "as far as %d Goomies",
		"length": 0.2875
	},

	"street": {
		"name_sing": "across a 1-lane street",
		"name_pl": "across a %d-lane street",
		"length": 1.43
	},

	"olympic_pool": {
		"name_sing": "across an Olympic-sized swimming pool",
		"name_pl": "across %s Olympic-sized swimming pools",
		"length": 25
	},

	"football_field": {
		"name_sing": "across a football field",
		"name_pl": "across %s football fields",
		"length": 105
	},

	"cn_tower": {
		"name_sing": "as high as the CN Tower",
		"name_pl": "%s times as high as the CN Tower",
		"length": 553.33
	},

	"marianas_trench": {
		"name_sing": "as deep as the Marianas Trench",
		"name_pl": "%s times as deep as the Marianas Trench",
		"length": 10911
	},

	"geog01": {
		"name_sing": "from London to Paris",
		"name_pl": "",
		"length": 342000
	},

	"geog02": {
		"name_sing": "from Toronto to Montréal",
		"name_pl": "",
		"length": 505900
	},

	"geog03": {
		"name_sing": "from Vancouver to Calgary",
		"name_pl": "",
		"length": 676800
	},

	"geog04": {
		"name_sing": "from Anchorage to Whitehorse",
		"name_pl": "",
		"length": 770800
	},

	"highway401": {
		"name_sing": "the entire length of Highway 401",
		"name_pl": "",
		"length": 817900
	},

	"geog05": {
		"name_sing": "from Brasilia to Rio de Janeiro",
		"name_pl": "",
		"length": 931400
	},

	"geog04": {
		"name_sing": "from Beijing to Shanghai",
		"name_pl": "",
		"length": 1069000
	},

	"geog06": {
		"name_sing": "from Adelaide to Sydney",
		"name_pl": "",
		"length": 1165000
	},

	"geog07": {
		"name_sing": "from Bucharest to Berlin",
		"name_pl": "",
		"length": 1297000
	},

	"geog08": {
		"name_sing": "from Baghdad to Dubai",
		"name_pl": "",
		"length": 1383000
	},

	"yonge_street": {
		"name_sing": "the entire length of Yonge Street",
		"name_pl": "",
		"length": 1896000
	},

	"geog09": {
		"name_sing": "from Singapore to Hanoi",
		"name_pl": "",
		"length": 2172000
	},

	"geog10": {
		"name_sing": "from Helsinki to Reykjavik",
		"name_pl": "",
		"length": 2424000
	},

	"geog11": {
		"name_sing": "from Hong Kong to Tokyo",
		"name_pl": "",
		"length": 2892000
	},

	"geog12": {
		"name_sing": "from Cape Town to Antananarivo",
		"name_pl": "",
		"length": 3325000
	},

	"geog13": {
		"name_sing": "from Honolulu to San Francisco",
		"name_pl": "",
		"length": 3852000
	},

	"yellow_river": {
		"name_sing": "the entire length of the Yellow River",
		"name_pl": "",
		"length": 5464000
	},

	"mississippi_river": {
		"name_sing": "the entire length of the Mississippi river",
		"name_pl": "",
		"length": 6275000
	},

	"amazon_river": {
		"name_sing": "the entire length of the Amazon river",
		"name_pl": "",
		"length": 6400000
	},

	"nile_river": {
		"name_sing": "the entire length of the Nile river",
		"name_pl": "",
		"length": 6853000
	},

	"great_wall": {
		"name_sing": "the entire length of the Great Wall of China",
		"name_pl": "",
		"length": 8850000
	},

	"earth_diameter": {
		"name_sing": "from one end of the Earth through the core to another",
		"name_pl": "",
		"length": 12756000
	},

	"pacific_ocean": {
		"name_sing": "across the Pacific Ocean",
		"name_pl": "",
		"length": 19760000
	},

	"around_the_world": {
		"name_sing": "around the Earth",
		"name_pl": "around the Earth %s times",
		"length": 40000000
	},

	"moon2": {
		"name_sing": "to the Moon",
		"name_pl": "",
		"length": 400000000
	},

	"moon2": {
		"name_sing": "to the Moon and back",
		"name_pl": "to the Moon and back %s times",
		"length": 800000000
	},

	"sun": {
		"name_sing": "to the Sun",
		"name_pl": "",
		"length": 149960000000
	},

	"sun2": {
		"name_sing": "to the Sun and back",
		"name_pl": "to the Sun and back %s times",
		"length": 299820000000
	},

	"jupiter": {
		"name_sing": "from the Sun to Jupiter",
		"name_pl": "",
		"length": 773200000000
	},

	"jupiter2": {
		"name_sing": "from the Sun to Jupiter and back",
		"name_pl": "from the Sun to Jupiter and back %s times",
		"length": 1546400000000
	},

	"oort_cloud": {
		"name_sing": "past the edge of the Oort cloud",
		"name_pl": "",
		"length": 5678901234567890
	},

	"light_year": {
		"name_sing": "the distance light travels in a year",
		"name_pl": "the distance light travels in %d years",
		"length": 9461000000000000
	},

	"proxima_centauri": {
		"name_sing": "to Proxima Centauri, the nearest star",
		"name_pl": "",
		"length": 39905000000000000
	},

	"light_year2": {
		"name_sing": "the distance light travels in a decade",
		"name_pl": "the distance light travels in %d decades",
		"length": 94610000000000000
	},



	

};

function compare_length(m){
	if(m == 0) return "the width of a human hair";

	var largest_comparison = "";
	for(comp in length_comparisons){
		if(length_comparisons[comp].length <= m){
			largest_comparison = comp;
		}else break;
	}
	var comp_ratio = m / length_comparisons[largest_comparison].length;
	if(comp_ratio < 1.15 || length_comparisons[largest_comparison].name_pl == ""){
		return length_comparisons[largest_comparison].name_sing;
	}else if(length_comparisons[largest_comparison].name_pl.indexOf("%d") != -1){
		return sprintf(length_comparisons[largest_comparison].name_pl, Math.floor(comp_ratio));
	}else{
		return sprintf(length_comparisons[largest_comparison].name_pl, comp_ratio.toFixed(1));
	}
}




function show_info(){
	$("#info").show();
	$("#info").css("height", $("#centre").height() -24);
	$("#info").css("width", Math.min(900, $("#centre").width() - 44));
	$("#info").css("top", "0px");
	$("#info").css("left", $("#centre").width() / 2 - $("#info").width() / 2 - 22);
}

function hide_info(){
	$("#info").hide();
}
function show_updateinfo(){
	$("#updateinfo").show();
	$("#updateinfo").css("height", $("#centre").height() - 24);
	$("#updateinfo").css("width", Math.min(900, $("#centre").width() - 44));
	$("#updateinfo").css("top", "0px");
	$("#updateinfo").css("left", $("#centre").width() / 2 - $("#updateinfo").width() / 2 - 22);
}
function hide_updateinfo(){
	$("#updateinfo").hide();
}
(function(e){function r(e){return Object.prototype.toString.call(e).slice(8,-1).toLowerCase()}function i(e,t){for(var n=[];t>0;n[--t]=e);return n.join("")}var t=function(){return t.cache.hasOwnProperty(arguments[0])||(t.cache[arguments[0]]=t.parse(arguments[0])),t.format.call(null,t.cache[arguments[0]],arguments)};t.format=function(e,n){var s=1,o=e.length,u="",a,f=[],l,c,h,p,d,v;for(l=0;l<o;l++){u=r(e[l]);if(u==="string")f.push(e[l]);else if(u==="array"){h=e[l];if(h[2]){a=n[s];for(c=0;c<h[2].length;c++){if(!a.hasOwnProperty(h[2][c]))throw t('[sprintf] property "%s" does not exist',h[2][c]);a=a[h[2][c]]}}else h[1]?a=n[h[1]]:a=n[s++];if(/[^s]/.test(h[8])&&r(a)!="number")throw t("[sprintf] expecting number but found %s",r(a));switch(h[8]){case"b":a=a.toString(2);break;case"c":a=String.fromCharCode(a);break;case"d":a=parseInt(a,10);break;case"e":a=h[7]?a.toExponential(h[7]):a.toExponential();break;case"f":a=h[7]?parseFloat(a).toFixed(h[7]):parseFloat(a);break;case"o":a=a.toString(8);break;case"s":a=(a=String(a))&&h[7]?a.substring(0,h[7]):a;break;case"u":a>>>=0;break;case"x":a=a.toString(16);break;case"X":a=a.toString(16).toUpperCase()}a=/[def]/.test(h[8])&&h[3]&&a>=0?"+"+a:a,d=h[4]?h[4]=="0"?"0":h[4].charAt(1):" ",v=h[6]-String(a).length,p=h[6]?i(d,v):"",f.push(h[5]?a+p:p+a)}}return f.join("")},t.cache={},t.parse=function(e){var t=e,n=[],r=[],i=0;while(t){if((n=/^[^\x25]+/.exec(t))!==null)r.push(n[0]);else if((n=/^\x25{2}/.exec(t))!==null)r.push("%");else{if((n=/^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(t))===null)throw"[sprintf] huh?";if(n[2]){i|=1;var s=[],o=n[2],u=[];if((u=/^([a-z_][a-z_\d]*)/i.exec(o))===null)throw"[sprintf] huh?";s.push(u[1]);while((o=o.substring(u[0].length))!=="")if((u=/^\.([a-z_][a-z_\d]*)/i.exec(o))!==null)s.push(u[1]);else{if((u=/^\[(\d+)\]/.exec(o))===null)throw"[sprintf] huh?";s.push(u[1])}n[2]=s}else i|=2;if(i===3)throw"[sprintf] mixing positional and named placeholders is not (yet) supported";r.push(n)}t=t.substring(n[0].length)}return r};var n=function(e,n,r){return r=n.slice(0),r.splice(0,0,e),t.apply(null,r)};e.sprintf=t,e.vsprintf=n})(typeof exports!="undefined"?exports:window);