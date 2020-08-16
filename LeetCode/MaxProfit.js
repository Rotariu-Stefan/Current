//https://leetcode.com/explore/challenge/card/august-leetcoding-challenge/551/week-3-august-15th-august-21st/3426/

/** O(n) for 1Transaction
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    if(prices.length<2){
        return 0;
    }

    const mid=Math.floor(prices.length-1/2);
    const maxProfit=getBestMM(prices,
                              getMinMax(prices, 0, mid),
                              getMinMax(prices, mid+1, prices.length-1));
    return prices[maxProfit.max]-prices[maxProfit.min];
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
