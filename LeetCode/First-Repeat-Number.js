/**
* @param {string} arr
* @return {number}
*/
const firstRepeatNr = function(arr) {
  const inarr=[];
  for(let i=0;i<arr.length;i++){
    if(inarr[arr[i]]){
      return arr[i];
    }
    else {
      inarr[arr[i]]=true;
    }
  }
  return -1;
};

console.log("FRN:", firstRepeatNr([5,2,3,4,1,7,6,7]));
