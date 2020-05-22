import React from 'react';
import "../Css/DailyMeals.css";

import MealEntry from '../Components/MealEntry';
import FoodEntry from '../Components/FoodEntry';
import FoodItem from '../Components/FoodItem';
import Note from '../Components/Note';
import { app } from '../App';

const getServerURL = () => {
    return "http://localhost:3001"; //svData.serverLink;
}

class DailyMeals extends React.Component {
    constructor(props) {
        ; (async () => {
            super(props);

            this.state = {
                selectedDay: new Date('2020-03-12'),
                dayEntry: {},
                sFoodItems: [],
                mealEntries: [],
                selectedMeal: React.createRef()
            };

            let res = await this.getDailyMeals(this.state.selectedDay);

            let isFirst = true;
            for (let m of res.meals)
                if (!isFirst)
                    this.state.mealEntries.push(<MealEntry selectedChanged={this.onSelectedMealChanged} removeMeal={this.onRemoveMeal} mealentry={m} key={m.mealid} />);
                else {
                    this.state.mealEntries.push(<MealEntry ref={this.state.selectedMeal} selectedChanged={this.onSelectedMealChanged} removeMeal={this.onRemoveMeal} mealentry={m} key={m.mealid} />);
                    isFirst = false;
                }
            this.setState({
                dayEntry: res
            });

            res = await this.getSFoodItems(app.state.currentUser.userid, null, false);
            for (let f of res)
                this.state.sFoodItems.push(<FoodItem name_brand={`${f.foodname} @${f.brand}`}
                    macros={`${f.fat}/${f.carbs}/${f.protein}`}
                    per={f.sizeinfo === null ? `1` : `100g`} key={f.foodid} />);
            this.setState({
                selectedMeal: this.state.selectedMeal.current,
                sFoodItems: this.state.sFoodItems
            });

            this.state.selectedMeal.toggleHighlight();
        })();
    }

    getDailyMeals = async (reqDate) => {
        let res = await fetch(getServerURL() + "/dailymeals", {
            method: "get",
            headers: {
                "content-type": "application/json",
                "reqdate": `${reqDate.getFullYear()}-${reqDate.getMonth() + 1 > 10 ? (reqDate.getMonth() + 1).toString() : "0" + (reqDate.getMonth() + 1).toString()}-${reqDate.getDate() > 10 ? reqDate.getDate().toString() : "0" + reqDate.getDate().toString()}`,
                "userid": 1,
            }
        });
        res = await res.json();
        return res;
    }

    getSFoodItems = async (userId, searchTerm, isall) => {
        let res;
        if (searchTerm === null)
            res = await fetch(getServerURL() + "/yourfoods", {
                method: "get",
                headers: {
                    "content-type": "application/json",
                    "userid": 1
                }
            });
        else
            res = await fetch(getServerURL() + "/dailymeals/foodsearch", {
                method: "get",
                headers: {
                    "content-type": "application/json",
                    "userid": userId,
                    "search": searchTerm,
                    "isall": isall
                }
            });
        res = await res.json();
        return res;
    }

    addNewMealEntry = (ev) => {
        const newMeal = <MealEntry selectedChanged={this.onSelectedMealChanged} removeMeal={this.onRemoveMeal} name={"NewMeal"} key={0/*TODO:Selected Last MealID+1????*/} />;
        this.state.mealEntries.push(newMeal);

        this.setState({
            mealEntries: this.state.mealEntries,
        });
        console.log(this.state.selectedMeal);
    }

    onRemoveMeal = (ev, senderKey) => {
        for (let i = 0; i < this.state.mealEntries.length; i++)
            if (this.state.mealEntries[i].key === senderKey) {
                this.setState({
                    mealEntries: this.state.mealEntries.filter((meal) => meal.key !== senderKey),
                });
                break;
            }
        if (this.state.selectedMeal !== null && this.state.selectedMeal._reactInternalFiber.key === senderKey)
            this.setState({
                selectedMeal: null
            });
        ev.stopPropagation();
    }

    addNewFoodEntry = (ev) => {
        if (this.state.selectedMeal === null)
            alert("Must select a Meal !");
        else
            this.state.selectedMeal.addNewFoodEntry(ev);
    }

    onSelectedMealChanged = (ev, sender) => {
        if (sender !== this.state.selectedMeal) {
            if (this.state.selectedMeal)
                this.state.selectedMeal.toggleHighlight();
            sender.toggleHighlight();
            this.setState({
                selectedMeal: sender
            });
        }
    }

    render() {
        return (
            <main className="mainDailyMeals boxShow">
                <div id="dayArea" className="subblock boxShow">
                    <div className="dayHeader">
                        <div className="datepick boxShow">
                            <label className="textHigh">Day: </label>
                            <button className="ftButton">{"<"}</button>
                            <input id="selectedDay" type="date" />
                            <button className="ftButton">{">"}</button>
                        </div>
                        <hr />
                        <Note />
                        <hr />
                    </div>
                    <div className="mealsArea">
                        {this.state.mealEntries}
                    </div>
                    <button onClick={() => this.addNewMealEntry()} className="newMeal ftButton">NEW MEAL</button>
                </div>
                <div id="searchArea" className="subblock boxShow">
                    <div className="searchInput boxShow">
                        <label className="textHigh">Search Food: </label>
                        <input type="checkbox" /> ALL Food
                        <button className="ftButton"
                            onClick={() => this.getSFoodItems(1, document.querySelector(".search").value, false)}> {"|Find>>"} </button>
                        <input className="search" type="text" placeholder="search terms" />
                    </div>
                    <div className="searchResults boxShow">
                        {this.state.sFoodItems}
                    </div>
                    <div className="amountInput boxShow">
                        <label className="textHigh">Amount: </label>
                        <input className="amountSize" type="text" placeholder="100" />
                        <select>
                            <option>Grams</option>
                            <option>Pieces</option>
                        </select>
                    </div>
                    <div className="buffer"></div>
                    <div className="searchEntry boxShow">
                        <label className="textHigh lineDown">Current Entry:</label>
                        <FoodEntry />
                        <button onClick={this.addNewFoodEntry} className="ftButton">ADD TO MEAL</button>
                        <button className="ftButton">REPLACE ENTRY</button>
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
                            <FoodEntry amount="2" name_brand="avocado" macros="1/1/1" macrores="2/2/2" />
                            <FoodEntry amount="2" name_brand="avocado" macros="1/1/1" macrores="2/2/2" />
                            <FoodEntry />
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    componentDidMount() {
        document.getElementById('selectedDay').valueAsDate = this.state.selectedDay;
    }
}

export default DailyMeals;