/* eslint-disable no-console */
/* eslint-disable no-alert */
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

    this.state = {
      selectedDay: null,
      dayEntry: {},
      dayFat: 0,
      dayCarbs: 0,
      dayProtein: 0,

      mealEntries: [],
      mealCounter: 0,
      selectedMeal: null,
      mealareaIsLoading: true,
    };
  }

  componentDidMount = () => {
    this.setInitialState();
  }

  render = () => {
    const { selectedDay, mealEntries, dayEntry, mealareaIsLoading, dayFat, dayCarbs, dayProtein } = this.state;

    const mealsAreaOrLoading = mealareaIsLoading ? "LOADING..." : mealEntries;
    const noteOrLoading = mealareaIsLoading ? "LOADING..." : (
      <Note
        key={`D${dayEntry.note ? dayEntry.note.noteid : "D0"}`} note={dayEntry.note}
        removeNote={this.removeNote} updateDayNote={this.updateDayNote}
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
  };

  onLoadDailyMeals = (dayParam) => {
    const { currentUser } = this.context;

    const day = (typeof dayParam === "string") ? dayParam : dayParam.currentTarget.value;

    if (currentUser.access === "Guest" &&
      (new Date(day) < new Date("2020-06-04") || new Date(day) > new Date("2020-06-11"))) {
      alert("As Guest user you can Only select from the 2020-06-04 to 2020-06-11 period!");

      return;
    }

    this.setState({
      mealEntries: [],
      selectedMeal: null,
      mealareaIsLoading: true,
      dayFat: 0,
      dayCarbs: 0,
      dayProtein: 0,
    });

    (async() => {
      const { mealCounter } = this.state;

      let res = await fetch(`${getServerURL()}/dailymeals`, {
        method: "get",
        headers: {
          "content-type": "application/json",
          "reqdate": day,
          "userid": currentUser.userid,
        },
      });
      res = await res.json();

      const mealEntries = [];
      for (const m of res.meals) {
        mealEntries.push(
          <MealEntry
            key={mealCounter} addToDay={this.addNewFoodEntryMacros} mealEntry={m}
            updateMealFoodEntries={this.updateMealFoodEntries} updateMealNote={this.updateMealNote}
            onMealSelect={this.onMealSelect} onRemoveMeal={this.onRemoveMeal}
          />);
      }

      this.setState({
        selectedDay: day,
        dayEntry: res,
        mealEntries,
        mealCounter,
        mealareaIsLoading: false,
      });
    })();
  };

  onAddNewMeal = (mealName = "", portion = 1) => {
    const { currentUser } = this.context;
    if (currentUser.access === "Guest" && this.state.mealEntries.length === 5) {
      return "As Guest user you cannot enter more than 5 Meals per day!";
    }
    if (isNaN(portion)) {
      return "Must Enter Valid Number for Portion!";
    }

    const { mealEntries, dayEntry } = this.state;
    const { mealCounter } = this.state;

    const newMeal = {
      mealname: mealName === "" ? `Meal${mealEntries.length + 1}` : mealName,
      portion: portion === "" ? portion : 1,
      noteid: null,
      foodentries: [],
    };

    mealEntries.push(
      <MealEntry
        key={mealCounter} addToDay={this.addNewFoodEntryMacros} mealEntry={newMeal}
        signalSelect={true} updateMealFoodEntries={this.updateMealFoodEntries} updateMealNote={this.updateMealNote}
        onMealSelect={this.onMealSelect} onRemoveMeal={this.onRemoveMeal}
      />);
    newMeal.key = mealCounter;
    dayEntry.meals.push(newMeal);

    this.setState({
      mealEntries,
      mealCounter: mealCounter + 1,
      dayEntry,
    });

    return "";
  };

  onRemoveMeal = (ev, sender) => {
    const { selectedMeal, mealEntries, dayEntry } = this.state;

    dayEntry.meals = dayEntry.meals.filter((m) => !((m.mealid && m.mealid === sender.state.mealEntry.mealid)
      || (m.key !== undefined && m.key.toString() === sender._reactInternalFiber.key)));

    this.setState({
      mealEntries: mealEntries.filter((meal) => meal.key !== sender._reactInternalFiber.key),
      dayEntry,
    });
    this.addNewFoodEntryMacros(-sender.state.fat, -sender.state.carbs, -sender.state.protein);

    if (selectedMeal !== null && selectedMeal === sender) {
      this.setState({ selectedMeal: null });
    }
    ev.stopPropagation();
  };

  onMealSelect = (ev, sender) => {
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
      ev.stopPropagation();
      this.props.updateDishSelect(false);
    }
  };

  onAddNewFoodEntry = (newFoodEntry) => {
    const { dayEntry, selectedMeal } = this.state;
    const { currentUser } = this.context;

    if (selectedMeal === null) {
      return "Must select a Meal or Dish!";
    }
    if (currentUser.access === "Guest" && selectedMeal.state.foodEntries.length >= 7) {
      return "As Guest user you cannot enter more than 7 Food Items per Meal!";
    }

    selectedMeal.addNewFoodEntry(newFoodEntry);
    for (const m of dayEntry.meals) {
      if ((m.mealid && selectedMeal.state.mealEntry.mealid === m.mealid)
          || (m.key !== undefined && selectedMeal._reactInternalFiber.key === m.key.toString())) {
        m.foodentries.push(newFoodEntry);
        break;
      }
    }
    this.setState({ dayEntry });

    return "";
  };

  onDayOffset = (ev) => {
    const { selectedDay } = this.state;

    const d = new Date(selectedDay);
    d.setDate(d.getDate() + Number(ev.currentTarget.getAttribute("data-offset")));
    this.onLoadDailyMeals(dateToStr(d));
  };

  onCommit = () => {
    this.setState({ searchareaIsLoading: true });
    (async() => {
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

      this.loadDailyMeals(this.state.selectedDay);

      if (typeof res !== "string") {
        alert(`Successfully entered date for day ${selectedDay}!\n --You can view resulting entry in the console`);
      } else {
        alert("There was an Error!");
      }
      console.log(res);
    })();
    this.setState({ searchareaIsLoading: false });
  };

  removeNote = () => {
    const { dayEntry } = this.state;

    dayEntry.note = null;
    this.setState({ dayEntry });
  };

  updateDayNote = (newNote) => {
    const { dayEntry } = this.state;

    dayEntry.note = newNote;
    this.setState({ dayEntry });
  };

  updateMealNote = () => {
    const { dayEntry, selectedMeal } = this.state;

    for (const m of dayEntry.meals) {
      if ((m.mealid && selectedMeal.state.mealEntry.mealid === m.mealid)
    || (m.key !== undefined && selectedMeal._reactInternalFiber.key === m.key.toString())) {
        m.note = selectedMeal.state.mealEntry.note;
        break;
      }
    }

    this.setState({ dayEntry });
  };

  updateMealFoodEntries = (sender) => {
    const { dayEntry } = this.state;

    for (const m of dayEntry.meals) {
      if ((m.mealid && sender.state.mealEntry.mealid === m.mealid)
    || (m.key !== undefined && sender._reactInternalFiber.key === m.key.toString())) {
        m.foodentries = sender.state.mealEntry.foodentries;
        break;
      }
    }

    this.setState({ dayEntry });
  };

  addNewFoodEntryMacros = (newfat, newcarbs, newprotein) => {
    const { dayFat, dayCarbs, dayProtein } = this.state;

    this.setState({
      dayFat: dayFat + newfat,
      dayCarbs: dayCarbs + newcarbs,
      dayProtein: dayProtein + newprotein,
    });
  };

  setInitialState = () => {
    const { currentUser } = this.context;

    const initialDate = currentUser.access === "Guest" ? new Date("2020-06-07") : new Date();
    this.setState({ selectedDay: dateToStr(initialDate) });

    setTimeout(() => {
      this.onLoadDailyMeals(this.state.selectedDay);
    }, 0);
  }
}

export default DayArea;
