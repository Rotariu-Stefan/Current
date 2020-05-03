import React from 'react';
import FoodEntry from './FoodEntry';

const MealArea = () => {
    return (
        <div className="mealArea boxShow">
            <div className="mealTitle lineDown">Meal1<img src="PLACEHOLDER DROPDOWN" alt="..." /></div>
            <div className="note lineDown">
                <img src="SitePics/star.png" alt="[STAR]" />
                <label><span>Meal Note Title</span>Note text lalalaal LA!</label>
            </div>
            <div className="foodEntries lineDown">
                <FoodEntry />
            </div>
            <div className="mealTotal">
                <span>Meal Total:</span>
                <label>321/123/213</label>
            </div>
        </div>
    );
}

export default MealArea;