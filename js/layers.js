addLayer("e", {
    name: "essence", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		best: new Decimal(0),
		d: new Decimal(0),
		c: new Decimal(0),
		uc: new Decimal(0),
		r: new Decimal(0),
		e: new Decimal(0),
		l: new Decimal(0),
		na: new Decimal(25),
		sa: new Decimal(15),
		ga: new Decimal(5),
    }},
    color: "#452d35",
    requires: new Decimal(8250), // Can be a function that takes requirement increases into account
    resource: "essence", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (hasUpgrade(this.layer, 13)) mult = mult.times(upgradeEffect(this.layer, 13))
		if (hasUpgrade(this.layer, 21)) mult = mult.times(upgradeEffect(this.layer, 21))
			if (player.e.uc.gte(1)) mult = mult.times(player.e.uc.times(1.05).max(1))
			if (player.e.e.gte(1)) mult = mult.times(player.e.e.times(1.75).max(1))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "e", description: "e: Reset for essences", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
				        tabFormat: [
        "main-display",
        "prestige-button",
        ["microtabs", "stuff"],
        ["blank", "25px"],
    ],
	microtabs: {
    stuff: {
		                    "Main": {
                content: [
                    ["blank", "15px"],
					["buyables", [1]]
                ]
            },
			                    "Upgrades": {
                content: [
                    ["blank", "15px"],
					"upgrades"
                ]
            },
			                    "Lootboxes": {
				unlocked() {return (hasUpgrade("e", 22))},
                content: [
                ["blank", "15px"],
					["display-text", () => "You have " + formatWhole(player.e.c) + " Common Essence Shards ("+ format(player.e.c.add(1).pow(0.65)) + "x to points) <br>" + formatWhole(player.e.uc) + " Uncommon Essence Shards ("+ format(player.e.uc.times(1.05).max(1)) + "x to essences)<br>" + formatWhole(player.e.r) + " Rare Essence Shards ("+ format(player.e.r.times(1.25).max(1)) + "x to Essence II)<br>" + formatWhole(player.e.e) + " Epic Essence Shards (" + format(player.e.e.times(1.75).max(1)) + "x to Common Essence Shards and essences Gain)<br>" + formatWhole(player.e.l) + " Legendary Essence Shards (" + format(player.e.l.times(2.35).max(1)) + "x to Uncommon Essence Shards and Points gain) <br>",],
				"clickables"
                ]
            },
	},
	},
	buyables: {
							      11: {
		title: "Essence Purifier",
		purchaseLimit: 75,
        cost(x) {return new Decimal(0.42).times(new Decimal(2).times(x.pow(1.45)).max(1)).pow(x.div(30).max(1))},
		canAfford() {return (player.points.gte(this.cost()))},
        display() {if (buyableEffect("e", 11).gte(new Decimal(200).times(upgradeEffect("e",12)))) return `Boost Point Gain. (boosted by essences amount)<br>Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}/75<br>Cost: ${format(this.cost())} points<br>Effect: x${format(this.effect())} (softcapped)`
			else return `Boost Point Gain. (boosted by essences amount)<br>Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}/75<br>Cost: ${format(this.cost())} points<br>Effect: x${format(this.effect())}`},
        buy() {
          player.points = player.points.sub(this.cost())
			  setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x) {
eff = new Decimal(1.65).pow(x).times(upgradeEffect("e",11)).times(player.e.points.add(1).pow(1.35)).times(upgradeEffect("e",14))
	 eff = softcap(eff, new Decimal(250).times(upgradeEffect("e",12)), new Decimal(0.15))
		return eff;
        },
        style: {
          width: "120px",
          height: "150px",
        },
      },
},
upgrades: {
	11: {
		title: "Essence I",
		description: "Points boosts [Essence purifier] effect",
		cost: new Decimal(10),
		unlocked() {return player.e.buyables[11].gte(5)},
		effect() {if (hasUpgrade(this.layer, 11)) return player.points.pow(0.1).max(1)
			else return 1},
		effectDisplay() {return format(upgradeEffect("e", 11)) + "x"},
            currencyDisplayName: "points",
            currencyInternalName: "points",
            currencyLayer: "",
	},
	12: {
		title: "Essence II",
		description: "Levels of [Essence purifier] scales its softcap",
		cost: new Decimal(220),
		unlocked() {return player.e.buyables[11].gte(25)},
		effect() {if (hasUpgrade(this.layer, 12)) return player.e.buyables[11].pow(0.3).times(upgradeEffect(this.layer, 15)).times(player.e.r.times(3.25).max(1))
			else return 1},
		effectDisplay() {return format(upgradeEffect("e", 12)) + "x later"},
            currencyDisplayName: "points",
            currencyInternalName: "points",
            currencyLayer: "",
	},
	13: {
		title: "Essence III",
		description: "Points boosts essence gain",
		cost: new Decimal(2),
		unlocked() {return player.e.points.gte(1)},
		effect() {if (hasUpgrade(this.layer, 13)) return player.points.pow(0.05)
			else return 1},
		effectDisplay() {return format(upgradeEffect("e", 13)) + "x"},
	},
	14: {
		title: "Essence IV",
		description: "Buyed upgrades boosts [Essence purifier] effect",
		cost: new Decimal(5),
		unlocked() {return (hasUpgrade(this.layer, 13))},
		effect() {if (hasUpgrade(this.layer, 14)) ret = Decimal.pow(1.85, player.e.upgrades.length)
			else ret = 1
		return ret;
		},
		effectDisplay() {return format(upgradeEffect("e", 14)) + "x"},
	},
	15: {
		title: "Essence V",
		description: "Best essences boosts [Essence II] effect",
		cost: new Decimal(10),
		unlocked() {return (hasUpgrade(this.layer, 14))},
		effect() {if (hasUpgrade(this.layer, 15)) return player.e.best.pow(0.55).max(1)
			else return 1
		},
		effectDisplay() {return format(upgradeEffect("e", 15)) + "x"},
	},
	21: {
		title: "Essence VI",
		description: "Reduce essence cost by levels of [Essence purifier]",
		cost: new Decimal(20),
		unlocked() {return player.e.buyables[11].gte(50)},
		effect() {if (hasUpgrade(this.layer, 21)) return player.e.buyables[11]
			else return 1
		},
		effectDisplay() {return "/" + format(upgradeEffect("e", 21))},
	},
	22: {
		title: "Essence VII",
		description: "Unlock Lootboxes",
		cost: new Decimal(120000),
		unlocked() {return player.e.buyables[11].gte(75)},
},
	23: {
		title: "Essence VII",
		description: "Generate 1 Common Essence Shard per/s",
		cost: new Decimal(1e10),
		unlocked() {return (hasUpgrade(this.layer, 22))},
},
	24: {
		title: "Essence VII",
		description: "Generate 1 Uncommon Essence Shard per/s. <br> Double passive Common Essence Shards Gain",
		cost: new Decimal(2e10),
		unlocked() {return (hasUpgrade(this.layer, 23))},
},
},
clickables: {
    11: {
		title: "Novice Lootbox",
        display() { return "Contains Common and Uncommon Essence Shards.<br> Cost: 100000 Essences<br> Avaiable: " + formatWhole(player.e.na)},
		canClick() { return (player.e.points.gte(100000) && player.e.na.gt(0)) },
onClick() {
roll = Math.random() * (2.9 - 1) + (1); 
player.e.points = player.e.points.sub(100000) // replacing min and max with their proper variable locations
player.e.d = Math.floor(roll)
player.e.na = player.e.na.sub(1)
if (player.e.d == 1) player.e.c = player.e.c.add(new Decimal(1).times(buyableEffect("r", 11)))
if (player.e.d == 2) player.e.uc = player.e.uc.add(new Decimal(1).times(buyableEffect("r", 12)))
},
},
    12: {
		title: "Silver Lootbox",
        display() { return "Contains Common, Uncommon and Rare Essence Shards.<br> Cost: 38000000 Essences<br>Avaiable: " + formatWhole(player.e.sa)},
		canClick() { return (player.e.points.gte(38000000)&& player.e.sa.gt(0)) },
onClick() {
roll = Math.random() * (3.9 - 1) + (1); 
player.e.points = player.e.points.sub(38000000) // replacing min and max with their proper variable locations
player.e.d = Math.floor(roll)
if (player.e.d == 1) player.e.c = player.e.c.add(1)
if (player.e.d == 2) player.e.uc = player.e.uc.add(1)
if (player.e.d == 3) player.e.r = player.e.r.add(1)
player.e.sa = player.e.sa.sub(1)
},
},
    13: {
		title: "Golden Lootbox",
        display() { return "Contains Epic and Legendary Essence Shards.<br> Cost: 1e9 Essences<br>Avaiable: " + formatWhole(player.e.ga)},
		canClick() { return (player.e.points.gte(1e9)&& player.e.ga.gt(0)) },
onClick() {
roll = Math.random() * (2.9 - 1) + (1); 
player.e.points = player.e.points.sub(1e9) // replacing min and max with their proper variable locations
player.e.d = Math.floor(roll)
if (player.e.d == 1) player.e.e = player.e.e.add(1)
if (player.e.d == 2) player.e.l = player.e.l.add(1)
player.e.ga = player.e.ga.sub(1)
},
},
},
update(diff) {
		if (hasUpgrade(this.layer, 23)) {
			player.e.uc = player.e.uc.add(player.e.l.times(2.35).times(buyableEffect("r", 12)).times(diff)).add(diff)
			player.e.c = player.e.c.add(diff)
			}
	if (hasUpgrade(this.layer, 23)) return player.e.c = player.e.c.add(player.e.e.times(1.75).times(buyableEffect("r", 11)).times(diff)).add(diff)
},
    layerShown(){return true}
})
addLayer("r", {
    name: "runes", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		best: new Decimal(0),
    }},
    color: "#C0C0C0",
    requires: new Decimal(2e12), // Can be a function that takes requirement increases into account
    resource: "runes", // Name of prestige currency
    baseResource: "essence", // Name of resource prestige is based on
    baseAmount() {return player.e.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, 
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
        {key: "r", description: "r: Reset for runes", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
				        tabFormat: [
        "main-display",
        "prestige-button",
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
			                    "Upgrades": {
                content: [
                    ["blank", "15px"],
					"upgrades"
                ]
            },
	},
	},
	buyables: {
							      11: {
		title: "<alternate>Arzos</alternate>",
        cost(x) {return new Decimal(180).times(x.times(2).max(1)).times(x.pow(0.65).max(1))},
		canAfford() {return (player.e.c.gte(this.cost()))},
        display() {return `<h5>Boost Common Shards Gain.<br>Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}<br>Cost: ${format(this.cost())} Common Shards<br>Effect: x${format(this.effect())}</h5>`},
        buy() {
          player.e.c = player.e.c.sub(this.cost())
			  setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x) {
eff = x.pow(1.5).times(1.5).max(1)
		return eff;
        },
        style: {
          width: "80px",
          height: "80px",
        },
      },
							      12: {
		title: "<alternate>Berhuvz</alternate>",
        cost(x) {return new Decimal(240).times(x.times(4).max(1)).times(x.pow(0.5).max(1))},
		canAfford() {return (player.e.uc.gte(this.cost()))},
        display() {return `<h5>Boost Unommon Shards Gain.<br>Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}<br>Cost: ${format(this.cost())} Unommon Shards<br>Effect: x${format(this.effect())}</h5>`},
        buy() {
          player.e.uc = player.e.uc.sub(this.cost())
			  setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x) {
eff = x.pow(1.75).times(3).max(1)
		return eff;
        },
        style: {
          width: "80px",
          height: "80px",
        },
      },
							      13: {
		title: "<alternate>Cerzas</alternate>",
        cost(x) {return new Decimal(1).times(x.add(1))},
		canAfford() {return (player.r.points.gte(this.cost()))},
        display() {return `<h5>Boost Points Gain.<br>Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}<br>Cost: ${format(this.cost())} Runes<br>Effect: x${format(this.effect())}</h5>`},
        buy() {
          player.r.points = player.r.points.sub(this.cost())
			  setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x) {
eff = x.pow(2.35).times(3).max(1)
		return eff;
        },
        style: {
          width: "80px",
          height: "80px",
        },
      },
							      14: {
		title: "<alternate>Dolus</alternate>",
        cost(x) {return new Decimal(1000000).times(x.add(1))},
		canAfford() {return (player.e.c.gte(this.cost()))},
        display() {return `<h5>Gain 0.17 Relict Shards/s<br>Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}<br>Cost: ${format(this.cost())} Common Shards<br>Effect: +${format(this.effect())}s</h5>`},
        buy() {
          player.e.c = player.e.c.sub(this.cost())
			  setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x) {
eff = x.times(0.17).max(0.01)
		return eff;
        },
        style: {
          width: "80px",
          height: "80px",
        },
      },
							      15: {
		title: "<alternate>Enjans</alternate>",
        cost(x) {return new Decimal(10).times(x.add(1))},
		canAfford() {return (player.e.l.gte(this.cost()))},
        display() {return `<h5>Unlock Enchance<br>Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}<br>Cost: ${format(this.cost())} Legendary Shards<br></h5>`},
        buy() {
          player.e.l = player.re.l.sub(this.cost())
			  setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        style: {
          width: "80px",
          height: "80px",
        },
      },
},
    layerShown(){return true}
})