import React from 'react'
import PowerRoll from './containers/PowerRoll'
import D20Roll from './containers/D20Roll'

export const deepClone = (obj) => {
  const result = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    result[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
  }

  return result;
};

// gets a random integer between 1 and 20
export const d20 = () => {
  const result = Math.floor(Math.random() * 20) + 1
  return result
}
// take an Ability Score to it's modifier i.e 12 becomes 1 or 26 becomes 8.
// always subtract 10 from n and divide by 2. always round down.
export const convScoreToMod  = (n) => {
  const result = Math.floor( (n - 10) / 2)
  return result
}

// replace regular expressions with a desired value or
// component
const reactStringReplace = require('react-string-replace')
// This function takes a string from the Power.js
// component's Content and replaces all regular expressions
// of a sided dice roll with the PowerRoll.js and all
// instances of a d20 dice roll with the D20Roll.js
// component.
export const replaceRollsRegex = (str) => {
  // Needed to wrap regex expressions with () group in order for fn reactStringReplace to work
  /******************************
  Sided Die Rolls
  ******************************/
  // Die Expressions to be replaced when found in str
  // (1d6)
  const xdx = /(\([0-9]d[0-9]\))/g
  // (1d12)
  const xdxx = /(\([0-9]d[0-9][0-9]\))/g
  // (12d6)
  const xxdx = /(\([0-9][0-9]d[0-9]\))/g
  // (12d12)
  const xxdxx = /(\([0-9][0-9]d[0-9][0-9]\))/g
  // (1d6 + 1)
  const xdxpx = /(\([0-9]d[0-9]\s\+\s[0-9]\))/g
  // (1d6 - 1)
  const xdxmx = /(\([0-9]d[0-9]\s\-\s[0-9]\))/g
  // (1d6 + 12)
  const xdxpxx = /(\([0-9]d[0-9]\s\+\s[0-9][0-9]\))/g
  // (1d12 - 1)
  const xdxmxx = /(\([0-9]d[0-9]\s\-\s[0-9][0-9]\))/g
  // (1d12 + 1)
  const xdxxpx = /(\([0-9]d[0-9][0-9]\s\+\s[0-9]\))/g
  // (1d12 - 1)
  const xdxxmx = /(\([0-9]d[0-9][0-9]\s\-\s[0-9]\))/g
  // (1d12 + 12)
  const xdxxpxx = /(\([0-9]d[0-9][0-9]\s\+\s[0-9][0-9]\))/g
  // (1d12 - 12)
  const xdxxmxx = /(\([0-9]d[0-9][0-9]\s\-\s[0-9][0-9]\))/g
  // (12d12 + 1)
  const xxdxxpx = /(\([0-9][0-9]d[0-9][0-9]\s\+\s[0-9]\))/g
  // (12d12 - 1)
  const xxdxxmx = /(\([0-9][0-9]d[0-9][0-9]\s\-\s[0-9]\))/g
  // (12d12 + 12)
  const xxdxxpxx = /(\([0-9][0-9]d[0-9][0-9]\s\+\s[0-9][0-9]\))/g
  // (12d12 - 12)
  const xxdxxmxx = /(\([0-9][0-9]d[0-9][0-9]\s\-\s[0-9][0-9]\))/g

  // An array of all of the expressions declared above.
  const regexArray = [xdx, xdxx, xxdx, xxdxx, xdxpx, xdxmx, xdxpxx, xdxmxx, xdxxpx, xdxxmx, xdxpxx, xdxxmxx, xdxxpx, xdxxpxx, xxdxxmx, xxdxxpx, xxdxxpxx, xxdxxmxx]

  // replacedText is equal to the obj.Content given from the Power Component.
  // We will use this to return the replacedText value.
  let replacedText = str
  // replacing all sided Die roll expressions with PowerRoll.js
  for (let exp of regexArray) {
    replacedText = reactStringReplace(replacedText, exp, (match, i) => (
      <PowerRoll key={i + exp} style={{ color: 'red' }} roll={match}></PowerRoll>
    ))
  }

  /******************************
  D20 Die Rolls
  ******************************/
  // Modifier Expressions to be replaced:
  // +5
  const px = /(\+[0-9]\s)/g
  // +12
  const pxx = /(\+[0-9][0-9])/g
  // -5
  const mx = /(\-[0-9]\s)/g
  // -12
  const mxx = /(\-[0-9][0-9])/g
  // an array of the expressions declared above
  const d20regexArray = [px, pxx, mx, mxx]
  // replace all of the expressions found with D20Roll.js
  for (let exp of d20regexArray) {
    replacedText = reactStringReplace(replacedText, exp, (match, i) => (
      <D20Roll key={i + exp} style={{ color: 'red' }} roll={match}></D20Roll>
    ))
  }
  // Now that d20 expressions and sided die roll expressions are replaced with clickable components PowerRoll and D20Roll, return the string to the Power.js component in MonsterDetail.js
  return replacedText
}

