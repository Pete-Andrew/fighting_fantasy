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
let beastman = new Monster ("beastman",8,16,8,4,6,10,2["axe","leather armour"])
let ogre = new Monster ("Ogre",7,16,7,5,6,12,4)

let possibleMonsters = [lizardman,beastman,ogre];
let randomMonster = possibleMonsters[Math.floor(Math.random() * possibleMonsters.length)].type;

console.log(possibleMonsters);
console.log(hero.items);

// updates the global random D12 variable each time it is called
function randomD12 () {
    randomD12Num = parseInt(Math.floor(Math.random() * 11) + 2);   
    console.log("random D12 = " + randomD12Num);
}


function getHeroAttackStrength() {
    randomD12();
    heroAttackStrength = hero.skill+randomD12Num;
    console.log("Hero attack strength = " + heroAttackStrength);

}

function getMonsterAttackStrength(randomMonster) {
    
    monsterAttackStrength = randomMonster.skill+randomD12Num;
    console.log("Monster attack strength = " + monsterAttackStrength);
}


function fight (hero, monster) {
    
    getHeroAttackStrength();
    getMonsterAttackStrength(randomMonster);
    console.log("monster is a " + monster);
    
    if (hero.skill+randomD12Num > monster.skill+randomD12Num) {
        console.log("hero attack strength this turn = " + heroAttackStrength);
        console.log("hero wounds! Monster goes arrrrrgghhh")
    } else {
        console.log("monster wounds the hero, eeeeek!")
    }
}
fight(hero, randomMonster);