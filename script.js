const prompt = require('prompt-sync')();
let randomD12Num;
let heroAttackStrength;
let monsterAttackStrength;
let currentMonsterStamina
let currentHeroStamina = 12;
let battleRound = 0;
let itemResponse;

function Player(type, skill, stamina, luck, damage, speed, toughness, armour, items) {
    this.type = type;
    this.skill = skill;
    this.stamina = stamina;
    this.luck = luck;
    this.damage = damage;
    this.speed = speed;
    this.toughness = toughness;
    this.armour = armour;
    this.items = items;
}

function Monster(type, skill, stamina, luck, damage, speed, toughness, armour, items) {
    this.type = type;
    this.skill = skill;
    this.stamina = stamina;
    this.luck = luck;
    this.damage = damage;
    this.speed = speed;
    this.toughness = toughness;
    this.armour = armour;
    this.items = items;
}

//Skill: increases attacks strength
//Speed: allows you to get first hit in
//Damage: the amount of bonus damage a weapon causes 
//Rend: the amount of armour the weapon negates

//build an object for weapons
let weapons = {
    sword: {
        skill: 4,
        speed: 6,
        damage: 2,
        rend: 2
    },
    axe: {
        skill: 3,
        speed: 6,
        damage: 2,
        rend: 2,
    },
    knife: {
        skill: 2,
        speed: 6,
        damage: 1,
        rend: 1,
    },
    mace: {
        skill: 2,
        speed: 2,
        damage: 4,
        rend: 4,
    },
    halberd: {
        skill: 3,
        speed: 2,
        damage: 4,
        rend: 3,
    }
}

let armour =
{
    leather: {
        skill: 2,
        speed: 0,
        protection: 2,
    },
    chainmail: {
        skill: 2,
        speed: -1,
        protection: 3,
    },
    plate: {
        skill: 1,
        speed: -2,
        protection: 4,
    },
}

let items = {
    healingPotion: {
        itemName: "1. Healing potion",
        quantity: 1,
        stamina: 10,
    },
    weakHealingPotion: {
        itemName: "2. Weak healing potion",
        quantity: 1,
        stamina: 5,
    },
    fireBomb: {
        itemName: "3. Fire bomb",
        quantity: 1,
        damage: 5,
    },
    poisonWindGlobe: {
        itemName: "4. Poison wind globe",
        quantity: 1,
        damage: 7,
    },
};

let weaponsInventoryLength = Object.keys(weapons).length;
let armourInventoryLength = Object.keys(armour).length;

// console.log("Weapons Inventory Length = " + weaponsInventoryLength);
let heroWeapon = weapons.sword

//random weapons and armour for the monster
// use the object keys method. The Object.keys() method returns an array with the keys of an object. The Object.keys() method does not change the original object.
let randomWeapon = Object.keys(weapons)[Math.floor(Math.random() * weaponsInventoryLength)]; //square brackets gives a random number
let monsterWeaponsSkillBonus = weapons[randomWeapon].skill;

let randomArmour = Object.keys(armour)[Math.floor(Math.random() * armourInventoryLength)];
let monsterArmourSkillBonus = armour[randomArmour].skill;
let monsterArmourProtectionBonus = armour[randomArmour].protection;

//console.log("weapons skill mod = " + weapons[randomWeapon].skill) //need to pass random weapon
//console.log("weapons speed mod = " + weapons[randomWeapon].speed) //need to pass random weapon
//console.log("weapons damage mod = " + weapons[randomWeapon].damage) //need to pass random weapon
//console.log("weapons rend mod = " + weapons[randomWeapon].rend) //need to pass random weapon
//build and object for armour

//build and object for other items e.g. magic items, explosives etc. 

let hero = new Player("elf",/*skill*/12,/*stamina*/12,/*luck*/12,/*damage*/4,/*speed*/10,/*toughness*/6,/*armour*/0, ["sword", "shield", "leather armour"]);
let lizardman = new Monster("Lizardman",/*skill*/12,/*stamina*/14,/*luck*/10,/*damage*/4,/*speed*/10,/*toughness*/7,/*armour*/0, []);
let hellHornChampion = new Monster("Hellhorn Champion",/*skill*/14,/*stamina*/16,/*luck*/10,/*damage*/4,/*speed*/12,/*toughness*/9,/*armour*/0, []);
let beastman = new Monster("beastman", 8, 16, 8, 4, 6, 10, 0, []);
let ogre = new Monster("Ogre", 7, 16, 7, 5, 6, 12, 0, []);

//hero initial values:  

//array of all possible monsters
let possibleMonsters = [lizardman, hellHornChampion, beastman, ogre];
// chooses a random monster, this sets the index value
let randomMonsterIndex = Math.floor(Math.random() * possibleMonsters.length);

