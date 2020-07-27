const swap = (nums , index1, index2) =>{
  const temp=nums[index1];
  nums[index1]=nums[index2];
  nums[index2]=temp;
};

const sorting = (algr) => (nums) => {
  console.log("Entry:",nums);

  const result=algr(nums);

  console.log("Sorted:",result);
  return result;
};

const bubbleSort = sorting((nums) => {
  const n=nums.length;

  for(i=1;i<=n;i++){
    for(j=0;j<n-i;j++){
      if(nums[j]>nums[j+1]){
        swap(nums, j, j+1);
      }
      //console.log("Step:",nums);
    }
  }
  return nums;
});

const insertionSort = sorting((nums) => {
  const n=nums.length;

  for(i=0;i<n;i++){
    let j=i;
    while(j>0 && nums[j]<nums[j-1]){
      swap(nums, j, j-1);
      j--;
    }
    //console.log("Step:",nums);
  }
  return nums;
});

const selectionSort = sorting((nums) => {
  const n=nums.length;

  for(i=0;i<n;i++){
    let minI=i;
    for(j=i;j<n;j++){
      if(nums[minI]>nums[j]){
        minI=j;
      }
    }
    swap(nums, i, minI);
  }
  return nums;
});

const mergeSort = sorting((nums) => mergeSplit(nums));
const mergeSplit = (nums) => {
  const n=nums.length;

  if(n<=1){
    return nums;
  }
  else{
    return mergeSortCalc(
      mergeSplit(nums.slice(0, n/2)),
      mergeSplit(nums.slice(n/2, n))
    );
  }
};
const mergeSortCalc = (nums1, nums2) =>{
  const n1=nums1.length, n2=nums2.length;
  const ordNums=[];

  let i1=0, i2=0;
  while(i1<n1 || i2<n2){
    if(i2===n2 || nums1[i1]<nums2[i2]){
      ordNums.push(nums1[i1]);
      i1++;
    }
    else{
      ordNums.push(nums2[i2]);
      i2++;
    }
  }
  return ordNums;
};


const heapSort = sorting((nums) =>{
  const n=nums.length;
  let heap = heapify(nums);
  //console.log("After Heapify:",heap);

  for(i=n;i>1;i--){
    heap=heapRootOut(heap, i);
    //console.log("After-Rootout-Step:"+(n-i+1),heap);
  }
  return heap;
});
const heapify = (nums) => {
  const n=nums.length;

  for(i=0;i<n;i++){
    let j=i;
    while(j>0){
      if(nums[parI(j)]<nums[j]){
        swap(nums, j, parI(j));
      }
      j=parI(j);
    }
  }
  return nums;
};
const heapRootOut = (heap, n) => {
  swap(heap, 0, n-1);
  n=n-1;
  let i=0, maxI=0;
  do{
    i=maxI;
    if(lChI(i)<n && heap[lChI(i)]>heap[maxI]){
      maxI=lChI(i);
    }
    if(rChI(i)<n && heap[rChI(i)]>heap[maxI]){
      maxI=rChI(i);
    }
    if(i!==maxI){
      swap(heap, i, maxI);
    }
  }while(i!==maxI)
  return heap;
};
const parI = (i) => Math.floor((i-1)/2);
const lChI = (i) => i*2+1;
const rChI = (i) => i*2+2;

const quickSort = sorting((nums)=>{
  quickPartition(nums, 0, nums.length);
  return nums;
});
const quickPartition = (nums, start, end) => {
  const n=end-start;
  if(n<2){
    return;
  }

  let i=start+1;
  let j=end-1;
  while(j>start){
    //console.log(i, j);
    while(nums[i]<=nums[start] && i!==end){
      i++;
    }
    while(nums[j]>=nums[start] && j!==start){
      j--;
    }
    if(i<j){
      swap(nums, i, j);
      i++;
      j--;
    }
    else{
      swap(nums, start, j);
      break;
    }
  }

  quickPartition(nums, start, j);
  quickPartition(nums, j+1, end);
};




const nums = [5,3,8,7,1,10,4,2,9,6,11];
const nums2 = [3,4,5,2,7];
//bubbleSort(nums);
insertionSort(nums2);
//selectionSort(nums);
//mergeSort(nums);
//heapSort(nums);
//quickSort(nums);
