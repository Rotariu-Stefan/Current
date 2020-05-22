import React from 'react';

class FoodEntry extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            foodEntry: props.foodentry
        };
    }

    render = () => {
        const { foodEntry } = this.state;

        if (foodEntry) {
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
        }
        else
            return "I dunno";   //TODO: Figure out why the hell this is sometimes happening..
    }
    componentDidMount = () => {
        //console.log(this.props.foodentry);
    };
}

export default FoodEntry;