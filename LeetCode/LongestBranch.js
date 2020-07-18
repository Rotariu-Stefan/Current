const LongestBranchNr = (node) => {
  if(node.children.length===0){
    return 0;
  }
  let height=0;
  for(let i=0;i<node.children.length;i++){
    const tempHeight=LongestBranchNr(node.children[i]);
    if(tempHeight>height){
      height=tempHeight;
    }
  }
  return height+1;
};

const toVisit=[];
const LongestBranchBFS = (node) => { //O(n+logn)->O(n) sO(n)
  if(node.children.length===0){
    return [node];
  }
  toVisit.push({node:node, pIndex:-1});

  let i=0;
  while(i<toVisit.length){
    for(child of toVisit[i].node.children){
      toVisit.push({node:child, pIndex:i});
    }
    i++;
  }

  const result=[];
  i=toVisit.length-1;
  while(i!==-1){
    result.unshift(toVisit[i].node.val);
    i=toVisit[i].pIndex;
  }
  return result;
};

let maxHeight=0;
let deepestIndex=0;
const LongestBranchDFS = (node) => {
  if(node.children.length===0){
    return [node];
  }

  processNode(node, -1, 0);

  const result=[];
  let i=deepestIndex;
  while(i!==-1){
    result.unshift(toVisit[i].node.val);
    i=toVisit[i].pIndex;
  }
  return result;
};

const processNode = (node, pIndex, height) => {
  toVisit.push({node:node, pIndex:pIndex});
  const currentIndex=toVisit.length-1;

  if(height>maxHeight){
    maxHeight=height;
    deepestIndex=currentIndex;
  }

  for(let child of node.children){
    processNode(child, currentIndex, height+1);
  }
};

const f={val:"f", children:[]};

const e={val:"e", children:[]};
const e1={val:"e1", children:[f]};

const d={val:"d", children:[e,e1]};
const d1={val:"d1", children:[]};

const c={val:"c", children:[d1,d]};

const b={val:"b", children:[c]};
const b2={val:"b2", children:[]};
const b1={val:"b1", children:[]};

const a={val:"a", children:[b1,b,b2]};

console.log(LongestBranchDFS(a));
