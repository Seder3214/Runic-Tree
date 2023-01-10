addLayer("a", {
    name: "artifacts", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		best: new Decimal(0),
    }},
    color: "#00CED1",
    requires() {return new Decimal(1e13)}, // Can be a function that takes requirement increases into account
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
					["buyables", [1,2,3]]
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
	doReset() {
		layerDataReset("e")
	},
    layerShown(){return (player.r.points.gte(1e13) || player[this.layer].unlocked)}
})