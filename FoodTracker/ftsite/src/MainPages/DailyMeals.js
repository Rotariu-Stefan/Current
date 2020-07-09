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
      dayArea: null,
      addFoodArea: null,
      foodDetailsArea: null,
      isDishSelected: false,
    };
  }

  render = () => {
    const { isDishSelected } = this.state;

    return (
      <main className="mainDailyMeals boxShow" >
        <DayArea ref={this.dayAreaRef} updateDishSelect={this.updateDishSelect} />
        <AddFoodArea
          ref={this.addFoodAreaRef} onAddNewFoodEntry={this.onAddNewFoodEntry}
          onAddNewMeal={this.onAddNewMeal} onSelectedFoodChanged={this.onSelectedFoodChanged}
        />
        <FoodDetailsArea
          ref={this.foodDetailsAreaRef} isDishSelected={isDishSelected}
          updateDishSelect={this.updateDishSelect}
        />
      </main>
    );
  };

  onSelectedFoodChanged = (selectedFood) => {
    const { isDishSelected } = this.state;

    if (!isDishSelected) {
      this.state.foodDetailsArea.onSelectedFoodChanged(selectedFood);
    }
  };

  onAddNewMeal = (mealName, portion) => {
    const errorMessage = this.state.dayArea.onAddNewMeal(mealName, portion);
    if (errorMessage) {
      alert(errorMessage);
    } else {
      this.state.addFoodArea.resetAfterAdd();
    }
  };

  onAddNewFoodEntry = (newFoodEntry) => {
    const { isDishSelected } = this.state;

    let errorMessage = "";
    if (isDishSelected) {
      errorMessage = this.state.foodDetailsArea.onAddNewFoodEntry(newFoodEntry);
    } else {
      errorMessage = this.state.dayArea.onAddNewFoodEntry(newFoodEntry);
    }

    if (errorMessage) {
      alert(errorMessage);
    } else {
      this.state.addFoodArea.resetAfterAdd();
    }
  };

  dayAreaRef = (node) => this.setState({ dayArea: node });
  addFoodAreaRef = (node) => this.setState({ addFoodArea: node });
  foodDetailsAreaRef = (node) => this.setState({ foodDetailsArea: node });

  updateDishSelect = (status) => {
    if (status) {
      this.state.dayArea.onMealSelect(null, null);
    }
    this.setState({ isDishSelected: status });
  };
}

export default DailyMeals;
