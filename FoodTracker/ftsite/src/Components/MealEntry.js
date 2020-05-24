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
            isMin: false,
            fat: 0,
            carbs: 0,
            protein: 0
        };

        if (props.mealEntry)
            for (let f of props.mealEntry.foodentries) {
                this.state.foodEntries.push(<FoodEntry
                    foodEntry={f}
                    key={this.state.foodCounter++} />);
                this.addNewFoodEntryMacros(f);
            }
    }

    addNewFoodEntry = (ev, newFoodEntry) => {
        const { foodEntries } = this.state;
        let { foodCounter } = this.state;

        foodEntries.push(<FoodEntry foodEntry={newFoodEntry} key={foodCounter++} />);
        this.addNewFoodEntryMacros(newFoodEntry);

        this.setState({
            foodEntries: foodEntries,
            foodCounter: foodCounter,
            fat: this.state.fat,
            carbs: this.state.carbs,
            protein: this.state.protein
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

    addNewFoodEntryMacros = (fe) => {
        const { fat, carbs, protein } = this.state;
        const aux = fe.sizeinfo === null ? 1 : 100;

        this.state.fat = fat + (fe.fat * fe.amount / aux);
        this.state.carbs = carbs + (fe.carbs * fe.amount / aux);
        this.state.protein = protein + (fe.protein * fe.amount / aux);
    }

    render = () => {
        const { mealEntry, isHighlighted, isMin, foodEntries, fat, carbs, protein } = this.state;
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
                    <span>Total:</span>
                    <span>{`${fat.toFixed(1)}//${carbs.toFixed(1)}//${protein.toFixed(1)}`}</span>
                </div>
            </div>
        );
    };

    componentDidMount = () => {
        if (this.props.signalSelect)
            this.props.selectedChanged(null, this);
    };
}

export default MealEntry;