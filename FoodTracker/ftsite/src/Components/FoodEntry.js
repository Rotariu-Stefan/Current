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

        let foodEntry;
        if (props.foodEntry)
            foodEntry = props.foodEntry;
        else if (props.foodItem) {
            foodEntry = props.foodItem;
            foodEntry.amount = props.amount;
            foodEntry.measure = props.measure;
        }
        else
            foodEntry = this.defaultFoodEntry;

        this.state = {
            fatRes: (foodEntry.fat * foodEntry.amount / (foodEntry.sizeinfo === null ? 1 : 100)).toFixed(1),
            carbsRes: (foodEntry.carbs * foodEntry.amount / (foodEntry.sizeinfo === null ? 1 : 100)).toFixed(1),
            proteinRes: (foodEntry.protein * foodEntry.amount / (foodEntry.sizeinfo === null ? 1 : 100)).toFixed(1),
            foodEntry:foodEntry
        };
    }

    render = () => {        
        const { foodEntry, fatRes, carbsRes, proteinRes } = this.state;
        const { foodname, brand, amount, fat, carbs, protein} = foodEntry;

        return (
            <div className="foodEntry lineDown">
                <span className="amount">{amount}</span>
                <span className="name_brand">{`${foodname} ${brand ? "@" + brand : ""}`}</span>
                <span className="macro">{`${fat}/${carbs}/${protein}`}</span>
                <span className="macroRes">{`${fatRes}/${carbsRes}/${proteinRes}`}
                </span>
            </div>
        );
    };
}

export default FoodEntry;