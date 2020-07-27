const NumberArrayAdd = (arr) => {
  let i=arr.length-1;
  if(i===-1){
    return [1];
  }

  while(i>=0){
    const digit=arr[i]+1;
    if(digit<10){
      arr[i]=digit;
      break;
    } else {
      arr[i]=0;
      i--;
    }
  }

  if(arr[0]===0){
    arr.unshift(1);
  }
  return arr;
};

const NumberArrayAddRec = (arr) => {
  let i=arr.length-1;
  if(i===-1){
    return [1];
  }

  return addOne(i, arr);
};
const addOne = (index, arr) => {
  if(index===-1){
    arr.unshift(1);
    return arr;
  }

  const digit=arr[index]+1;
  if(digit<10){
    arr[index]=digit;
    return arr;
  } else {
    arr[index]=0;
    return addOne(index-1, arr);
  }
};


const arr=[9,9,9,9,9];

console.log(NumberArrayAddRec(arr));
