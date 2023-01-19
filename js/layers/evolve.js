addLayer("v", {
    name: "Evolve", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "V", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		best: new Decimal(0),
    }},
    color() { return "#95500c"},
    requires() {return Decimal.pow(10, 8830)},
    resource: 'evolve challenges',
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 15, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 'side', // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "v", description: "v: Reset for evolve", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
				        tabFormat: [
        "main-display",
        "prestige-button",
		        ["blank", "25px"],
        ["microtabs", "stuff"],
        ["blank", "25px"],
    ],
    layerShown(){return true},
	microtabs: {
    stuff: {
		                    "Main": {
                content: [
                    ["blank", "15px"],
                    'challenges'
                ]
            },
	},
	},
    challenges: {
        11: {
            name: "EC1",
            challengeDescription: "You cant use artifacts, and essence gain is ^0.85",
            canComplete: function() {return player.points.gte(100)},
rewardDescription() {return "Everytime 1st artifact will be [Omniscient]"},
goalDescritpion() {return "1e2100 Points"},
style: {
    'height': '230px',
    'width': '230px',
    'border-radius': '20%',
},
        },
    },
})