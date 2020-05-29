import React from 'react';

class FoodItem extends React.Component {
    static defaultFoodItem = {
        entryid: 0,
        foodid: 0,
        foodname: "Nothing",
        brand: "Nowhere",
        fat: 0, carbs: 0, protein: 0,
        sizeinfo: null, userid: 0, pic: "empty.png", price: 0,
        isdish: false,
        noteid: null,
        measure: "Pieces"
    };

    constructor(props) {
        super(props);

        this.state = {
            foodItem: (props.foodItem) ? props.foodItem : this.defaultFoodItem,
            isSelected: false
        };
    }

    toggleSelected = () => this.setState({
        isSelected: !this.state.isSelected
    });

    render = () => {
        const { foodItem, isSelected } = this.state;
        const { foodname, brand, fat, carbs, protein, sizeinfo } = foodItem;

        return (
            <div onClick={(ev) => this.props.selectedChanged(ev, this)}
                className={"foodItem lineDown" + (isSelected ? " feSelected" : "")}>
                <span className="name_brand">{`${foodname} ${brand ? "@" + brand : ""}`}</span>
                <span className="macro">{`${fat}/${carbs}/${protein}`}</span>
                <span className="per">{sizeinfo === null ? `1` : `100g`}</span>
            </div>
        );
    };

    componentDidMount = () => {
        if (this.props.signalSelect)
            this.props.selectedChanged(null, this);
    };
}

export default FoodItem;