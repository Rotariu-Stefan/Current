/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength2 = function(beginWord, endWord, wordList) {
    if(wordList.length===0){
        return 0;
    }
    if(beginWord===endWord){
        return 1;
    }

    const toVisit=[beginWord];
    let count=1;
    while(toVisit.length>0){
        const len=toVisit.length;
        for(let i=0;i<len;i++){
            for(wordT of getTransform(toVisit.shift(), wordList)){
                if(wordT===endWord){
                    return count+1;
                }
                toVisit.push(wordT);
            }
        }
        count++;
    }

    return 0;
};

const getTransform = (word, wordList) =>{
    const trans=[];
    let i=0;
    while(i<wordList.length){
        if(checkStr(word, wordList[i])){
            trans.push(wordList[i]);
            wordList.splice(i,1);
        } else {
            i++;
        }
    }
    return trans;
};

const checkStr = (str1, str2) =>{
    let diff=0;
    for(let i=0;i<str1.length;i++){
        console
        if(str1[i]!==str2[i]){
            diff++;
            if(diff>1){
                return false;
            }
        }
    }
    return true;
};


/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength1 = function(beginWord, endWord, wordList) {
    if(wordList.length===0){
        return 0;
    }

    const toVisit=[{word:beginWord, height:1}];
    while(toVisit.length>0){
        const current=toVisit.shift();
        for(let wordT of getTransform(current.word, wordList)){
            if(wordT===endWord){
                return current.height+1;
            }
            toVisit.push({word:wordT, height:current.height+1});
        }
    }
    return 0;
};
