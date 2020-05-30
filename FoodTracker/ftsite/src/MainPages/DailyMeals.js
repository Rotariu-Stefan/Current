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
    //return "http://localhost:3001";
}

const dateToStr = (dateObj) => {
    return `${dateObj.getFullYear()}-${dateObj.getMonth() + 1 > 9 ? (dateObj.getMonth() + 1).toString() : "0" + (dateObj.getMonth() + 1).toString()}-${dateObj.getDate() > 9 ? dateObj.getDate().toString() : "0" + dateObj.getDate().toString()}`;
};

class DailyMeals extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDay: dateToStr(new Date()),
            dayEntry: {},

            mealEntries: [],
            selectedMeal: null,
            mealCounter: 0,
            mealareaIsLoading: true,

            selectedFood: null,
            sFoodItems: [],
            sFoodCounter: 0,
            searchareaIsLoading: true,
            searchCounter: 0,
            amount: "",
            measure: "---",

            selectedFoodDetails: null,
            composition: []
        };

        //; (async () => {
        this.loadDailyMeals(this.state.selectedDay);
        this.loadSFoodItems("", false);
        //})();
    }

    loadDailyMeals = (day) => {
        this.setState({
            mealEntries: [],
            mealareaIsLoading: true
        });

        ; (async () => {
            let { mealCounter } = this.state;
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

            const mealEntries = [];
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
                mealCounter: mealCounter,
                mealareaIsLoading: false,
            });
        })();
    }

    loadSFoodItems = (searchTerms, isAll) => {
        this.setState({
            sFoodItems: [],
            searchareaIsLoading: true,
            searchCounter: this.state.searchCounter + 1
        });

        ; (async (searchCounter) => {
            let { sFoodCounter } = this.state;
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

            if (searchCounter >= this.state.searchCounter) {
                const sFoodItems = [];
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
                    selectedFood: first ? null : this.state.selectedFood,
                    measure: first ? "---" : this.state.measure,
                    sFoodItems: sFoodItems,
                    sFoodCounter: sFoodCounter,
                    searchareaIsLoading: false
                });
            }
        })(this.state.searchCounter + 1);
    };

    onCommit = (ev) => {
        this.setState({
            mealareaIsLoading: true
        });

        ; (async (searchCounter) => {
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

            this.setState({
                mealareaIsLoading: false
            });
            alert(`Successfully entered date for day ${selectedDay}!\n --You can view resulting entry in the console`);
            console.log(res);
        })();
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
        const { selectedMeal, selectedFood, dayEntry, amount, measure } = this.state;

        if (selectedMeal === null)
            alert("Must select a Meal !");
        else if (selectedFood === null)
            alert("Must select a Food Item !");
        else {
            if (isNaN(amount)) {
                alert("Must Enter Valid Number for Amount!");
                this.setState({
                    amount: ""
                });
                return;
            }
            else {
                const newFoodEntry = selectedFood.state.foodItem;
                newFoodEntry.amount = amount ? amount : document.querySelector("#amountSize").placeholder;
                newFoodEntry.measure = measure;

                selectedMeal.addNewFoodEntry(ev, newFoodEntry);
                for (let m of dayEntry.meals)
                    if ((m.mealid && selectedMeal.state.mealEntry.mealid === m.mealid)
                        || selectedMeal._reactInternalFiber.key == m.key)
                        m.foodentries.push(newFoodEntry);

                this.setState({
                    dayEntry: dayEntry
                });
            }
            document.querySelector("#search").select();
        }
    };

    onSelectedFoodChanged = (ev, sender) => {
        const { selectedFood } = this.state;

        if (sender !== selectedFood) {
            if (selectedFood)
                selectedFood.toggleSelected();
            sender.toggleSelected();
            if (document.activeElement !== document.querySelector("#search"))
                document.querySelector("#search").select();

            this.setState({
                selectedFood: sender,
                amount: "",
                measure: sender.state.foodItem.sizeinfo === null ? "Pieces" : "Grams",
                selectedFoodDetails: null
            });

            ; (async () => {
                let { sFoodCounter, composition } = this.state;
                const { foodid, isdish, noteid } = sender.state.foodItem;
                let res = await fetch(getServerURL() + "/dailymeals/fooddetails", {
                    method: "get",
                    headers: {
                        "content-type": "application/json",
                        "foodid": foodid,
                        "isdish": isdish,
                        "noteid": noteid ? noteid : null
                    }
                });
                res = await res.json();

                composition = [];
                if (res.foodentries) {
                    for (let f of res.foodentries)
                        composition.push(<FoodEntry
                            foodEntry={f}
                            key={sFoodCounter++} />);
                }

                this.setState({
                    selectedFoodDetails: res,
                    sFoodCounter: sFoodCounter,
                    composition: composition
                });
            })();
        }
    };

    currentEntry = () => {
        const { selectedFood, amount, measure } = this.state;

        if (selectedFood) {
            return <FoodEntry foodItem={selectedFood.state.foodItem}
                amount={amount ? amount : (selectedFood ? (measure === "Pieces" ? 1
                    : selectedFood.state.foodItem.sizeinfo === 0 ? 100 : selectedFood.state.foodItem.sizeinfo) : 0)}
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

    onSearchKey = (ev) => {
        const { selectedFood, sFoodItems } = this.state;

        switch (ev.key) {
            case "Enter":
                this.onAddNewFoodEntry();
                ev.preventDefault();
                break;
            case "Tab":
                document.querySelector("#amountSize").select();
                ev.preventDefault();
                break;
            case "Escape":
                document.querySelector("#search").value = "";
                ev.preventDefault();
                break;
            case "ArrowUp":
                if (selectedFood) {
                    for (let i = 0; i < sFoodItems.length; i++)
                        if (sFoodItems[i].key === selectedFood._reactInternalFiber.key)
                            if (i === 0)
                                break;
                            else
                                document.querySelectorAll(".foodItem")[i - 1].click();
                }
                ev.preventDefault();
                break;
            case "ArrowDown":
                if (selectedFood) {
                    for (let i = 0; i < sFoodItems.length; i++)
                        if (sFoodItems[i].key === selectedFood._reactInternalFiber.key)
                            if (i === sFoodItems.length - 1)
                                break;
                            else
                                document.querySelectorAll(".foodItem")[i + 1].click();
                }
                ev.preventDefault();
                break;
            default:
                break;
        }
    };

    onAmountKey = (ev) => {
        switch (ev.key) {
            case "Enter":
                this.onAddNewFoodEntry();
                ev.preventDefault();
                break;
            case "Tab":
                document.querySelector("#search").select();
                ev.preventDefault();
                break;
            case "Escape":
                document.querySelector("#amountSize").value = "";
                ev.preventDefault();
                break;
            case "ArrowUp":     //TODO:Change Measure??
                console.log(ev.key);
                ev.preventDefault();
                break;
            case "ArrowDown":   //TODO:Change Measure??
                console.log(ev.key);
                ev.preventDefault();
                break;
            default:
                break;
        }
    };//TODO?

    render = () => {
        const { selectedDay, mealEntries, selectedFood, amount, measure, dayEntry, selectedFoodDetails, composition, mealareaIsLoading, searchareaIsLoading, sFoodItems } = this.state;
        const { foodname, brand, fat, carbs, protein, price, pic } = selectedFood ? selectedFood.state.foodItem : FoodItem.defaultFoodItem;

        return (
            <main className="mainDailyMeals boxShow">
                <div id="dayArea" className="subblock boxShow">
                    <div className="dayHeader">
                        <div className="datepick boxShow">
                            <label className="textHigh">Day: </label>
                            <button disabled={mealareaIsLoading} onClick={(ev) => this.onDayButtons(ev, -1)} className="ftButton" > {"<"}</button>
                            <input disabled={mealareaIsLoading} onChange={(ev) => this.loadDailyMeals(ev.currentTarget.value)} id="selectedDay" type="date" value={selectedDay} />
                            <button disabled={mealareaIsLoading} onClick={(ev) => this.onDayButtons(ev, 1)} className="ftButton">{">"}</button>
                        </div>
                        <hr />
                        <Note note={dayEntry.note} />
                        <hr />
                    </div>
                    <div className="mealsArea">
                        {mealareaIsLoading ? "LOADING..." : mealEntries}
                    </div>
                    <div className="dayAreaButtons">
                        <button disabled={mealareaIsLoading} onClick={this.onCommit} className="ftButton">COMMIT DAY!</button>
                        <button disabled={mealareaIsLoading} onClick={this.onAddNewMeal} className="newMeal ftButton">NEW MEAL</button>
                    </div>
                </div>


                <div id="searchArea" className="subblock boxShow">
                    <div className="searchInput boxShow">
                        <label className="textHigh">Search Food: </label>
                        <input onChange={(ev) => this.loadSFoodItems(
                            document.querySelector("#search").value,
                            ev.currentTarget.checked)}
                            id="isAll" type="checkbox" />
                        ALL Food
                        <input onChange={(ev) => this.loadSFoodItems(
                            ev.currentTarget.value,
                            document.querySelector("#isAll").checked)}
                            onKeyDown={this.onSearchKey}
                            id="search" type="text"
                            placeholder="search terms" />
                    </div>
                    <div className="searchResults boxShow">
                        {searchareaIsLoading ? "LOADING..." : sFoodItems}
                    </div>
                    <div className="amountInput boxShow">
                        <label className="textHigh">Amount: </label>
                        <input disabled={searchareaIsLoading} id="amountSize" type="text" value={amount}
                            onChange={(ev) => this.setState({ amount: ev.currentTarget.value })}
                            onKeyDown={this.onAmountKey}
                            placeholder={selectedFood ? (measure === "Pieces" ? 1
                                : selectedFood.state.foodItem.sizeinfo === 0 ? 100 : selectedFood.state.foodItem.sizeinfo) : 0} />
                        <select onChange={(ev) => this.setState({ measure: ev.currentTarget.value })} disabled={searchareaIsLoading} id="measureSelect" value={measure} >
                            <option className={selectedFood ? (selectedFood.state.foodItem.sizeinfo === null ? "hidden" : "") : "hidden"}>
                            Grams</option>
                        <option className={selectedFood ? (selectedFood.state.foodItem.sizeinfo === 0 ? "hidden" : "") : "hidden"}>
                            Pieces</option>
                        <option className="hidden">---</option>
                        </select>
                </div>
                <div className="searchEntry boxShow">
                    <label className="textHigh lineDown">Current Entry:</label>
                    {this.currentEntry()}
                    <button disabled={searchareaIsLoading} onClick={this.onAddNewFoodEntry} className="ftButton">ADD TO MEAL</button>
                </div>
                </div>

                {selectedFoodDetails ? (
            <div id="foodDetailsArea" className="subblock boxShow">
                <div className="foodDetailsHeader">
                    <div className="textHigh boxShow">{`${foodname} ${brand ? "@" + brand : ""}`}</div>
                    <hr />
                    <Note note={selectedFoodDetails ? selectedFoodDetails.note : null} />
                    <hr />
                </div>
                <div className="foodPic boxShow">
                    <img src={`FoodPics/${pic ? pic : "empty.png"}`} alt="[NO FOOD PIC]" />
                </div>
                <div className="foodInfo">
                    <table>
                        <thead>
                            <tr><th>Name</th><td colSpan="2">{foodname}</td></tr>
                            <tr><th>Brand</th><td colSpan="2">{brand ? brand : "--"}</td></tr>
                            <tr><th>Macro</th><th>100g</th><th>1p</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>Fat</td>
                                <td>{measure === "Grams" ? fat + "g" : "--"}</td>
                                <td>{measure === "Pieces" ? fat + "g" : "--"}</td></tr>
                            <tr><td>Carbs</td>
                                <td>{measure === "Grams" ? carbs + "g" : "--"}</td>
                                <td>{measure === "Pieces" ? carbs + "g" : "--"}</td></tr>
                            <tr><td>Protein</td>
                                <td>{measure === "Grams" ? protein + "g" : "--"}</td>
                                <td>{measure === "Pieces" ? protein + "g" : "--"}</td></tr>
                            <tr><td>Calories</td>
                                <td>{measure === "Grams" ? (fat * 9 + protein * 4 + carbs * 4).toFixed(1)
                                    + "Kc" : "--"}</td>
                                <td>{measure === "Pieces" ? (fat * 9 + protein * 4 + carbs * 4).toFixed(1)
                                    + "Kc" : "--"}</td></tr>
                            <tr><td>Price</td>
                                <td>{measure === "Grams" ? price + "Lei" : "--"}</td>
                                <td>{measure === "Pieces" ? price + "Lei" : "--"}</td></tr>
                        </tbody>
                    </table>
                    <div className="buffer"></div>
                    <div className="foodEntries boxShow">
                        <label className="textHigh lineDown">Composition:</label>
                        {composition}
                    </div>
                </div>
            </div>
        ) : (
                <div id="foodDetailsArea" className="subblock boxShow">
                    LOADING...
                        </div>
            )
        }
            </main >
        );
    };
}

export default DailyMeals;