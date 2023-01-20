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
    requires() {return new Decimal(1e120)},
	effectDescription() {return `<br>Mana will be <h3 style="color='red';">hardcapped</h3> at 1e50`}, // Can be a function that takes requirement increases into account
    resource: "mana", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type() {return "normal"}, // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() {return new Decimal(0.01)},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
			if (hasUpgrade("e", 51)) mult = mult.times(upgradeEffect("e", 51))
						if (player.a.alEffect >= 1) mult = mult.times(player.a.alEffect).times(tmp.a.effect.div(7).max(1))
						if (hasUpgrade("al", 11)) mult = mult.times(upgradeEffect("al", 11))
						if (hasUpgrade("al", 22)) mult = mult.pow(upgradeEffect("al", 22))
						if (hasUpgrade("al", 31)) mult = mult.times(upgradeEffect("al", 31))
						if (hasUpgrade("e", 53)) mult = softcap(mult, Decimal.pow(10, 120), new Decimal(0.2))
						if (hasUpgrade("e", 52)) mult = mult = softcap(mult, Decimal.pow(10, 80), new Decimal(0.05))
						if (player.al.points.gte(1e50)) mult = mult = softcap(mult, Decimal.pow(10, 50), new Decimal(0.05))
						if (player.al.points.gte(1e135)) mult = mult = softcap(mult, Decimal.pow(10, 135), new Decimal(0.05))
						if (hasUpgrade("e", 72)) mult = mult.times(upgradeEffect("e", 72))
						if (player.al.buyables[12].gte(1)) mult = mult.times(buyableEffect("al", 12))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "m: Reset for mana", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
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
					"upgrades",
					['buyable', [15]]
                ]
            },
	},
	},
	upgrades: {
			11: {
		title: "Mana I",
		description: "Runes boosts Mana gain",
		cost: new Decimal(235000),
				unlocked() {return (hasUpgrade("e", 53))},
		effect() {if (hasUpgrade("al", 11)) eff = player.r.points.pow(0.04).max(1)
		else eff = new Decimal(1)
			eff = softcap(eff, new Decimal(1e9), new Decimal(0.01))
		return eff;},
				effectDisplay() {return "x" + format(upgradeEffect("al", 11))},
		style() {
					if (hasUpgrade("al", 11) || player.al.points.gte(this.cost)) return {
						          'width': "160px",
		  'border-radius': '5%',
          'min-height': "100px",
		  		  'margin-left': '18px',
				"background-color": 'black',
				"border-color": '#6495ed',
								'color': "white"
					}
					else return {
          'width': "160px",
		  'border-radius': '5%',
          'min-height': "100px",
		  		  'margin-left': '18px',
				"background-color": 'gray',
								'color': "white"}
        },
},
	12: {
		title: "Mana II",
		description: "Mana boosts [Essence X] effect",
		cost: new Decimal(12250000),
		effect() {return player.al.points.pow(0.03).max(1)},
				effectDisplay() {return "x" + format(upgradeEffect("al", 12))},
		unlocked() {return (hasUpgrade("al", 11))},
		style() {
					if (hasUpgrade("al", 12) || player.al.points.gte(this.cost)) return {
						          'width': "160px",
		  'border-radius': '5%',
          'min-height': "100px",
		  		  'margin-left': '20px',
				"background-color": 'black',
				"border-color": '#6495ed',
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
			13: {
		title: "Mana III",
		description: "Buyed Mana upgrades boosts [Essence X] effect",
		cost: new Decimal(36620000),
		effect() {return Decimal.pow(1.13, player.al.upgrades.length) },
				effectDisplay() {return "x" + format(upgradeEffect("al", 13))},
		unlocked() {return (hasUpgrade("al", 12))},
		style() {
					if (hasUpgrade("al", 13) || player.al.points.gte(this.cost)) return {
						          'width': "160px",
		  'border-radius': '5%',
          'min-height': "100px",
		  		  'margin-left': '20px',
				"background-color": 'black',
				'margin-right': '20px',
				"border-color": '#6495ed',
								'color': "white"
					}
					else return {
          'width': "160px",
		  'border-radius': '5%',
          'min-height': "100px",
		  'margin-right': '20px',
		  		  'margin-left': '20px',
				"background-color": 'gray',
								'color': "white"}
        },
},
	21: {
		title: "Mana IV",
		description: "Mana boosts 2nd equipped artifact effects",
		cost: new Decimal(1.262e8),
		effect() {return player.al.points.pow(0.075)},
				effectDisplay() {return "x" + format(upgradeEffect("al", 21),3)},
		unlocked() {return (hasUpgrade("al", 13))},
		style() {
					if (hasUpgrade("al", 21) || player.al.points.gte(this.cost)) return {
						          'width': "160px",
		  'border-radius': '5%',
          'min-height': "100px",
		  		  'margin-left': '3px',
				  'margin-top': '15px',
				  "border-color": '#6495ed',
				"background-color": 'black',
						'color': "white"
					}
					else return {
          'width': "160px",
		  'border-radius': '5%',
          'min-height': "100px",
		  'margin-top': '15px',
		  		  'margin-left': '3px',
				"background-color": 'gray',
					'color': "white"}
        },
},
	22: {
		title: "Mana V",
		description: "[Essence X] affects Mana gain at reduced rate",
		cost: new Decimal(6.225e8),
		effect() {return player.e.buyables[21].pow(0.05)},
				effectDisplay() {return "^" + format(upgradeEffect("al", 22))},
		unlocked() {return (hasUpgrade("al", 21))},
		        style() {
					if (hasUpgrade("al", 22) || player.al.points.gte(this.cost)) return {
						          'width': "160px",
		  'border-radius': '5%',
          'min-height': "100px",
		  "border-color": '#6495ed',
						'margin-top': '15px',
		  		  'margin-left': '20px',
				"background-color": 'black',
								'color': "white"
					}
					else return {
          'width': "160px",
		  'border-radius': '5%',
          'min-height': "100px",
		  'margin-top': '15px',
		  		  'margin-left': '20px',
				"background-color": 'gray',
								'color': "white"}
        },
},
	23: {
		title: "Mana VI",
		description: "Mana boosts Runes gain",
		cost: new Decimal(1.873e10),
		effect() {if(hasUpgrade('al', 23))eff = player.al.points.pow(0.35)
		else eff = new Decimal(1)
		eff = softcap(eff, new Decimal(120000000), new Decimal(0.01))
	return eff;},
				effectDisplay() {return "x" + format(upgradeEffect("al", 23))},
		unlocked() {return (hasUpgrade("al", 22))},
		        style() {
					if (hasUpgrade("al", 23) || player.al.points.gte(this.cost)) return {
						          'width': "160px",
		  'border-radius': '5%',
          'min-height': "100px",
		  "border-color": '#6495ed',
		  		  'margin-left': '20px',
					'margin-right': '5px',
				  						'margin-top': '15px',
				"background-color": 'black',
								'color': "white"
					}
					else return {
          'width': "160px",
		  'border-radius': '5%',
		  						'margin-top': '15px',
          'min-height': "100px",
		  		  'margin-left': '20px',
					'margin-right': '5px',
				"background-color": 'gray',
								'color': "white"}
        },
},
	31: {
		title: "Mana VII",
		description: "Boost Mana gain by Buyed Essence upgrades",
		cost: new Decimal(8.255e11),
		effect() {if (hasUpgrade("al", 31)) ret = Decimal.pow(1.31, player.e.upgrades.length)
			else ret = new Decimal(1)
			return ret},
				effectDisplay() {return "x" + format(upgradeEffect("al", 31))},
		unlocked() {return (hasUpgrade("al", 23))},
		        style() {
					if (hasUpgrade("al", 31) || player.al.points.gte(this.cost)) return {
						          'width': "160px",
		  'border-radius': '5%',
          'min-height': "100px",
		  "border-color": '#6495ed',
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
	32: {
		title: "Mana VIII",
		description: "Apply [Essence XX] effect to Essence gain at boosted rate",
		cost: new Decimal(3.937e16),
		effect() { return upgradeEffect("e", 61).pow(1.45)},
				effectDisplay() {return "x" + format(upgradeEffect("al", 32))},
		unlocked() {return (hasUpgrade("al", 31))},
		        style() {
					if (hasUpgrade("al", 32) || player.al.points.gte(this.cost)) return {
						          'width': "160px",
		  'border-radius': '5%',
          'min-height': "100px",
		  "border-color": '#6495ed',
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
	33: {
		title: "Mana IX",
		description: "Artifact slots gives exponental boost to points gain at reduced rate",
		cost: new Decimal(4.214e18),
		effect() { return player.a.points.pow(0.02)},
				effectDisplay() {return "^" + format(upgradeEffect("al", 33),3)},
		unlocked() {return (hasUpgrade("al", 32))},
		        style() {
					if (hasUpgrade("al", 33) || player.al.points.gte(this.cost)) return {
						          'width': "160px",
		  'border-radius': '5%',
          'min-height': "100px",
		  "border-color": '#6495ed',
		  		  'margin-left': '20px',
				  		  		  'margin-top': '17px',
				"background-color": 'black',
				'margin-right': '20px',
								'color': "white"
					}
					else return {
          'width': "160px",
		  'border-radius': '5%',
          'min-height': "100px",
		  		  		  'margin-top': '17px',
		  		  'margin-left': '20px',
					'margin-right': '20px',
				"background-color": 'gray',
								'color': "white"}
        },
},
41: {
	title: "Mana X",
	description: "Artifact slots gives exponental boost to essences gain at reduced rate",
	cost: new Decimal(4.214e232),
	effect() { if (hasUpgrade("al", 42)) return player.a.points.pow(0.2).times(upgradeEffect("al", 42))
		else return player.a.points.pow(0.2)},
			effectDisplay() {return "^" + format(upgradeEffect("al", 41),4)},
	unlocked() {return (hasUpgrade("e", 81))},
			style() {
				if (hasUpgrade("al", 41) || player.al.points.gte(this.cost)) return {
							  'width': "160px",
	  'border-radius': '5%',
	  'min-height': "100px",
	  "border-color": '#6495ed',
				'margin-left': '20px',
								  'margin-top': '17px',
			"background-color": 'black',
			'margin-right': '20px',
							'color': "white"
				}
				else return {
	  'width': "160px",
	  'border-radius': '5%',
	  'min-height': "100px",
						  'margin-top': '17px',
				'margin-left': '20px',
				'margin-right': '20px',
			"background-color": 'gray',
							'color': "white"}
	},
},
42: {
	title: "Mana XI",
	description: "[Mana IX] gives a boost to [Mana X] effect",
	cost: new Decimal(4.214e300),
	effect() { return upgradeEffect("al", 33).pow(20)},
			effectDisplay() {return "x" + format(upgradeEffect("al", 42),4)},
	unlocked() {return (hasUpgrade("al", 41))},
			style() {
				if (hasUpgrade("al", 42) || player.al.points.gte(this.cost)) return {
							  'width': "160px",
	  'border-radius': '5%',
	  'min-height': "100px",
	  "border-color": '#6495ed',
				'margin-left': '20px',
								  'margin-top': '17px',
			"background-color": 'black',
			'margin-right': '20px',
							'color': "white"
				}
				else return {
	  'width': "160px",
	  'border-radius': '5%',
	  'min-height': "100px",
						  'margin-top': '17px',
				'margin-left': '20px',
				'margin-right': '20px',
			"background-color": 'gray',
							'color': "white"}
	},
},
	},
	buyables: {
		11: {
			title: "Mana Orb",
			purchaseLimit: 25,
			 cost(x) {return new Decimal(1e50).times(new Decimal(1e10).pow(x).max(1))},
			display() { return `Reset Artifact layer, but give free artifact slot (on first buy) and boost to essences<br>Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}/25 <br>  Cost: ${format(this.cost())} Mana<br>Currently: x${format(this.effect(),3)}`},
			effect(x) {eff = new Decimal(2.75).pow(x.add(1))
		 return eff;},
					canAfford() {return (player.al.points.gte(this.cost()))},
					buy() {
			  player.al.points = player.al.points.sub(this.cost())
			  layerDataReset("a")
			  player.a.points = player.a.points.add(5)
				  setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			style() {
						if (player.al.points.gte(this.cost()) || player.al.buyables[this.id].gte(1)) return {
									  'width': "160px",
			  'border-radius': '5%',
			  'height': "100px",
						'margin-bottom': '13px',
					"background-color": 'black',
					   'background-image': 'repeating-linear-gradient(-45deg, rgb(0, 0, 0), 10%, rgb(34, 34, 34) 10%, rgb(34, 34, 34) 20%)',
					'animation': '2000ms linear 0s infinite running true',
					"border-color": '#6495ed',
					'color': "white",
						}
						else return {
			  'width': "160px",
			  'border-radius': '5%',
			  'margin-bottom': '13px',
						'height': "100px",
					"background-color": 'gray',
									'color': "white"}
			},
			unlocked() {return hasUpgrade("r", 14)},
	},
	12: {
		title: "Mana Wand",
		purchaseLimit: 40,
		 cost(x) {return new Decimal(1e129).times(new Decimal(1e5).pow(x).max(1))},
		display() { return `Boost Mana gain<br>Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}/40 <br>  Cost: ${format(this.cost())} Mana<br>Currently: x${format(this.effect(),3)}`},
		effect(x) {eff = new Decimal(20.75).pow(x.add(1))
	 return eff;},
				canAfford() {return (player.al.points.gte(this.cost()))},
				buy() {
		  player.al.points = player.al.points.sub(this.cost())
			  setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
		},
		style() {
					if (player.al.points.gte(this.cost()) || player.al.buyables[this.id].gte(1)) return {
								  'width': "160px",
		  'border-radius': '5%',
		  'height': "100px",
					'margin-bottom': '13px',
				"background-color": 'black',
				   'background-image': 'repeating-linear-gradient(-45deg, rgb(0, 0, 0), 10%, rgb(34, 34, 34) 10%, rgb(34, 34, 34) 20%)',
				'animation': '2000ms linear 0s infinite running true',
				"border-color": '#6495ed',
				'color': "white",
					}
					else return {
		  'width': "160px",
		  'border-radius': '5%',
		  'margin-bottom': '13px',
					'height': "100px",
				"background-color": 'gray',
								'color': "white"}
		},
		unlocked() {return (player.al.buyables[11].gte(11))},
},
	},
	update(diff) {
		if (player.al.points.gte(1e9) && (inChallenge("v", 13))) player.al.points = player.al.points.div(2).min(1e9)	
		if (player.al.points.gte(1e30) && (inChallenge("v", 12))) player.al.points = player.al.points.div(2).min(1e30)	
		if (player.al.points.gte(1e120) && (!hasUpgrade("e", 71))) player.al.points = player.al.points.div(2).min(1e120)
	},
onPrestige() {
return	player.e.points = new Decimal(0)

},
    layerShown(){return true}
})