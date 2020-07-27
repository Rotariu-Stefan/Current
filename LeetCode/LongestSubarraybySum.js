const SubarraybySum = (arr, sum) =>{
  if(arr.length===0){
    return null;
  }

  let i=0, j=-1;
  let count=-1, ilong=0, jlong=0;
  let tempSum=0;


//0 12 0 0 15 0 0 0 0 0


  while(j<arr.length){
    if((arr.length-1)-i<=count){
      break;
    }
    if(tempSum===sum){
      if(count<j-i){
        count=j-i;
        ilong=i;
        jlong=j;
      }
      j++;
      tempSum+=arr[j];
    } else if(tempSum<sum){
      j++;
      tempSum+=arr[j];
    } else if(tempSum>sum){
      tempSum-=arr[i];
      i++;
    }
  }

  const result=[];
  for(let ir=ilong;ir<=jlong;ir++){
    result.push(arr[ir]);
  }
  return result;
};

const arr = [6,2,3,7,5,5,1,0,8,0,1,2,4,8,1,3,11,0,0,0,0,0,1];
const sum=12;

console.log(SubarraybySum(arr, sum));
