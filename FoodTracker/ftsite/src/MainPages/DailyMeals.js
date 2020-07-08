/* eslint-disable no-console */
/* eslint-disable no-alert */
import React from "react";
import "../Css/DailyMeals.css";

// import FoodEntry from "../Components/FoodEntry";
// import FoodItem from "../Components/FoodItem";
// import MealEntry from "../Components/MealEntry";
import { AppContext } from "../AppContext";

import DayArea from "./PagePanels/DayArea";
import AddFoodArea from "./PagePanels/AddFoodArea";
import FoodDetailsArea from "./PagePanels/FoodDetailsArea";


class DailyMeals extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.state = {
      dayArea: React.createRef(),
      addFoodArea: React.createRef(),
      foodDetailsArea: React.createRef(),
      isDishSelected: false,
    };
  }

  render = () => {
    const { isDishSelected } = this.state;

    return (
      <main className="mainDailyMeals boxShow" >
        <DayArea ref={this.state.dayArea} updateDishSelect={this.updateDishSelect} />
        <AddFoodArea
          ref={this.state.addFoodArea} onAddNewFoodEntry={this.onAddNewFoodEntry}
          onAddNewMeal={this.onAddNewMeal} onSelectedFoodChanged={this.onSelectedFoodChanged}
        />
        <FoodDetailsArea
          ref={this.state.foodDetailsArea} isDishSelected={isDishSelected}
          updateDishSelect={this.updateDishSelect}
        />
      </main>
    );
  };

  onSelectedFoodChanged = (selectedFood) => {
    const { isDishSelected } = this.state;

    if (!isDishSelected) {
      this.state.foodDetailsArea.current.onSelectedFoodChanged(selectedFood);
    }
  };

  onAddNewMeal = (mealName, portion) => {
    const errorMessage = this.state.dayArea.current.onAddNewMeal(mealName, portion);
    if (errorMessage) {
      alert(errorMessage);
    } else {
      this.state.addFoodArea.current.resetAfterAdd();
    }
  };

  onAddNewFoodEntry = (newFoodEntry) => {
    const { isDishSelected } = this.state;

    let errorMessage = "";
    if (isDishSelected) {
      errorMessage = this.state.foodDetailsArea.current.onAddNewFoodEntry(newFoodEntry);
    } else {
      errorMessage = this.state.dayArea.current.onAddNewFoodEntry(newFoodEntry);
    }

    if (errorMessage) {
      alert(errorMessage);
    } else {
      this.state.addFoodArea.current.resetAfterAdd();
    }
  };

  updateDishSelect = (status) => {
    this.setState({ isDishSelected: status });
  };
}

export default DailyMeals;
