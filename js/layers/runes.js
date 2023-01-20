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
    requires() {if (hasUpgrade("e", 25)) return new Decimal(1e50)
		else return new Decimal(2e12)}, 
		effectDescription() {return `<br>Runes will be <h3 style="color='red';">hardcapped</h3> at 1e1060`}, // Can be a function that takes requirement increases into account// Can be a function that takes requirement increases into account
    resource: "runes", // Name of prestige currency
    baseResource: "essence", // Name of resource prestige is based on
    baseAmount() {return player.e.points}, // Get the current amount of baseResource
    type() {if (hasUpgrade("e", 25)) return "normal"
		else return "static"}, // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() {if (hasUpgrade("e", 25)) return new Decimal(0.3)
		else return new Decimal(5)}, 
	branches: ["e"],// Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (player.r.points.gte(Decimal.pow(10, 1200))) mult = mult.min(0)
		if (hasUpgrade("al", 23)) mult = mult.times(upgradeEffect("al", 23))
		if (hasUpgrade("e", 25)) mult = mult.times(buyableEffect("r", 24)).times(upgradeEffect(this.layer, 13))
		if (player.r.buyables[24].gte(1)) mult = mult.div(buyableEffect("r", 24))
		if (hasUpgrade(this.layer, 13)) mult = mult.div(upgradeEffect(this.layer, 13))
		
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
	buyables: {
							      11: {
		title: "<alternate>Arzos</alternate>",
				purchaseLimit: 50,
        cost(x) {return new Decimal(180).times(x.times(2).max(1)).times(x.pow(0.65).max(1))},
		canAfford() {return (player.e.c.gte(this.cost()))},
        display() {return `<h5>Boost Common Shards Gain.<br>Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}/50<br>Cost: ${format(this.cost())} Common Shards<br>Effect: x${format(this.effect())}</h5>`},
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
				purchaseLimit: 100,
        cost(x) {return new Decimal(240).times(x.times(4).max(1)).times(x.pow(0.5).max(1))},
		canAfford() {return (player.e.uc.gte(this.cost()))},
        display() {return `<h5>Boost Unommon Shards Gain.<br>Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}/100<br>Cost: ${format(this.cost())} Unommon Shards<br>Effect: x${format(this.effect())}</h5>`},
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
		purchaseLimit: 3,
		canAfford() {return (player.r.points.gte(this.cost()))},
        display() {return `<h5>Boost Points Gain.<br>Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}/3<br>Cost: ${format(this.cost())} Runes<br>Effect: x${format(this.effect())}</h5>`},
        buy() {
          player.r.points = player.r.points.sub(this.cost())
			  setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x) {
			if (hasUpgrade("r", 15)) eff = x.pow(2.35).times(3).pow(upgradeEffect("r", 15)).max(1)
else eff = x.pow(2.35).times(3).max(1)
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
				purchaseLimit: 25,
		canAfford() {return (player.e.uc.gte(this.cost()))},
        display() {return `<h5>Generate Relic Shards<br>Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}/25<br>Cost: ${format(this.cost())} Uncommon Shards<br>Effect: +${format(this.effect())}/s</h5>`},
        buy() {
          player.e.uc = player.e.uc.sub(this.cost())
			  setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x) {
eff = x.times(0.35)
		return eff;
        },
        style: {
          width: "80px",
          height: "80px",
        },
      },
							      21: {
		title: "<alternate>Faaz</alternate>",
        cost(x) {return new Decimal(365000).times(x.add(1))},
				purchaseLimit: 7,
		canAfford() {return (player.e.c.gte(this.cost()))},
        display() {return `<h5>Boost Legendary Shards gain<br>Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}/7<br>Cost: ${format(this.cost())} Common Shards<br>Effect: x${format(this.effect())}</h5>`},
        buy() {
          player.e.c = player.e.c.sub(this.cost())
			  setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x) {
eff = x.times(2).pow(1.15).max(1)
		return eff;
        },
        style: {
          width: "80px",
          height: "80px",
        },
      },
							      22: {
		title: "<alternate>Grakk</alternate>",
				purchaseLimit: 7,
        cost(x) {return new Decimal(5).times(x.add(1))},
		canAfford() {return (player.e.r.gte(this.cost()))},
        display() {return `<h5>Boost Epic Shards gain<br>Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}/7<br>Cost: ${format(this.cost())} Rare Shards<br>Effect: x${format(this.effect())}</h5>`},
        buy() {
          player.e.r = player.e.r.sub(this.cost())
			  setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x) {
eff = x.times(1.45).pow(1.25).max(1)
		return eff;
        },
        style: {
          width: "80px",
          height: "80px",
        },
      },
							      23: {
		title: "<alternate>Staurz</alternate>",
        cost(x) {return new Decimal(1e23).pow(x.pow(0.25).max(1))},
				purchaseLimit: 7,
		canAfford() {return (player.e.points.gte(this.cost()))},
        display() {return `<h5>Boost essences gain<br>Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}/7<br>Cost: ${format(this.cost())} Essences<br>Effect: x${format(this.effect())}</h5>`},
        buy() {
          player.e.points = player.e.points.sub(this.cost())
			  setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x) {
eff = x.times(2.45).pow(1.75).max(1)
		return eff;
        },
        style: {
          width: "80px",
          height: "80px",
        },
      },
							      24: {
		title: "<alternate>Ehvaz</alternate>",
        cost(x) {return new Decimal(75).pow(x.pow(0.01).max(1))},
				purchaseLimit: 4,
		canAfford() {return (player.e.l.gte(this.cost()))},
        display() {return `<h5>Reduce runes cost<br>Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}/4<br>Cost: ${format(this.cost())} Legendary Shards<br>Effect: /${format(this.effect())}</h5>`},
        buy() {
          player.e.l = player.e.l.sub(this.cost())
			  setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x) {
eff = x.times(10.5).pow(20.75).pow(player.r.buyables[31].add(1)).max(1)
		return eff;
        },
        style: {
          width: "80px",
          height: "80px",
        },
      },
							      31: {
		title: "<alternate>Zolos</alternate>",
        cost(x) {return new Decimal(3).add(x)},
				purchaseLimit: 2,
		canAfford() {return (player.r.points.gte(this.cost()) && player.r.buyables[24].gte(4))},
        display() {return `Req: All maxed Runes <br> Lose all runes and buff Ehvaz. Unlock one row of upgrades<br>Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}/2<br>Cost: ${format(this.cost())} Runes`},
        buy() {
          player.r.points = player.r.points.sub(this.cost())
			  setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			  player.r.buyables[11] = new Decimal(0)
			   player.r.buyables[12] = new Decimal(0)
			   player.r.buyables[13] = new Decimal(0)
			   player.r.buyables[14] = new Decimal(0)
			   player.r.buyables[15] = new Decimal(0)
			   player.r.buyables[21] = new Decimal(0)
			   player.r.buyables[22] = new Decimal(0)
			   player.r.buyables[23] = new Decimal(0)
			   player.r.buyables[24] = new Decimal(0)
			   layerDataReset("e")
        },
        style: {
          width: "130px",
          height: "130px",
        },
      },
},
upgrades: {
	11: {
		title: "Runes I",
		description: "Zolos boosts Points and Common/Uncommon Shards gain",
		cost: new Decimal(1),
				unlocked() {return player.r.buyables[21].gte(1)},
		effect() {return new Decimal(5).pow(player.r.buyables[31].times(1.75))},
		effectDisplay() {return format(upgradeEffect("r", 11)) + "x"},
	},
	12: {
		title: "Runes II",
		unlocked() {return hasUpgrade("r", 11)},
		description: "Keep [Essence Purifier] on Runes reset",
		cost: new Decimal(3),
	},
	13: {
		title: "Runes III",
		description: "Runes cheapens themselves<br>Req: 2 Zolos",
		unlocked() {return hasUpgrade("r", 12)},
		cost: new Decimal(4),
		canAfford() {return (player.r.buyables[31].gt(1) && player.r.points.gte(4))},
		effect() {return new Decimal(1e15).pow(player.r.points.pow(1.925)).min(1e308)},
		effectDisplay() {return "/" + format(upgradeEffect("r", 13))},
	},
	14: {
		title: "Runes IV",
		unlocked() {return hasUpgrade("r", 13)},
		description: "Unlock new content, and keep Essence upgrades on reset",
		cost: new Decimal(5),
	},
	15: {
		title: "Runes V",
		unlocked() {return hasUpgrade("r", 14)},
		description: "Essence X levels boosts Cerzas effect",
		effect() {return player.e.buyables[21].pow(0.55)},
		effectDisplay() {return "^" + format(upgradeEffect("r",15))},
		cost: new Decimal(15),
	},
	21: {
		title: "Runes VI",
		unlocked() {return hasUpgrade("r", 15)},
		description: "Unspent Runes boosts essence gain",
		effect() {return player.r.points.pow(0.85).max(1)},
		effectDisplay() {return "x" + format(upgradeEffect("r",21))},
		cost: new Decimal(169),
	},
	22: {
		title: "Runes VII",
		unlocked() {return hasUpgrade("r", 21)},
		description: "Buyed upgrades boosts essence gain",
		
		effect() {
			if (hasUpgrade("r", 23)) eff = Decimal.pow(2, player.r.upgrades.length).times(upgradeEffect("r", 23)).times(Decimal.pow(2, upgradeEffect("e", 41).add(1)))
			else eff = Decimal.pow(2, player.r.upgrades.length)
		return eff;},
		effectDisplay() {return "x" + format(upgradeEffect("r",22))},
		cost: new Decimal(2150),
	},
		23: {
		title: "Runes VIII",
		unlocked() {return hasUpgrade("r", 22)},
		description: "Unlock more essence upgrades and double prev. upgrade effect",
		effect() {return new Decimal(2)},
		effectDisplay() {return "x" + format(upgradeEffect("r",23))},
		cost: new Decimal(16725),
	},
},
update(diff) {
	if (player.r.points.gte(Decimal.pow(10, 1200)) && (!hasUpgrade("e", 73))) player.r.points = player.r.points.div(2).min(Decimal.pow(10, 1060))
	if (player.r.points.gte(Decimal.pow(10, 1930)) && (hasUpgrade("e", 73))) player.r.points = player.r.points.div(2).min(Decimal.pow(10, 1930))
},
    layerShown(){return true}
})