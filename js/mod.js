let modInfo = {
	name: "Runic Tree",
	id: "runic",
	author: "Seder3214",
	pointsName: "points",
	modFiles: ["layers/essence.js", "layers/runes.js", "layers/artifacts.js", "tree.js", "layers/altar.js", "layers/evolve.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.6.4",
	name: "Literally nothing",
}

let changelog = `<h1>Changelog:</h1><br>
<br><h3 style='color: #95500c;'>v0.6.3 - Evolve</h3><br>
<span style='color: #808080'> - New layer!<br>
- Reworked artifact system</span>
<br><h3 style='color: #6495ed;'>v0.5 - Mana</h3><br>
<span style='color: #808080'> - More mana content<br>
- Changed some descritions of upgrades/clickables</span>
	<br><h3 style='color: #00CED1;'>v0.4.2.2 - Artifacts</h3><br>
			<span style='color: #808080'> - Increased Weak Artifact mana gain<br>
			- Changed some descritions of upgrades/clickables</span>
	<br><h3 style='color: #00CED1;'>v0.4.1</h3><br>
			<span style='color: #808080'>- Added artifacts system<br>
			- More essences upgrades</span>
	<br><h3 style='color: #456738;'>v0.3.8 - CSS</h3><br>
			<span style='color: #808080'>- Added more CSS styling</span>
	<br><h3 style='color: #00CED1;'>v0.3.7 - Artifacts</h3><br>
			<span style='color: #808080'>- Fixed 0 essences on reset bug
			- Added some CSS thingys</span>
	<br><h3 style='color: #00CED1;'>v0.3.6.1</h3><br>
			<span style='color: #808080'>- Just added a preview of some mechanic (not a content update)<br>
			- Added <i>Current endgame</i> text</span>
	<br><h3 style='color: #00CED1;'>v0.3.5.1</h3><br>
			<span style='color: #808080'>- Decrease costs of some essence upgrades and Artifacts cost</span>
	<br><h3 style='color: #00CED1;'>v0.3.4</h3><br>
			<span style='color: #808080'>- Added new layer<br>
			- All layers now put on different files<br>
			- Fixed early unlocking of rune upgrades</span>
	<br><h3 style='color: #00CED1;'>v0.3.3</h3><br>
			<span style='color: #808080'>- Fixed inflate runes bug</span>
	<br><h3 style='color: #00CED1;'>v0.3.2</h3><br>
			<span style='color: #808080'>- Added new layer<br>
			- All layers now put on different files</span>
	<br><h3 style='color: #C0C0C0;'>v0.3 - Runes</h3><br>
			<span style='color: #808080'>- Finished a layer (Current Endgame: 1e13 Runes)</span>
	<br><h3 style='color: #C0C0C0;'>v0.2.1</h3><br>
			<span style='color: #808080'>- Added 4 more runes<br>
			- Added upgrades<br></span>
	<h3 style='color: #C0C0C0;'>v0.1.3</h3><br>
			<span style='color: #808080'>- Added new layer.<br>
			- Added 5 runes (2 of them cannot be buyed :P)<br>
			- Changed font of the game<br></span>
	<h3 style='color: #452d35;'>v0.1 - Essences</h3><br>
		<span style='color: #808080'>- Added new layer.<br>
		- Added full content.</span>`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(0.05)
	if (player.a.points.gte(1)) gain = gain.times(20)
		if (player.e.buyables[12].gte(1)) gain = gain.times(buyableEffect("e", 12))
	if (player.e.buyables[11].gte(1)) gain = gain.times(buyableEffect("e", 11))
	if (player.e.c.gte(1)) gain = gain.times(player.e.c.add(1).pow(0.65))
	if (player.e.l.gte(1)) gain = gain.times(player.e.l.add(1).times(2.35))
	if (player.r.buyables[13].gte(1)) gain = gain.times(buyableEffect("r", 13))
		if (hasUpgrade("r", 11)) gain = gain.times(upgradeEffect("r", 11))
		if (hasUpgrade("e", 32)) gain = gain.times(upgradeEffect("e", 32))
		if (player.a.frthAPEE > 1) gain = gain.pow(player.a.frthAPEE)
		if (player.a.frthAPE > 1) gain = gain.times(player.a.frthAPE)
		if (player.a.thrdAPEE > 1) gain = gain.pow(player.a.thrdAPEE)
		if (player.a.thrdAPE > 1) gain = gain.times(player.a.thrdAPE)
					if (player.a.scndAPEE > 1) gain = gain.pow(player.a.scndAPEE)
					if (player.a.scndAPE > 1) gain = gain.times(player.a.scndAPE)
						if (player.a.firstAPEE > 1) gain = gain.pow(player.a.firstAPEE)
							if (player.a.firstAPE > 1) gain = gain.times(player.a.firstAPE)
								if (tmp.a.effect.gte(1)) gain = gain.times(tmp.a.effect)
								if (tmp.a.effect.gte(2)) gain = gain.times(tmp.a.effect2)
								if (hasUpgrade("al", 33)) gain = gain.pow(upgradeEffect("al", 33))
		
	return gain
}
// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
function(){return "Current endgame: 1e6100 Essences"},
]


// Determines when the game "ends"
function isEndgame() {
	return player.e.points.gte(Decimal.pow(10, 6100))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}