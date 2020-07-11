/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import PropTypes from "prop-types";

import FoodEntry from "./FoodEntry";
import Note from "./Note";


class MealEntry extends React.Component {
  static propTypes = {
    mealEntry: PropTypes.object.isRequired,
    updateDayMacros: PropTypes.func.isRequired,
    onMealSelect: PropTypes.func.isRequired,
    onRemoveMeal: PropTypes.func.isRequired,
  };

  static defaultMealEntry = {
    mealname: "New Meal",
    portion: 1,
    note: null,
    foodentries: [],
  };

  constructor(props) {
    super(props);

    this.fat = 0;
    this.carbs = 0;
    this.protein = 0;
    this.state = {
      mealEntry: props.mealEntry ? props.mealEntry : { ...MealEntry.defaultMealEntry },

      fat: 0,
      carbs: 0,
      protein: 0,

      isHighlighted: false,
      isMin: false,
    };
    this.foodEntriesCounter = 0;
  }

  componentDidMount() {
    this.props.updateDayMacros(this.fat, this.carbs, this.protein);
  }

  render() {
    const { mealEntry, isHighlighted, isMin, fat, carbs, protein } = this.state;
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
          removeNote={this.removeNote} updateAttach={this.updateAttach}
        />
        <div className={`foodEntries lineDown${isMin ? " hidden" : ""}`}>
          {this._getFoodEntries()}
        </div>
        <div className="mealTotal">
          <span>Meal Total:</span>
          <span>{`${fat.toFixed(1)}|${carbs.toFixed(1)}|${protein.toFixed(1)}`}</span>
        </div>
      </div>
    );
  }

    removeNote = () => {
      const { mealEntry } = this.state;

      mealEntry.note = null;
      this.setState({ mealEntry });
      this.props.updateMealNote();
    };

    updateAttach = (newNote) => {
      const { mealEntry } = this.state;

      mealEntry.note = newNote;
      this.setState({ mealEntry });
    };

    updateRemoveFoodEntry = (foodEntry) => {
      const { mealEntry } = this.state;

      mealEntry.foodentries.splice(foodEntry._reactInternalFiber.key, 1);
      this.setState({ mealEntry });
    };

    updateNewFoodEntry = (foodEntry) => {
      const { mealEntry } = this.state;

      mealEntry.foodentries.push(foodEntry);
      this.setState({ mealEntry });

      return "";
    };

    updateMealMacros = (newFat, newCarbs, newProtein) => {
      const { portion } = this.state.mealEntry;

      this.fat += (newFat * portion);
      this.carbs += (newCarbs * portion);
      this.protein += (newProtein * portion);

      this.setState({
        fat: this.fat,
        carbs: this.carbs,
        protein: this.protein,
      });
    };

    toggleHighlight = () => this.setState({ isHighlighted: !this.state.isHighlighted });

    toggleMinMax = (ev) => {
      this.setState({ isMin: !this.state.isMin });
      ev.stopPropagation();
    };

    _getFoodEntries = () => {
      const { mealEntry } = this.state;

      this.foodEntriesCounter = 0;

      return mealEntry.foodentries.map(this._getFoodEntry);
    };

    _getFoodEntry = (entry) => {
      const fe = (
        <FoodEntry
          key={this.foodEntriesCounter} className="lineDown" foodEntry={entry}
          updateMealMacros={this.updateMealMacros} updateRemoveFoodEntry={this.updateRemoveFoodEntry}
        />);
      this.foodEntriesCounter += 1;

      return fe;
    };
}

export default MealEntry;
