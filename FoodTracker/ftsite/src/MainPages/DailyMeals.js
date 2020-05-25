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
    return `${dateObj.getFullYear()}-${dateObj.getMonth() + 1 > 10 ? (dateObj.getMonth() + 1).toString() : "0" + (dateObj.getMonth() + 1).toString()}-${dateObj.getDate() > 10 ? dateObj.getDate().toString() : "0" + dateObj.getDate().toString()}`;
};

class DailyMeals extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDay: dateToStr(new Date("2011-01-01")), //TODO: Eliminate and just user doc control?
            dayEntry: {},
            mealEntries: [],
            mealCounter: 0,
            sFoodItems: [],
            sAmount: 50,
            selectedMeal: null,
            selectedFood: null
        };

        //; (async () => {
        this.getDailyMeals();
        this.getSFoodItems();
        //})();
    }

    onCommit = async () => {    //2021-03-12
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

    getDailyMeals = async () => {
        let { mealCounter, selectedDay } = this.state;
        const userId = app.state.currentUser.userid === 0 ? 1 : app.state.currentUser.userid;

        let res = await fetch(getServerURL() + "/dailymeals", {
            method: "get",
            headers: {
                "content-type": "application/json",
                "reqdate": document.querySelector("#selectedDay") ? document.querySelector("#selectedDay").value : selectedDay,
                "userid": userId,
            }
        });
        res = await res.json();

        this.setState({
            mealEntries: [],
            selectedMeal: null
        });
        let first = true;
        for (let m of res.meals)
            if (!first)
                this.state.mealEntries.push(<MealEntry
                    selectedChanged={this.onSelectedMealChanged}
                    removeMeal={this.onRemoveMeal}
                    mealEntry={m}
                    key={mealCounter++} />);
            else {
                this.state.mealEntries.push(<MealEntry
                    signalSelect={true}
                    selectedChanged={this.onSelectedMealChanged}
                    removeMeal={this.onRemoveMeal}
                    mealEntry={m}
                    key={mealCounter++} />);
                first = false;
            }

        this.setState({
            selectedDay: document.querySelector("#selectedDay").value,
            dayEntry: res,
            mealCounter: mealCounter
        });
    }

    getSFoodItems = async () => {
        //If app.currentUser is Guest pretend it's SV
        const userId = app.state.currentUser.userid === 0 ? 1 : app.state.currentUser.userid;

        let res;
        res = await fetch(getServerURL() + "/dailymeals/foodsearch", {
            method: "get",
            headers: {
                "content-type": "application/json",
                "userid": userId,
                "search": document.querySelector(".search") ? document.querySelector(".search").value : "",
                "isall": document.querySelector("#isAll") ? document.querySelector("#isAll").checked : false
            }
        });
        res = await res.json();

        this.setState({
            sFoodItems: [],
            selectedFood: null
        });
        let first = true;
        for (let f of res)
            if (!first)
                this.state.sFoodItems.push(<FoodItem
                    selectedChanged={this.onSelectedFoodChanged}
                    foodItem={f}
                    key={f.foodid} />);
            else {
                this.state.sFoodItems.push(<FoodItem
                    signalSelect={true}
                    selectedChanged={this.onSelectedFoodChanged}
                    foodItem={f}
                    key={f.foodid} />);
                first = false;
            }

        this.setState({
            sFoodItems: this.state.sFoodItems
        });
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
        const { selectedMeal, selectedFood, dayEntry } = this.state;

        if (selectedMeal === null)
            alert("Must select a Meal !");
        else if (selectedFood === null)
            alert("Must select a Food Item !");
        else {
            const amountInput = document.querySelector(".amountSize");
            const newFoodEntry = selectedFood.state.foodItem;

            if (isNaN(amountInput.value)) {
                alert("Must Enter Valid Number for Amount!");
                amountInput.value = "";
                return;
            }
            else
                newFoodEntry.amount = amountInput.value;

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
    };

    onSelectedFoodChanged = async (ev, sender) => {
        console.log("DM ONSELECT START -- SELFOOD:", this.state.selectedFood ?
            (this.state.selectedFood.state.foodItem.foodname + this.state.selectedFood.state.foodItem.brand)
            : null)
        const { selectedFood } = this.state;

        await setTimeout(() => { }, 0);
        console.log("DM ONSELECT AF TIMEOUT -- SELFOOD:", this.state.selectedFood ?
            (this.state.selectedFood.state.foodItem.foodname + this.state.selectedFood.state.foodItem.brand)
            : null)

        this.setState({
            selectedFood: null
        });
        console.log("DM ONSELECT AF SETSTATE-NULL -- SELFOOD:", this.state.selectedFood ?
            (this.state.selectedFood.state.foodItem.foodname + this.state.selectedFood.state.foodItem.brand)
            : null)

        if (sender !== selectedFood) {
            if (selectedFood)
                selectedFood.toggleSelected();
            sender.toggleSelected();
            this.setState({
                selectedFood: sender,
            });
        }
        console.log("DM ONSELECT AF SETSTATE-SENDER -- SELFOOD:", this.state.selectedFood ?
            (this.state.selectedFood.state.foodItem.foodname + this.state.selectedFood.state.foodItem.brand)
            : null)
    };

    render = () => {
        console.log("DM RENDER START -- SELFOOD:", this.state.selectedFood ?
            (this.state.selectedFood.state.foodItem.foodname + this.state.selectedFood.state.foodItem.brand)
            :null)
        const { mealEntries, selectedFood, sAmount } = this.state;

        return (
            <main className="mainDailyMeals boxShow">
                <div id="dayArea" className="subblock boxShow">
                    <div className="dayHeader">
                        <div className="datepick boxShow">
                            <label className="textHigh">Day: </label>
                            <button className="ftButton">{"<"}</button>
                            <input onChange={this.getDailyMeals} id="selectedDay" type="date" />
                            <button className="ftButton">{">"}</button>
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
                        <input onChange={this.getSFoodItems} id="isAll" type="checkbox" /> ALL Food
                        <input className="search"
                            onChange={this.getSFoodItems}
                            type="text"
                            placeholder="search terms" />
                    </div>
                    <div className="searchResults boxShow">
                        {this.state.sFoodItems}
                    </div>
                    <div className="amountInput boxShow">
                        <label className="textHigh">Amount: </label>
                        <input className="amountSize" type="text" placeholder="100" />
                        <select disabled={true}>
                            <option>Grams</option>
                            <option>Pieces</option>
                        </select>
                    </div>
                    <div className="buffer"></div>{/*AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA*/}
                    <div className="searchEntry boxShow">
                        <label className="textHigh lineDown">Current Entry:</label>
                        {this.state.selectedFood ?
                            <FoodEntry foodItem={this.state.selectedFood.state.foodItem}
                                amount={sAmount} measure={"Grams"}
                                key={0} /> :
                            <FoodEntry key={"WTF"} />}
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