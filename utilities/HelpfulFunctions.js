
export function toOneArray(arrayOfArrays) {
  let res = [];
  let i = 0;
  while (i < arrayOfArrays.length) {
    if (typeof arrayOfArrays[i] == "object" && arrayOfArrays[i].length) {
      res = res.concat(toOneArray(arrayOfArrays[i]));
    } else {
      res.push(arrayOfArrays[i]);
    }
    i++;
  };
  return res;
};