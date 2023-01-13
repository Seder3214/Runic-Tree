addLayer("a", {
    name: "artifacts", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		best: new Decimal(0),
		RarityText: new Decimal(0),
		artifactEffect: new Decimal(0),
    }},
    color: "#00CED1",
    requires() {return new Decimal(1e11)}, // Can be a function that takes requirement increases into account
    resource: "artifact slots", // Name of prestige currency
    baseResource: "runes", // Name of resource prestige is based on
    baseAmount() {return player.r.points}, // Get the current amount of baseResource
    type() {return "static"}, // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() {return new Decimal(5)}, 
	branches: ["e"],// Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "a: Reset for Artifacts", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
				        tabFormat: [
        "main-display",
        "prestige-button",
		 ["blank", "25px"],
        ["microtabs", "stuff"],
        ["blank", "25px"],
    ],
	microtabs: {
    stuff: {
		                    "Main": {
                content: [
                    ["blank", "15px"],
					["display-text", () => "You have " + format(player.a.RarityText) + " Smth"],
					"clickables",
					["infobox", "effects"]
                ]
            },
			                    "Mana Artifacts": {
                content: [
                    ["blank", "15px"],
					"upgrades"
                ]
            },
	},
	},
	clickables: {
    11: {
		title: "Create Artifact",
		canClick() { return true},
onClick() {
	let rarityRandom = Math.random() * (1 - 1) + (1);
			if (rarityRandom >= 1) rarityRandom = Math.random() * (2.2 - 1.8) + (1.8);
		if (rarityRandom >= 2) rarityRandom = Math.random() * (3.2 - 2.7) + (2.7);
		if (rarityRandom >= 3) rarityRandom = Math.random() * (4.2 - 3.6) + (3.6);
		if (rarityRandom >= 3.9) rarityRandom = Math.random() * (5.2 - 4.5) + (4.5);
		if (rarityRandom >= 4.9) rarityRandom = Math.random() * (6.2 - 5.4) + (5.4);
return player.a.RarityText = rarityRandom
},
	},
	},
	infoboxes: {
	effects: {
body(){if (player.a.RarityText >= 6) return "Artifact Information<br>" + `<img src="artifactsImages/arcana.png"><br>` +"<h3 style='color: #9370DB;'>Arcanic Boosting Artifact</h3>"
		if (player.a.RarityText >= 5) return "Artifact Information<br>"+ `<img src="artifactsImages/stellar.png"><br>` + "<h3 style='color: #87CEFA;'>Stellar Boosting Artifact</h3>"
		if (player.a.RarityText >= 4) return "Artifact Information<br>"+ `<img src="artifactsImages/omniscient.png"><br>` + "<h3 style='color: #8A2BE2;'>Omniscient Boosting Artifact</h3>"
		if (player.a.RarityText >=3) return "Artifact Information<br>"+ `<img src="artifactsImages/strong.png"><br>` + "<h3 style='color: 	#7FFF00;'>Strong Boosting Artifact</h3>"
		if (player.a.RarityText >=2) return "Artifact Information<br>"+ `<img src="artifactsImages/hardened.png"><br>` + "<h3 style='color: #1E90FF;'>Hardened Boosting Artifact</h3>"
		if (player.a.RarityText >=1) return "Artifact Information<br>"+ `<img src="artifactsImages/weak.png"><br>` + "<h3 style='color: #383838;'>Weak Boosting Artifact</h3>"		
else return "Artifact Information<br>You have not created any Artifact right now!"},
style: {
			'border-radius': '0%',
		},
	},
},
    layerShown(){return (player.r.points.gte(1e11) || player[this.layer].unlocked)}
})