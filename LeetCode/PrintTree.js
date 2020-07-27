const map={};
const roots={};
const PrintTree = (input) => {
  if(input.length===0){
    return "";
  }
  let output="";

  for(let item of input){
    if(map[item[0]]){
      map[item[0]].push(item[1]);
    } else {
      map[item[0]]=[item[1]];
    }

    if(roots[item[0]]!==false){
      roots[item[0]]=true;
    }
    if(roots[item[1]]!==false){
      roots[item[1]]=false;
    }
  }
  console.log(Object.keys(roots).length);

  for(let root in roots){
    if(roots[root]===true){
      output+=print(root, 0);
    }
  }
  return output;
};

const print = (nodeValue, tabs) => {
  let line="\n";
  for(let i=0;i<tabs;i++){
    line+="\t";
  }
  line+=nodeValue;

  if(map[nodeValue]){
    for(let i=0;i<map[nodeValue].length;i++){
      line+=print(map[nodeValue][i], tabs+1);
    }
  }
  return line;
}

const input =[
  ["animal", "mammal"],
  ["animal", "bird"],
  ["lifeform", "animal"],
  ["cat", "lion"],
  ["mammal", "cat"],
  ["animal", "fish"],
];

console.log(PrintTree(input));
