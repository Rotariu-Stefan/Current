import React from 'react';
import FoodEntry from './FoodEntry';
import Note from './Note';

class MealEntry extends React.Component {
    constructor(props) {
        super(props);
        this.defaultMealEntry = {
            mealname: "New Meal",
            portion: 1,
            noteid: null,
            foodentries: []
        }

        this.state = {
            mealEntry: props.mealEntry ? props.mealEntry : this.defaultMealEntry,
            foodEntries: [],
            foodCounter: 0,
            selectedFoodEntry: null,//TODO:LATER FOR REPLACE
            isHighlighted: false,
            isMin: false
        };

        if (props.mealEntry)
            for (let f of props.mealEntry.foodentries)
                this.state.foodEntries.push(<FoodEntry
                    foodEntry={f}
                    key={this.state.foodCounter++} />);
    }

    addNewFoodEntry = (ev, newFoodEntry) => {
        const { foodEntries } = this.state;
        let { foodCounter } = this.state;

        foodEntries.push(<FoodEntry foodEntry={newFoodEntry} key={foodCounter++} />);
        this.setState({
            foodEntries: foodEntries,
            foodCounter: foodCounter
        });
    };

    toggleHighlight = () => this.setState({
        isHighlighted: !this.state.isHighlighted
    });

    toggleMinMax = (ev) => {
        this.setState({
            isMin: !this.state.isMin
        });
        ev.stopPropagation();
    };

    render = () => {
        const { mealEntry, isHighlighted, isMin, foodEntries } = this.state;
        const { mealname } = mealEntry;

        return (
            <div onClick={(ev) => this.props.selectedChanged(ev, this)}
                className={"mealArea boxShow" + (isHighlighted ? " highlight" : "")}>
                <div className="mealTitle">
                    {mealname}
                    <img onClick={(ev) => this.props.removeMeal(ev, this)} src="PLACEHOLDER DROPDOWN" alt="X" />
                    <img onClick={this.toggleMinMax} src="PLACEHOLDER DROPDOWN" alt={isMin ? "+" : "-"} />
                </div>
                <hr />
                <Note />
                <hr />
                <div className={"foodEntries lineDown" + (isMin ? " hidden" : "")}>
                    {foodEntries}
                </div>
                <div className="mealTotal">
                    <span>Meal Total:</span>
                    <span>321/123/213</span>
                </div>
            </div>
        );
    };
}

export default MealEntry;