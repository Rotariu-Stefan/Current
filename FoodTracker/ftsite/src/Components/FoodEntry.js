import React from "react";
import PropTypes from "prop-types";


class FoodEntry extends React.Component {
  static propTypes = {
    foodEntry: PropTypes.object,
    readOnly: PropTypes.bool,
    updateMealMacros: PropTypes.func,
    updateRemoveFoodEntry: PropTypes.func,
  };

  static defaultProps ={
    foodEntry: FoodEntry.defaultFoodEntry,
    readOnly: false,
    updateMealMacros: null,
    updateRemoveFoodEntry: null,
  };

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

    let initFoodEntry = {};
    if (props.foodEntry) {
      initFoodEntry = props.foodEntry;
    } else if (props.foodItem) {
      initFoodEntry = props.foodItem;
      initFoodEntry.amount = props.amount;
      initFoodEntry.measure = props.measure;
    } else {
      initFoodEntry = { ...FoodEntry.defaultFoodEntry };
    }

    this.state = {
      foodEntry: initFoodEntry,
      fatRes: this.getMacroRes("fat", initFoodEntry),
      carbsRes: this.getMacroRes("carbs", initFoodEntry),
      proteinRes: this.getMacroRes("protein", initFoodEntry),
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

    onRemoveFoodEntry = () => {
      const { fatRes, carbsRes, proteinRes } = this.state;

      this.props.updateRemoveFoodEntry(this);
      this.props.updateMealMacros(-fatRes, -carbsRes, -proteinRes);
    }

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
