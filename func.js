function merge(arr1, arr2) {
    let result = [];
    let x = 0;
    let y = 0;
    while(x < arr1.length && y < arr2.length){
      if(arr1[x] < arr2[y]){
        result.push(arr1[x])
        x++;
      }else{
        result.push(arr2[y])
        y++;
      }
    }
    while (x < arr1.length) {
      result.push(arr1[x]);
      x++;
    }
    while (y < arr2.length) {
      result.push(arr2[y]);
      y++;
    }
    return result;
}
  
function mergeSort(arr) {
    if(arr.length <= 1) return arr;
    const mid = Math.floor(arr.length/2);
    const left = mergeSort(arr.slice(0,mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
}

function mean(arr){
  let total = 0
  for(let x of arr){
    total += x
  }
  return total/arr.length
}

module.exports = {merge, mergeSort, mean};