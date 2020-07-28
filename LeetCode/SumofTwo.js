//O(n+m)
//Alternative: Sort 1 array and binary searching for elements from
//the other one =>O(nlog(n)+mlog(n)) => O((n+m)logn) but sO(1)
//OR Sort Both and then go through from opposite ends while checking sum
const SumofTwo = (arr1, arr2, sum) =>{
  const hash={};
  for(let i=0;i<arr1.length;i++){
    hash[sum-arr1[i]]=true;
  }
  console.log(hash);
  for(let i=0;i<arr2.length;i++){
    if(hash[arr2[i]]){
      return true;
    }
  }
  return false;
};


const arr1 = [11, 22, 1, 44];
const arr2 = [0, 21, -4, 40];
const sum = 42;

console.log(SumofTwo(arr1, arr2, sum));
