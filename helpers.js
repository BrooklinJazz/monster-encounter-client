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

export const replaceRollsRegex = (str, replacement) => {
  const xdx = /\([1-9]d[1-9]\)/g
  // (1d6)
  const xdxx = /\([1-9]d[1-9][1-9]\)/g
  // (1d12)
  const xxdx = /\([1-9][1-9]d[1-9]\)/g
  // (12d6) \([1-9][1-9]d[1-9]\)
  const xxdxx = /\([1-9][1-9]d[1-9][1-9]\)/g
  // (12d12) \([1-9][1-9]d[1-9][1-9]\)
  const xdxpx = /\([1-9]d[1-9]\s\+\s[1-9]\)/g
  // (1d6 + 1) \([1-9]d[1-9]\s\+\s[1-9]\)
  const xdxpxx = /\([1-9]d[1-9]\s\+\s[1-9][1-9]\)/g
  // (1d6 + 12)  \([1-9]d[1-9]\s\+\s[1-9][1-9]\)
  const xdxxpx = /\([1-9]d[1-9][1-9]\s\+\s[1-9]\)/g
  // (1d12 + 1) \([1-9]d[1-9][1-9]\s\+\s[1-9]\)
  const xdxxpxx = /\([1-9]d[1-9][1-9]\s\+\s[1-9][1-9]\)/g
  // (1d12 + 12) \([1-9]d[1-9][1-9]\s\+\s[1-9][1-9]\)
  const xxdxxpx = /\([1-9][1-9]d[1-9][1-9]\s\+\s[1-9]\)/g
  // (12d12 + 1) \([1-9][1-9]d[1-9][1-9]\s\+\s[1-9]\)
  const xxdxxpxx = /\([1-9][1-9]d[1-9][1-9]\s\+\s[1-9][1-9]\)/g
  // (12d12 + 12) \([1-9][1-9]d[1-9][1-9]\s\+\s[1-9][1-9]\)
  const regexArray = [xdx, xdxx, xxdx, xxdxx, xdxpx, xdxpxx, xdxxpx, xdxpxx, xdxxpx, xdxxpxx, xxdxxpx, xxdxxpxx]
  // const newStr = str
  // const testStr = str
  // TODO
  regexArray.map(exp => {
    if (str.match(exp)) {
      console.log('MATCH:', str.match(exp));
      // let roll = str.match(exp)[0]
      // console.log(str.match(exp));
      // console.log(roll);
      str = str.replace(exp, `WORKINGWORKING`)
    }
  })
  return str
}
// var str = 'Twas the night before Xmas...';
// var newstr = str.replace(/xmas/i, 'Christmas');
// console.log(newstr);  // Twas the night before Christmas...

// filter more complex expressions first?
