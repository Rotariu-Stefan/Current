/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import PropTypes from "prop-types";

import FoodItem from "../../Components/FoodItem";
import FoodEntry from "../../Components/FoodEntry";
import { getServerURL } from "../../methods";
import { AppContext } from "../../AppContext";


class FoodDetailsArea extends React.Component {
  static contextType = AppContext;
  static propTypes = {
    isDishSelected: PropTypes.bool.isRequired,
    updateDishSelect: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = { selectedFoodDetails: FoodItem.defaultFoodItem };
    this.foodEntriesCounter = 0;
  }

  render = () => {
    const { selectedFoodDetails } = this.state;

    if (!selectedFoodDetails) {
      return (
        <div className="foodDetailsArea subblock boxShow">
          LOADING...
        </div>
      );
    }

    const { isDishSelected } = this.props;
    const { foodname, brand, fat, carbs, protein, price, pic } = selectedFoodDetails;

    const calories = ((fat * 9) + (protein * 4) + (carbs * 4)).toFixed(1);
    const highlightOrNot = isDishSelected ? " highlight" : "";
    const brandOrNot = brand ? `@${brand}` : "";
    const picOrEmpty = pic === null ? "empty.png" : pic;

    return (
      <div
        className={`foodDetailsArea subblock boxShow${highlightOrNot}`}
        role="menuitem" tabIndex={0} onClick={this.onDishSelect}
      >
        <div className="foodDetailsHeader">
          <div className="textHigh boxShow">{`${foodname} ${brandOrNot}`}</div>
          {/* <Note removeNote={() => { }} note={selectedFoodDetails ? selectedFoodDetails.note : null}
          key={"F" + (selectedFoodDetails.note ? selectedFoodDetails.note.noteid : "0")}
          />*/}
        </div>
        <div className="foodPic boxShow">
          <img alt="[NO FOOD PIC]" src={`FoodPics/${picOrEmpty}`} />
        </div>
        <div className="foodInfo">
          <table>
            <thead>
              <tr><th>Name</th><td colSpan="2">{foodname}</td></tr>
              <tr><th>Brand</th><td colSpan="2">{brand ? brand : "--"}</td></tr>
              <tr><th>Macro</th><th>100g</th><th>1p</th></tr>
            </thead>
            <tbody>
              <tr><td>Fat</td>
                <td>{this._infoForMeasure("Grams", fat)}</td>
                <td>{this._infoForMeasure("Pieces", fat)}</td></tr>
              <tr><td>Carbs</td>
                <td>{this._infoForMeasure("Grams", carbs)}</td>
                <td>{this._infoForMeasure("Pieces", carbs)}</td></tr>
              <tr><td>Protein</td>
                <td>{this._infoForMeasure("Grams", protein)}</td>
                <td>{this._infoForMeasure("Pieces", protein)}</td></tr>
              <tr><td>Calories</td>
                <td>{this._infoForMeasure("Grams", calories)}</td>
                <td>{this._infoForMeasure("Pieces", calories)}</td></tr>
              <tr><td>Price</td>
                <td>{this._infoForMeasure("Grams", price)}</td>
                <td>{this._infoForMeasure("Pieces", price)}</td></tr>
            </tbody>
          </table>
          {this._compositionOrNot()}
          {this._dishButtonsOrNot()}
        </div>
      </div>
    );
  };

  onDishSelect = () => {
    const { isdish } = this.state.selectedFoodDetails;
    const { isDishSelected } = this.props;

    if (isdish && !isDishSelected) {
      this.props.updateDishSelect(true);
    }
  };

  onCalculateDishValues = () => {
    const { selectedFoodDetails } = this.state;
    this.setState({ selectedFoodDetails: null },
      async() => {
        let fat = 0; let carbs = 0; let protein = 0;
        for (const entry of selectedFoodDetails.foodentries) {
          const { amount, measure, sizeinfo } = entry;
          if (measure === "Pieces") {
            if (sizeinfo === null) {
              fat += (entry.fat * amount);
              carbs += (entry.carbs * amount);
              protein += (entry.protein * amount);
            } else {
              fat += (entry.fat * amount * sizeinfo / 100);
              carbs += (entry.carbs * amount * sizeinfo / 100);
              protein += (entry.protein * amount * sizeinfo / 100);
            }
          } else if (measure === "Grams") {
            fat += (entry.fat * amount / 100);
            carbs += (entry.carbs * amount / 100);
            protein += (entry.protein * amount / 100);
          }
        }
        selectedFoodDetails.fat = Number(fat.toFixed(1));
        selectedFoodDetails.carbs = Number(carbs.toFixed(1));
        selectedFoodDetails.protein = Number(protein.toFixed(1));

        let res = await fetch(`${getServerURL()}/yourfoods`, {
          method: "post",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(selectedFoodDetails),
        });
        res = await res.json();

        this.setState({ selectedFoodDetails }, () => {
          console.log(res);
          if (typeof res !== "string") {
            alert(`Successfully calculated dish values: ${selectedFoodDetails.foodname} ${selectedFoodDetails.brand}!\n
            --You can view resulting entry in the console`);
          } else {
            alert("There was an Error!");
          }
        });
      });
  }

