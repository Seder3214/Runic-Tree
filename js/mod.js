let modInfo = {
	name: "Runic Tree",
	id: "runic",
	author: "Seder3214",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1.3",
	name: "Literally nothing",
}

let changelog = `<h1>Changelog:</h1><br>
	<br><h3 style='color: #C0C0C0;'>v0.1.3 - Runes</h3><br>
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
	if (player.e.buyables[11].gte(1)) gain = gain.times(buyableEffect("e", 11))
	if (player.e.c.gte(1)) gain = gain.times(player.e.c.add(1).pow(0.65))
	if (player.e.l.gte(1)) gain = gain.times(player.e.l.add(1).times(2.35))
	if (player.r.buyables[13].gte(1)) gain = gain.times(buyableEffect("r", 13))
	return gain
}
// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
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