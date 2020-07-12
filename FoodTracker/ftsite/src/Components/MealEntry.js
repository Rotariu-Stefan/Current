/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-onchange */
import React from "react";
import PropTypes from "prop-types";

import FoodEntry from "./FoodEntry";
import Note from "./Note";


class MealEntry extends React.Component {
  static propTypes = {
    mealEntry: PropTypes.object.isRequired,
    updateDayMacros: PropTypes.func.isRequired,
    updateRemoveMeal: PropTypes.func.isRequired,
    updateSelectedMeal: PropTypes.func.isRequired,
    signalSelect: PropTypes.bool,
  };

  static defaultProps = { signalSelect: false };
  static defaultMealEntry = {
    mealname: "New Meal",
    portion: 1,
    note: null,
    foodentries: [],
  };

  constructor(props) {
    super(props);
    const { mealEntry } = props;

    this.fat = 0;
    this.carbs = 0;
    this.protein = 0;
    this.state = {
      mealEntry: mealEntry ? mealEntry : { ...MealEntry.defaultMealEntry },

      fat: 0,
      carbs: 0,
      protein: 0,

      isHighlighted: false,
      isMin: false,
    };
    this.foodEntriesCounter = 0;
  }

  componentDidMount() {
    if (this.props.signalSelect) {
      this.onMealSelect();
    }
  }

  componentDidUpdate() {
    this.kEYUPDATE();
  }

  render() {
    const { mealEntry, isHighlighted, isMin, fat, carbs, protein } = this.state;
    const { mealname, note, portion } = mealEntry;

    return (
      <div
        className={`mealArea boxShow${isHighlighted ? " highlight" : ""}`} role="menuitem" tabIndex="0"
        onClick={this.onMealSelect}
      >
        <div className="mealTitle">
          {`${mealname} (x${portion})`}
          <button className="managerImg20" onClick={this.onRemoveMeal}>
            <img alt="X" src="SitePics/icons8-cancel-20.png" />
          </button>
          <button className="managerImg20" onClick={this.onMinMaxToggle}>
            <img alt={isMin ? "+" : "-"} src={isMin ? "SitePics/icons8-plus-20.png" : "SitePics/icons8-minus-20.png"} />
          </button>
        </div>
        <Note
          key={this._reactInternalFiber.key + (note ? "_note" : "0")} isMin={isMin} note={note}
          removeNote={this.removeNote} updateNote={this.updateNote}
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

  onMealSelect = () => this.props.updateSelectedMeal(this);

  onRemoveMeal = () => {
    const { fat, carbs, protein } = this.state;

    this.props.updateRemoveMeal(this);
    this.props.updateDayMacros(-fat, -carbs, -protein);
  }

  onMinMaxToggle = (ev) => {
    this.setState({ isMin: !this.state.isMin });
    ev.stopPropagation();
  };

  updateNote = (newNote) => {
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
    this.props.updateDayMacros(newFat, newCarbs, newProtein);
  };

  toggleHighlight = () => this.setState({ isHighlighted: !this.state.isHighlighted });

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

  kEYUPDATE() {
    if (this.props.mealEntry !== this.state.mealEntry) {
      this.setState({ mealEntry: this.props.mealEntry });
    }
  }
}

export default MealEntry;
