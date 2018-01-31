import React from 'react'
import PowerRoll from './src/containers/PowerRoll'
export const deepClone = (obj) => {
  const result = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    result[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
  }

  return result;
};


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

// This function takes a string from the Power.js component's Content and replaces all regex instances of a dice roll with the PowerRoll.js component.
// TODO there is a DEBUG to do for this where if the modifier is negative.
export const replaceRollsRegex = (str) => {
  // Needed to wrap regex expressions with () group in order for fn reactStringReplace to work
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

  const regexArray = [xdx, xdxx, xxdx, xxdxx, xdxpx, xdxmx, xdxpxx, xdxmxx, xdxxpx, xdxxmx, xdxpxx, xdxxmxx, xdxxpx, xdxxpxx, xxdxxmx, xxdxxpx, xxdxxpxx, xxdxxmxx]
  // const newStr = str
  // const testStr = str
  const reactStringReplace = require('react-string-replace')
  let replacedText = str
  for (let exp of regexArray) {
    replacedText = reactStringReplace(replacedText, exp, (match, i) => (
      <PowerRoll style={{ color: 'red' }} roll={match}></PowerRoll>
    ))
    console.log('replaced text', replacedText);
  }
  return replacedText
}

export const getNumberOfDice = (roll) => {
  const singleNumberExp = /[0-9]d/g
  const singleNumberValue = /[0-9]/g
  const doubleNumberExp = /[0-9][0-9]d/g
  const doubleNumberValue = /[0-9][0-9]/g
  if (roll.match(doubleNumberExp)) {
    const numberOfDice = roll.match(doubleNumberExp)[0].match(doubleNumberValue)
    return numberOfDice
  }
  const numberOfDice = roll.match(singleNumberExp)[0].match(singleNumberValue)
  return numberOfDice
}

export const getSidesOfDice = (roll) => {
  const singleDieExp = /d[0-9]/g
  const singleDieValue = /[0-9]/g
  const doubleDieExp = /d[0-9][0-9]/g
  const doubleDieValue = /[0-9][0-9]/g
  if (roll.match(doubleDieExp)) {
    const sidesOfDice = roll.match(doubleDieExp)[0].match(doubleDieValue)
    return sidesOfDice
  }
  const sidesOfDice = roll.match(singleDieExp)[0].match(singleDieValue)
  return sidesOfDice
}
// Curently
export const getModifier = (roll) => {
  const singleModExp = /\+\s[0-9]/g
  const singleModValue = /[0-9]/g
  const doubleModExp = /\+\s[0-9][0-9]/g
  const doubleModValue = /[0-9][0-9]/g
  if (roll.match(doubleModExp)) {
    const modifier = roll.match(doubleModExp)[0].match(doubleModValue)
    return modifier
  }
  const modifier = roll.match(singleModExp)[0].match(singleModValue)
  return modifier
}
