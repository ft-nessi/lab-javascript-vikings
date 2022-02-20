// Soldier
class Soldier {
  constructor(health, strength) {
    this.health = health;
    this.strength = strength;
  }

  attack() {
    return this.strength;
  }

  receiveDamage(damage) {
    this.health -= damage;
  }
}

// Viking
class Viking extends Soldier {
  constructor(name, health, strength) {
    super(health, strength);
    this.name = name;
  }

  receiveDamage(damage) {
    this.health -= damage;
    if (this.health > 0) {
      return `${this.name} has received ${damage} points of damage`
    } else if (this.health === 0) {
      return `${this.name} has died in act of combat`
    }
  }

  battleCry() {
    return `Odin Owns You All!`;
  }

}

// Saxon
class Saxon extends Soldier {
  constructor(health, strength) {
    super(health, strength)
  }
  
  receiveDamage(damage) {
    this.health -= damage;
    if(this.health > 0) {
      return (`A ${this.constructor.name} has received ${damage} points of damage`)
    } else if (this.health <= 0) {
      return `A Saxon has died in combat`
    } 
  }
}

// War
class War {
  constructor() {
    this.vikingArmy = [];
    this.saxonArmy = [];
  }

  addViking(viking) {
    this.vikingArmy.push(viking);
  }

  addSaxon(Saxon) {
    this.saxonArmy.push(Saxon)
  }

  vikingAttack() {
     
    const randomSaxon = this.saxonArmy[Math.floor(Math.random() * this.saxonArmy.length)];
    const randomViking = this.vikingArmy[Math.floor(Math.random() * this.vikingArmy.length)];

    const damageOfSaxon = randomSaxon.receiveDamage(randomViking.attack());
    
    if (damageOfSaxon === `A Saxon has died in combat`) {
      const indexOfRandomSaxon = this.saxonArmy.indexOf(randomSaxon);
      this.saxonArmy.splice(indexOfRandomSaxon, 1)
    }
    return damageOfSaxon;
  }

  saxonAttack() {
     
    const randomSaxon = this.saxonArmy[Math.floor(Math.random() * this.saxonArmy.length)];
    const randomViking = this.vikingArmy[Math.floor(Math.random() * this.vikingArmy.length)];

    const damageOfViking = randomViking.receiveDamage(randomSaxon.attack());
    
    if (damageOfViking === `${randomViking.name} has died in act of combat`) {
      
      const indexOfRandomViking = this.vikingArmy.indexOf(randomViking);
      this.vikingArmy.splice(indexOfRandomViking, 1)
    }
    return damageOfViking;
  }

  // Super Bonus: generic attack method

  genericAttack(attacker) {
    const victimArmy = attacker === Saxon ? this.vikingArmy : this.saxonArmy;

    const randomAttacker = attacker === Saxon ? this.saxonArmy[Math.floor(Math.random() * this.saxonArmy.length)] 
    : this.vikingArmy[Math.floor(Math.random() * this.vikingArmy.length)];

    const randomVictim = attacker === Saxon ? this.vikingArmy[Math.floor(Math.random() * this.vikingArmy.length)]
    : this.saxonArmy[Math.floor(Math.random() * this.saxonArmy.length)];

    let damageOfVictim = randomVictim.receiveDamage(randomAttacker.attack());

    if (randomVictim.health <= 0 ) {
      
      const indexOfRandomVictim = victimArmy.indexOf(randomVictim);
      victimArmy.splice(indexOfRandomVictim, 1)
    }
    return damageOfVictim;

  }
  

  showStatus() {
    if (this.saxonArmy.length === 0) {
      return `Vikings have won the war of the century!`
    } else if (this.vikingArmy.length === 0) {
      return `Saxons have fought for their lives and survived another day...`
    } else if (this.saxonArmy.length >= 1 && this.vikingArmy.length >= 1) {
      return `Vikings and Saxons are still in the thick of battle.`
    }

  }

}



// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = { Soldier, Viking, Saxon, War };
}
