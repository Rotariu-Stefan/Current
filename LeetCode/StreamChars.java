//https://leetcode.com/explore/challenge/card/august-leetcoding-challenge/552/week-4-august-22nd-august-28th/3434/
// O(m) sO(26^m?) <=m is lenth of string
class StreamChecker {
    private StreamChecker[] letters=new StreamChecker[26];
    private boolean end=false;
    private static int wordMax;
    private static List<Character> queried;

    public StreamChecker(String[] words){
        try{
            if(words!=null){
                wordMax=0;
                queried=new ArrayList<Character>();
                for(String word:words){
                    if(word.length()>wordMax){
                        wordMax=word.length();
                    }
                    addWord(word);
                }
            }
        } catch(Exception e){
            System.out.println(e);
        }
    }

    public void addWord(String word){
        if(word.length()==0){
            end=true;
            return;
        }

        char lastChar=word.charAt(word.length()-1);
        if(getLetterNode(lastChar)==null){
            addLetterNode(lastChar);
        }
        getLetterNode(lastChar).addWord(word.substring(0, word.length()-1));
    }
    private StreamChecker getLetterNode(char ch){
        return letters[(int)ch-97];
    }
    private void addLetterNode(char ch){
        letters[(int)ch-97]=new StreamChecker(null);
    }

    public boolean query(char letter) {
        queried.add(letter);
        if(queried.size()>wordMax){
            queried.remove(0);
        }
        return search(queried.size()-1);
    }

    private boolean search(int queryIdx){
        if(end){
            return true;
        }
        if(queryIdx==-1){
            return false;
        }
        StreamChecker nextNode=getLetterNode(queried.get(queryIdx));
        if(nextNode==null){
            return false;
        }
        return nextNode.search(queryIdx-1);
    }
}

/**
 * Your StreamChecker object will be instantiated and called as such:
 * StreamChecker obj = new StreamChecker(words);
 * boolean param_1 = obj.query(letter);
 */
