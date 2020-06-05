import React from 'react';
import "../Css/DailyMeals.css";

import MealEntry from '../Components/MealEntry';
import FoodEntry from '../Components/FoodEntry';
import FoodItem from '../Components/FoodItem';
import Note from '../Components/Note';
import { app } from '../App';

const dateToStr = (dateObj) => {
    return `${dateObj.getFullYear()}-${dateObj.getMonth() + 1 > 9 ? (dateObj.getMonth() + 1).toString() : "0" + (dateObj.getMonth() + 1).toString()}-${dateObj.getDate() > 9 ? dateObj.getDate().toString() : "0" + dateObj.getDate().toString()}`;
};

class DailyMeals extends React.Component {
    constructor(props) {
        super(props);

        this.newFoodKey = "mustchange";
        this.state = {
            selectedDay: dateToStr(new Date()),
            dayEntry: {},
            dayFat: 0,
            dayCarbs: 0,
            dayProtein: 0,

            mealEntries: [],
            mealCounter: 0,
            selectedMeal: null,
            mealareaIsLoading: true,

            selectedFood: null,
            sFoodItems: [],
            sFoodCounter: 0,
            searchareaIsLoading: true,
            searchCounter: 0,
            amount: "",
            measure: "---",

            newFoodForm: false,
            newFoodItem: {
                foodname: "",
                brand: "",
                fat: 0, carbs: 0, protein: 0,
                price: 0,
                sizeinfo: 100,
                isdish: false,
                pic: "empty.png",
                userid: 0,
                noteid: null,
            },

            selectedFoodDetails: null,
            composition: []
        };

        this.loadDailyMeals(this.state.selectedDay);
        this.loadSFoodItems("", false);
    }

