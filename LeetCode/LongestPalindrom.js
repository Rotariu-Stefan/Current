const LongestPalindrom = (str) => {
  if(str.length===0){
    return "";
  }
  let result=""+str[0];
  let tempPal="";

  for(let i=0;i<str.length;i++){
    if(str.length-i<=result.length/2){
      break;
    }

    tempPal= getPal(str, i, i+1, "");
    if(tempPal.length > result.length){
      result=tempPal;
    }
    tempPal= getPal(str, i-1, i+1, ""+str[i]);
    if(tempPal.length > result.length){
      result=tempPal;
    }
  }
  return result;
};

const getPal = (str, iprev, inext, initialPal) => {
  while(0<=iprev && inext<str.length && str[iprev]===str[inext]){
    initialPal=""+str[iprev]+initialPal+str[inext];
    iprev--;
    inext++;
  }
  return initialPal;
};

const str="asddsagje35t9g400_aaxxxgtgxxxaa1_cccg4n9g0uj84";
const str2="222020221";

console.log(LongestPalindrom(str));
