import React from 'react';
import "../Css/DailyMeals.css";

import MealArea from '../Components/MealArea';
import FoodEntry from '../Components/FoodEntry';
import FoodItem from '../Components/FoodItem';

const foodArr = [];
for (let i = 0; i < 10; i++) {
    foodArr.push(<FoodItem macros={`${i}/${i}/${i}`} per={(i + 1) * 10} key={i} />);
}

const DailyMeals = () => {
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
                    <div className="note boxShow">
                        <img src="SitePics/star.png" alt="[STAR]" />
                        <label><span>Day Note Title</span>Note text lalalaal lalalalal alaalalal lllaal lalala asdasdsd asdda asdsadssads LA!</label>
                    </div>
                </div>
                <div className="mealsArea">
                    <MealArea />
                    <MealArea />
                </div>
                <button className="newMeal ftButton">NEW MEAL</button>
            </div>
            <div id="searchArea" className="subblock boxShow">
                <form className="boxShow">
                    <label className="textHigh">Search Food: </label>
                    <input type="checkbox" value="yourFood" /> ALL Food
                <input className="search" type="text" defaultValue="search" />
                </form>
                <div className="searchResults boxShow">
                    {foodArr}
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
                    <button className="ftButton">ADD TO MEAL</button>
                    <button className="ftButton">REPLACE ENTRY</button>
                </div>
            </div>
            <div id="foodDetailsArea" className="subblock boxShow">
                <div className="foodDetailsHeader">
                    <div className="textHigh boxShow">cottage cheese @delaco</div>
                    <div className="note boxShow">
                        <img src="SitePics/star.png" alt="[STAR]" />
                        <label><span>Food Note Title</span>Note text lalalaal lalalalal alaalalal lllaal lalala asdasdsd asdda asdsadssads LA!</label>
                    </div>
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

export default DailyMeals;