/**
* @param {string} s
* @return {number}
*/
var firstUniqChar = function(s) {
  const occr={};
  for(let i=0;i<s.length;i++)
    if(occr[s[i]]===undefined)
      occr[s[i]]=i;
    else
      occr[s[i]]=-1;

  for(let c in occr)
    if(occr[c]!==-1)
      return occr[c];
  return -1;
};
