const toVisit=[];
const toVisitHash={};

const Step3Dinamic = (x) => { //O(3^n) sO(3^n)
  if(x===1) return 0;
  if(x<1) return -1;

  toVisit.push({val:x, height:0});
  toVisitHash[x]=true;

  while(toVisit.length>0){
    //console.log(toVisit);
    const current=toVisit.shift();

    if(current.val%3===0){
      if(checkChild(current.val/3, current.height+1)>0){
        return current.height+1;
      }
    }
    if(current.val%2===0){
      if(checkChild(current.val/2, current.height+1)>0){
        return current.height+1;
      }
    }
    if(true){
      if(checkChild(current.val-1, current.height+1)>0){
        return current.height+1;
      }
    }
  }
  return -1;
};

const checkChild = (childVal, height) =>{
  if(childVal===1){
    return height;
  }
  if(!toVisitHash[childVal]){
    toVisit.push({val:childVal, height:height});
    toVisitHash[childVal]=true;
  }
  return -1;
};

const x=1000000;


const Step3DinamicFirst = (x) => { //O(3^n) sO(3^n)
  if(x===1) return 0;
  if(x<1) return -1;

  const toVisit=[{val:x, height:0}];

  while(toVisit.length>0){
    //console.log(toVisit);
    const current=toVisit.shift();
    if(current.val===1){
      return current.height;
    }
    if(current.val%3===0){
      toVisit.push({val:current.val/3, height:current.height+1});
    }
    if(current.val%2===0){
      toVisit.push({val:current.val/2, height:current.height+1});
    }
    toVisit.push({val:current.val-1, height:current.height+1});
  }
  return -1;
};
const Step3DinamicFail = (x) => { //O(3^n) sO(3^n)
  if(x===1) return 0;
  if(x<1) return -1;

  const toVisit={};
  toVisit[x]=0;

  for(let i=0;i<Object.keys(toVisit).length;i++){
    current=Object.keys(toVisit)[i];
    console.log(toVisit);
    if(Number(current)===1){
      return toVisit[current];
    }
    if(current%3===0){
      toVisit[Number(current)/3]=toVisit[current]+1;
    }
    if(current%2===0){
      toVisit[Number(current)/2]=toVisit[current]+1;
    }
    toVisit[Number(current)-1]=toVisit[current]+1;
  }
  return -1;
};
console.log(Step3Dinamic(x));
console.log(Step3DinamicFirst(x));