//gets the name field for the random monster
let randomMonster = possibleMonsters[randomMonsterIndex];
let randomMonsterType = possibleMonsters[randomMonsterIndex].type;
console.log("the monster is a " + randomMonsterType);
console.log(`The ${randomMonster.type} carries a rusty ` + randomWeapon + " (skill +" + monsterWeaponsSkillBonus + ")");
console.log(`The ${randomMonster.type} is wearing battered ` + randomArmour + " armour" + " (skill +" + monsterArmourSkillBonus + ", protection +" + monsterArmourProtectionBonus + ")");
randomMonster.items = [randomWeapon, randomArmour];
console.log(randomMonster);


// updates the global random D12 variable each time it is called
function randomD12() {
    randomD12Num = parseInt(Math.floor(Math.random() * 11) + 2);
    // console.log("random D12 = " + randomD12Num);
}

function getHeroAttackStrength() {
    randomD12();
    heroAttackStrength = hero.skill + randomD12Num + heroWeapon.skill;
    console.log("Hero attack strength = " + heroAttackStrength);
}

function getMonsterAttackStrength() {
    randomD12();
    monsterAttackStrength = randomMonster.skill + randomD12Num + monsterWeaponsSkillBonus + monsterArmourSkillBonus;
    console.log(`${randomMonsterType} attack strength = ` + monsterAttackStrength);
    // console.log(monsterWeaponsBonus);
}

function useItem() {
    const useItemPrompt = prompt('Use Item (Y) or (N)?');
    let useItemPromptAnswer = `${useItemPrompt}`;
    console.log(useItemPromptAnswer);

    if (useItemPromptAnswer === "Y" || useItemPromptAnswer === "y") {
        // console.log("fight again!");
        useWhichItem();
    } else if (useItemPromptAnswer === "N" || useItemPromptAnswer === "n") {
        console.log("No item used");
    } else {
        console.log("that's not a Y/N answer, please choose again");
        useItem();
    }
    console.log("----------------------------------");
}

function useWhichItem() {
    
    console.log('Select the corresponding number of the item you want to use or 0 for no');
    // Iterate over the properties of the items object
    for (let key in items) {
        if (items.hasOwnProperty(key)) {
            console.log(items[key].itemName + " quantity = " + items[key].quantity);
        }
    }

    const useItem = prompt('select item number (0 to skip): ');
    itemResponse = `${useItem}`;
    if (itemResponse === "0") { console.log("No item used"); }
    else if (itemResponse === "1") { console.log("Strong healing potion has been drunk! Stamina restored to full!"); }
    else if (itemResponse === "2") { console.log("Weak healing potion has been drunk! 8 Stamina restored!"); }
    else if (itemResponse === "3") { 
        console.log("Fire bomb has been thrown!"); 
        console.log(`The ${randomMonsterType} suffers ${items.fireBomb.damage} damage`);
        currentMonsterStamina -= 5;
        console.log(currentMonsterStamina); }

        else if (itemResponse === "4") { console.log("Poison wind globe has been thrown!"); }
};

function fight() {
    battleRound += 1;
    console.log("--------- Battle round " + battleRound + " ---------");
    useItem();
    if (currentMonsterStamina == 0 || currentMonsterStamina < 0) {
        console.log(`The ${randomMonsterType} lies dead at your feet`);
    } else if (currentHeroStamina == 0 || currentHeroStamina < 0) {
        console.log("You Died");
    } else {

        getHeroAttackStrength();
        getMonsterAttackStrength();
        // console.log("monster is a " + randomMonsterType);

        if (heroAttackStrength > monsterAttackStrength) {
            console.log(`hero wounds! ${randomMonster.type} goes arrrrrgghhh`)
            currentMonsterStamina = (possibleMonsters[randomMonsterIndex].stamina);

            //updates the specified monster stamina as the fight goes on
            possibleMonsters[randomMonsterIndex].stamina = currentMonsterStamina - 2;
            console.log(`${randomMonster.type} stamina = ` + currentMonsterStamina);
            if (currentMonsterStamina == 0 || currentMonsterStamina < 0) {
                console.log("The monster lies dead at your feet.");
                return
            }

            // asks if you want to fight again
            fightAgainYorN();

        } else if (heroAttackStrength == monsterAttackStrength) {
            console.log("attack strength are equal, this round is a draw");
            fightAgainYorN();
        }
        else {
            hero.stamina -= 2; //change this value to whatever the damage characteristic is of the monster
            console.log(`${randomMonster.type} wounds the hero, eeeeek!`)
            console.log("Hero stamina = " + hero.stamina);

            if (hero.stamina == 0 || hero.stamina < 0) {
                console.log("You Died!");
                return
            }

            console.log("----------------------------------");
            // reduce hero health 
            fightAgainYorN();
        }
    }
}

fight();

//ask if you want to fight or flee
function fightAgainYorN() {
    const name = prompt('Fight (Y) or flee (N)?');
    let answer = `${name}`;
    console.log(answer);

    if (answer === "Y" || answer === "y") {
        // console.log("fight again!");
        fight();
    } else if (answer === "N" || answer === "n") {
        console.log("Run for your life!");
    } else {
        console.log("that's not a Y/N answer, please choose again");
        fightAgainYorN();
    }
}


// Run npm install prompt-sync