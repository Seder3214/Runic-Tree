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
		rc: new Decimal(0),
		na: new Decimal(25),
		sa: new Decimal(15),
		ga: new Decimal(5),
		ra: new Decimal(1),
		r2a: new Decimal(1),
    }},
    color() {if (player.e.buyables[11].gte(75)) return "#456738"
		if (player.e.buyables[11].gte(55)) return "#454e38"
		if (player.e.buyables[11].gte(40)) return "#454638"
		if (player.e.buyables[11].gte(25)) return "#453f38"
		if (player.e.buyables[11].gte(10)) return "#452d4e"
		else return "#452d35"},
    requires: new Decimal(8250), // Can be a function that takes requirement increases into account
    resource: "essence", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
				if (hasUpgrade(this.layer, 53)) mult = mult.times(upgradeEffect(this.layer, 53))
		if (hasUpgrade(this.layer, 52)) mult = mult.times(upgradeEffect(this.layer, 52))
				if (hasUpgrade("e", 31)) mult = mult.times(upgradeEffect("e", 31))
		if (hasUpgrade("r", 22)) mult = mult.times(upgradeEffect("r", 22))
				if (hasUpgrade("r", 21)) mult = mult.times(upgradeEffect("r", 21))
		if (hasUpgrade(this.layer, 13)) mult = mult.times(upgradeEffect(this.layer, 13))
		if (hasUpgrade(this.layer, 21)) mult = mult.times(upgradeEffect(this.layer, 21))
			if (player.e.uc.gte(1)) mult = mult.times(player.e.uc.times(1.05).max(1))
			if (player.e.e.gte(1)) mult = mult.times(player.e.e.times(1.75).max(1))
				if (player.r.buyables[23].gte(1)) mult = mult.times(buyableEffect("r", 23))
								if (player.a.firstAEE > 1) mult = mult.times(player.a.firstAEE).times(tmp.a.effect)
					if (player.a.firstAEEE > 1) mult = mult.pow(player.a.firstAEEE).times(tmp.a.effect)
												if (player.a.scndAEE > 1) mult = mult.times(player.a.scndAEE).times(tmp.a.effect)
					if (player.a.scndAEEE > 1) mult = mult.pow(player.a.scndAEEE).times(tmp.a.effect)
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
		        ["blank", "25px"],
        ["microtabs", "stuff"],
        ["blank", "25px"],
    ],
	microtabs: {
    stuff: {
		                    "Main": {
                content: [
                    ["blank", "15px"],
					["buyables", [1]],
					                ["blank", "15px"]
                ]
            },
			                    "Upgrades": {
                content: [
                    ["blank", "15px"],
					 ["upgrades", [1,2]], 
					 ["row", [["buyables", [2]], ["upgrades", [3]]]],
					 ["upgrades", [4,5]], 
					                 ["blank", "15px"],
                ]
            },
			                    "Lootboxes": {
				unlocked() {return (hasUpgrade("e", 22))},
                content: [
                ["blank", "15px"],
					["display-text", () => "You have " + formatWhole(player.e.c) + " Common Essence Shards ("+ format(player.e.c.add(1).pow(0.65)) + "x to points) <br>" + formatWhole(player.e.uc) + " Uncommon Essence Shards ("+ format(player.e.uc.times(1.05).max(1)) + "x to essences)<br>" + formatWhole(player.e.r) + " Rare Essence Shards ("+ format(player.e.r.times(1.25).max(1)) + "x to Essence II)<br>" + formatWhole(player.e.e) + " Epic Essence Shards (" + format(player.e.e.times(1.75).max(1)) + "x to Common Essence Shards and essences Gain)<br>" + formatWhole(player.e.l) + " Legendary Essence Shards (" + format(player.e.l.times(2.35).max(1)) + "x to Uncommon Essence Shards and Points gain) <br>" + format(player.e.rc) + " Relic Essence Shards (+" + format(player.e.rc.pow(0.05)) + " Rare Essence Shards/s and +" + format(player.e.rc.pow(0.01).div(2)) + " Legendary and Epic Essence Shards/s)",],
		                ["blank", "15px"],
		"clickables"
                ]
            },
	},
	},
	buyables: {
							      11: {
		title: "Essence Purifier",
		purchaseLimit() {if (hasUpgrade("e", 42)) return new Decimal(75).add(upgradeEffect("e", 42))
			else return new Decimal(75)},
        cost(x) {return new Decimal(0.42).times(new Decimal(2).times(x.pow(1.45)).max(1)).pow(x.div(30).max(1))},
		canAfford() {return (player.points.gte(this.cost()))},
        display() {if (hasUpgrade("e", 42)) return `Boost Point Gain. (boosted by essences amount)<br>Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}/150<br>Cost: ${format(this.cost())} points<br>Effect: x${format(this.effect())} (softcapped)`
			if (buyableEffect("e", 11).gte(new Decimal(200).times(upgradeEffect("e",12)))) return `Boost Point Gain. (boosted by essences amount)<br>Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}/75<br>Cost: ${format(this.cost())} points<br>Effect: x${format(this.effect())} (softcapped)`
			else return `Boost Point Gain. (boosted by essences amount)<br>Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}/75<br>Cost: ${format(this.cost())} points<br>Effect: x${format(this.effect())}`},
        buy() {
          player.points = player.points.sub(this.cost())
			  setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x) {
eff = new Decimal(1.65).pow(x).times(upgradeEffect("e",11)).times(player.e.points.add(1).pow(1.35)).times(upgradeEffect("e",14))
	 eff = softcap(eff, new Decimal(250).times(upgradeEffect("e",12)).pow(buyableEffect("e",21)), new Decimal(0.15))
		return eff;
        },
        style: {
          width: "160px",
		  'border-radius': '5%',
          height: "100px",
        },
      },
							      12: {
		title: "Essence Extractor",
		unlocked() {return hasUpgrade("r", 14)},
		purchaseLimit() {if (hasUpgrade("e", 43)) return new Decimal(50).add(upgradeEffect("e", 43))
			else return new Decimal(50)},
        cost(x) {return new Decimal(1e55).times(new Decimal(450).times(x.pow(4.25)).max(1))},
		canAfford() {return (player.points.gte(this.cost()))},
        display() {if (hasUpgrade("e", 42)) return `Boost Point Gain.<br>Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}/75<br>Cost: ${format(this.cost())} points<br>Effect: x${format(this.effect())}`
			else return `Boost Point Gain.<br>Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}/50<br>Cost: ${format(this.cost())} points<br>Effect: x${format(this.effect())}`},
        buy() {
          player.points = player.points.sub(this.cost())
			  setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x) {
eff = new Decimal(120).times(x.add(1).pow(2.35))
		return eff;
        },
        style: {
          width: "160px",
		  'border-radius': '5%',
          height: "100px",
        },
      },
	  	21: {
		title: "Essence X",
		 cost(x) {return new Decimal(1e38).times(new Decimal(45000).times(x.times(x).pow(5.25).max(0.5)).pow(x.sub(7.7).max(1)))},
        display() { return `Increase [Essence Purifier] softcap.<br>Cost: ${format(this.cost())} essences<br>Currently: ^${format(this.effect())}`},
		effect(x) {eff = new Decimal(1.05).pow(x)
	 eff = softcap(eff, new Decimal(1.1), new Decimal(0.1))
	 return eff;},
				canAfford() {return (player.e.points.gte(this.cost()))},
		        buy() {
          player.e.points = player.e.points.sub(this.cost())
			  setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		style() {
					if (player.e.points.gte(this.cost()) || player.e.buyables[this.id].gte(1)) return {
						          'width': "160px",
		  'border-radius': '5%',
          'height': "100px",
		  		  'margin-left': '13px',
				"background-color": 'black',
								"border-color": 'rgb(69, 103, 56)',
				'color': "white",
					}
					else return {
          'width': "160px",
		  'border-radius': '5%',
		            'height': "100px",
		  		  'margin-left': '13px',
				"background-color": 'gray',
								'color': "white"}
        },
		unlocked() {return hasUpgrade("r", 14)},
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
		title: "Essence VIII",
		description: "Generate 1 Common Essence Shard per/s",
		cost: new Decimal(1e10),
		unlocked() {return (hasUpgrade(this.layer, 22))},
},
	24: {
		title: "Essence IX",
		description: "Generate 1 Uncommon Essence Shard per/s. <br> Double passive Common Essence Shards Gain",
		cost: new Decimal(2e10),
		unlocked() {return (hasUpgrade(this.layer, 23))},
},
	25: {
		title: "Essence XI",
		description: "Change Runes cost exponent and cost doesnt scales by Runes amount",
		cost: new Decimal(1e50),
		unlocked() {return (player.e.buyables[21].gte(1))},
},
	31: {
		title: "Essence XII",
		description: "Boost essences gain based on time played",
		cost: new Decimal(1e67),
		effect() {return effect = Decimal.pow(1.0002, player.timePlayed)
		return effect},
				effectDisplay() {return "x" + format(upgradeEffect("e", 31))},
		unlocked() {return (hasUpgrade("r", 23))},
		style() {
					if (hasUpgrade("e", 31) || player.e.points.gte(this.cost)) return {
						          'width': "160px",
		  'border-radius': '5%',
          'min-height': "100px",
		  'margin-top': '17px',
		  		  'margin-left': '13px',
				"background-color": 'black',
				"border-color": 'rgb(69, 103, 56)',
								'color': "white"
					}
					else return {
          'width': "160px",
		  'border-radius': '5%',
          'min-height': "100px",
		  'margin-top': '17px',
		  		  'margin-left': '13px',
				"background-color": 'gray',
								'color': "white"}
        },
},
	32: {
		title: "Essence XIII",
		description: "Boost points gain based on time played",
		cost: new Decimal(1e73),
		effect() {return effect = Decimal.pow(1.00024, player.timePlayed)
		return effect},
				effectDisplay() {return "x" + format(upgradeEffect("e", 32))},
		unlocked() {return (hasUpgrade("e", 31))},
		style() {
					if (hasUpgrade("e", 32) || player.e.points.gte(this.cost)) return {
						          'width': "160px",
		  'border-radius': '5%',
          'min-height': "100px",
		  		  'margin-left': '20px',
				  		  'margin-top': '17px',
				"background-color": 'black',
								"border-color": 'rgb(69, 103, 56)',
								'color': "white"
					}
					else return {
          'width': "160px",
		  'border-radius': '5%',
          'min-height': "100px",
		  		  'margin-top': '17px',
		  		  'margin-left': '20px',
				"background-color": 'gray',
								'color': "white"}
        },
},
	41: {
		title: "Essence XIV",
		description: "Essence upgrades after X applies to Runes VII",
		cost: new Decimal(2e78),
		effect() {if (hasUpgrade("e", 43)) return new Decimal(5)
			if (hasUpgrade("e", 42)) return new Decimal(4)
			if (hasUpgrade("e", 41)) return new Decimal(3)
				if (hasUpgrade("e", 32)) return new Decimal(2)
					if (hasUpgrade("e", 31)) return new Decimal(1)
			else return new Decimal(0)},
				effectDisplay() {return "+" + format(upgradeEffect("e", 41))},
		unlocked() {return (hasUpgrade("e", 32))},
		style() {
					if (hasUpgrade("e", 42) || player.e.points.gte(this.cost)) return {
						          'width': "160px",
		  'border-radius': '5%',
          'min-height': "100px",
		  		  'margin-left': '20px',
				  				"border-color": 'rgb(69, 103, 56)',
				"background-color": 'black',
						'color': "white"
					}
					else return {
          'width': "160px",
		  'border-radius': '5%',
          'min-height': "100px",
		  		  'margin-left': '20px',
				"background-color": 'gray',
					'color': "white"}
        },
},
	42: {
		title: "Essence XV",
		description: "Increase purchase limit of [Essence Purifier] by 75",
		cost: new Decimal(1e80),
		effect() {if (hasUpgrade("e", 42)) return new Decimal(75)},
				effectDisplay() {return "+" + format(upgradeEffect("e", 42))},
		unlocked() {return (hasUpgrade("e", 41))},
		        style() {
					if (hasUpgrade("e", 42) || player.e.points.gte(this.cost)) return {
						          'width': "160px",
		  'border-radius': '5%',
          'min-height': "100px",
		  				"border-color": 'rgb(69, 103, 56)',
		  		  'margin-left': '20px',
				"background-color": 'black',
								'color': "white"
					}
					else return {
          'width': "160px",
		  'border-radius': '5%',
          'min-height': "100px",
		  		  'margin-left': '20px',
				"background-color": 'gray',
								'color': "white"}
        },
},
	43: {
		title: "Essence XVI",
		description: "Increase purchase limit of [Essence Extractor] by 25",
		cost: new Decimal(1e86),
		effect() {if (hasUpgrade("e", 43)) return new Decimal(25)},
				effectDisplay() {return "+" + format(upgradeEffect("e", 43))},
		unlocked() {return (hasUpgrade("e", 42))},
		        style() {
					if (hasUpgrade("e", 43) || player.e.points.gte(this.cost)) return {
						          'width': "160px",
		  'border-radius': '5%',
          'min-height': "100px",
		  				"border-color": 'rgb(69, 103, 56)',
		  		  'margin-left': '20px',
				"background-color": 'black',
								'color': "white"
					}
					else return {
          'width': "160px",
		  'border-radius': '5%',
          'min-height': "100px",
		  		  'margin-left': '20px',
				"background-color": 'gray',
								'color': "white"}
        },
},
	51: {
		title: "Essence XVII",
		description: "Boost Mana gain by Buyed Essence upgrades",
		cost: new Decimal(1e100),
		effect() {if (hasUpgrade("e", 51)) ret = Decimal.pow(1.11, player.e.upgrades.length)
			else ret = new Decimal(1)
			return ret},
				effectDisplay() {return "+" + format(upgradeEffect("e", 51))},
		unlocked() {return (hasUpgrade("e", 43))},
		        style() {
					if (hasUpgrade("e", 51) || player.e.points.gte(this.cost)) return {
						          'width': "160px",
		  'border-radius': '5%',
          'min-height': "100px",
		  				"border-color": 'rgb(69, 103, 56)',
		  		  'margin-left': '20px',
				  		  		  'margin-top': '17px',
				"background-color": 'black',
								'color': "white"
					}
					else return {
          'width': "160px",
		  'border-radius': '5%',
          'min-height': "100px",
		  		  		  'margin-top': '17px',
		  		  'margin-left': '20px',
				"background-color": 'gray',
								'color': "white"}
        },
},
	52: {
		title: "Essence XVIII",
		description: "Mana boosts essence gain",
		cost: new Decimal(1e120),
		effect() { if (hasUpgrade(this.layer, this.id)) return player.al.points.pow(1.25).max(1)
			else return new Decimal(1)
			return ret},
				effectDisplay() {return "x" + format(upgradeEffect("e", 52))},
		unlocked() {return (hasUpgrade("e", 51))},
		        style() {
					if (hasUpgrade("e", 52) || player.e.points.gte(this.cost)) return {
						          'width': "160px",
		  'border-radius': '5%',
          'min-height': "100px",
		  				"border-color": 'rgb(69, 103, 56)',
		  		  'margin-left': '20px',
				  		  		  'margin-top': '17px',
				"background-color": 'black',
								'color': "white"
					}
					else return {
          'width': "160px",
		  'border-radius': '5%',
          'min-height': "100px",
		  		  		  'margin-top': '17px',
		  		  'margin-left': '20px',
				"background-color": 'gray',
								'color': "white"}
        },
},
	53: {
		title: "Essence XIX",
		description: "Points boosts essences gain",
		cost: new Decimal(1e130),
		effect() { if (hasUpgrade(this.layer, this.id)) return player.points.pow(0.05).max(1)
			else return new Decimal(1)
			return ret},
				effectDisplay() {return "x" + format(upgradeEffect("e", 53))},
		unlocked() {return (hasUpgrade("e", 52))},
		        style() {
					if (hasUpgrade("e", 52) || player.e.points.gte(this.cost)) return {
						          'width': "160px",
		  'border-radius': '5%',
          'min-height': "100px",
		  				"border-color": 'rgb(69, 103, 56)',
		  		  'margin-left': '20px',
				  		  		  'margin-top': '17px',
				"background-color": 'black',
								'color': "white"
					}
					else return {
          'width': "160px",
		  'border-radius': '5%',
          'min-height': "100px",
		  		  		  'margin-top': '17px',
		  		  'margin-left': '20px',
				"background-color": 'gray',
								'color': "white"}
        },
},
},
clickables: {
    11: {
		title: "Novice Lootbox",
        display() { return "Contains Common and Uncommon Essence Shards.<br> Cost: 100000 Essences<br> Available: " + formatWhole(player.e.na)},
		canClick() { return (player.e.points.gte(100000) && player.e.na.gt(0)) },
onClick() {
roll = Math.random() * (2.9 - 1) + (1); 
player.e.points = player.e.points.sub(100000) // replacing min and max with their proper variable locations
player.e.d = Math.floor(roll)
player.e.na = player.e.na.sub(1)
if (player.e.d == 1) player.e.c = player.e.c.add(new Decimal(1).times(buyableEffect("r", 11)).times(upgradeEffect("r", 11)))
if (player.e.d == 2) player.e.uc = player.e.uc.add(new Decimal(1).times(buyableEffect("r", 12)).times(upgradeEffect("r", 11)))
},
},
    12: {
		title: "Silver Lootbox",
        display() { return "Contains Common, Uncommon and Rare Essence Shards.<br> Cost: 38000000 Essences<br>Available: " + formatWhole(player.e.sa)},
		canClick() { return (player.e.points.gte(38000000)&& player.e.sa.gt(0)) },
onClick() {
roll = Math.random() * (3.9 - 1) + (1); 
player.e.points = player.e.points.sub(38000000) // replacing min and max with their proper variable locations
player.e.d = Math.floor(roll)
if (player.e.d == 1) player.e.c = player.e.c.add(new Decimal(1).times(buyableEffect("r", 11)).times(upgradeEffect("r", 11)))
if (player.e.d == 2) player.e.uc = player.e.uc.add(new Decimal(1).times(buyableEffect("r", 12)).times(upgradeEffect("r", 11)))
if (player.e.d == 3) player.e.r = player.e.r.add(1)
player.e.sa = player.e.sa.sub(1)
},
},
    13: {
		title: "Golden Lootbox",
        display() { return "Contains Epic and Legendary Essence Shards.<br> Cost: 1e9 Essences<br>Available: " + formatWhole(player.e.ga)},
		canClick() { return (player.e.points.gte(1e9)&& player.e.ga.gt(0)) },
onClick() {
roll = Math.random() * (2.9 - 1) + (1); 
player.e.points = player.e.points.sub(1e9) // replacing min and max with their proper variable locations
player.e.d = Math.floor(roll)
if (player.e.d == 1) player.e.e = player.e.e.add(new Decimal(1).times(buyableEffect("r", 22))).add(1)
if (player.e.d == 2) player.e.l = player.e.l.add(new Decimal(1).times(buyableEffect("r", 21))).add(1)
player.e.ga = player.e.ga.sub(1)
},
},
    21: {
		title: "Reroll Boxes",
        display() { return "Refresh available amount of boxes at reduced rate.<br> Cost: 1e18 Essences<br> Available: " + formatWhole(player.e.ra)},
		canClick() { return (player.e.points.gte(1e18)&& player.e.ra.gt(0)) },
onClick() {
player.e.points = player.e.points.sub(1e18) // replacing min and max with their proper variable locations
player.e.ga = player.e.ga.add(3)
player.e.ra = player.e.ra.sub(1)
player.e.sa = player.e.sa.add(7)
player.e.na = player.e.na.add(10)
},
},
    22: {
		title: "Reroll Boxes II",
        display() { return "Refresh available amount of boxes at reduced rate.<br> Cost: 1e28 Essences<br> Available: " + formatWhole(player.e.r2a)},
		canClick() { return (player.e.points.gte(1e28)&& player.e.r2a.gt(0)) },
onClick() {
player.e.points = player.e.points.sub(1e28) // replacing min and max with their proper variable locations
player.e.ga = player.e.ga.add(3)
player.e.r2a = player.e.r2a.sub(1)
player.e.sa = player.e.sa.add(7)
player.e.na = player.e.na.add(10)
},
},
},
update(diff) {
		if (player.e.rc.gte(0)) {
			player.e.rc = player.e.rc.add((buyableEffect("r", 14)).times(diff))
			player.e.r = player.e.r.add(player.e.rc.pow(0.05).times(diff))
		player.e.l = player.e.l.add(player.e.rc.pow(0.01).div(2).times(diff))
		player.e.e = player.e.e.add(player.e.rc.pow(0.01).div(2).times(diff))
			}
		if (hasUpgrade(this.layer, 23)) {
			player.e.uc = player.e.uc.add(player.e.l.times(2.35).times(buyableEffect("r", 12)).times(upgradeEffect("r", 11)).times(diff)).add(diff)
			player.e.c = player.e.c.add(diff)
			}
	if (hasUpgrade(this.layer, 23)) return player.e.c = player.e.c.add(player.e.e.times(1.75).times(buyableEffect("r", 11)).times(upgradeEffect("r", 11)).times(diff)).add(diff)
},
			    		doReset(resettingLayer) {
			if (layers[resettingLayer].row <= layers[this.layer].row) return
			let keep = [];
			if (hasUpgrade("r", 12)) keep.push("buyables")
			if (hasUpgrade("r", 14)) keep.push("buyables", "upgrades")
		  layerDataReset("e", keep)
		},
    layerShown(){return true}
})