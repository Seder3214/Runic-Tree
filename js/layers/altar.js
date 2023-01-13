addLayer("al", {
    name: "altar", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Al", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		best: new Decimal(0),
    }},
    color: "#6495ed",
    requires() {return new Decimal(1e120)}, // Can be a function that takes requirement increases into account
    resource: "mana", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type() {return "normal"}, // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() {return new Decimal(0.01)},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (player.a.alEffect >= 1) mult = mult.times(player.a.alEffect)
			if (hasUpgrade("e", 51)) mult = mult.times(upgradeEffect("e", 51))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "r: Reset for runes", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
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
					["buyables", [1,2,3]],
					                ["blank", "15px"]
                ]
            },
			                    "Upgrades": {
                content: [
                    ["blank", "15px"],
					"upgrades"
                ]
            },
	},
	},
onPrestige() {
return	player.e.points = new Decimal(0)

},
    layerShown(){return true}
})