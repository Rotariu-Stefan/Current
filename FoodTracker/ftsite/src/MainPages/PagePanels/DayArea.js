/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-onchange */
import React from "react";
import PropTypes from "prop-types";

import Note from "../../Components/Note";
import MealEntry from "../../Components/MealEntry";
import { dateToStr, getServerURL } from "../../methods";
import { AppContext } from "../../AppContext";


class DayArea extends React.Component {
  static contextType = AppContext;
  static propTypes = { updateDishSelect: PropTypes.func.isRequired }

  constructor(props) {
    super(props);

    this.fat = 0;
    this.carbs = 0;
    this.protein = 0;
    this.state = {
      selectedDay: null,
      dayEntry: {},
      dayFat: 0,
      dayCarbs: 0,
      dayProtein: 0,

      selectedMeal: null,
      mealareaIsLoading: true,
    };
    this.mealsEntriesCounter = 0;
  }

  componentDidMount() {
    this.setInitialState();
  }

  render() {
    const { selectedDay, dayEntry, mealareaIsLoading, dayFat, dayCarbs, dayProtein } = this.state;

    const mealsAreaOrLoading = mealareaIsLoading ? "LOADING..." : this._getMealEntries();
    const noteOrLoading = mealareaIsLoading ? "LOADING..." : (
      <Note
        key={`D${dayEntry.note ? dayEntry.note.noteid : "D0"}`} note={dayEntry.note}
        removeNote={this.removeNote} updateNote={this.updateNote}
      />
    );

    return (
      <div className="dayArea subblock boxShow">
        <div className="dayHeader">
          <div className="datepick boxShow">
            <span className="textHigh">Day: </span>
            <button
              className="ftButton" data-offset="-1"
              disabled={mealareaIsLoading} onClick={this.onDayOffset}
            >
              {"<"}
            </button>
            <input
              className="selectedDay" disabled={mealareaIsLoading} type="date" value={selectedDay}
              onChange={this.onLoadDailyMeals}
            />
            <button
              className="ftButton" data-offset="1"
              disabled={mealareaIsLoading} onClick={this.onDayOffset}
            >{">"}</button>
          </div>
          {noteOrLoading}
        </div>
        <div className="mealsArea">
          {mealsAreaOrLoading}
        </div>
        <hr />
        <div className="dayTotal">
          <span>Day Total:</span>
          <span>{`${dayFat.toFixed(1)}||${dayCarbs.toFixed(1)}||${dayProtein.toFixed(1)}`}</span>
        </div>
        <button className="ftButton" disabled={mealareaIsLoading} onClick={this.onCommit}>COMMIT DAY!</button>
      </div>
    );
  }

  onLoadDailyMeals = (dayParam) => {
    const { currentUser } = this.context;

    const day = (typeof dayParam === "string") ? dayParam : dayParam.currentTarget.value;

    if (currentUser.access === "Guest" &&
      (new Date(day) < new Date("2020-06-04") || new Date(day) > new Date("2020-06-11"))) {
      alert("As Guest user you can Only select from the 2020-06-04 to 2020-06-11 period!");

      return;
    }

    this.fat = 0;
    this.carbs = 0;
    this.protein = 0;
    this.setState({
      mealareaIsLoading: true,
      selectedMeal: null,
      dayEntry: null,
      dayFat: 0,
      dayCarbs: 0,
      dayProtein: 0,
    },
    async() => {
      let res = await fetch(`${getServerURL()}/dailymeals`, {
        method: "get",
        headers: {
          "content-type": "application/json",
          "reqdate": day,
          "userid": currentUser.userid,
        },
      });
      res = await res.json();

      this.setState({
        mealareaIsLoading: false,
        selectedDay: day,
        dayEntry: res,
      });
    });
  };

  onDayOffset = (ev) => {
    const { selectedDay } = this.state;

    const d = new Date(selectedDay);
    d.setDate(d.getDate() + Number(ev.currentTarget.getAttribute("data-offset")));
    this.onLoadDailyMeals(dateToStr(d));
  };

