const MaxSumSubArray = (arr) => {
  let resMax=-999;
  let tempMax=-999;
  let start=0, end=0;
  let tempStart=0;

  for(let i=0;i<arr.length;i++){
    if(arr[i]>arr[i]+tempMax){
      tempMax=arr[i];
      tempStart=i;
    } else {
      tempMax+=arr[i];
    }
    if(tempMax>resMax){
      resMax=tempMax;
      start=tempStart;
      end=i;
    }
  }

  return {start, end, resMax};
}


const arr= [6,-2,-5,100,-2,5,8,-21,9,9];
console.log(MaxSumSubArray(arr));
