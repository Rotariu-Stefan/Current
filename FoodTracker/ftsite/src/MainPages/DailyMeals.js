import React from 'react';
import "../Css/DailyMeals.css";

import MealEntry from '../Components/MealEntry';
import FoodEntry from '../Components/FoodEntry';
import FoodItem from '../Components/FoodItem';
import Note from '../Components/Note';

class DailyMeals extends React.Component {
    constructor() {
        super();

        this.state = {
            mealEntries: [],
            mealKey: 1,
            mealEntriesRef: [React.createRef()],
            selectedIndex: 0,
            foodSItems: [],
        };

        this.state.mealEntries = [<MealEntry selectedChanged={this.onSelectedChanged} ref={this.state.mealEntriesRef[0]} key="0" />];
        for (let i = 0; i < 10; i++) {
            this.state.foodSItems.push(<FoodItem macros={`${i}/${i}/${i}`} per={(i + 1) * 10} key={i} />);
        };
    }

    addNewMealEntry = (ev) => {
        this.state.mealEntriesRef.push(React.createRef());
        const newMeal = <MealEntry selectedChanged={this.onSelectedChanged} ref={this.state.mealEntriesRef[this.state.mealKey]} name={"Meal" + this.state.mealKey} key={this.state.mealKey} />;
        this.state.mealEntries.push(newMeal);

        this.setState({
            mealEntries: this.state.mealEntries,
            mealKey: this.state.mealKey + 1,
            mealEntriesRef: this.state.mealEntriesRef
        });
    }

    addNewFoodEntry = (ev) => {
        this.state.mealEntriesRef[this.state.selectedIndex].current.addNewFoodEntry(ev);
    }

    onSelectedChanged = (ev, sender) => {
        for (let i = 0; i < this.state.mealEntriesRef.length; i++)
            if (sender === this.state.mealEntriesRef[i].current)
                if (this.state.selectedIndex !== i) {
                    this.state.mealEntriesRef[this.state.selectedIndex].current.highlight();
                    this.state.mealEntriesRef[i].current.highlight();
                    this.setState({ selectedIndex: i });
                }
    }

    render() {
        return (
            <main className="mainDailyMeals boxShow">
                <div id="dayArea" className="subblock boxShow">
                    <div className="dayHeader">
                        <form className="datepick boxShow">
                            <label className="textHigh">Day: </label>
                            <button className="ftButton">{"<"}</button>
                            <input type="date" name="day" />
                            <button className="ftButton">{">"}</button>
                        </form>
                        <Note />
                    </div>
                    <div className="mealsArea">
                        {this.state.mealEntries}
                    </div>
                    <button onClick={() => this.addNewMealEntry()} className="newMeal ftButton">NEW MEAL</button>
                </div>
                <div id="searchArea" className="subblock boxShow">
                    <form className="boxShow">
                        <label className="textHigh">Search Food: </label>
                        <input type="checkbox" name="yourFood" /> ALL Food
                <input className="search" type="text" name="search" placeholder="search" />
                    </form>
                    <div className="searchResults boxShow">
                        {this.state.foodSItems}
                    </div>
                    <form className="boxShow">
                        <label className="textHigh">Amount: </label>
                        <input className="amountSize" type="text" defaultValue="100" name="amount" />
                        <select>
                            <option>Grams</option>
                            <option>ML</option>
                            <option>Pieces</option>
                        </select>
                    </form>
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
                    </div>
                    <img src="FoodPics/cottage cheese @delaco.jpg" className="foodPic boxShow" alt="[NO FOOD PIC]" />
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
        this.state.mealEntriesRef[0].current.highlight();
    }
}

export default DailyMeals;