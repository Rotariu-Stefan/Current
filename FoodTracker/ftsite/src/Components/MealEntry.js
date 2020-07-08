/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from "react";

import FoodEntry from "./FoodEntry";
import Note from "./Note";


class MealEntry extends Component {
    static defaultMealEntry = {
      mealname: "New Meal",
      portion: 1,
      note: null,
      foodentries: [],
    };

    constructor(props) {
      super(props);

      this.state = {
        mealEntry: props.mealEntry ? props.mealEntry : { ...MealEntry.defaultMealEntry },
        foodEntries: [],
        foodCounter: 0,
        isHighlighted: false,
        isMin: false,
        fat: 0,
        carbs: 0,
        protein: 0,
      };

      if (props.mealEntry) {
        for (const f of props.mealEntry.foodentries) {
          this.state.foodEntries.push(
            <FoodEntry
              key={this.state.foodCounter}
              className="lineDown"
              foodEntry={f}
              updateMealMacros={this.updateMealMacros}
              onRemoveFoodEntry={this.onRemoveFoodEntry}
            />);
          this.state.foodCounter += 1;
        }
      }
    }

    render = () => {
      const { mealEntry, isHighlighted, isMin, foodEntries, fat, carbs, protein } = this.state;
      const { mealname, note, portion } = mealEntry;

      return (
        <div
          className={`mealArea boxShow${isHighlighted ? " highlight" : ""}`} role="menuitem" tabIndex="0"
          onClick={(ev) => this.props.onMealSelect(ev, this)}
        >
          <div className="mealTitle">
            {`${mealname} (x${portion})`}
            <img
              alt="X" className="managerImg" src="SitePics/icons8-cancel-20.png"
              onClick={(ev) => this.props.onRemoveMeal(ev, this)}
            />
            <img
              alt={isMin ? "+" : "-"} className="managerImg" src={isMin ? "SitePics/icons8-plus-20.png" : "SitePics/icons8-minus-20.png"}
              onClick={this.toggleMinMax}
            />
          </div>
          <Note
            key={this._reactInternalFiber.key + (note ? "_note" : "0")} isMin={isMin} note={note}
            removeNote={this.onRemoveNote} updateAttach={this.onUpdateAttach}
          />
          <div className={`foodEntries lineDown${isMin ? " hidden" : ""}`}>
            {foodEntries}
          </div>
          <div className="mealTotal">
            <span>Meal Total:</span>
            <span>{`${fat.toFixed(1)}|${carbs.toFixed(1)}|${protein.toFixed(1)}`}</span>
          </div>
        </div>
      );
    };

    onRemoveFoodEntry = (ev, sender) => {
      const { foodEntries, mealEntry, fat, carbs, protein } = this.state;
      const { portion } = mealEntry;

      for (let i = 0; i < foodEntries.length; i += 1) {
        if (foodEntries[i].key.toString() === sender._reactInternalFiber.key) {
          mealEntry.foodentries.splice(i, 1);
          foodEntries.splice(i, 1);

          this.setState({
            foodEntries,
            mealEntry,
            fat: fat - (sender.state.fatRes * portion),
            carbs: carbs - (sender.state.carbsRes * portion),
            protein: protein - (sender.state.proteinRes * portion),
          });
          this.props.addToDay(0 - (sender.state.fatRes * portion), 0 - (sender.state.carbsRes * portion)
            , 0 - (sender.state.proteinRes * portion));
        }
      }

      this.props.updateMealFoodEntries(this);
    };

    onUpdateAttach = (newNote) => {
      const { mealEntry } = this.state;

      mealEntry.note = newNote;
      this.setState({ mealEntry });
    };

    onRemoveNote = () => {
      const { mealEntry } = this.state;

      mealEntry.note = null;
      this.setState({ mealEntry });
      this.props.updateMealNote();
    };

    toggleHighlight = () => this.setState({ isHighlighted: !this.state.isHighlighted });

    toggleMinMax = (ev) => {
      this.setState({ isMin: !this.state.isMin });
      ev.stopPropagation();
    };

    addNewFoodEntry = (newFoodEntry) => {
      const { foodEntries } = this.state;
      let { foodCounter } = this.state;

      foodCounter += 1;
      foodEntries.push(
        <FoodEntry
          key={foodCounter} className="lineDown" foodEntry={newFoodEntry}
          updateMealMacros={this.updateMealMacros} onRemoveFoodEntry={this.onRemoveFoodEntry}
        />);

      this.setState({
        foodEntries,
        foodCounter,
      });
    };

    updateMealMacros = (newFat, newCarbs, newProtein) => {
      const { portion, fat, carbs, protein } = this.state.mealEntry;

      this.setState({
        fat: fat + (newFat * portion),
        carbs: carbs + (newCarbs * portion),
        protein: protein + (newProtein * portion),
      });

      this.props.addToDay(newFat * portion, newCarbs * portion, newProtein * portion);
    };
}

export default MealEntry;
