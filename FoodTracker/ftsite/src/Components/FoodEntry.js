import React from "react";


class FoodEntry extends React.Component {
    static defaultFoodEntry = {
      // entryid: 0,
      foodid: 0,
      foodname: "Nothing",
      brand: "Nobody",
      fat: 0, carbs: 0, protein: 0,
      sizeinfo: null, userid: 0, pic: null, price: 0,
      isdish: false,
      note: null,
      amount: 1,
      measure: "Pieces",
    };

    constructor(props) {
      super(props);

      let foodEntry;
      if (props.foodEntry) {
        foodEntry = props.foodEntry;
      } else if (props.foodItem) {
        foodEntry = props.foodItem;
        foodEntry.amount = props.amount;
        foodEntry.measure = props.measure;
      } else {
        foodEntry = { ...FoodEntry.defaultFoodEntry };
      }

      this.state = {
        foodEntry,
        fatRes: this.getMacroRes("fat", foodEntry),
        carbsRes: this.getMacroRes("carbs", foodEntry),
        proteinRes: this.getMacroRes("protein", foodEntry),
      };
    }

    componentDidMount() {
      const { fatRes, carbsRes, proteinRes } = this.state;

      if (this.props.updateMealMacros) {
        this.props.updateMealMacros(fatRes, carbsRes, proteinRes);
      }
    }

    componentDidUpdate() {
      if (this.props.foodEntry !== this.state.foodEntry) {
        this.setState({ foodEntry: this.props.foodEntry });
      }
    }

    render() {
      const { foodEntry, fatRes, carbsRes, proteinRes } = this.state;
      const { foodname, brand, amount, fat, carbs, protein } = (foodEntry ? foodEntry : FoodEntry.defaultFoodEntry);

      const brandOrNot = brand ? `@${brand}` : "";
      const removeImgOrNot = this.props.readOnly ? "" : (
        <img
          alt="X" className="managerImg" src="SitePics/icons8-closeM-window-16.png"
          onClick={this.onRemoveFoodEntry}
        />);

      return (
        <div className={`foodEntry ${this.props.className}`}>
          <span className="amount">{amount}</span>
          <span className="name_brand">{`${foodname} ${brandOrNot}`}</span>
          <span className="macro">{`${fat}/${carbs}/${protein}`}</span>
          <span className="macroRes">{`${fatRes}/${carbsRes}/${proteinRes}`}{removeImgOrNot}</span>
        </div>
      );
    }

    onRemoveFoodEntry = () => this.props.updateRemoveFoodEntry(this);

    getMacroRes = (mstr, foodEntry) => {
      const { amount, measure, sizeinfo } = foodEntry;
      if (measure === "Pieces") {
        if (sizeinfo === null) {
          return Number((foodEntry[mstr] * amount).toFixed(1));
        }

        return Number((foodEntry[mstr] * amount * sizeinfo / 100).toFixed(1));
      }

      return Number((foodEntry[mstr] * amount / 100).toFixed(1));
    };
}

export default FoodEntry;
