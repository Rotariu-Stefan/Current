import React from "react";


class FoodItem extends React.Component {
    static defaultFoodItem = {
      // entryid: 0,
      foodid: 0,
      foodname: "Nothing",
      brand: "Nowhere",
      fat: 0, carbs: 0, protein: 0,
      sizeinfo: null, userid: 0, pic: "empty.png", price: 0,
      isdish: false,
      note: null,
      // measure: "Pieces"
    };

    constructor(props) {
      super(props);

      this.state = {
        foodItem: (props.foodItem) ? props.foodItem : { ...FoodItem.defaultFoodItem },
        isSelected: false,
      };
    }

    componentDidMount = () => {
      if (this.props.signalSelect) {
        this.props.onSelectedFoodChanged(null, this);
      }
    };

    render = () => {
      const { foodItem, isSelected } = this.state;
      const { foodname, brand, fat, carbs, protein, sizeinfo } = foodItem;

      return (
        <div className={`foodItem lineDown${isSelected ? " feSelected" : ""}`} onClick={(ev) => this.props.onSelectedFoodChanged(ev, this)} >
          <span className="name_brand">{`${foodname} ${brand ? `@${brand}` : ""}`}</span>
          <span className="macro">{`${fat}/${carbs}/${protein}`}</span>
          <span className="per">{sizeinfo === null ? "1" : "100g"}</span>
        </div>
      );
    };

    toggleSelected = () => this.setState({ isSelected: !this.state.isSelected });
}

export default FoodItem;
