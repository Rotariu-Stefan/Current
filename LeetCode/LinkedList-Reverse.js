const LinkedListReverse = (root) => {
  return processNode(root, null);
};

const processNode=(current, prev)=>{
  const next=current.next;
  current.next=prev;
  if(next!==null){
    return processNode(next, current);
  } else {
    return current;
  }
};



const e={val:"e", next:null,};
const d={val:"d", next:e,};
const c={val:"c", next:d,};
const b={val:"b", next:c,};
const a={val:"a", next:b,};



const llShow = (root) => {
  console.log(root.val);
  if(root.next){
    llShow(root.next);
  } else {
    console.log("End!");
  }
};

llShow(a);
llShow(LinkedListReverse(a));
