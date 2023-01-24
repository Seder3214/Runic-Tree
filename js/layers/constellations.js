addLayer("c", {
    name: "Constellations", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		best: new Decimal(0),
        lC: 0,
        dC: 0,
        jC: 0,
        kC: 0,
    }},
    color: "#9db1cc",
    requires() {return Decimal.pow(10, 42900)},
    resource: 'stardust',
    branches: ["r", "a"],
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 19, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "c: Reset for stardust", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
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
		                    "Constellations": {
                content: [
                    ["blank", "15px"],
                    "clickables"
                ]
            },
            "Stars": {
                content: [
                    ["blank", "15px"],
                    "upgrades"
                ]
            },
            "Milestones": {
                content: [
                    ["blank", "15px"],
                    "milestones"
                ]
            },
	},
	},
    clickables: {
        11: {
            title() {return "Choose Luona-Wan"},
            display() {if (player.c.lC >= 1) return "Type: Passive<br>Main boost: Points<br>Amount of stars: 9. <br> Req: " + format(new Decimal(2)) + " stardust<br> Description: Turn off Mana layer. <br> Currently: [ACTIVE]"
               else return "Type: Passive<br>Main boost: Points<br>Amount of stars: 9. <br> Req: " + format(new Decimal(2)) + " stardust<br> Description: Turn off Mana layer. <br>Currently: [INACTIVE]"
            },
            canClick() { return player.c.points.gte(new Decimal(3))},
    onClick() {
        return player.c.lC = player.c.lC + 1
    },
        },
        12: {
            title() {return "Choose Delalurr"},
            display() {
                if (player.c.dC >= 1) return "Type: Active<br>Main boost: Essences<br>Amount of stars: 7. <br> Req: " + format(new Decimal(1)) + " stardust<br> Description: Turn off Artifacts. <br> Currently: [ACTIVE]"
               else return "Type: Active<br>Main boost: Essences<br>Amount of stars: 7<br> Req: " + format(new Decimal(1)) + " stardust<br> Description: Turn off Artifacts. <br>Currently: [INACTIVE]"
            },
            canClick() { return player.c.points.gte(new Decimal(1))},
    onClick() {
        return player.c.dC = player.c.dC + 1
    },
        },
        13: {
            title() {return "Choose Jars-Alfarr"},
            display() {
                if (player.c.jC >= 1) return "Type: Active<br>Main boost: Runes<br>Amount of stars: 8. <br> Req: " + format(new Decimal(4)) + " stardust<br> Description: Only essences and runes available. <br> Currently: [ACTIVE]"
                else return "Type: Active<br>Main boost: Runes<br>Amount of stars: 8<br> Req: " + format(new Decimal(4)) + " stardust<br> Description: Only essences and runes available. <br>Currently: [INACTIVE]"
            },
            canClick() { return player.c.points.gte(new Decimal(4))},
    onClick() {
        return player.c.jC = player.c.jC + 1
    },
        },
        14: {
            title() {return "Choose Keres-Iluur"},
            display() {if (player.c.kC >= 1) return "Type: Neutral<br>Main boost: Mana<br>Amount of stars: 11. <br> Req: " + format(new Decimal(15)) + " stardust<br> Description: Mana affect other layers gain a lot weaker. <br> Currently: [ACTIVE]"
               else return "Type: Neutral<br>Main boost: Mana<br>Amount of stars: 11<br> Req: " + format(new Decimal(15)) + " stardust<br> Description: Mana affect other layers gain a lot weaker. <br>Currently: [INACTIVE]"
            },
            canClick() { return player.c.points.gte(new Decimal(15))},
    onClick() {
        return player.c.kC = player.c.kC + 1
    },
        },
    },
    milestones: {
        11: {
            requirementDescription: "1 Stardust",
            effectDescription: "Keep two first rows of Essence upgrades and boost Common & Uncommon gain",
            done() {return player.c.points.gte(1)},
        },
    },
    upgrades: {
        11: {
            title: "(D-1) D-UB6",
            description: "Runes boosts Essence gain",
            cost:  Decimal.pow(10, 320),
            effect() {return player.r.points.max(1).log(1.5).pow(1.85).max(1)},
                    effectDisplay() {return "x" + format(upgradeEffect("c", 11))},
            unlocked() {return (player.c.dC >= 1)},
            currencyDisplayName: "points",
            currencyInternalName: "points",
            currencyLayer: "",
            style() {
                        if (hasUpgrade("c", 11) || player.points.gte(this.cost)) return {
                                      'width': "160px",
              'border-radius': '5%',
              'min-height': "100px",
              'margin-top': '17px',
                        'margin-left': '13px',
                    "background-color": 'black',
                    "border-color": '#9db1cc',
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
    12: {
        title: "(D-C2) D-UB6",
        branches: ["23"],
        description: "Unlock a final Delalurr challenge and boost points gain by Essences",
        cost:  Decimal.pow(10, 895),
        effect() {return player.e.points.max(1).log(1.2).pow(4.85).max(1)},
                effectDisplay() {return "x" + format(upgradeEffect("c", 12))},
                unlocked() {return (hasUpgrade("c", 23))},
        currencyDisplayName: "points",
        currencyInternalName: "points",
        currencyLayer: "",
        style() {
                    if (hasUpgrade("c", 12) || player.points.gte(this.cost)) return {
                                  'width': "160px",
          'border-radius': '5%',
          'min-height': "100px",
          'margin-top': '17px',
                    'margin-left': '13px',
                "background-color": 'black',
                "border-color": '#9db1cc',
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
    21: {
        title: "(D-2) D-VC2",
        description: "Give a boost to Essences gain based on points",
        cost:  Decimal.pow(10, 347),
        branches: ["11"],
        effect() {return player.points.max(1).log(2500).pow(1.85).max(1)},
                effectDisplay() {return "x" + format(upgradeEffect("c", 21))},
        unlocked() {return (hasUpgrade("c", 11))},
        currencyDisplayName: "points",
        currencyInternalName: "points",
        currencyLayer: "",
        style() {
                    if (hasUpgrade("c", 21) || player.points.gte(this.cost)) return {
                                  'width': "160px",
          'border-radius': '5%',
          'min-height': "100px",
          'margin-top': '17px',
                    'margin-left': '13px',
                "background-color": 'black',
                "border-color": '#9db1cc',
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
23: {
    title: "(D-7) D-JK3",
    description: "Give a boost to Essences gain based on buyed Stars in all constellations",
    cost:  Decimal.pow(10, 680),
    branches: ["21"],
    effect() {return ret = Decimal.pow(180000, player.c.upgrades.length).max(1)},
            effectDisplay() {return "x" + format(upgradeEffect("c", 23))},
    unlocked() {return (hasUpgrade("c", 21))},
    currencyDisplayName: "points",
    currencyInternalName: "points",
    currencyLayer: "",
    style() {
                if (hasUpgrade("c", 23) || player.points.gte(this.cost)) return {
                              'width': "160px",
      'border-radius': '5%',
      'min-height': "100px",
      'margin-top': '17px',
                'margin-left': '13px',
            "background-color": 'black',
            "border-color": '#9db1cc',
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
31: {
    title: "(D-3) D-AL7",
    description: "Give a boost to Runes gain based on Essences",
    cost:  Decimal.pow(10, 365),
    branches: ["21"],
    effect() {return player.e.points.max(1).log(2).pow(13.55)},
            effectDisplay() {return "x" + format(upgradeEffect("c", 31))},
    unlocked() {return (hasUpgrade("c", 21))},
    currencyDisplayName: "points",
    currencyInternalName: "points",
    currencyLayer: "",
    style() {
                if (hasUpgrade("c", 31) || player.points.gte(this.cost)) return {
                              'width': "160px",
      'border-radius': '5%',
      'min-height': "100px",
      'margin-top': '17px',
                'margin-left': '13px',
            "background-color": 'black',
            "border-color": '#9db1cc',
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
    title: "(D-4) D-MN75",
    description: "Evolve Challenges boosts Essences exponentially",
    cost:  Decimal.pow(10, 380),
    branches: ["21"],
    effect() {return player.v.points.pow(0.5).max(1)},
            effectDisplay() {return "^" + format(upgradeEffect("c", 32))},
    unlocked() {return (hasUpgrade("c", 21))},
    currencyDisplayName: "points",
    currencyInternalName: "points",
    currencyLayer: "",
    style() {
                if (hasUpgrade("c", 32) || player.points.gte(this.cost)) return {
                              'width': "160px",
      'border-radius': '5%',
      'min-height': "100px",
      'margin-top': '17px',
                'margin-left': '13px',
            "background-color": 'black',
            "border-color": '#9db1cc',
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
41: {
    title: "(D-C1) D-UJ345-C",
    description: "Unlock a new Evolve Challenge and Mana boosts Essences",
    cost:  Decimal.pow(10, 440),
    branches: ["31", "32"],
    effect() {return player.al.points.pow(0.2).max(1)},
            effectDisplay() {return "x" + format(upgradeEffect("c", 41))},
    unlocked() {return (hasUpgrade("c", 32))},
    currencyDisplayName: "points",
    currencyInternalName: "points",
    currencyLayer: "",
    style() {
                if (hasUpgrade("c", 41) || player.points.gte(this.cost)) return {
                              'width': "160px",
      'border-radius': '5%',
      'min-height': "100px",
      'margin-top': '17px',
                'margin-left': '13px',
            "background-color": 'black',
            "border-color": '#9db1cc',
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
    },
    challenges: {
},
})