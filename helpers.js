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

export const filterXDX = (str) => {
  const expression = /\([1-9]d[1-9]\s\+\s[1-9]\)/
  if (str.match(expression)) {
    const rolled = str.match(expression)[0]
    const numDice = str[str.search(expression)]
    const newStr = str.replace(expression, `X${rolled}X`)
    return newStr
  }
  else {
    return str
  }
}

// var str = 'Twas the night before Xmas...';
// var newstr = str.replace(/xmas/i, 'Christmas');
// console.log(newstr);  // Twas the night before Christmas...

// filter more complex expressions first?

// (1d6) \([1-9]d[1-9]\)
// (1d12) \([1-9]d[1-9][1-9]\)
// (12d6) \([1-9][1-9]d[1-9]\)
// (12d12) \([1-9][1-9]d[1-9][1-9]\)
//
// (1d6 + 1) \([1-9]d[1-9]\s\+\s[1-9]\)
// (1d6 + 12)  \([1-9]d[1-9]\s\+\s[1-9][1-9]\)
// (1d12 + 1) \([1-9]d[1-9][1-9]\s\+\s[1-9]\)
// (1d12 + 12) \([1-9]d[1-9][1-9]\s\+\s[1-9][1-9]\)
// (12d12 + 1) \([1-9][1-9]d[1-9][1-9]\s\+\s[1-9]\)
// (12d12 + 12) \([1-9][1-9]d[1-9][1-9]\s\+\s[1-9][1-9]\)
