/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-onchange */
import React from "react";
import PropTypes from "prop-types";


class FoodEntry extends React.Component {
  static propTypes = {
    className: PropTypes.string,
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
    className: "",
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
    const { foodEntry } = props;

    this.state = {
      foodEntry: foodEntry ? foodEntry : { ...FoodEntry.defaultFoodEntry },
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
    this.kEYUPDATE();
  }

  render() {
    const { foodEntry, fatRes, carbsRes, proteinRes } = this.state;
    const { foodname, brand, amount, fat, carbs, protein } = (foodEntry ? foodEntry : FoodEntry.defaultFoodEntry);

    const brandOrNot = brand ? `@${brand}` : "";
    const removeImgOrNot = this.props.readOnly ? "" : (
      <button className="managerImg16" onClick={this.onRemoveFoodEntry}>
        <img alt="X" src="SitePics/icons8-closeM-window-16.png" />
      </button>);

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
    if (this.props.updateMealMacros) {
      this.props.updateMealMacros(-fatRes, -carbsRes, -proteinRes);
    }
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

  kEYUPDATE() {
    if (this.props.foodEntry !== this.state.foodEntry) {
      const { foodEntry } = this.props;
      this.setState({
        foodEntry,
        fatRes: this.getMacroRes("fat", foodEntry),
        carbsRes: this.getMacroRes("carbs", foodEntry),
        proteinRes: this.getMacroRes("protein", foodEntry),
      });
    }
  }
}

export default FoodEntry;