    loadDailyMeals = (day) => {
        this.setState({
            mealEntries: [],
            selectedMeal: null,
            mealareaIsLoading: true,
            dayFat: 0,
            dayCarbs: 0,
            dayProtein: 0
        });

        ; (async () => {
            let { mealCounter } = this.state;
            //If app.currentUser is Guest pretend it's SV
            const userId = app.state.currentUser.userid === 0 ? 1 : app.state.currentUser.userid;

            let res = await fetch(app.getServerURL() + "/dailymeals", {
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
                        addToDay={this.addNewFoodEntryMacros}
                        selectedChanged={this.onSelectedMealChanged}
                        removeMeal={this.onRemoveMeal}
                        mealEntry={m}
                        updateDay={this.updateSelectedMealNote}
                        key={mealCounter++} />);
                else {
                    mealEntries.push(<MealEntry
                        signalSelect={true}
                        addToDay={this.addNewFoodEntryMacros}
                        selectedChanged={this.onSelectedMealChanged}
                        removeMeal={this.onRemoveMeal}
                        mealEntry={m}
                        updateDay={this.updateSelectedMealNote}
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
        const xx = this.state.searchCounter + 1;

        setTimeout(async (searchCounter = xx) => {
            if (searchCounter < this.state.searchCounter)
                return;

            let { sFoodCounter } = this.state;
            //If app.currentUser is Guest pretend it's SV
            const userId = app.state.currentUser.userid === 0 ? 1 : app.state.currentUser.userid;

            let res;
            res = await fetch(app.getServerURL() + "/dailymeals/foodsearch", {
                method: "get",
                headers: {
                    "content-type": "application/json",
                    "userid": userId,
                    "search": searchTerms,
                    "isall": isAll
                }
            });
            res = await res.json();
            if (searchCounter < this.state.searchCounter)
                return;

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
        }, 150);
    };

    onCommit = (ev) => {
        ; (async (searchCounter) => {
            const { dayEntry, selectedDay } = this.state;
            //IF Guest assume SV
            const userId = app.state.currentUser.userid === 0 ? 1 : app.state.currentUser.userid;

            const dayPutReq = dayEntry;
            dayPutReq.userid = userId;
            dayPutReq.date = selectedDay;

            let res = await fetch(app.getServerURL() + "/dailymeals", {
                method: "put",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(dayPutReq)
            });
            res = await res.json();

            this.loadDailyMeals(this.state.selectedDay);

            alert(`Successfully entered date for day ${selectedDay}!\n --You can view resulting entry in the console`);
            console.log(res);
        })();
    };

    onAddNewMeal = (ev) => {
        const { mealEntries, dayEntry, newFoodForm } = this.state;
        let { mealCounter } = this.state;

        const newMPortion = document.querySelector(".newMPortion");
        if (isNaN(newMPortion.value)) {
            alert("Must Enter Valid Number for Portion!");
            newMPortion.value = "";
            return;
        }
        const newMName = document.querySelector(".newMName");
        const newMeal = {
            mealname: newMName.value === "" ? newMName.placeholder : newMName.value,
            portion: newMPortion.value === "" ? newMPortion.placeholder : newMPortion.value,
            noteid: null,
            foodentries: []
        };

        mealEntries.push(<MealEntry
            signalSelect={true}
            mealEntry={newMeal}
            addToDay={this.addNewFoodEntryMacros}
            selectedChanged={this.onSelectedMealChanged}
            removeMeal={this.onRemoveMeal}
            key={mealCounter}
        />);

        newMeal.key = mealCounter;
        dayEntry.meals.push(newMeal);

        newMName.value = "";
        newMPortion.value = "";
        this.setState({
            mealEntries: mealEntries,
            mealCounter: mealCounter + 1,
            dayEntry: dayEntry
        });
        if (!newFoodForm)
            document.querySelector("#search").select();
    };

    onRemoveMeal = (ev, sender) => {
        const { selectedMeal, mealEntries, dayEntry } = this.state;

        dayEntry.meals = dayEntry.meals.filter((m) => !((m.mealid && m.mealid === sender.state.mealEntry.mealid)
            || (m.key !== undefined && m.key.toString() === sender._reactInternalFiber.key)));

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

    addNewFoodEntryMacros = (newfat, newcarb, newprotein) => {
        this.state.dayFat += newfat;
        this.state.dayCarbs += newcarb;
        this.state.dayProtein += newprotein;
        this.setState({});
    };

    onRemoveNote = () => {
        const { dayEntry } = this.state;

        dayEntry.note = null;
        this.setState({
            dayEntry: dayEntry
        });
    };

    updateSelectedMealNote = () => {
        const { dayEntry, selectedMeal } = this.state;

        for (let m of dayEntry.meals)
            if ((m.mealid && selectedMeal.state.mealEntry.mealid === m.mealid)
                || (m.key !== undefined && selectedMeal._reactInternalFiber.key === m.key.toString())) {
                m.note = selectedMeal.state.mealEntry.note;
                break;
            }

        this.setState({
            dayEntry: dayEntry
        });
    };

    onAddNewFoodEntry = (ev) => {
        const { selectedMeal, selectedFood, dayEntry, amount, measure, newFoodForm, newFoodItem } = this.state;

        if (selectedMeal === null) {
            alert("Must select a Meal !");
            return;
        }
        if (newFoodForm) {
            if (newFoodItem.foodname === "") {
                alert("New Food must have a Name !");
                return;
            }
            const sum = Number(newFoodItem.fat) + Number(newFoodItem.carbs) + Number(newFoodItem.protein);
            if (isNaN(sum) || (measure === "Grams" && (sum > 100 || sum <= 0))) {
                alert("Macro value are wrong!");
                return
            }
        }
        else if (selectedFood === null) {
            alert("Must select a Food Item !");
            return;
        }
        if (isNaN(amount)) {
            alert("Must Enter Valid Number for Amount!");
            this.setState({
                amount: ""
            });
            return;
        }

        const newFoodEntry = newFoodForm ? newFoodItem : selectedFood.state.foodItem;
        newFoodEntry.amount = amount ? amount : document.querySelector("#amountSize").placeholder;
        newFoodEntry.measure = measure;

        selectedMeal.addNewFoodEntry(ev, newFoodEntry);
        for (let m of dayEntry.meals)
            if ((m.mealid && selectedMeal.state.mealEntry.mealid === m.mealid)
                || (m.key !== undefined && selectedMeal._reactInternalFiber.key === m.key.toString())) {
                m.foodentries.push(newFoodEntry);
                break;
            }

        this.setState({
            dayEntry: dayEntry,
            newFoodForm: false,
            newFoodItem: {
                foodname: "",
                brand: "",
                fat: 0, carbs: 0, protein: 0,
                price: 0,
                sizeinfo: 100,
                isdish: false,
                pic: "empty.png",
                userid: 0,
                noteid: null,
            }
        });
        setTimeout(() => document.querySelector("#search").select(), 0);
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
                let res = await fetch(app.getServerURL() + "/dailymeals/fooddetails", {
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

    onUpdateAttach = (newNote) => {
        const { dayEntry } = this.state;

        dayEntry.note = newNote;
        this.setState({
            dayEntry: dayEntry
        });
    };

    currentEntry = () => {
        const { selectedFood, amount, measure, newFoodForm, newFoodItem } = this.state;

        if (newFoodForm) {
            this.newFoodKey = this.newFoodKey === "mustchange" ? "willchange" : "mustchange";
            return <FoodEntry foodItem={newFoodItem}
                amount={amount}
                measure={measure}
                key={this.newFoodKey} />
        }
        else
            if (selectedFood) {
                return <FoodEntry foodItem={selectedFood.state.foodItem}
                    amount={amount ? amount : (selectedFood ? (measure === "Pieces" ? 1
                        : selectedFood.state.foodItem.sizeinfo === 0 ? 100 : selectedFood.state.foodItem.sizeinfo) : 0)}
                    measure={measure}
                    key={selectedFood.state.foodItem.foodid.toString() + amount + measure} />
            }
            else
                return <FoodEntry key={"F0"} />
    };

    changeNewFoodValue = (field, value) => {
        const aux = this.state.newFoodItem;

        if (field === "per") {
            const psi = document.querySelector(".PSInput");
            if (value === "1Piece") {
                psi.disabled = true;
                psi.value = "";
                aux.sizeinfo = null;
                this.state.amount = 1;
            }
            else {
                document.querySelector(".PSInput").disabled = false;
                psi.value = 100;
                aux.sizeinfo = 100;
                this.state.amount = 100;
            }
        }
        else {
            if (field === "sizeinfo")
                value = value === "" ? null : value;
            aux[field] = value;
        }
        this.setState({
            newFoodItem: aux,
            measure: aux.sizeinfo === null ? "Pieces" : "Grams",
        });
    };

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
        console.log(this.state.dayEntry);

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
        const { selectedDay, mealEntries, selectedFood, amount, measure, dayEntry, selectedFoodDetails, composition, mealareaIsLoading, searchareaIsLoading, sFoodItems, dayFat, dayCarbs, dayProtein, newFoodForm } = this.state;
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
                        {mealareaIsLoading ? "LOADING..."
                            : <Note removeNote={this.onRemoveNote} note={dayEntry.note} key={"D" + (dayEntry.note ? dayEntry.note.noteid : "D0")} updateAttach={this.onUpdateAttach} />}
                    </div>
                    <div className="mealsArea">
                        {mealareaIsLoading ? "LOADING..." : mealEntries}
                    </div>
                    <hr />
                    <div className="dayTotal">
                        <span>Day Total:</span>
                        <span>{`${dayFat.toFixed(1)}||${dayCarbs.toFixed(1)}||${dayProtein.toFixed(1)}`}</span>
                    </div>
                    <button disabled={mealareaIsLoading} onClick={this.onCommit} className="ftButton">COMMIT DAY!</button>
                </div>


                <div id="addFoodArea" className="subblock boxShow">
                    {newFoodForm
                        ? <div className="newFoodForm">
                            <div className="newFoodHeader">
                                <label className="textHigh">Create New Food:</label>
                                <button onClick={() => this.setState({ newFoodForm: false })} className="ftButton">
                                    +Select</button>
                            </div>
                            <span>Name:</span><input onChange={(ev) => this.changeNewFoodValue("foodname", ev.currentTarget.value)} placeholder="name" type="text" />
                            <span>Brand:</span><input onChange={(ev) => this.changeNewFoodValue("brand", ev.currentTarget.value)} placeholder="brand" type="text" />
                            <span>Macros:</span>
                            <div>
                                <input onChange={(ev) => this.changeNewFoodValue("fat", ev.currentTarget.value)} type="text" placeholder="0" /><span>Fat</span>
                                <input onChange={(ev) => this.changeNewFoodValue("carbs", ev.currentTarget.value)} type="text" placeholder="0" /><span>Carbs</span>
                                <input onChange={(ev) => this.changeNewFoodValue("protein", ev.currentTarget.value)} type="text" placeholder="0" /><span>Protein</span>
                            </div>
                            <span>Per:</span>
                            <div><select onChange={(ev) => this.changeNewFoodValue("per", ev.currentTarget.value)} className="smallerInput">
                                <option>100Grams</option>
                                <option>1Piece</option>
                            </select>









                                <span>Piece Size:</span><input onChange={(ev) => this.changeNewFoodValue("sizeinfo", ev.currentTarget.value)} className="PSInput smallerInput" defaultValue="100" placeholder="null" type="text" />










                            </div>
                            <span>Price:</span>
                            <div>
                                <input onChange={(ev) => this.changeNewFoodValue("price", ev.currentTarget.value)} className="smallerInput" placeholder="0" type="text" />
                                <div><span>Is Dish?</span><input onChange={(ev) => this.changeNewFoodValue("isdish", ev.currentTarget.checked)} type="checkbox" /></div>
                            </div>
                            <label className="afaInfo">To add certain details (dish, composition, photo, note)or further edit foods go to Your Foods section.</label>
                        </div>

                        : [<div className="searchForm boxShow" key="searchForm">
                            <label className="textHigh">Search Food: </label>
                            <input onChange={(ev) => this.loadSFoodItems(
                                document.querySelector("#search").value,
                                ev.currentTarget.checked)}
                                id="isAll" type="checkbox" />
                            ALL
                        <button onClick={() => this.setState({
                                newFoodForm: true,
                                selectedFood: null,
                                measure: "Grams",
                                amount: 100
                            })} className="ftButton">
                                +New</button>
                            <input onChange={(ev) => this.loadSFoodItems(
                                ev.currentTarget.value,
                                document.querySelector("#isAll").checked)}
                                onKeyDown={this.onSearchKey}
                                id="search" type="text"
                                placeholder="search terms" />
                        </div>,
                        <div className="searchResults boxShow" key="searchResults">
                            {searchareaIsLoading ? "LOADING..." : sFoodItems}
                        </div>]}
                    <div className="amountForm boxShow">
                        <label className="textHigh">Amount: </label>{/*aaaaaaaaaaaaaaaaaa*/}
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
                        <button disabled={searchareaIsLoading} onClick={this.onAddNewFoodEntry} className="ftButton">ADD FOOD ENTRY</button>
                    </div>
                    <hr />
                    <div className="addMealArea">
                        <div>
                            <label className="textHigh">Meal Name:</label>
                            <input className="newMName" type="text" placeholder={"Meal" + (mealEntries.length + 1)} />
                            <label className="textHigh">Portion:</label>
                            <input className="newMPortion" type="text" placeholder="1" />
                        </div>
                        <button disabled={mealareaIsLoading} onClick={this.onAddNewMeal} className="newMeal ftButton">ADD NEW MEAL</button>
                    </div>
                </div>

                {selectedFoodDetails ? (
                    <div id="foodDetailsArea" className="subblock boxShow">
                        <div className="foodDetailsHeader">
                            <div className="textHigh boxShow">{`${foodname} ${brand ? "@" + brand : ""}`}</div>
                            <Note removeNote={() => { }} note={selectedFoodDetails ? selectedFoodDetails.note : null}
                                key={"F" + (selectedFoodDetails.note ? selectedFoodDetails.note.noteid : "0")} />
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
                                        <td>{measure === "Grams" ? (fat * 9 + protein * 4 + carbs * 4)
                                            .toFixed(1)
                                            + "Kc" : "--"}</td>
                                        <td>{measure === "Pieces" ? (fat * 9 + protein * 4 + carbs * 4)
                                            .toFixed(1)
                                            + "Kc" : "--"}</td></tr>
                                    <tr><td>Price</td>
                                        <td>{measure === "Grams" ? price + "Lei" : "--"}</td>
                                        <td>{measure === "Pieces" ? price + "Lei" : "--"}</td></tr>
                                </tbody>
                            </table>
                            <div className="comp textHigh">{composition.length > 0 ? "Composition:" : ""}</div>
                            <div className="foodEntries boxShow">
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