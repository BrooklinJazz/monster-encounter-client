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