  onSaveDishIngr = () => {
    const { selectedFoodDetails } = this.state;

    this.setState({ selectedFoodDetails: null }, async() => {
      const dishData = {};
      dishData.dishid = selectedFoodDetails.foodid;
      dishData.foodentries = [];
      for (const f of selectedFoodDetails.foodentries) {
        dishData.foodentries.push({ foodid: f.foodid, amount: f.amount, measure: f.measure });
      }

      let res = await fetch(`${getServerURL()}/dailymeals/dishupdate`, {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(dishData),
      });
      res = await res.json();

      this.setState({ selectedFoodDetails }, () => {
        console.log(res);
        if (typeof res !== "string") {
          alert(`Successfully saved dish: ${selectedFoodDetails.foodname} ${selectedFoodDetails.brand}!\n
                      --You can view resulting entry in the console`);
        } else {
          alert("There was an Error!");
        }
      });
    });
  }

  updateRemoveFoodEntry = (sender) => {
    const { selectedFoodDetails } = this.state;

    selectedFoodDetails.foodentries.splice(sender._reactInternalFiber.key, 1);
    this.setState({ selectedFoodDetails });
  };

  updateNewFoodEntry = (newFoodEntry) => {
    const { selectedFoodDetails } = this.state;
    const { currentUser } = this.context;

    if (currentUser.access === "Guest" && selectedFoodDetails.foodentries.length >= 7) {
      return "As Guest user you cannot enter more than 7 Food Items per Dish!";
    }

    selectedFoodDetails.foodentries.push(newFoodEntry);
    this.setState({ selectedFoodDetails });

    return "";
  };

  updateSelectedFoodDetails = (selectedFood) => this.setState({ selectedFoodDetails: null },
    async() => {
      const { foodid, isdish, noteid } = selectedFood.state.foodItem;

      let res = await fetch(`${getServerURL()}/dailymeals/fooddetails`, {
        method: "get",
        headers: {
          "content-type": "application/json",
          foodid,
          isdish,
          "noteid": noteid ? noteid : null,
        },
      });
      res = await res.json();

      const newFoodDetails = selectedFood.state.foodItem;
      newFoodDetails.foodentries = res.foodentries;
      newFoodDetails.note = res.note;

      this.setState({ selectedFoodDetails: newFoodDetails });
    });

  _infoForMeasure = (measureStr, infoValue) => {
    const { sizeinfo } = this.state.selectedFoodDetails;
    const measure = sizeinfo === null ? "Pieces" : "Grams";

    return measure === measureStr ? `${infoValue}` : "--";
  };

  _compositionOrNot = () => {
    const { selectedFoodDetails } = this.state;

    if (selectedFoodDetails.isdish) {
      this.foodEntriesCounter = 0;

      return (
        <div className="foodEntries boxShow">
          <div className="comp textHigh">Composition:</div>
          {this._getFoodEntries()}
        </div>
      );
    }

    return "";
  };

  _getFoodEntries = () => {
    const { selectedFoodDetails } = this.state;

    this.foodEntriesCounter = 0;

    return selectedFoodDetails.foodentries.map(this._getFoodEntry);
  };

  _getFoodEntry = (entry) => {
    const fe = (
      <FoodEntry
        key={this.foodEntriesCounter} foodEntry={entry}
        updateRemoveFoodEntry={this.updateRemoveFoodEntry}
      />);
    this.foodEntriesCounter += 1;

    return fe;
  };

  _dishButtonsOrNot = () => {
    const { isDishSelected } = this.props;

    if (isDishSelected) {
      return (
        <div className="tcenter">
          <button className="ftButton" onClick={this.onSaveDishIngr}>SAVE ENTRIES</button>
          <button className="ftButton" onClick={this.onCalculateDishValues}>CALC VALUES</button>
        </div>
      );
    }

    return "";
  };
}

export default FoodDetailsArea;
