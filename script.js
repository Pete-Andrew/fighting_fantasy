const prompt = require('prompt-sync')();
let randomD12Num;
let heroAttackStrength;
let monsterAttackStrength;

function Player (type,skill,stamina,luck,damage,speed,toughness,armour,items) {
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

function Monster (type,skill,stamina,luck,damage,speed,toughness,armour,items) {
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

let hero = new Player ("elf",/*skill*/12,/*stamina*/12,/*luck*/12,/*damage*/4,/*speed*/10,/*toughness*/6,/*armour*/2,["sword","shield","leather armour"]);
let lizardman = new Monster ("Lizardman",/*skill*/12,/*stamina*/14,/*luck*/10,/*damage*/4,/*speed*/10,/*toughness*/7,/*armour*/4,["halberd", "chainmail"]);
let beastman = new Monster ("beastman",8,16,8,4,6,10,2["axe","leather armour"]);
let ogre = new Monster ("Ogre",7,16,7,5,6,12,4);

//array of all possible monsters
let possibleMonsters = [lizardman,beastman,ogre];
// chooses a random monster, this sets the index value
let randomMonsterIndex = Math.floor(Math.random() * possibleMonsters.length);
// console.log("random Monster index = " + randomMonsterIndex);
//gets the name field for the random monster
let randomMonsterType = possibleMonsters[randomMonsterIndex].type;
console.log("random Monster is a = " + randomMonsterType);

// updates the global random D12 variable each time it is called
function randomD12 () {
    randomD12Num = parseInt(Math.floor(Math.random() * 11) + 2);   
    // console.log("random D12 = " + randomD12Num);
}

function getHeroAttackStrength() {
    randomD12();
    heroAttackStrength = hero.skill+randomD12Num;
    console.log("Hero attack strength = " + heroAttackStrength);
}

function getMonsterAttackStrength() {
    randomD12();
    monsterAttackStrength = possibleMonsters[randomMonsterIndex].skill+randomD12Num;
    console.log("Monster attack strength = " + monsterAttackStrength);
}

function fight () {
    
    getHeroAttackStrength();
    getMonsterAttackStrength();
    console.log("monster is a " + randomMonsterType);
    
    if (heroAttackStrength > monsterAttackStrength) {
        console.log("hero wounds! Monster goes arrrrrgghhh")
        let currentMonsterStamina = (possibleMonsters[randomMonsterIndex].stamina)-2;
        // need to update the specified monster stamina
        console.log("monster stamina = " + currentMonsterStamina);
        fightAgainYorN();


    } else {
        console.log("monster wounds the hero, eeeeek!")
        fightAgainYorN();

    }
}
fight();

//ask if you want to fight or flee
function fightAgainYorN () {    
    const name = prompt('Fight (Y) or flee (N)?');        
    let answer = `${name}`;
    console.log(answer);

    if (answer === "Y" || answer === "y") {
        console.log("fight again!");
        fight();
    } else if (answer === "N" || answer === "n") {
        console.log("Run for your life!");
    }  else {
        console.log("that's not a Y/N answer, please choose again");
        fightAgainYorN();
    } 
}


// Run npm install prompt-sync