// return number of dice as a number. .match() returns an array so use [0] on array with one element to get number.
export const getNumberOfDice = (roll) => {
  const singleNumberExp = /[0-9]d/g
  const singleNumberValue = /[0-9]/g
  const doubleNumberExp = /[0-9][0-9]d/g
  const doubleNumberValue = /[0-9][0-9]/g
  if (roll.match(doubleNumberExp)) {
    const numberOfDice = roll.match(doubleNumberExp)[0].match(doubleNumberValue)[0]
    return numberOfDice
  }
  const numberOfDice = roll.match(singleNumberExp)[0].match(singleNumberValue)[0]
  return numberOfDice
}

// gets the sides of dice when passed a string i.e (1d6 + 4) returns 6
// this also works for similar dice expressions retrieved by replaceRollsRegex
export const getSidesOfDice = (roll) => {
  const singleDieExp = /d[0-9]/g
  const singleDieValue = /[0-9]/g
  const doubleDieExp = /d[0-9][0-9]/g
  const doubleDieValue = /[0-9][0-9]/g
  if (roll.match(doubleDieExp)) {
    const sidesOfDice = roll.match(doubleDieExp)[0].match(doubleDieValue)[0]
    return sidesOfDice
  }
  const sidesOfDice = roll.match(singleDieExp)[0].match(singleDieValue)[0]
  return sidesOfDice
}
// gets the modifier when passed a string. i.e. (1d6 + 4) returns 4
// this also works for similar dice expressions retrieved by replaceRollsRegex
export const getModifier = (roll) => {
  const singleModExp = /\+\s[0-9]/g
  const singleModValue = /[0-9]/g
  const doubleModExp = /\+\s[0-9][0-9]/g
  const doubleModValue = /[0-9][0-9]/g

  const negSingleModExp = /\-\s[0-9]/g
  const negDoubleModExp = /\-\s[0-9][0-9]/g

  if (roll.match(doubleModExp)) {
    const modifier = roll.match(doubleModExp)[0].match(doubleModValue)[0]
    return modifier
  } else if (roll.match(negDoubleModExp)) {
    const modifier = roll.match(negDoubleModExp)[0].match(doubleModValue)[0]
    return 0 - modifier
  } else if (roll.match(negSingleModExp)) {
    const modifier = roll.match(negSingleModExp)[0].match(singleModValue)[0]
    return 0 - modifier
  } else if (roll.match(singleModExp)) {
    const modifier = roll.match(singleModExp)[0].match(singleModValue)[0]
    return modifier
  }
  return 0
}

// helper function to get random number between min and max inclusive.
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// return a roll of num number of die with dice sides. as an array
// i.e. when passed (2, 6) the function rolls two dice with 6 sides.
// the result will return like [x, y] where x and y
// are random numbers between 1 and 6
export const rollSidedDice = (num, dice) => {
  let rollArray = []
  for (var i = 0; i < num; i++) {
    rollArray[i] = getRandomInt(1, dice)
  }
  return rollArray
}

export const limitMonsterHpChange = (i, combatant, payload, grouped) => {
  if (i !== payload.index || isNaN(payload.hpChange) ) {
    // if the input given by hpChange is not a number
    // or the index of the current monster doesn't match
    // the expected index of payload: return the combatant as it is
    return combatant

    // if healing applied to monster brings it above max health
  } else if (payload.combatant.currentHp - payload.hpChange > payload.combatant.HP.Value) {
    // set currentHp to maxHp `payload.combatant.HP.Value`
    payload.combatant.currentHp = payload.combatant.HP.Value
    // return the combatant with max hp
    return payload.combatant

  } else if (payload.combatant.currentHp - payload.hpChange < 0) {
    payload.combatant.currentHp = 0
    return payload.combatant
  } else {
    // we are applying damage to the combatant so positive numbers reduce
    // the combatant's currentHp
    payload.combatant.currentHp -= payload.hpChange
    // return the combatant with changed HP
    return payload.combatant
  }
}

export const flatten =(arr) => {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}