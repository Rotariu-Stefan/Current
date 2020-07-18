const RectanglesFind = (list) => {
  let result=0;
  let xlist=[];
  xlist.length=100;
  let ylist=[];
  ylist.length=100;
  let current=null;

  for(let i=0;i<list.length;i++){
    current=list[i];
    for(let j=i+1;j<list.length;j++){
      if(current[0]===list[j][0]){
        ylist[list[j][1]]=true;
      }
      else if(current[1]===list[j][1]){
        xlist[list[j][0]]=true;
      }
    }
    for(let j=i+1;j<list.length;j++){
      if(xlist[list[j][0]] && ylist[list[j][1]]){
        result++;
      }
    }
    (xlist=[]).length=100;
    (ylist=[]).length=100;
  }
  return result;
};


const list=[
  [1,5],[1,4],[2,5],[2,4],
  [2,3],[3,5],[3,4],[3,3],
  [3,1],[4,2],[4,3],//[1,3],
];

console.log(RectanglesFind(list));
