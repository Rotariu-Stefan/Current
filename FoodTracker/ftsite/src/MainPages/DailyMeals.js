import React from 'react';
import "../Css/DailyMeals.css";

import MealEntry from '../Components/MealEntry';
import FoodEntry from '../Components/FoodEntry';
import FoodItem from '../Components/FoodItem';
import Note from '../Components/Note';
import { app } from '../App';
import svData from '../svData.json';

const getServerURL = () => {
    return svData.serverLink;
}

const dateToStr = (dateObj) => {
    return `${dateObj.getFullYear()}-${dateObj.getMonth() + 1 > 9 ? (dateObj.getMonth() + 1).toString() : "0" + (dateObj.getMonth() + 1).toString()}-${dateObj.getDate() > 9 ? dateObj.getDate().toString() : "0" + dateObj.getDate().toString()}`;
};

class DailyMeals extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDay: dateToStr(new Date()), //TODO: Eliminate and just user doc control?
            dayEntry: {},
            mealEntries: [],
            mealCounter: 0,
            sFoodItems: [],
            sFoodCounter: 0,
            amount: "",
            selectedMeal: null,
            selectedFood: null
        };

        //; (async () => {
        this.loadDailyMeals(dateToStr(new Date()));
        this.loadSFoodItems("", false);
        //})();
    }

    loadDailyMeals = async (day) => {
        let { mealEntries, mealCounter } = this.state;
        //If app.currentUser is Guest pretend it's SV
        const userId = app.state.currentUser.userid === 0 ? 1 : app.state.currentUser.userid;

        let res = await fetch(getServerURL() + "/dailymeals", {
            method: "get",
            headers: {
                "content-type": "application/json",
                "reqdate": day,
                "userid": userId,
            }
        });
        res = await res.json();

        mealEntries = [];
        let first = true;
        for (let m of res.meals)
            if (!first)
                mealEntries.push(<MealEntry
                    selectedChanged={this.onSelectedMealChanged}
                    removeMeal={this.onRemoveMeal}
                    mealEntry={m}
                    key={mealCounter++} />);
            else {
                mealEntries.push(<MealEntry
                    signalSelect={true}
                    selectedChanged={this.onSelectedMealChanged}
                    removeMeal={this.onRemoveMeal}
                    mealEntry={m}
                    key={mealCounter++} />);
                first = false;
            }

        this.setState({
            selectedDay: day,
            dayEntry: res,
            mealEntries: mealEntries,
            mealCounter: mealCounter
        });
    }

    loadSFoodItems = async (searchTerms, isAll) => {
        let { sFoodItems, sFoodCounter } = this.state;
        //If app.currentUser is Guest pretend it's SV
        const userId = app.state.currentUser.userid === 0 ? 1 : app.state.currentUser.userid;

        let res;
        res = await fetch(getServerURL() + "/dailymeals/foodsearch", {
            method: "get",
            headers: {
                "content-type": "application/json",
                "userid": userId,
                "search": searchTerms,
                "isall": isAll
            }
        });
        res = await res.json();


        sFoodItems = [];
        let first = true;
        for (let f of res)
            if (!first)
                sFoodItems.push(<FoodItem
                    selectedChanged={this.onSelectedFoodChanged}
                    foodItem={f}
                    key={sFoodCounter++} />);
            else {
                sFoodItems.push(<FoodItem
                    signalSelect={true}
                    selectedChanged={this.onSelectedFoodChanged}
                    foodItem={f}
                    key={sFoodCounter++} />);
                first = false;
            }

        this.setState({
            sFoodItems: sFoodItems,
            sFoodCounter: sFoodCounter
        });
    };

    onCommit = async (ev) => {
        const { dayEntry, selectedDay } = this.state;
        const userId = app.state.currentUser.userid === 0 ? 1 : app.state.currentUser.userid;

        const dayPutReq = dayEntry;
        dayPutReq.userid = userId;
        dayPutReq.date = selectedDay;

        let res = await fetch(getServerURL() + "/dailymeals", {
            method: "put",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(dayPutReq)
        });
        res = await res.json();
        alert(`Successfully entered date for day ${selectedDay}!\n --You can view resulting entry in the console`);
        console.log(res);
    };

    onAddNewMeal = (ev) => {    //TODO
        const { mealEntries, dayEntry, selectedMeal } = this.state;
        let { mealCounter } = this.state;

        if (selectedMeal)
            mealEntries.push(<MealEntry
                selectedChanged={this.onSelectedMealChanged}
                removeMeal={this.onRemoveMeal}
                key={mealCounter++}
            />);
        else
            mealEntries.push(<MealEntry
                signalSelect={true}
                selectedChanged={this.onSelectedMealChanged}
                removeMeal={this.onRemoveMeal}
                key={mealCounter++}
            />);

        dayEntry.meals.push({       //TODO: Must make Custamizable
            key: mealCounter - 1,
            mealname: "New Meal",
            portion: 1,
            noteid: null,
            foodentries: []
        });

        this.setState({
            mealEntries: mealEntries,
            mealCounter: mealCounter,
            dayEntry: dayEntry
        });
    };

    onRemoveMeal = (ev, sender) => {
        const { selectedMeal, mealEntries, dayEntry } = this.state;

        dayEntry.meals = dayEntry.meals.filter((m) => !((m.mealid && m.mealid === sender.state.mealEntry.mealid)
            || m.key == sender._reactInternalFiber.key));

        this.setState({
            mealEntries: mealEntries.filter((meal) => meal.key !== sender._reactInternalFiber.key),
            dayEntry: dayEntry
        });


        if (selectedMeal !== null && selectedMeal === sender)
            this.setState({
                selectedMeal: null
            });
        ev.stopPropagation();
    };

    onSelectedMealChanged = (ev, sender) => {
        const { selectedMeal } = this.state;

        if (sender !== selectedMeal) {
            if (selectedMeal)
                selectedMeal.toggleHighlight();
            sender.toggleHighlight();

            this.setState({
                selectedMeal: sender
            });
        }
    };

    onAddNewFoodEntry = (ev) => {
        const { selectedMeal, selectedFood, dayEntry, amount } = this.state;

        if (selectedMeal === null)
            alert("Must select a Meal !");
        else if (selectedFood === null)
            alert("Must select a Food Item !");
        else {
            const amountInput = document.querySelector("#amountSize");

            if (isNaN(amount)) {
                alert("Must Enter Valid Number for Amount!");
                this.setState({
                    amount: ""
                });
                return;
            }
            else {
                const newFoodEntry = selectedFood.state.foodItem;
                newFoodEntry.amount = amount ? amount : amountInput.placeholder;
                newFoodEntry.measure = newFoodEntry.sizeinfo === null ? "Pieces" : "Grams";

                selectedMeal.addNewFoodEntry(ev, newFoodEntry);
                for (let m of dayEntry.meals)
                    if ((m.mealid && selectedMeal.state.mealEntry.mealid === m.mealid)
                        || selectedMeal._reactInternalFiber.key == m.key)
                        m.foodentries.push(newFoodEntry);

                this.setState({
                    dayEntry: dayEntry
                });
            }
        }
    };

    onSelectedFoodChanged = (ev, sender) => {
        const { selectedFood } = this.state;

        if (sender !== selectedFood) {
            if (selectedFood)
                selectedFood.toggleSelected();
            sender.toggleSelected();

            this.setState({
                selectedFood: sender,
                amount: ""
            });
        }
    };

    currentEntry = () => {
        const { selectedFood, amount } = this.state;

        if (selectedFood) {
            const measure = document.querySelector("#measureSelect").value;
            return <FoodEntry foodItem={selectedFood.state.foodItem}
                amount={amount ? amount : (selectedFood.state.foodItem.sizeinfo === null ? 1 : 100)}
                measure={measure}
                key={selectedFood.state.foodItem.foodid.toString() + amount + measure} />
        }
        else
            return <FoodEntry key={null} />
    }

    onDayButtons = (ev, nrDays) => {
        const { selectedDay } = this.state;

        let d = new Date(selectedDay);
        d.setDate(d.getDate() + nrDays);

        this.loadDailyMeals(dateToStr(d));
    }

    render = () => {
        console.log("RENDER TEST:", this.state.selectedDay);
        const { selectedDay, mealEntries, selectedFood, amount } = this.state;

        return (
            <main className="mainDailyMeals boxShow">
                <div id="dayArea" className="subblock boxShow">
                    <div className="dayHeader">
                        <div className="datepick boxShow">
                            <label className="textHigh">Day: </label>
                            <button onClick={(ev) => this.onDayButtons(ev, -1)} className="ftButton" > {"<"}</button>
                            <input onChange={(ev) => this.loadDailyMeals(ev.currentTarget.value)} id="selectedDay" type="date" value={selectedDay} />
                            <button onClick={(ev) => this.onDayButtons(ev, 1)} className="ftButton">{">"}</button>
                        </div>
                        <hr />
                        <Note />
                        <hr />
                    </div>
                    <div className="mealsArea">
                        {mealEntries}
                    </div>
                    <div className="dayAreaButtons">
                        <button onClick={this.onCommit} className="ftButton">COMMIT DAY!</button>
                        <button onClick={this.onAddNewMeal} className="newMeal ftButton">NEW MEAL</button>
                    </div>
                </div>
                <div id="searchArea" className="subblock boxShow">
                    <div className="searchInput boxShow">
                        <label className="textHigh">Search Food: </label>
                        <input onChange={(ev) => this.loadSFoodItems(document.querySelector("#search").value,
                            ev.currentTarget.checked)}
                            id="isAll" type="checkbox" /> ALL Food
                        <input onChange={(ev) => this.loadSFoodItems(ev.currentTarget.value,
                            document.querySelector("#isAll").checked)}
                            id="search"
                            type="text"
                            placeholder="search terms" />
                    </div>
                    <div className="searchResults boxShow">
                        {this.state.sFoodItems}
                    </div>
                    <div className="amountInput boxShow">{/*<<<<<<<<<<<<<<<<<<<AMOUNT*/}
                        <label className="textHigh">Amount: </label>
                        <input id="amountSize" type="text" value={amount}
                            onChange={(ev) => this.setState({ amount: ev.currentTarget.value })}
                            placeholder={selectedFood
                                ? (selectedFood.state.foodItem.sizeinfo === null ? 1 : 100)
                                : 0} />
                        <select id="measureSelect" value={selectedFood
                            ? selectedFood.state.foodItem.sizeinfo === null ? "Pieces" : "Grams"
                            : "---"}
                            readOnly={true}>
                            <option className={selectedFood
                                ? selectedFood.state.foodItem.sizeinfo === null ? "hidden" : ""
                                : "hidden"}>
                                Grams</option>
                            <option className={selectedFood
                                ? selectedFood.state.foodItem.sizeinfo === 0 ? "hidden" : ""
                                : "hidden"}>
                                Pieces</option>
                            <option className="hidden">---</option>
                        </select>
                    </div>
                    <div className="searchEntry boxShow">
                        <label className="textHigh lineDown">Current Entry:</label>
                        {this.currentEntry()}
                        <button onClick={this.onAddNewFoodEntry} className="ftButton">ADD TO MEAL</button>
                    </div>
                </div>
                <div id="foodDetailsArea" className="subblock boxShow">
                    <div className="foodDetailsHeader">
                        <div className="textHigh boxShow">cottage cheese @delaco</div>
                        <hr />
                        <Note />
                        <hr />
                    </div>
                    <div className="foodPic boxShow">
                        <img src="FoodPics/cottage cheese @delaco.jpg" alt="[NO FOOD PIC]" />
                    </div>
                    <div className="foodInfo">
                        <table>
                            <thead>
                                <tr><th>Name</th><td colSpan="2">Cottage Cheese</td></tr>
                                <tr><th>Brand</th><td colSpan="2">Delaco</td></tr>
                                <tr><th>Macro</th><th>100g</th><th>1(175g)</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>Fat</td><td>4.5g</td><td>7.9g</td></tr>
                                <tr><td>Carbs</td><td>2g</td><td>3.5g</td></tr>
                                <tr><td>Protein</td><td>12g</td><td>21g</td></tr>
                                <tr><td>Calories</td><td>96.5Kc</td><td>169.1Kc</td></tr>
                                <tr><td>Price</td><td>2.57Lei</td><td>4.5Lei</td></tr>
                            </tbody>
                        </table>
                        <div className="buffer"></div>
                        <div className="foodEntries boxShow">
                            <label className="textHigh lineDown">Composition:</label>
                        </div>
                    </div>
                </div>
            </main>
        );
    };

    componentDidMount = () => {
        document.querySelector("#selectedDay").value = this.state.selectedDay;
    };
}

export default DailyMeals;