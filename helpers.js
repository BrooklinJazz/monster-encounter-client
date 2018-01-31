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
export const replaceRollsRegex = (str) => {
  // Needed to wrap regex expressions with () group in order for fn reactStringReplace to work
  // (1d6)
  const xdx = /(\([0-9]d[0-9]\))/g
  // (1d12)
  const xdxx = /(\([0-9]d[0-9][0-9]\))/g
  // (12d6) \([0-9][0-9]d[0-9]\)
  const xxdx = /(\([0-9][0-9]d[0-9]\))/g
  // (12d12) \([0-9][0-9]d[0-9][0-9]\)
  const xxdxx = /(\([0-9][0-9]d[0-9][0-9]\))/g
  // (1d6 + 1) \([0-9]d[0-9]\s\+\s[0-9]\)
  const xdxpx = /(\([0-9]d[0-9]\s\+\s[0-9]\))/g
  // (1d6 + 12)  \([0-9]d[0-9]\s\+\s[0-9][0-9]\)
  const xdxpxx = /(\([0-9]d[0-9]\s\+\s[0-9][0-9]\))/g
  // (1d12 + 1) \([0-9]d[0-9][0-9]\s\+\s[0-9]\)
  const xdxxpx = /(\([0-9]d[0-9][0-9]\s\+\s[0-9]\))/g
  // (1d12 + 12) \([0-9]d[0-9][0-9]\s\+\s[0-9][0-9]\)
  const xdxxpxx = /(\([0-9]d[0-9][0-9]\s\+\s[0-9][0-9]\))/g
  // (12d12 + 1) \([0-9][0-9]d[0-9][0-9]\s\+\s[0-9]\)
  const xxdxxpx = /(\([0-9][0-9]d[0-9][0-9]\s\+\s[0-9]\))/g
  // (12d12 + 12) \([0-9][0-9]d[0-9][0-9]\s\+\s[0-9][0-9]\)
  const xxdxxpxx = /(\([0-9][0-9]d[0-9][0-9]\s\+\s[0-9][0-9]\))/g

  const regexArray = [xdx, xdxx, xxdx, xxdxx, xdxpx, xdxpxx, xdxxpx, xdxpxx, xdxxpx, xdxxpxx, xxdxxpx, xxdxxpxx]
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
  const singleDieExp = /[0-9]d/g
  const singleDieValue = /[0-9]/g
  const doubleDieValue = /[0-9][0-9]/g
  const doubleDieExp = /[0-9][0-9]d/g
  if (roll.match(doubleDieExp)) {
    const numberOfDice = roll.match(doubleDieExp)[0].match(doubleDieValue)
    return numberOfDice
  }
  const numberOfDice = roll.match(singleDieExp)[0].match(singleDieValue)
  return numberOfDice
}
