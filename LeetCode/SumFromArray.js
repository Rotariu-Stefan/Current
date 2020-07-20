const SumFromArrayREC = (arr, target) => {  //O(n)?
  if(arr.length===0){
    return 0;
  }
  return calcSum(0, 0, arr, target);
};
const memo={};
const calcSum = (value, index, arr, target) =>{
  if(memo[value+'-'+index]){
    return memo[value+'-'+index];
  }
  if(value>target){
    return 0;
  }
  let res=0;
  if(value===target){
    res+=1;
  }
  for(let i=index;i<arr.length;i++){
    res+=calcSum(value+arr[i], i+1, arr, target);
  }

  return memo[value+'-'+index]=res;
};

const SumFromArrayBOT = (arr, target) => {
  if(arr.length===0){
    return 0;
  }
  let result=0;
  const combos=[];
  for(let i=0;i<arr.length;i++){
    combos.push({i:i, sum:arr[i]});
  }
  while(combos.length>0){
    const combo=combos.shift();
    if(combo.sum>target){
      continue;
    }
    if(combo.sum===target){
      result++;
    }
    for(let i=combo.i+1;i<arr.length;i++){
      combos.push({i:i, sum:combo.sum+arr[i]});
    }
  }
  return result;
};


const arr=[
  2,4,6,10,0,8,1,9,5,7,1,4,7,0,
  4,6,8,11,2,4,6,10,0,8,1,9,5,7,1,4,7,0,4,6,8,
  4,6,8,11,2,4,6,10,0,8,1,9,5,7,1,4,7,0,4,6,8,
  4,6,8,11,2,4,6,10,0,8,1,9,5,7,1,4,7,0,4,6,8,
  4,6,8,11,2,4,6,10,0,8,1,9,5,7,1,4,7,0,4,6,8,
  4,6,8,11,2,4,6,10,0,8,1,9,5,7,1,4,7,0,4,6,8,
  4,6,8,11,2,4,6,10,0,8,1,9,5,7,1,4,7,0,4,6,8,
];
const target=16;

console.log(SumFromArrayREC(arr, target));
//console.log(SumFromArrayBOT(arr, target));

// 2
// 2+4
// 2+6
// 2+10
// 2+4+6
// 2+4+10
// 2+6+10
// 4
// 4+6
// 4
// 4+10
// 4+6+10
// ...

const SumFromArrayREC1 = (arr, target) => {
  if(arr.length===0){
    return 0;
  }
  for(let i=0;i<arr.length;i++){
    calcSum1(arr[i], i+1, arr, target);
  }
  return result;
};
const calcSum1 = (value, index, arr, target) =>{
  if(value>target){
    return;
  }
  if(value===target){
    result++;
  }
  for(let i=index;i<arr.length;i++){
    calcSum1(value+arr[i], i+1, arr, target);
  }
};

const SumFromArrayBOT1 = (arr, target) => {
  if(arr.length===0){
    return 0;
  }
  let result=0;
  const combos=[];
  for(let i=0;i<arr.length;i++){
    combos.push({i:i, sum:arr[i]});
  }
  while(combos.length>0){
    const combo=combos.shift();
    if(combo.sum>target){
      continue;
    }
    if(combo.sum===target){
      result++;
    }
    for(let i=combo.i+1;i<arr.length;i++){
      combos.push({i:i, sum:combo.sum+arr[i]});
    }
  }
  return result;
};
