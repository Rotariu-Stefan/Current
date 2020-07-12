/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-onchange */
import React from "react";
import "../Css/DailyMeals.css";

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

  render() {
    const { isDishSelected } = this.state;

    return (
      <main className="mainDailyMeals boxShow" >
        <DayArea ref={this.dayAreaRef} updateDishSelect={this.updateDishSelect} />
        <AddFoodArea
          ref={this.addFoodAreaRef} updateAddNewFoodEntry={this.updateAddNewFoodEntry}
          updateAddNewMeal={this.updateAddNewMeal} updateSelectedFood={this.updateSelectedFood}
        />
        <FoodDetailsArea
          ref={this.foodDetailsAreaRef} isDishSelected={isDishSelected}
          updateDishSelect={this.updateDishSelect}
        />
      </main>
    );
  }

  dayAreaRef = (node) => this.setState({ dayArea: node });
  addFoodAreaRef = (node) => this.setState({ addFoodArea: node });
  foodDetailsAreaRef = (node) => this.setState({ foodDetailsArea: node });

  updateAddNewMeal = (mealName, portion) => {
    const errorMessage = this.state.dayArea.updateAddNewMeal(mealName, portion);
    if (errorMessage) {
      alert(errorMessage);
    } else {
      this.state.addFoodArea.resetAfterAdd();
    }
  };

  updateSelectedFood = (selectedFood) => {
    const { isDishSelected } = this.state;

    if (!isDishSelected) {
      this.state.foodDetailsArea.updateSelectedFoodDetails(selectedFood);
    }
  };

  updateAddNewFoodEntry = (newFoodEntry) => {
    const { isDishSelected } = this.state;

    let errorMessage = "";
    if (isDishSelected) {
      errorMessage = this.state.foodDetailsArea.updateNewFoodEntry(newFoodEntry);
    } else {
      errorMessage = this.state.dayArea.updateNewFoodEntry(newFoodEntry);
    }

    if (errorMessage) {
      alert(errorMessage);
    } else {
      this.state.addFoodArea.resetAfterAdd();
    }
  };

  updateDishSelect = (status) => {
    if (status) {
      this.state.dayArea.updateSelectedMeal(null);
    }
    this.setState({ isDishSelected: status });
  };
}

export default DailyMeals;
