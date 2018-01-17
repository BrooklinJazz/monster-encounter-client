const deepClone = (obj) => {
   const result = Array.isArray(obj) ? [] : {};
   for (let key in obj) {
     result[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
   }

   return result;
 };

export default {
   deepClone,
}
