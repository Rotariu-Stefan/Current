//https://leetcode.com/explore/challenge/card/august-leetcoding-challenge/549/week-1-august-1st-august-7th/3413/
/** O(m) sO(m) <=m is lenth of string
 * Initialize your data structure here.
 */
 var WordDictionary = function() {
     this.nodes=[];
     this.nodes.length=26;
     this.end=false;
 };

 WordDictionary.prototype.getCharNode = function(ch) {
     return this.nodes[ch.charCodeAt(0)-97];
 };
 WordDictionary.prototype.addCharNode = function(ch) {
     this.nodes[ch.charCodeAt(0)-97]=new WordDictionary();
 };

 /**
  * Adds a word into the data structure.
  * @param {string} word
  * @return {void}
  */
 WordDictionary.prototype.addWord = function(word) {
     if(!word.length){
         this.end=true;
         return;
     }

     let crNode=this;
     let nextNode;
     for(let ch of word){
         nextNode=crNode.getCharNode(ch);
         if(!nextNode){
             crNode.addCharNode(ch);
             nextNode=crNode.getCharNode(ch);
         }
         crNode=nextNode;
     }
     crNode.end=true;
 };

 /**
  * Returns if the word is in the data structure. A word could contain the dot character '.' to represent any one letter.
  * @param {string} word
  * @return {boolean}
  */
 WordDictionary.prototype.search = function(word) {
     if(!word.length){
         return this.end;
     }

     let crNode=this;
     let nextNode;
     for(let i=0;i<word.length;i++){
         if(word[i]==="."){
             const remainder=word.slice(i+1);
             for(let node of crNode.nodes){
                 if(node && node.search(remainder)){
                     return true;
                 }
             }
             return false;

         } else {
             nextNode=crNode.getCharNode(word[i]);
             if(!nextNode){
                 return false;
             }
             crNode=nextNode;
         }
     }
     if(crNode.end){
         return true;
     } else {
         return false;
     }
 };

/** O(n) sO(n)
 * Initialize your data structure here.
 */
var WordDictionary = function() {
    this.words=[];
};

/**
 * Adds a word into the data structure.
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function(word) {
    this.words.push(word);
};

/**
 * Returns if the word is in the data structure. A word could contain the dot character '.' to represent any one letter.
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function(word) {
    if(this.words.includes(word)){
        return true;
    }
    for(w of this.words){
        if(w.match(`^${word}$`)){
            return true;
        }
    }
    return false;
};

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */
