//https://leetcode.com/explore/challenge/card/august-leetcoding-challenge/551/week-3-august-15th-august-21st/3426/
/** O(n) sO(n) n=nr. of days/prices
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    if(prices.length<2){
        return 0;
    }

    const memo=[];
    memo.length=prices.length;
    memo[0]=0;

    let min=prices[0];
    let max=prices[0];
    let profit=0;
    for(let i=1;i<prices.length;i++){
        if(prices[i]-min>profit){
            max=prices[i];
            profit=max-min;
        }
        if(prices[i]<min){
            min=prices[i];
            max=prices[i];
        }
        memo[i]=profit;
    }

    min=prices[prices.length-1];
    max=prices[prices.length-1];
    profit=0;
    let maxProfit=0;
    for(let i=prices.length-1;i>=0;i--){
        if(max-prices[i]>profit){
            min=prices[i];
            profit=max-min;
        }
        if(prices[i]>max){
            max=prices[i];
            min=prices[i];
        }
        if(memo[i]+profit>maxProfit){
            maxProfit=memo[i]+profit;
        }
    }

    return maxProfit;
};


/** O(n^2) sO(1-stack) n=nr. prices
 * @param {number[]} prices
 * @return {number}
 */
 var maxProfit = function(prices) {
     if(prices.length<2){
         return 0;
     }

     let maxProfit=0;
     for(let i=0;i<prices.length;i++){
         const mm1=getMinMax(prices,0,i);
         const mm2=getMinMax(prices,i+1,prices.length-1);
         const profit=mm1.max-mm1.min+mm2.max-mm2.min;
         if(profit>maxProfit){
             maxProfit=profit;
         }
     }
     return maxProfit;
 };

const getBestMM = (prices, mm1, mm2) =>{
    const profit1=prices[mm1.max]-prices[mm1.min];
    const profit2=prices[mm2.max]-prices[mm2.min];
    const profitComb=prices[mm2.max]-prices[mm1.min];

    if(profit1<profit2){
        return profit2<profitComb?{min:mm1.min, max:mm2.max}:mm2;
    } else {
        return profit1<profitComb?{min:mm1.min, max:mm2.max}:mm1;
    }
};

const getMinMax = (prices, start, end) =>{
    if(start-end===0){
        return {min:start, max:end};
    }
    if(start-end===1){
        if(prices[end]>prices[start]){
            return {min:start, max:end};
        } else {
            return {min:start, max:start};
        }
    }

    const mid=Math.floor((end+start)/2);
    return getBestMM(prices, getMinMax(prices, start, mid), getMinMax(prices, mid+1, end));
};


/** O(n^3) sO(1) n=nr. of days/prices
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    if(!prices.length){
        return 0;
    }

    let maxProfit=0;
    for(let i=0;i<prices.length;i++){
        const profit=getMinMax(prices,0,i)+getMinMax(prices,i+1,prices.length-1);
        if(profit>maxProfit){
            maxProfit=profit;
        }
    }
    return maxProfit;
};

const getMinMax = (prices, start, end) =>{
    let minI=0;
    let maxI=0;
    for(let i=start;i<=end;i++){
        for(let j=i;j<=end;j++){
            if(prices[maxI]-prices[minI]<prices[j]-prices[i]){
                minI=i;
                maxI=j;
            }
        }
    }
    return prices[maxI]-prices[minI];
};
