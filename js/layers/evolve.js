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
    exponent: 10.5, // Prestige currency exponent
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
            name: "Evolve Challenge 1",
            challengeDescription: "You cant use artifacts, and essence gain is ^0.35<br>(All challenges Resets A and E)",
            goalDescription: "1e2792 Points",
            unlocked() {return player.v.points.gte(1)},
            onEnter() {
layerDataReset("e")
layerDataReset("a")
            },
            canComplete: function() {return player.points.gte(Decimal.pow(10, 2792))},
            rewardDescription() {return "Everytime on equipping 1st artifact it will be [Omniscient]"},
style() {
    if (hasChallenge("v", 11) || (player.points.gte(Decimal.pow(10, 2792)))) return {
    "height": "230px",
    "width": '230px',
    'border-radius': '20%',
    'border': '2px solid',
    "background-color": 'black',
 "border-color": '#95500c',
 'color': 'white',
}
else return {
    "height": "230px",
    "width": '230px',
    'border-radius': '20%',
    "background-color": 'gray',  
}
        },
    },
    12: {
        name: "Evolve Challenge 2",
        challengeDescription: "Mana hardcap decreases to 1e30, and you are unable to buy [Essence XXI-XXIII] upgrades",
        goalDescription: "1e3882 Points",
        unlocked() {return player.v.points.gte(2)},
        onEnter() {
layerDataReset("e")
layerDataReset("a")
        },
        canComplete: function() {return player.points.gte(Decimal.pow(10, 3882))},
        rewardDescription() {return "Everytime on equipping 2nd artifact it will be [Omniscient]"},
style() {
if (hasChallenge("v", 12) || (player.points.gte(Decimal.pow(10, 3722)))) return {
"height": "230px",
"width": '230px',
'border-radius': '20%',
'margin-left': '5px',
'border': '2px solid',
"background-color": 'black',
"border-color": '#95500c',
'color': 'white',
}
else return {
"height": "230px",
"width": '230px',
'margin-left': '5px',
'border-radius': '20%',
"background-color": 'gray',  
}
    },
},
13: {
    name: "Evolve Challenge 3",
    challengeDescription: "You cannot equip 3rd and 4th artifacts, essence gain in ^0.2, Mana hardcap => 1e9",
    goalDescription: "1e475 Points",
    unlocked() {return player.v.points.gte(3)},
    onEnter() {
layerDataReset("e")
layerDataReset("a")
    },
    canComplete: function() {return player.points.gte(Decimal.pow(10, 475))},
    rewardDescription() {return "Get an ability to get [Omn-t] while creating artifact. Lose ability to get [Hardened]"},
style() {
if (hasChallenge("v", 13) || (player.points.gte(Decimal.pow(10, 480)))) return {
"height": "230px",
"width": '230px',
'border-radius': '20%',
'margin-left': '5px',
'border': '2px solid',
"background-color": 'black',
"border-color": '#95500c',
'color': 'white',
}
else return {
"height": "230px",
"width": '230px',
'margin-left': '5px',
'border-radius': '20%',
"background-color": 'gray',  
}
},
},
21: {
    name: "Evolve Challenge 4",
    challengeDescription: "Essence base reduced to 10",
    goalDescription: "1e568 Points",
    unlocked() {return player.v.points.gte(4)},
    onEnter() {
layerDataReset("e")
layerDataReset("a")
    },
    canComplete: function() {return player.points.gte(Decimal.pow(10, 568))},
    rewardDescription() {return "Everytime 1st artifact will be [Stellar]"},
style() {
if (hasChallenge("v", 13) || (player.points.gte(Decimal.pow(10, 480)))) return {
"height": "230px",
"width": '230px',
'border-radius': '20%',
'margin-left': '5px',
'border': '2px solid',
"background-color": 'black',
"border-color": '#95500c',
'color': 'white',
}
else return {
"height": "230px",
"width": '230px',
'margin-left': '5px',
'border-radius': '20%',
"background-color": 'gray',  
}
},
},
    },
})