  onCommit = () => {
    this.setState({ searchareaIsLoading: true },
      async() => {
        const { dayEntry, selectedDay } = this.state;
        const { currentUser } = this.context;

        const dayPutReq = dayEntry;
        dayPutReq.userid = currentUser.userid;
        dayPutReq.date = selectedDay;

        let res = await fetch(`${getServerURL()}/dailymeals`, {
          method: "put",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(dayPutReq),
        });
        res = await res.json();

        this.onLoadDailyMeals(this.state.selectedDay);

        console.log(res);
        if (typeof res !== "string") {
          alert(`Successfully entered date for day ${selectedDay}!\n --You can view resulting entry in the console`);
        } else {
          alert("There was an Error!");
        }

        this.setState({ searchareaIsLoading: false });
      });
  };

  updateAddNewMeal = (mealName = "", portion = 1) => {
    const { currentUser } = this.context;
    const { dayEntry } = this.state;

    if (currentUser.access === "Guest" && dayEntry.meals.length === 5) {
      return "As Guest user you cannot enter more than 5 Meals per day!";
    }
    if (isNaN(portion)) {
      return "Must Enter Valid Number for Portion!";
    }

    const newMealEntry = {
      mealname: mealName === "" ? `Meal${dayEntry.meals.length + 1}` : mealName,
      portion: portion === "" ? 1 : portion,
      noteid: null,
      foodentries: [],
    };

    dayEntry.meals.push(newMealEntry);
    this.setState({ dayEntry });

    return "";
  };

  updateRemoveMeal = (sender) => {
    const { dayEntry } = this.state;

    dayEntry.meals.splice(sender._reactInternalFiber.key, 1);
    this.setState({ dayEntry });
  };

  updateSelectedMeal = (sender) => {
    const { selectedMeal } = this.state;

    if (sender === null && selectedMeal !== null) {
      selectedMeal.toggleHighlight();
      this.setState({ selectedMeal: null });
    } else if (sender !== selectedMeal) {
      if (selectedMeal) {
        selectedMeal.toggleHighlight();
      }
      sender.toggleHighlight();
      this.setState({ selectedMeal: sender });
      // ev.stopPropagation();
      this.props.updateDishSelect(false);
    }
  };

  updateNewFoodEntry = (newFoodEntry) => {
    const { selectedMeal } = this.state;
    const { currentUser } = this.context;

    if (selectedMeal === null) {
      return "Must select a Meal or Dish!";
    }
    if (currentUser.access === "Guest" && selectedMeal.state.mealEntry.foodentries.length >= 7) {
      return "As Guest user you cannot enter more than 7 Food Items per Meal!";
    }

    selectedMeal.updateNewFoodEntry(newFoodEntry);

    return "";
  };

  updateDayMacros = (newfat, newcarbs, newprotein) => {
    this.fat += newfat;
    this.carbs += newcarbs;
    this.protein += newprotein;

    this.setState({
      dayFat: this.fat,
      dayCarbs: this.carbs,
      dayProtein: this.protein,
    });
  };

  updateNote = (newNote) => {
    const { dayEntry } = this.state;

    dayEntry.note = newNote;
    this.setState({ dayEntry });
  };

  _getMealEntries = () => {
    const { dayEntry } = this.state;

    this.mealsEntriesCounter = 0;

    return dayEntry.meals.map(this._getMealEntry);

  };

  _getMealEntry = (entry) => {
    const me = (
      <MealEntry
        key={this.mealsEntriesCounter} mealEntry={entry} signalSelect={this.mealsEntriesCounter === 0}
        updateDayMacros={this.updateDayMacros} updateMealFoodEntries={this.updateMealFoodEntries}
        updateMealNote={this.updateMealNote} updateRemoveMeal={this.updateRemoveMeal}
        updateSelectedMeal={this.updateSelectedMeal}
      />);
    this.mealsEntriesCounter += 1;

    return me;
  };

  setInitialState() {
    const { currentUser } = this.context;

    const initialDate = currentUser.access === "Guest" ? new Date("2020-06-07") : new Date();
    this.setState({ selectedDay: dateToStr(initialDate) });

    setTimeout(() => {
      this.onLoadDailyMeals(this.state.selectedDay);
    }, 0);
  }
}

export default DayArea;
