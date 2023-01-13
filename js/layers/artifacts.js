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
		fRarity: new Decimal(0),
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
					["row", [["infobox", "sA"], ["buyable", [12]]]]
                ]
            },
	},
	},
	effect() {
		if (!player.a.buyables[11].gte(1)) return new Decimal(1)
			eff = Decimal.pow(1)
		if (player.a.buyables[11].gte(1)) eff = eff.times(buyableEffect("a", 11))
			return eff;
	},
		effect2() {
		if (!player.a.buyables[12].gte(1)) return new Decimal(1)
			eff = Decimal.pow(1)
		if (player.a.buyables[12].gte(1)) eff = eff.times(buyableEffect("a", 12))
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
eff = new Decimal(1.65).pow(x)
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
		if (rarityRandom >= 2) {rarityRandom = Math.random() * (3.2 - 2.7) + (2.7)
			rarityEffect = Math.random() * (2.1 - 1) + (1)}
		if (rarityRandom >= 3) {rarityRandom = Math.random() * (4.2 - 3.6) + (3.6)
			rarityEffect = Math.random() * (3.1 - 1) + (1)}
		if (rarityRandom >= 3.9) {rarityRandom = Math.random() * (5.2 - 4.5) + (4.5)
			rarityEffect = Math.random() * (4.1 - 1) + (1)}
		if (rarityRandom >= 4.9) {rarityRandom = Math.random() * (6.2 - 5.4) + (5.4)
			rarityEffect = Math.random() * (3.1 - 1) + (1);}
		rarityRandom = Math.floor(rarityRandom)
		rarityEffect = Math.floor(rarityEffect)
					if (rarityRandom == 1) pEffect = Math.random() * (100 - 28) + (28);
	if (rarityRandom == 2 && rarityEffect == 1) pEffect = Math.random() * (220 - 126) + (126);
	if (rarityRandom == 2 && rarityEffect == 2) eEffect = Math.random() * (25 - 10) + (10)
	if (rarityRandom == 3 && rarityEffect == 1) {pEffect = Math.random() * (682 - 250) + (250)
	eEffect = Math.random() * (60 - 32) + (32)}
	if (rarityRandom == 3 && rarityEffect == 2) {eEffect = Math.random() * (60 - 32) + (32)
	rEffect = Math.random() * (15 - 5) + (5)}
	if (rarityRandom == 3 && rarityEffect == 3) rEffect = Math.random() * (15 - 5) + (5);
if (rarityRandom == 4 && rarityEffect == 1) {pEffect = Math.random() * (1024 - 723) + (723),
eEffect = Math.random() * (108 - 75) + (75)}
if (rarityRandom == 4 && rarityEffect == 2) {pEffect = Math.random() * (1024 - 723) + (723),
pEEffect = Math.random() * (1.01 - 1.001) + (1.001)}
if (rarityRandom == 4 && rarityEffect == 3){ rEffect = Math.random() * (35 - 20) + (20)
eEffect = Math.random() * (108 - 75) + (75)}
    if (rarityRandom == 4 && rarityEffect == 4){ rEffect = Math.random() * (35 - 20) + (20),
eEffect = Math.random() * (108 - 75) + (75),
	pEEffect = Math.random() * (1.45 - 1.23) + (1.23)}
	if (rarityRandom == 5 && rarityEffect == 1) pEEffect = Math.random() * (1.22 - 1.05) + (1.05);
	if (rarityRandom == 5 && rarityEffect == 2) eEEffect = Math.random() * (1.15 - 1.02) + (1.02);
	if (rarityRandom == 5 && rarityEffect == 3) rEffect = Math.random() * (240 - 220) + (220);
		if (rarityRandom == 6) {eEEffect = Math.random() * (2.7 - 2.7) + (2.7)
				pEEffect = Math.random() * (1.3 - 1) + (1)
		 rEEffect = Math.random() * (15 - 15) + (15)}
		 	if (rarityRandom == 5) alEffect = Math.random() * (134 - 76) + (76);
			if (rarityRandom == 4) alEffect = Math.random() * (42 - 27) + (27);
			if (rarityRandom == 3) alEffect = Math.random() * (23 - 10) + (10);
			if (rarityRandom == 2) alEffect = Math.random() * (7.2 - 3) + (3);
	if (rarityRandom == 1) alEffect = Math.random() * (2.6 - 0.5) + (0.5);
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
	canClick() {return (player.a.RarityText >= 1 && (player.a.fRarity < 1))},
	unlocked() {return (player.a.RarityText >= 1)},
	onClick() {
		player.a.fRarity = player.a.RarityText
		  player.a.firstAPE = player.a.paF 
		  player.a.firstAPEE = player.a.peaF
		  player.a.firstAEE = player.a.eaF
		  player.a.firstAEEE = player.a.eeaF
		  player.a.firstARE = player.a.rviiaF 
		  player.a.firstAREE = player.a.rviieaF 
		  player.a.alEffect = player.a.alF 
	},
},
13: {
	title: "Apply 2nd Artifact",
	canClick() {return (player.a.fRarity >= 1 && (player.a.sRarity < 1))},
	unlocked() {return (player.a.fRarity >= 1)},
	onClick() {
		player.a.sRarity = player.a.RarityText
		  player.a.scndAPE = player.a.paF 
		  player.a.scndAPEE = player.a.peaF 
		  player.a.scndAEE = player.a.eaF 
		  player.a.scndAEEE = player.a.eeaF 
		  player.a.scndARE = player.a.rviiaF
		  player.a.scndAREE = player.a.rviieaF
	},
},
14: {
	title: "Apply 3rd Artifact",
		unlocked() {return (player.a.sRarity > 1)},
	canClick() {return (player.a.sRarity > 1 && (player.a.tRarity < 1))},
	onClick() {
		player.a.tRarity = player.a.RarityText
		  player.a.thrdAPE = player.a.paF
		  player.a.thrdAPEE = player.a.peaF
		  player.a.thrdAEE = player.a.eaF
		  player.a.thrdAEEE = player.a.eeaF
		  player.a.thrdARE = player.a.rviiaF
		  player.a.thrdAREE = player.a.rviieaF
	},
},
15: {
	title: "Apply 4th Artifact",
		unlocked() {return (player.a.tRarity > 1)},
	canClick() {return (player.a.tRarity >1)},
	onClick() {
		player.a.frthRarity = player.a.RarityText
		  player.a.frthAPE = player.a.paF
		  player.a.frthAPEE = player.a.peaF
		  player.a.frthAEE = player.a.eaF
		  player.a.frthAEEE = player.a.eeaF
		  player.a.frthARE = player.a.rviiaF
		  player.a.frthAREE = player.a.rviieaF
	},
},
16: {
	title: "Apply 5th Artifact",
		unlocked() {return (player.a.frthRarity > 1)},
	canClick() {return (player.a.frthRarity >1)},
	onClick() {
		player.a.fvRarity = player.a.RarityText
		  player.a.ffhAPE = player.a.paF
		  player.a.ffhAPEE = player.a.peaF
		  player.a.ffhAEE = player.a.eaF
		  player.a.ffhAEEE = player.a.eeaF
		  player.a.ffhARE = player.a.rviiaF
		  player.a.ffhAREE = player.a.rviieaF
	},
},
17: {
	title: "Apply 6th Artifact",
	canClick() {return (player.a.fvRarity > 1)},
		unlocked() {return (player.a.fvRarity > 1)},
	onClick() {
		player.a.sRarity = player.a.RarityText
		  player.a.sxthAPE = player.a.paF
		  player.a.sxthAPEE = player.a.peaF
		  player.a.sxthAEE = player.a.eaF
		  player.a.sxthAEEE = player.a.eeaF
		  player.a.sxthARE = player.a.rviiaF
		  player.a.sxthAREE = player.a.rviieaF
	},
},
18: {
	title: "Apply 7th Artifact",
		unlocked() {return (player.a.svRarity > 1)},
	canClick() {return (player.a.svRarity >1)},
	onClick() {
		player.a.svRarity = player.a.RarityText
		  player.a.svthAPE = player.a.paF
		  player.a.svthAPEE = player.a.peaF
		  player.a.svthAEE = player.a.eaF
		  player.a.svthAEEE = player.a.eeaF
		  player.a.svthARE = player.a.rviiaF
		  player.a.svthAREE = player.a.rviieaF
	},
},
	},
	infoboxes: {
	effects: {
body(){if (player.a.RarityText >= 6) return "Artifact Information<br>" + `<img src="artifactsImages/arcana.png"><br>` +"<h3 style='color: #9370DB;'>Arcanic Boosting Artifact</h3><br>Characteristics: <br> ^" + format(player.a.peaF) + " to points <br> ^" + format(player.a.eeaF) + " to essences <br> ^" + format(player.a.rviieaF) + " to Runes VII"
		if (player.a.RarityText >= 5) return "Artifact Information<br>"+ `<img src="artifactsImages/stellar.png"><br>` + "<h3 style='color: #87CEFA;'>Stellar Boosting Artifact</h3><br> Characteristics:<br> ^" + format(player.a.peaF) + " to points<br> ^" + format(player.a.eeaF) + " to essences<br> x" + format(player.a.rviiaF) + " to Runes VII"
		if (player.a.RarityText >= 4) return "Artifact Information<br>"+ `<img src="artifactsImages/omniscient.png"><br>` + "<h3 style='color: #8A2BE2;'>Omniscient Boosting Artifact</h3><br>Characteristics:<br> x" + format(player.a.paF) + " to points<br> x" + format(player.a.eaF) + " to essences<br> x" + format(player.a.rviiaF) + " to Runes VII<br> ^" + format(player.a.peaF) + " to points"
		if (player.a.RarityText >=3) return "Artifact Information<br>"+ `<img src="artifactsImages/strong.png"><br>` + "<h3 style='color: 	#7FFF00;'>Strong Boosting Artifact</h3><br>Characteristics:<br> x" + format(player.a.paF) + " to points<br> x" + format(player.a.eaF) + " to essences<br> x" + format(player.a.rviiaF) + " to Runes VII"
		if (player.a.RarityText >=2) return "Artifact Information<br>"+ `<img src="artifactsImages/hardened.png"><br>` + "<h3 style='color: #1E90FF;'>Hardened Boosting Artifact</h3><br>Characteristics:<br> x" + format(player.a.paF) + " to points<br> x" + format(player.a.eaF) + " to essences"
		if (player.a.RarityText >=1) return "Artifact Information<br>"+ `<img src="artifactsImages/weak.png"><br>` + "<h3 style='color: #383838;'>Weak Boosting Artifact</h3><br>Characteristics:<br> x" + format(player.a.paF) + " to points"	
else return "Artifact Information<br>You have not created any Artifact right now!"},
style: {
			'border-radius': '0%',
		},
	},
		fA: {
body(){if (player.a.fRarity >= 6) return "Artifact 1<br>" + "<h3 style='color: #9370DB;'>Arcanic Boosting Artifact</h3><sup>+" + formatWhole(player.a.buyables[11]) + "</sup>" + "<br> Characteristics: <br> ^" + format(player.a.firstAPEE) + "(" + format(tmp.a.effect) + ") to points <br> ^" + format(player.a.firstAEEE) + "(" + format(tmp.a.effect) + ") to essences <br> ^" + format(player.a.firstAREE) + "(" + format(tmp.a.effect) + ") to Runes VII<br> +" + format(player.a.alEffect) + "(" + format(tmp.a.effect) + ") Mana on its Reset"
		if (player.a.fRarity >= 5) return "Artifact 1<br>" + "<h3 style='color: #87CEFA;'>Stellar Boosting Artifact</h3><sup>+" + formatWhole(player.a.buyables[11]) + "</sup>" + " Characteristics:<br> ^" + format(player.a.firstAPEE) + "(" + format(tmp.a.effect) + ") to points<br> ^" + format(player.a.firstAEEE) + "(" + format(tmp.a.effect) + ") to essences<br> x" + format(player.a.firstAREE) + "(" + format(tmp.a.effect) + ") to Runes VII<br> +" + format(player.a.alEffect) + "(" + format(tmp.a.effect) + ") Mana on its Reset"
		if (player.a.fRarity >= 4) return "Artifact 1<br>" + "<h3 style='color: #8A2BE2;'>Omniscient Boosting Artifact</h3><sup>+" + formatWhole(player.a.buyables[11]) + "</sup>" + " Characteristics:<br> x" + format(player.a.firstAPE) + "(" + format(tmp.a.effect) + ") to points<br> x" + format(player.a.firstAEE) + "(" + format(tmp.a.effect) + ") to essences<br> x" + format(player.a.firstARE) + "(" + format(tmp.a.effect) + ") to Runes VII<br> ^" + format(player.a.firstAPEE) + "(" + format(tmp.a.effect) + ") to points<br> +" + format(player.a.alEffect) + "(" + format(tmp.a.effect) + ") Mana on its Reset"
		if (player.a.fRarity >=3) return "Artifact 1<br>" + "<h3 style='color: #7FFF00;'>Strong Boosting Artifact</h3><sup>+" + formatWhole(player.a.buyables[11]) + "</sup>" + " Characteristics:<br> x" + format(player.a.firstAPE) + "(" + format(tmp.a.effect) + ") to points<br> x" + format(player.a.firstAEE) + "(" + format(tmp.a.effect) + ") to essences<br> x" + format(player.a.firstARE) + "(" + format(tmp.a.effect) + ") to Runes VII<br> +" + format(player.a.alEffect) + "(" + format(tmp.a.effect) + ") Mana on its Reset"
		if (player.a.fRarity >=2) return "Artifact 1<br>" + "<h3 style='color: #1E90FF;'>Hardened Boosting Artifact</h3><sup>+" + formatWhole(player.a.buyables[11]) + "</sup>" + " Characteristics:<br> x" + format(player.a.firstAPE) + "(" + format(tmp.a.effect) + ") to points<br> x" + format(player.a.firstAEE) + "(" + format(tmp.a.effect) + ") to essences<br> +" + format(player.a.alEffect) + "(" + format(tmp.a.effect) + ") Mana on its Reset"
		if (player.a.fRarity >=1) return "Artifact 1<br>" + "<h3 style='color: #383838;'>Weak Boosting Artifact</h3><sup>+" + formatWhole(player.a.buyables[11]) + "</sup>" + " Characteristics:<br> x" + format(player.a.firstAPE) + "(" + format(tmp.a.effect) + ") to points<br> +" + format(player.a.alEffect) + "(" + format(tmp.a.effect) + ") Mana on its Reset"	
else return "Artifact Information<br>You have not created any Artifact right now!"},
style: {
			'border-radius': '0%',
		},
	},
		sA: {
body(){if (player.a.sRarity >= 6) return "Artifact 2<br>" + "<h3 style='color: #9370DB;'>Arcanic Boosting Artifact</h3><sup>+" + formatWhole(player.a.buyables[12]) + "</sup>" + "<br> Characteristics: <br> ^" + format(player.a.scndAPEE) + "(" + format(tmp.a.effect2) + ") to points <br> ^" + format(player.a.scndAEEE) + "(" + format(tmp.a.effect2) + ") to essences <br> ^" + format(player.a.scndAREE) + "(" + format(tmp.a.effect2) + ") to Runes VII"
		if (player.a.sRarity >= 5) return "Artifact 2<br>" + "<h3 style='color: #87CEFA;'>Stellar Boosting Artifact</h3><sup>+" + formatWhole(player.a.buyables[12]) + "</sup>" + " Characteristics:<br> ^" + format(player.a.scndAPEE) + "(" + format(tmp.a.effect2) + ") to points<br> ^" + format(player.a.scndAEEE) + "(" + format(tmp.a.effect2) + ") to essences<br> x" + format(player.a.scndAREE) + "(" + format(tmp.a.effect2) + ") to Runes VII"
		if (player.a.sRarity >= 4) return "Artifact 2<br>" + "<h3 style='color: #8A2BE2;'>Omniscient Boosting Artifact</h3><sup>+" + formatWhole(player.a.buyables[12]) + "</sup>" + " Characteristics:<br> x" + format(player.a.scndAPE) + "(" + format(tmp.a.effect2) + ") to points<br> x" + format(player.a.scndAEE) + "(" + format(tmp.a.effect2) + ") to essences<br> x" + format(player.a.scndARE) + "(" + format(tmp.a.effect2) + ") to Runes VII<br> ^" + format(player.a.scndAPEE) + "(" + format(tmp.a.effect2) + ") to points"
		if (player.a.sRarity >=3) return "Artifact 2<br>" + "<h3 style='color: #7FFF00;'>Strong Boosting Artifact</h3><sup>+" + formatWhole(player.a.buyables[12]) + "</sup>" + " Characteristics:<br> x" + format(player.a.scndAPE) + "(" + format(tmp.a.effect2) + ") to points<br> x" + format(player.a.scndAEE)+ "(" + format(tmp.a.effect2) + ") to essences<br> x" + format(player.a.scndARE) + "(" + format(tmp.a.effect2) + ") to Runes VII"
		if (player.a.sRarity >=2) return "Artifact 2<br>" + "<h3 style='color: #1E90FF;'>Hardened Boosting Artifact</h3><sup>+" + formatWhole(player.a.buyables[12]) + "</sup>" + " Characteristics:<br> x" + format(player.a.scndAPE) + "(" + format(tmp.a.effect2) + ") to points<br> x" + format(player.a.scndAEE) + "(" + format(tmp.a.effect2) + ") to essences"
		if (player.a.sRarity >=1) return "Artifact 2<br>" + "<h3 style='color: #383838;'>Weak Boosting Artifact</h3><sup>+" + formatWhole(player.a.buyables[12]) + "</sup>" + " Characteristics:<br> x" + format(player.a.scndAPE) + "(" + format(tmp.a.effect2) + ") to points"	
else return "Artifact Information<br>You have not created any Artifact right now!"},
style: {
			'border-radius': '0%',
		},
	},
},
    layerShown(){return (player.r.points.gte(1e11) || player[this.layer].unlocked)}
})