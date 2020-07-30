const TreeSalesPath = (root) => {
  if(!root){
    return 0;
  }
  if(root.ch.length===0){
    return 1;
  }

  const toVisit=[root];
  let minCost=999999;

  while(toVisit.length!==0){
    for(let i=0;i<toVisit.length;i++){
      const current=toVisit.shift();
      if(current.ch.length===0 && current.val<minCost){
        minCost=current.val;
      }
      if(current.val<minCost){
        for(let ch of current.ch){
          ch.val+=current.val;
          toVisit.push(ch);
        }
      }
    }
  }

  return minCost;
};


const e1={val:1,ch:[]};
const d2={val:10,ch:[]};
const d1={val:1,ch:[e1]};
const c5={val:5,ch:[]};
const c4={val:1,ch:[]};
const c3={val:0,ch:[d2]};
const c2={val:2,ch:[d1]};
const c1={val:4,ch:[]};
const b3={val:6,ch:[c4,c5]};
const b2={val:3,ch:[c2,c3]};
const b1={val:5,ch:[c1]};
const a={val:0,ch:[b1,b2,b3]};


console.log(TreeSalesPath(a));
