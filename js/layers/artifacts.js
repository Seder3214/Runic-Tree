addLayer("a", {
    name: "artifacts", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		best: new Decimal(0),
		RarityText: new Decimal(0),
		rarityEffect: new Decimal(0),
		availableArtifacts: new Decimal(0),
		paF: new Decimal(0),
		peaF: new Decimal(0),
		eaF: new Decimal(0),
		eeaF: new Decimal(0),
		rviiaF: new Decimal(0),
		rviieaF: new Decimal(0),
		firstAPE: new Decimal(0),
		firstAPEE: new Decimal(0),
		firstAEE: new Decimal(0),
		firstAEEE: new Decimal(0),
		firstARE: new Decimal(0),
		firstAREE: new Decimal(0),
				scndAPE: new Decimal(0),
		scndAPEE: new Decimal(0),
		scndAEE: new Decimal(0),
		scndAEEE: new Decimal(0),
		scndARE: new Decimal(0),
		scndAREE: new Decimal(0),
		         thrdAPE: new Decimal(0),
		thrdAPEE: new Decimal(0),
		thrdAEE: new Decimal(0),
		thrdAEEE: new Decimal(0),
		thrdARE: new Decimal(0),
		thrdAREE: new Decimal(0),
				frthAPE: new Decimal(0),
		frthAPEE: new Decimal(0),
		frthAEE: new Decimal(0),
		frthAEEE: new Decimal(0),
		frthARE: new Decimal(0),
		frthAREE: new Decimal(0),
				ffhAPE: new Decimal(0),
		ffhAPEE: new Decimal(0),
		ffhAEE: new Decimal(0),
		ffhAEEE: new Decimal(0),
		ffhARE: new Decimal(0),
		ffhAREE: new Decimal(0),
				sxthAPE: new Decimal(0),
		sxthAPEE: new Decimal(0),
		sxthAEE: new Decimal(0),
		sxthAEEE: new Decimal(0),
		sxthARE: new Decimal(0),
		scthAREE: new Decimal(0),
				sxthAPE: new Decimal(0),
		sxthAPEE: new Decimal(0),
		sxthAEE: new Decimal(0),
		sxthAEEE: new Decimal(0),
		sxthARE: new Decimal(0),
		sxthAREE: new Decimal(0),
						svthAPE: new Decimal(0),
		svthAPEE: new Decimal(0),
		svthAEE: new Decimal(0),
		svthAEEE: new Decimal(0),
		svthARE: new Decimal(0),
		svthAREE: new Decimal(0),
		fRarity: new Decimal(0),
		sRarity: new Decimal(0),
		tRarity: new Decimal(0),
		frRarity: new Decimal(0),
		fvRarity: new Decimal(0),
		sRarity: new Decimal(0),
		svRarity: new Decimal(0),
		alEffect: new Decimal(0),
		alF: new Decimal(0),
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
					["display-text", () => "You have " + format(player.a.RarityText) + " Smth +" + format(player.a.rarityEffect) + " " + format(player.a.peaF) + " " + format(player.a.paF) + " " + format(player.a.eaF) + " " + format(player.a.eeaF) + " " + format(player.a.rviiaF) + " " + format(player.a.rviieaF)],
					"clickables",
					["infobox", "effects"]
                ]
            },
			                    "Inventory": {
                content: [
                    ["blank", "15px"],
					["row", [["infobox", "fA"], ["buyable", [11]]]],
					["row", [["infobox", "sA"], ["buyable", [12]]]],
					["row", [["infobox", "tA"], ["buyable", [13]]]],
					["row", [["infobox", "frA"], ["buyable", [14]]]]
                ]
            },
	},
	},
	effect() {
		if (!player.a.buyables[11].gte(1)) return new Decimal(1)
			eff = Decimal.pow(1)
		if (player.a.buyables[11].gte(1)) eff = eff.times(buyableEffect("a", 11))
			if (hasUpgrade("e", 61)) eff = eff.times(upgradeEffect("e", 61)) 
			return eff;
	},
		effect2() {
		if (!player.a.buyables[12].gte(1)) return new Decimal(1)
			eff = Decimal.pow(1)
		if (player.a.buyables[12].gte(1)) eff = eff.times(buyableEffect("a", 12))
		if (hasUpgrade("al", 21)) eff = eff.times(upgradeEffect("al", 21)) 
			return eff;
	},
		effect3() {
		if (!player.a.buyables[13].gte(1)) return new Decimal(1)
			eff = Decimal.pow(1)
		if (player.a.buyables[13].gte(1)) eff = eff.times(buyableEffect("a", 13))
			return eff;
	},
	effect4() {
		if (!player.a.buyables[14].gte(1)) return new Decimal(1)
			eff = Decimal.pow(1)
		if (player.a.buyables[14].gte(1)) eff = eff.times(buyableEffect("a", 14))
			return eff;
	},
		buyables: {
							      11: {
		title() {return "Upgrade 1st Artifact"},
				purchaseLimit: 15,
        cost(x) {if (player.a.fRarity >= 6) return new Decimal(18250).times(x.pow(1.4).max(1))
			if (player.a.fRarity >= 5) return new Decimal(8600).times(x.pow(1.4).max(1))
			if (player.a.fRarity >= 4) return new Decimal(2200).times(x.pow(1.4).max(1))
			if (player.a.fRarity >= 3) return new Decimal(650).times(x.pow(1.4).max(1))
			if (player.a.fRarity >= 2) return new Decimal(50).times(x.pow(1.4).max(1))
			if (player.a.fRarity >= 1) return new Decimal(10).times(x.pow(1.4).max(1))
								else return new Decimal(1e309)},
		canAfford() {return (player.al.points.gte(this.cost()))},
        display() {return `<h5>Boost 1st artifact effects<br>Cost: ${format(this.cost())} Mana<br>Effect: x${format(this.effect())}</h5><br>Can be buyed only if you have 1st Artifact`},
        buy() {
          player.al.points = player.al.points.sub(this.cost())
			  setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x) {
eff = new Decimal(1.50).pow(x)
		return eff;
        },
        style: {
          width: "100px",
          height: "130px",
		  'border-radius': '0%',
		  'margin-top': '5px'
        },
      },
	  							      12: {
		title() {return "Upgrade 2nd Artifact"},
		unlocked() {return player.a.sRarity >= 1},
				purchaseLimit: 15,
        cost(x) {if (player.a.sRarity >= 6) return new Decimal(18250).times(x.times(1.4).max(1))
			if (player.a.sRarity >= 5) return new Decimal(8600).times(x.times(1.4).max(1))
			if (player.a.sRarity >= 4) return new Decimal(2200).times(x.times(1.4).max(1))
			if (player.a.sRarity >= 3) return new Decimal(650).times(x.times(1.4).max(1))
			if (player.a.sRarity >= 2) return new Decimal(50).times(x.times(1.4).max(1))
			if (player.a.sRarity >= 1) return new Decimal(10).times(x.times(1.4).max(1))
				else return new Decimal(1e309)},
		canAfford() {return (player.al.points.gte(this.cost()))},
        display() {return `<h5>Boost 2nd artifact effects<br>Cost: ${format(this.cost())} Mana<br>Effect: x${format(this.effect())}</h5><br>Can be buyed only if you have 2nd Artifact`},
        buy() {
          player.al.points = player.al.points.sub(this.cost())
			  setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x) {
eff = new Decimal(1.43).pow(x)
		return eff;
        },
        style: {
          width: "100px",
          height: "130px",
		  'border-radius': '0%',
		  'margin-top': '5px'
        },
      },
	  							      13: {
		title() {return "Upgrade 3rd Artifact"},
				purchaseLimit: 15,
				unlocked() {return player.a.tRarity >= 1},
        cost(x) {if (player.a.tRarity >= 6) return new Decimal(3e12).times(x.times(1.4).max(1))
			if (player.a.tRarity >= 5) return new Decimal(7.525e11).times(x.times(1.4).max(1))
			if (player.a.tRarity >= 4) return new Decimal(2e11).times(x.times(1.4).max(1))
			if (player.a.tRarity >= 3) return new Decimal(6e10).times(x.times(1.4).max(1))
			if (player.a.tRarity >= 2) return new Decimal(2e10).times(x.times(1.4).max(1))
			if (player.a.tRarity >= 1) return new Decimal(3e9).times(x.times(1.4).max(1))
				else return new Decimal(1e309)},
		canAfford() {return (player.al.points.gte(this.cost()))},
        display() {return `<h5>Boost 2nd artifact effects<br>Cost: ${format(this.cost())} Mana<br>Effect: x${format(this.effect())}</h5><br>Can be buyed only if you have 2nd Artifact`},
        buy() {
          player.al.points = player.al.points.sub(this.cost())
			  setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x) {
eff = new Decimal(1.41).pow(x)
		return eff;
        },
        style: {
          width: "100px",
          height: "130px",
		  'border-radius': '0%',
		  'margin-top': '5px'
        },
      },
	  14: {
		title() {return "Upgrade 4th Artifact"},
				purchaseLimit: 15,
				unlocked() {return player.a.frRarity >= 1},
        cost(x) {if (player.a.frRarity >= 6) return new Decimal(2e11).times(x.times(1.4).max(1))
			if (player.a.frRarity >= 5) return new Decimal(3e10).times(x.times(1.4).max(1))
			if (player.a.frRarity >= 4) return new Decimal(7.5e9).times(x.times(1.4).max(1))
			if (player.a.frRarity >= 3) return new Decimal(4e9).times(x.times(1.4).max(1))
			if (player.a.frRarity >= 2) return new Decimal(8.2e8).times(x.times(1.4).max(1))
			if (player.a.frRarity >= 1) return new Decimal(7e8).times(x.times(1.4).max(1))
				else return new Decimal(1e309)},
		canAfford() {return (player.al.points.gte(this.cost()))},
        display() {return `<h5>Boost 4th artifact effects<br>Cost: ${format(this.cost())} Mana<br>Effect: x${format(this.effect())}</h5><br>Can be buyed only if you have 4th Artifact`},
        buy() {
          player.al.points = player.al.points.sub(this.cost())
			  setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x) {
eff = new Decimal(1.38).pow(x)
		return eff;
        },
        style: {
          width: "100px",
          height: "130px",
		  'border-radius': '0%',
		  'margin-top': '5px'
        },
      },
		},
	clickables: {
    11: {
		title() {return "Create Artifact"},
		display() {
			return "<br>You can create artifacts only by artifact slots amount"
		},
		canClick() { return (player.a.availableArtifacts.lt(player.a.points))},
onClick() {
		let rarityRandom = Math.random() * (1 - 1) + (1);
			 rarityEffect = Math.random() * (0 - 0) + (0);
	pEffect = Math.random() * (1 - 1) + (1);
	pEEffect = Math.random() * (1 - 1) + (1);
	eEEffect = Math.random() * (1 - 1) + (1);
	eEffect = Math.random() * (1 - 1) + (1);
	rEffect = Math.random() * (0 - 0) + (0);
	rEEffect = Math.random() * (0 - 0) + (0);
	alEffect = Math.random() * (0 - 0) + (0);
	player.a.availableArtifacts =  player.a.availableArtifacts.add(1).min(player.a.points)
		/*Randomizes Rarity of Artifact */
			if (rarityRandom >= 1) rarityRandom = Math.random() * (2.2 - 1.8) + (1.8);
		if (rarityRandom >= 2 && (!hasChallenge("v", 13))) {rarityRandom = Math.random() * (3.2 - 2.7) + (2.7)
			rarityEffect = Math.random() * (2.1 - 1) + (1)}
		if (rarityRandom >= 5 || (hasChallenge("v", 13))) {rarityRandom = Math.random() * (4.2 - 3.6) + (3.6)
			rarityEffect = Math.random() * (3.1 - 1) + (1)}
		rarityRandom = Math.floor(rarityRandom)
		rarityEffect = Math.floor(rarityEffect)
					if (rarityRandom == 1) pEffect = Math.random() * (100 - 28) + (28);
	if (rarityRandom == 2 && rarityEffect == 1) pEffect = Math.random() * (220 - 126) + (126);
	if (rarityRandom == 2 && rarityEffect == 2) eEffect = Math.random() * (25 - 10) + (10)
	if (rarityRandom == 3 && rarityEffect >= 1) {pEffect = Math.random() * (682 - 250) + (250)
	eEffect = Math.random() * (60 - 32) + (32)}
	if (rarityRandom == 4) {
		pEffect = Math.random() * (1024 - 450) + (450)
		eEffect = Math.random() * (108 - 37) + (37)
		pEEffect = Math.random() * (1.002 - 1) + (1)
	}
	if (rarityRandom == 5 && rarityEffect == 1) pEEffect = Math.random() * (1.03 - 1) + (1);
	if (rarityRandom == 5 && rarityEffect == 2) eEEffect = Math.random() * (1.04 - 1) + (1);
	if (rarityRandom == 5 && rarityEffect == 3) rEffect = Math.random() * (240 - 220) + (220);
		if (rarityRandom == 6) {eEEffect = Math.random() * (1.05 - 1) + (1)
				pEEffect = Math.random() * (1.06 - 1) + (1)
		 rEEffect = Math.random() * (1.07 - 1) + (1)}
		 	if (rarityRandom == 5) alEffect = Math.random() * (134 - 76) + (76);
			if (rarityRandom == 4) alEffect = Math.random() * (42 - 27) + (27);
			if (rarityRandom == 3) alEffect = Math.random() * (23 - 10) + (10);
			if (rarityRandom == 2) alEffect = Math.random() * (7.2 - 3) + (3);
	if (rarityRandom == 1) alEffect = Math.random() * (2.6 - 1) + (1);
		player.a.rarityEffect = Math.floor(rarityEffect)
		  player.a.RarityText = Math.floor(rarityRandom)
		  player.a.paF = pEffect
		  player.a.peaF = pEEffect
		  player.a.eaF = eEffect
		  player.a.eeaF = eEEffect
		  player.a.rviiaF = rEffect 
		  player.a.rviieaF = rEEffect
		  player.a.alF = alEffect
		  
},
	},
12: {
	title: "Apply 1st Artifact",
	canClick() {return true},
	unlocked() {return (player.a.points.gte(1) && (!inChallenge("v", 11)))},
	onClick() {
		if (hasChallenge("v", 21)) {
			player.a.fRarity = 5}
		else if (hasChallenge("v", 11)) {
			player.a.fRarity = 4}
		else player.a.fRarity = player.a.RarityText

		if (player.a.fRarity == 5) {
			player.a.eeaF = Math.random() * (1.04 - 1) + (1);
			player.a.peaF = Math.random() * (1.03 - 1) + (1);
			player.a.alF = Math.random() * (134 - 76) + (76);
		}
		else if (player.a.fRarity == 4) {
			player.a.paF = Math.random() * (1024 - 1) + (1)
			player.a.eaF = Math.random() * (108 - 1) + (1)
			player.a.peaF = Math.random() * (1.002 - 1) + (1)
			player.a.rviiaF = Math.random() * (240 - 1) + (1)
			player.a.alF = Math.random() * (42 - 27) + (27);
		}
				player.a.RarityText = Math.random() * (0 - 0) + (0);
		  player.a.firstAPE = player.a.paF 
		  player.a.firstAPEE = player.a.peaF
		  player.a.firstAEE = player.a.eaF
		  player.a.firstAEEE = player.a.eeaF
		  player.a.firstARE = player.a.rviiaF 
		  player.a.firstAREE = player.a.rviieaF 
		  player.a.alEffect = player.a.alF 
		  player.a.RarityText = Math.random() * (0 - 0) + (0);
		  player.a.paF = Math.random() * (0 - 0) + (0);
		  player.a.peaF = Math.random() * (0 - 0) + (0);
		  player.a.eaF = Math.random() * (0 - 0) + (0);
		  player.a.eeaF = Math.random() * (0 - 0) + (0);
		  player.a.rviiaF = Math.random() * (0 - 0) + (0);
		  player.a.rviieaF = Math.random() * (0 - 0) + (0);
		  player.a.alF = Math.random() * (0 - 0) + (0);
	},
},
13: {
	title: "Apply 2nd Artifact",
	canClick() {return (player.a.buyables[11].gte(15))},
	unlocked() {return (player.a.buyables[11].gte(15) && (player.a.points.gte(2)))},
	onClick() {
		if (hasChallenge("v", 12)) {
			player.a.sRarity = 4}
		else player.a.sRarity = player.a.RarityText
		if (player.a.sRarity == 4) {
			player.a.paF = Math.random() * (1024 - 1) + (1)
			player.a.eaF = Math.random() * (108 - 1) + (1)
			player.a.peaF = Math.random() * (1.002 - 1) + (1)
			player.a.rviiaF = Math.random() * (240 - 1) + (1)
			player.a.alF = Math.random() * (42 - 27) + (27);
		}
		  player.a.RarityText = Math.random() * (0 - 0) + (0);
		  player.a.scndAPE = player.a.paF 
		  player.a.scndAPEE = player.a.peaF 
		  player.a.scndAEE = player.a.eaF 
		  player.a.scndAEEE = player.a.eeaF 
		  player.a.scndARE = player.a.rviiaF
		  player.a.scndAREE = player.a.rviieaF
		  player.a.paF = Math.random() * (0 - 0) + (0);
		  player.a.peaF = Math.random() * (0 - 0) + (0);
		  player.a.eaF = Math.random() * (0 - 0) + (0);
		  player.a.eeaF = Math.random() * (0 - 0) + (0);
		  player.a.rviiaF = Math.random() * (0 - 0) + (0);
		  player.a.rviieaF = Math.random() * (0 - 0) + (0);
		  player.a.alF = Math.random() * (0 - 0) + (0);
	},
},
14: {
	title: "Apply 3rd Artifact",
	canClick() {return (player.a.buyables[12].gte(15))},
	unlocked() {return (player.a.buyables[12].gte(15) && (!inChallenge("v", 13)))},
	onClick() {
		player.a.tRarity = player.a.RarityText
		  player.a.thrdAPE = player.a.paF
		  player.a.thrdAPEE = player.a.peaF
		  player.a.thrdAEE = player.a.eaF
		  player.a.thrdAEEE = player.a.eeaF
		  player.a.thrdARE = player.a.rviiaF
		  player.a.thrdAREE = player.a.rviieaF
		  player.a.paF = Math.random() * (0 - 0) + (0);
		  player.a.peaF = Math.random() * (0 - 0) + (0);
		  player.a.eaF = Math.random() * (0 - 0) + (0);
		  player.a.eeaF = Math.random() * (0 - 0) + (0);
		  player.a.rviiaF = Math.random() * (0 - 0) + (0);
		  player.a.rviieaF = Math.random() * (0 - 0) + (0);
		  player.a.alF = Math.random() * (0 - 0) + (0);
		  player.a.RarityText = Math.random() * (0 - 0) + (0);
	},
},
15: {
	title: "Apply 4th Artifact",
	canClick() {return (player.a.buyables[13].gte(15))},
	unlocked() {return (player.a.buyables[13].gte(15) && (player.a.points.gte(4)))},
	onClick() {
		player.a.frRarity = player.a.RarityText
		  player.a.frthAPE = player.a.paF
		  player.a.frthAPEE = player.a.peaF
		  player.a.frthAEE = player.a.eaF
		  player.a.frthAEEE = player.a.eeaF
		  player.a.frthARE = player.a.rviiaF
		  player.a.frthAREE = player.a.rviieaF
		  player.a.paF = Math.random() * (0 - 0) + (0);
		  player.a.peaF = Math.random() * (0 - 0) + (0);
		  player.a.eaF = Math.random() * (0 - 0) + (0);
		  player.a.eeaF = Math.random() * (0 - 0) + (0);
		  player.a.rviiaF = Math.random() * (0 - 0) + (0);
		  player.a.rviieaF = Math.random() * (0 - 0) + (0);
		  player.a.alF = Math.random() * (0 - 0) + (0);
		  player.a.RarityText = Math.random() * (0 - 0) + (0);
	},
},
21: {
	display() {return `Respec Artifacts`},
	onClick() {
	  if(confirm("Are you sure you want to respec? This will reset A and unequip all Artifacts!")){
layerDataReset("a")
	  }
	},
	canClick() {return true},
	style: {
	  width: "100px",
	  minHeight: "50px",
	},
  },
	},
	infoboxes: {
	effects: {
body(){if (player.a.RarityText >= 6) return "Artifact Information<br>" + `<img src="artifactsImages/arcana.png"><br>` +"<h3 style='color: #9370DB;'>Arcanic Boosting Artifact</h3><br>Characteristics: <br> ^" + format(player.a.peaF) + " to points <br> ^" + format(player.a.eeaF) + " to essences <br>"
		if (player.a.RarityText >= 5) return "Artifact Information<br>"+ `<img src="artifactsImages/stellar.png"><br>` + "<h3 style='color: #87CEFA;'>Stellar Boosting Artifact</h3><br> Characteristics:<br> ^" + format(player.a.peaF) + " to points<br> ^" + format(player.a.eeaF) + " to essences<br>"
		if (player.a.RarityText >= 4) return "Artifact Information<br>"+ `<img src="artifactsImages/omniscient.png"><br>` + "<h3 style='color: #8A2BE2;'>Omniscient Boosting Artifact</h3><br>Characteristics:<br> x" + format(player.a.paF) + " to points<br> x" + format(player.a.eaF) + " to essences<br> ^" + format(player.a.peaF) + " to points"
		if (player.a.RarityText >=3) return "Artifact Information<br>"+ `<img src="artifactsImages/strong.png"><br>` + "<h3 style='color: 	#7FFF00;'>Strong Boosting Artifact</h3><br>Characteristics:<br> x" + format(player.a.paF) + " to points<br> x" + format(player.a.eaF) + " to essences<br>"
		if (player.a.RarityText >=2) return "Artifact Information<br>"+ `<img src="artifactsImages/hardened.png"><br>` + "<h3 style='color: #1E90FF;'>Hardened Boosting Artifact</h3><br>Characteristics:<br> x" + format(player.a.paF) + " to points<br> x" + format(player.a.eaF) + " to essences"
		if (player.a.RarityText >=1) return "Artifact Information<br>"+ `<img src="artifactsImages/weak.png"><br>` + "<h3 style='color: #383838;'>Weak Boosting Artifact</h3><br>Characteristics:<br> x" + format(player.a.paF) + " to points"	
else return "Artifact Information<br>You have not created any Artifact right now!"},
style: {
			'border-radius': '0%',
		},
	},
		fA: {
body(){if (player.a.fRarity >= 6) return "Artifact 1<br>" + "<h3 style='color: #9370DB;'>Arcanic Boosting Artifact</h3><sup>+" + formatWhole(player.a.buyables[11]) + "</sup>" + "<br> Characteristics: <br> ^" + format(player.a.firstAPEE) + "(" + format(tmp.a.effect) + ") to points <br> ^" + format(player.a.firstAEEE) + "(" + format(tmp.a.effect) + ") to essences <br> ^" + format(player.a.alEffect) + "(" + format(tmp.a.effect.div(7).max(1)) + ") Mana on its Reset"
		if (player.a.fRarity >= 5) return "Artifact 1<br>" + "<h3 style='color: #87CEFA;'>Stellar Boosting Artifact</h3><sup>+" + formatWhole(player.a.buyables[11]) + "</sup>" + " Characteristics:<br> ^" + format(player.a.firstAPEE,4) + "(" + format(tmp.a.effect) + ") to points<br> ^" + format(player.a.firstAEEE,4) + "(" + format(tmp.a.effect) + ") to essences<br>+" + format(player.a.alEffect) + "(" + format(tmp.a.effect.div(7).max(1)) + ") Mana on its Reset"
		if (player.a.fRarity >= 4) return "Artifact 1<br>" + "<h3 style='color: #8A2BE2;'>Omniscient Boosting Artifact</h3><sup>+" + formatWhole(player.a.buyables[11]) + "</sup>" + " Characteristics:<br> x" + format(player.a.firstAPE) + "(" + format(tmp.a.effect) + ") to points<br> x" + format(player.a.firstAEE) + "(" + format(tmp.a.effect) + ") to essences<br>^" + format(player.a.firstAPEE,4) + "(" + format(tmp.a.effect) + ") to points<br> +" + format(player.a.alEffect) + "(" + format(tmp.a.effect.div(7).max(1)) + ") Mana on its Reset"
		if (player.a.fRarity >=3) return "Artifact 1<br>" + "<h3 style='color: #7FFF00;'>Strong Boosting Artifact</h3><sup>+" + formatWhole(player.a.buyables[11]) + "</sup>" + " Characteristics:<br> x" + format(player.a.firstAPE) + "(" + format(tmp.a.effect) + ") to points<br> x" + format(player.a.firstAEE) + "(" + format(tmp.a.effect) + ") to essences<br>+" + format(player.a.alEffect) + "(" + format(tmp.a.effect.div(7).max(1)) + ") Mana on its Reset"
		if (player.a.fRarity >=2) return "Artifact 1<br>" + "<h3 style='color: #1E90FF;'>Hardened Boosting Artifact</h3><sup>+" + formatWhole(player.a.buyables[11]) + "</sup>" + " Characteristics:<br> x" + format(player.a.firstAPE) + "(" + format(tmp.a.effect) + ") to points<br> x" + format(player.a.firstAEE) + "(" + format(tmp.a.effect) + ") to essences<br> +" + format(player.a.alEffect) + "(" + format(tmp.a.effect.div(7).max(1)) + ") Mana on its Reset"
		if (player.a.fRarity >=1) return "Artifact 1<br>" + "<h3 style='color: #383838;'>Weak Boosting Artifact</h3><sup>+" + formatWhole(player.a.buyables[11]) + "</sup>" + " Characteristics:<br> x" + format(player.a.firstAPE) + "(" + format(tmp.a.effect) + ") to points<br> +" + format(player.a.alEffect) + "(" + format(tmp.a.effect.div(7)) + ") Mana on its Reset"	
else return "Artifact Information<br>TYou haven't equipped any artifact in 1st slot right now"},
style: {
			'border-radius': '0%',
		},
	},
		sA: {
body(){if (player.a.sRarity >= 6) return "Artifact 2<br>" + "<h3 style='color: #9370DB;'>Arcanic Boosting Artifact</h3><sup>+" + formatWhole(player.a.buyables[12]) + "</sup>" + "<br> Characteristics: <br> ^" + format(player.a.scndAPEE) + "(" + format(tmp.a.effect2) + ") to points <br> ^" + format(player.a.scndAEEE) + "(" + format(tmp.a.effect2) + ") to essences <br>"
		if (player.a.sRarity >= 5) return "Artifact 2<br>" + "<h3 style='color: #87CEFA;'>Stellar Boosting Artifact</h3><sup>+" + formatWhole(player.a.buyables[12]) + "</sup>" + " Characteristics:<br> ^" + format(player.a.scndAPEE) + "(" + format(tmp.a.effect2) + ") to points<br> ^" + format(player.a.scndAEEE) + "(" + format(tmp.a.effect2) + ") to essences<br>"
		if (player.a.sRarity >= 4) return "Artifact 2<br>" + "<h3 style='color: #8A2BE2;'>Omniscient Boosting Artifact</h3><sup>+" + formatWhole(player.a.buyables[12]) + "</sup>" + " Characteristics:<br> x" + format(player.a.scndAPE) + "(" + format(tmp.a.effect2) + ") to points<br> x" + format(player.a.scndAEE) + "(" + format(tmp.a.effect2) + ") to essences<br> ^" + format(player.a.scndAPEE,4) + "(" + format(tmp.a.effect2) + ") to points"
		if (player.a.sRarity >=3) return "Artifact 2<br>" + "<h3 style='color: #7FFF00;'>Strong Boosting Artifact</h3><sup>+" + formatWhole(player.a.buyables[12]) + "</sup>" + " Characteristics:<br> x" + format(player.a.scndAPE) + "(" + format(tmp.a.effect2) + ") to points<br> x" + format(player.a.scndAEE)+ "(" + format(tmp.a.effect2) + ") to essences<br>"
		if (player.a.sRarity >=2) return "Artifact 2<br>" + "<h3 style='color: #1E90FF;'>Hardened Boosting Artifact</h3><sup>+" + formatWhole(player.a.buyables[12]) + "</sup>" + " Characteristics:<br> x" + format(player.a.scndAPE) + "(" + format(tmp.a.effect2) + ") to points<br> x" + format(player.a.scndAEE) + "(" + format(tmp.a.effect2) + ") to essences"
		if (player.a.sRarity >=1) return "Artifact 2<br>" + "<h3 style='color: #383838;'>Weak Boosting Artifact</h3><sup>+" + formatWhole(player.a.buyables[12]) + "</sup>" + " Characteristics:<br> x" + format(player.a.scndAPE) + "(" + format(tmp.a.effect2) + ") to points"	
		else return "Artifact Information<br>To unlock this slot you need to upgrade your 1st artifact to <sup>+15</sup>"},
style: {
			'border-radius': '0%',
		},
	},
			tA: {
body(){if (player.a.tRarity >= 6) return "Artifact 3<br>" + "<h3 style='color: #9370DB;'>Arcanic Boosting Artifact</h3><sup>+" + formatWhole(player.a.buyables[13]) + "</sup>" + "<br> Characteristics: <br> ^" + format(player.a.thrdAPEE) + "(" + format(tmp.a.effect3) + ") to points <br> ^" + format(player.a.thrdAEEE) + "(" + format(tmp.a.effect3) + ") to essences <br>"
		if (player.a.tRarity >= 5) return "Artifact 3<br>" + "<h3 style='color: #87CEFA;'>Stellar Boosting Artifact</h3><sup>+" + formatWhole(player.a.buyables[13]) + "</sup>" + " Characteristics:<br> ^" + format(player.a.thrdAPEE) + "(" + format(tmp.a.effect3) + ") to points<br> ^" + format(player.a.thrdAEEE) + "(" + format(tmp.a.effect3) + ") to essences<br>"
		if (player.a.tRarity >= 4) return "Artifact 3<br>" + "<h3 style='color: #8A2BE2;'>Omniscient Boosting Artifact</h3><sup>+" + formatWhole(player.a.buyables[13]) + "</sup>" + " Characteristics:<br> x" + format(player.a.thrdAPE) + "(" + format(tmp.a.effect3) + ") to points<br> x" + format(player.a.thrdAEE) + "(" + format(tmp.a.effect3) + ") to essences<br>^" + format(player.a.thrdAPEE,4) + "(" + format(tmp.a.effect3) + ") to points"
		if (player.a.tRarity >=3) return "Artifact 3<br>" + "<h3 style='color: #7FFF00;'>Strong Boosting Artifact</h3><sup>+" + formatWhole(player.a.buyables[13]) + "</sup>" + " Characteristics:<br> x" + format(player.a.thrdAPE) + "(" + format(tmp.a.effect3) + ") to points<br> x" + format(player.a.thrdAEE)+ "(" + format(tmp.a.effect3) + ") to essences<br>"
		if (player.a.tRarity >=2) return "Artifact 3<br>" + "<h3 style='color: #1E90FF;'>Hardened Boosting Artifact</h3><sup>+" + formatWhole(player.a.buyables[13]) + "</sup>" + " Characteristics:<br> x" + format(player.a.thrdAPE) + "(" + format(tmp.a.effect3) + ") to points<br> x" + format(player.a.thrdAEE) + "(" + format(tmp.a.effect3) + ") to essences"
		if (player.a.tRarity >=1) return "Artifact 3<br>" + "<h3 style='color: #383838;'>Weak Boosting Artifact</h3><sup>+" + formatWhole(player.a.buyables[13]) + "</sup>" + " Characteristics:<br> x" + format(player.a.thrdAPE) + "(" + format(tmp.a.effect3) + ") to points"	
		else return "Artifact Information<br>To unlock this slot you need to upgrade your 2nd artifact to <sup>+15</sup>"},
style: {
			'border-radius': '0%',
		},
	},
	frA: {
		body(){if (player.a.frRarity >= 6) return "Artifact 4<br>" + "<h3 style='color: #9370DB;'>Arcanic Boosting Artifact</h3><sup>+" + formatWhole(player.a.buyables[14]) + "</sup>" + "<br> Characteristics: <br> ^" + format(player.a.frthAPEE) + "(" + format(tmp.a.effect4) + ") to points <br> ^" + format(player.a.frthAEEE) + "(" + format(tmp.a.effect4) + ") to essences <br>"
				if (player.a.frRarity >= 5) return "Artifact 4<br>" + "<h3 style='color: #87CEFA;'>Stellar Boosting Artifact</h3><sup>+" + formatWhole(player.a.buyables[14]) + "</sup>" + " Characteristics:<br> ^" + format(player.a.frthAPEE) + "(" + format(tmp.a.effect4) + ") to points<br> ^" + format(player.a.frthAEEE) + "(" + format(tmp.a.effect4) + ") to essences<br>"
				if (player.a.frRarity >= 4) return "Artifact 4<br>" + "<h3 style='color: #8A2BE2;'>Omniscient Boosting Artifact</h3><sup>+" + formatWhole(player.a.buyables[14]) + "</sup>" + " Characteristics:<br> x" + format(player.a.frthAPE) + "(" + format(tmp.a.effect4) + ") to points<br> x" + format(player.a.frthAEE) + "(" + format(tmp.a.effect4) + ") to essences<br>^" + format(player.a.frthAPEE,4) + "(" + format(tmp.a.effect4) + ") to points"
				if (player.a.frRarity >=3) return "Artifact 4<br>" + "<h3 style='color: #7FFF00;'>Strong Boosting Artifact</h3><sup>+" + formatWhole(player.a.buyables[14]) + "</sup>" + " Characteristics:<br> x" + format(player.a.frthAPE) + "(" + format(tmp.a.effect4) + ") to points<br> x" + format(player.a.frthAEE)+ "(" + format(tmp.a.effect4) + ") to essences<br>"
				if (player.a.frRarity >=2) return "Artifact 4<br>" + "<h3 style='color: #1E90FF;'>Hardened Boosting Artifact</h3><sup>+" + formatWhole(player.a.buyables[14]) + "</sup>" + " Characteristics:<br> x" + format(player.a.frthAPE) + "(" + format(tmp.a.effect4) + ") to points<br> x" + format(player.a.frthAEE) + "(" + format(tmp.a.effect4) + ") to essences"
				if (player.a.frRarity >=1) return "Artifact 4<br>" + "<h3 style='color: #383838;'>Weak Boosting Artifact</h3><sup>+" + formatWhole(player.a.buyables[14]) + "</sup>" + " Characteristics:<br> x" + format(player.a.frthAPE) + "(" + format(tmp.a.effect4) + ") to points"	
				else return "Artifact Information<br>To unlock this slot you need to upgrade your 3rd artifact to <sup>+15</sup>"},
		style: {
					'border-radius': '0%',
				},
			},
},
    layerShown(){return (player.r.points.gte(1e11) || player[this.layer].unlocked)}
})