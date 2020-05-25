import React from 'react';

class FoodEntry extends React.Component {

    constructor(props) {
        super(props);
        this.defaultFoodEntry = {
            entryid: 0,
            foodid: 0,
            foodname: "Nothing",
            brand: "Nobody",
            fat: 0, carbs: 0, protein: 0,
            sizeinfo: null, userid: 0, pic: null, price: 0,
            isdish: false,
            noteid: null,
            amount: 1,
            measure: "Pieces"
        };

        //const bla = {
        //    entryid: 0,
        //    foodid: 0,
        //    foodname: "NEW",
        //    brand: "SHIT",
        //    fat: 0, carbs: 0, protein: 0,
        //    sizeinfo: null, userid: 0, pic: null, price: 0,
        //    isdish: false,
        //    noteid: null,
        //    amount: 11,
        //    measure: "Pieces"
        //};

        this.state = {
            foodEntry: props.foodEntry ? props.foodEntry : this.defaultFoodEntry
        }
    }

    render = () => {
        const { foodEntry } = this.state;
        const { foodname, brand, amount, fat, carbs, protein, sizeinfo } = foodEntry;

        return (
            <div className="foodEntry lineDown">
                <span className="amount">{amount}</span>
                <span className="name_brand">{`${foodname} ${brand ? "@" + brand : ""}`}</span>
                <span className="macro">{`${fat}/${carbs}/${protein}`}</span>
                <span className="macroRes">{`${(fat * amount / (sizeinfo === null ? 1 : 100)).toFixed(1)}
                        /${(carbs * amount / (sizeinfo === null ? 1 : 100)).toFixed(1)}
                        /${(protein * amount / (sizeinfo === null ? 1 : 100)).toFixed(1)}`}
                </span>
            </div>
        );
    };
}

export default FoodEntry;