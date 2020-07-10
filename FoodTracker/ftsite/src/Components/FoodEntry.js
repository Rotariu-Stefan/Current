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

      this.state = { foodEntry };

      this.state.fatRes = this.getMacroRes("fat");
      this.state.carbsRes = this.getMacroRes("carbs");
      this.state.proteinRes = this.getMacroRes("protein");
    }

    componentDidMount = () => {
      const { fatRes, carbsRes, proteinRes } = this.state;

      if (this.props.updateMealMacros) {
        this.props.updateMealMacros(fatRes, carbsRes, proteinRes);
      }
    }

    render = () => {
      const { foodEntry, fatRes, carbsRes, proteinRes } = this.state;
      const { foodname, brand, amount, fat, carbs, protein } = foodEntry;

      return (
        <div className={`foodEntry ${this.props.className}`}>
          <span className="amount">{amount}</span>
          <span className="name_brand">{`${foodname} ${brand ? `@${brand}` : ""}`}</span>
          <span className="macro">{`${fat}/${carbs}/${protein}`}</span>
          <span className="macroRes">{`${fatRes}/${carbsRes}/${proteinRes}`}
            {this.props.readOnly ? "" : <img alt="X" className="managerImg" src="SitePics/icons8-closeM-window-16.png" onClick={(ev) => this.props.onRemoveFoodEntry(ev, this)} />}
          </span>
        </div>
      );
    };

    getMacroRes = (mstr) => {
      const { amount, measure, sizeinfo } = this.state.foodEntry;
      if (measure === "Pieces") {
        if (sizeinfo === null) {
          return (this.state.foodEntry[mstr] * amount).toFixed(1);
        }

        return (this.state.foodEntry[mstr] * amount * sizeinfo / 100).toFixed(1);
      }

      return (this.state.foodEntry[mstr] * amount / 100).toFixed(1);
    };
}

export default FoodEntry;
