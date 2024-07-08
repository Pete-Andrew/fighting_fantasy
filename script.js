const prompt = require('prompt-sync')();
let randomD12Num;
let heroAttackStrength;
let monsterAttackStrength;
let currentMonsterStamina
let currentHeroStamina = 12;

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
    sword:{
        skill:4,
        speed:6,
        damage:2,
        rend:2
    },
    axe:{
        skill:3,
        speed:6,
        damage:2,
        rend:2,
    },
    knife:{
        skill:2,
        speed:6,
        damage:1,
        rend:1,
    },
    mace: {
        skill: 2,
        speed: 2,
        damage:4,
        rend:4,
    },
    halberd: {
        skill:3,
        speed:2,
        damage:4,
        rend:3,
    }
}

let armour =
    {
    leather: {
        skill:2,
        speed:0,
        protection:2,        
    },
    chainmail: {
        skill:2,
        speed:-1,
        protection:3,  
    },
    plate: {
        skill:1,
        speed:-2,
        protection:4,        
    },
 }

let weaponsInventoryLength = Object.keys(weapons).length;
let armourInventoryLength = Object.keys(armour).length;

// console.log("Weapons Inventory Length = " + weaponsInventoryLength);

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
let beastman = new Monster("beastman", 8, 16, 8, 4, 6, 10, 0,[]);
let ogre = new Monster("Ogre", 7, 16, 7, 5, 6, 12, 0, []);

//array of all possible monsters
let possibleMonsters = [lizardman, beastman, ogre];
// chooses a random monster, this sets the index value
let randomMonsterIndex = Math.floor(Math.random() * possibleMonsters.length);

//gets the name field for the random monster
let randomMonster = possibleMonsters[randomMonsterIndex];
let randomMonsterType = possibleMonsters[randomMonsterIndex].type;
console.log("the random Monster is a " + randomMonsterType);
console.log("The monster carries a rusty " + randomWeapon + " (skill +" + monsterWeaponsSkillBonus + ")" );
console.log("The monster is wearing battered " + randomArmour + " armour" + " (skill +" + monsterArmourSkillBonus + ", protection +" + monsterArmourProtectionBonus + ")");
console.log(randomMonster);

// updates the global random D12 variable each time it is called
function randomD12() {
    randomD12Num = parseInt(Math.floor(Math.random() * 11) + 2);
    // console.log("random D12 = " + randomD12Num);
}

function getHeroAttackStrength() {
    randomD12();
    heroAttackStrength = hero.skill + randomD12Num;
    console.log("Hero attack strength = " + heroAttackStrength );
}

function getMonsterAttackStrength() {
    randomD12();
    monsterAttackStrength = randomMonster.skill + randomD12Num + monsterWeaponsSkillBonus + monsterArmourSkillBonus; 
    console.log("Monster attack strength = " + monsterAttackStrength);
    // console.log(monsterWeaponsBonus);
}


function fight() {

    if (currentMonsterStamina == 0 || currentMonsterStamina < 0) {
        console.log("The monster lies dead at your feet");
    } else if (currentHeroStamina == 0 || currentHeroStamina < 0) {
        console.log("You Died");
    } else {

        getHeroAttackStrength();
        getMonsterAttackStrength();
        console.log("monster is a " + randomMonsterType);

        if (heroAttackStrength > monsterAttackStrength) {
            console.log("hero wounds! Monster goes arrrrrgghhh")
            currentMonsterStamina = (possibleMonsters[randomMonsterIndex].stamina);

            //updates the specified monster stamina as the fight goes on
            possibleMonsters[randomMonsterIndex].stamina = currentMonsterStamina - 2;
            console.log("monster stamina = " + currentMonsterStamina);
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
            console.log("monster wounds the hero, eeeeek!")
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
        console.log("fight again!");
        fight();
    } else if (answer === "N" || answer === "n") {
        console.log("Run for your life!");
    } else {
        console.log("that's not a Y/N answer, please choose again");
        fightAgainYorN();
    }
}


// Run npm install prompt-sync