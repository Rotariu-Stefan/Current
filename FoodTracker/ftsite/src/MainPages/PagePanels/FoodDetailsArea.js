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

    this.state = {
      selectedFoodDetails: FoodItem.defaultFoodItem,

      composition: [],
      compFoodCounter: 0,
    };
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
    const picOrNot = pic === null ? "empty.png" : pic;

    console.log("BULEAAAAAAA !!!", this.state.composition);

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
          <img alt="[NO FOOD PIC]" src={`FoodPics/${picOrNot}`} />
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
          {this.state.compFoodCounter}
          {this.state.composition}
          {this._dishButtonsOrNot()}
        </div>
      </div>
    );
  };

  onSelectedFoodChanged = (selectedFood) => {
    this.setState({
      selectedFoodDetails: null,
      compFoodCounter: 0,
      composition: [],
    });

    (async() => {
      let { compFoodCounter } = this.state;
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

      const newComposition = [];
      const newFoodDetails = selectedFood.state.foodItem;
      if (isdish && res.foodentries) {
        newFoodDetails.foodentries = res.foodentries;
        for (const f of res.foodentries) {
          compFoodCounter += 1;
          newComposition.push(
            <FoodEntry
              key={compFoodCounter} foodEntry={f}
              onRemoveFoodEntry={this.onRemoveFoodEntry}
            />);
        }
      }
      if (res.note) {
        newFoodDetails.note = res.note;
      }

      this.setState({
        selectedFoodDetails: newFoodDetails,
        compFoodCounter,
        composition: newComposition,
      });
    })();
  };

  onDishSelect = () => {
    const { isdish } = this.state.selectedFoodDetails;
    const { isDishSelected } = this.props;

    if (isdish && !isDishSelected) {
      this.props.updateDishSelect(true);
    }
  };

  onCalculateDishValues = () => {
    this.setState({
      selectedFoodDetails: null,
      searchareaIsLoading: true,
    });
    (async() => {
      const { selectedFoodDetails } = this.state;

      let fat = 0; let carbs = 0; let protein = 0;
      for (const f of selectedFoodDetails.foodentries) {
        const { amount, measure, sizeinfo } = f;
        if (measure === "Pieces") {
          if (sizeinfo === null) {
            fat += (f.fat * amount);
            carbs += (f.carbs * amount);
            protein += (f.protein * amount);
          } else {
            fat += (f.fat * amount * sizeinfo / 100);
            carbs += (f.carbs * amount * sizeinfo / 100);
            protein += (f.protein * amount * sizeinfo / 100);
          }
        } else if (measure === "Grams") {
          fat += (f.fat * amount / 100);
          carbs += (f.carbs * amount / 100);
          protein += (f.protein * amount / 100);
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

      document.querySelector(".search").value = `${selectedFoodDetails.foodname} ${selectedFoodDetails.brand}`;
      this.loadSFoodItems(`${selectedFoodDetails.foodname} ${selectedFoodDetails.brand}`,
        document.querySelector("#isAll").checked);

      if (typeof res !== "string") {
        alert(`Successfully calculated values for dish: ${selectedFoodDetails.foodname} ${selectedFoodDetails.brand}!\n
            --You can view resulting entry in the console`);
      } else {
        alert("There was an Error!");
      }
      console.log(res);
    })();
  };

  onSaveDishIngr = () => {
    const { selectedFoodDetails } = this.state;

    this.setState({
      selectedFoodDetails: null,
      searchareaIsLoading: true,
    });
    (async() => {

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

      document.querySelector(".search").value = `${selectedFoodDetails.foodname} ${selectedFoodDetails.brand}`;
      this.loadSFoodItems(`${selectedFoodDetails.foodname} ${selectedFoodDetails.brand}`,
        document.querySelector("#isAll").checked);

      if (typeof res !== "string") {
        alert(`Successfully saved dish: ${selectedFoodDetails.foodname} ${selectedFoodDetails.brand}!\n
                --You can view resulting entry in the console`);
      } else {
        alert("There was an Error!");
      }
      console.log(res);
    })();
  };

  onRemoveFoodEntry = (ev, sender) => {
    const { composition, selectedFoodDetails } = this.state;

    for (let i = 0; i < composition.length; i += 1) {
      if (composition[i].key.toString() === sender._reactInternalFiber.key) {
        selectedFoodDetails.foodentries.splice(i, 1);
        composition.splice(i, 1);

        this.setState({
          composition,
          selectedFoodDetails,
        });
      }
    }
  };

  onAddNewFoodEntry = (newFoodEntry) => {
    // if (currentUser.access === "Guest" && selectedFoodDetails.foodentries.length >= 7) {
    //   return "As Guest user you cannot enter more than 7 Food Items per Dish!";
    // }
    const { composition, selectedFoodDetails } = this.state;
    let { compFoodCounter } = this.state;

    compFoodCounter += 1;
    // const newComp = composition;
    composition.push(
      <FoodEntry
        key={compFoodCounter} foodEntry={newFoodEntry}
        onRemoveFoodEntry={this.onRemoveFoodEntry}
      />);
    selectedFoodDetails.foodentries.push(newFoodEntry);

    this.setState({
      selectedFoodDetails,
      composition,
      compFoodCounter,
    });
  };

  _infoForMeasure = (measureStr, infoValue) => {
    const { sizeinfo } = this.state.selectedFoodDetails;
    const measure = sizeinfo === null ? "Pieces" : "Grams";

    return measure === measureStr ? `${infoValue}` : "--";
  };

  _compositionOrNot = () => {
    const { composition, selectedFoodDetails } = this.state;

    if (selectedFoodDetails.isdish) {
      return (
        <div className="foodEntries boxShow">
          <div className="comp textHigh">Composition:</div>
          {composition}
        </div>
      );
    }

    return "";
  };

  _dishButtonsOrNot = () => {
    const { isDishSelected } = this.props;

    if (isDishSelected) {
      return (
        <div className="tcenter">
          <button className="ftButton" onClick={this.onSaveDishIngr}>SAVE DISH</button>
          <button className="ftButton" onClick={this.onCalculateValues}>ADD VALUES</button>
        </div>
      );
    }

    return "";
  };
}

export default FoodDetailsArea;
