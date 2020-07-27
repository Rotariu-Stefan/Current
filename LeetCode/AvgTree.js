let glTree;
const AvgTree = (tree) => {
  if(tree.length==0){
    return [];
  }
  glTree=tree;
  processNode(0);
  return glTree;
};

const processNode = (i) => {
  let sum=0;
  let chNr=0;

  const chLi=chL(i);
  if(chLi){
    sum+=glTree[chL(i)];
    chNr++;
    processNode(chLi);
  }

  const chRi=chR(i);
  if(chR(i)){
    sum+=glTree[chR(i)];
    chNr++;
    processNode(chRi);
  }

  if(chNr!==0){
    glTree[i]=sum/chNr;
  }

  console.log(i, chNr, sum);
};

const processNode2 = (i) => {
  let sum=0;
  let chNr=0;
  if(chL(i)){
    sum+=processNode(chL(i));
    chNr++;
  }
  if(chR(i)){
    sum+=processNode(chR(i));
    chNr++;
  }
  if(chNr!==0){
    glTree[i]=sum/chNr;
  }

  console.log(i, chNr, sum);
  return glTree[i];
};

const chL = (i) => {
  const chIndex=i*2+1;
  if(chIndex>glTree.length-1){
    return null;
  }
  return chIndex;
};
const chR = (i) => {
  const chIndex=i*2+2;
  if(chIndex>glTree.length-1){
    return null;
  }
  return chIndex;
};
const par = (i) => {
  const parIndex=i%2===0?i-2/2:i-1/2;
  if(parIndex<0){
    return null;
  }
  return parIndex;
};




const tree=[1,2,3,4,5,6,7,8];

console.log(AvgTree(tree));
