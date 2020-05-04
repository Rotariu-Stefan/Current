import React from 'react';
import FoodEntry from './FoodEntry';
import Note from './Note';

class MealEntry extends React.Component {
    constructor({ name }) {
        super();
        this.nameDef = "Meal";

        this.state = {
            name: name === undefined ? this.nameDef : name,
            foodEntries: [],
            foodKey: 1,
            topClasses: "mealArea boxShow",
            foodEntriesClasses: "foodEntries lineDown"
        };

        this.state.foodEntries = [<FoodEntry key="0" amount="100g" name_brand="cottage cheese @delaco" macros="4.5/2/12" macrores="111/111/111" />];
    }

    addNewFoodEntry = (ev) => {
        this.state.foodEntries.push(<FoodEntry key={this.state.foodKey} />);
        this.setState({
            foodEntries: this.state.foodEntries,
            foodKey: this.state.foodKey + 1,
        });
    }

    highlight = () => {
        this.setState({ topClasses: this.state.topClasses === "mealArea boxShow" ? "mealArea boxShow highlight" : "mealArea boxShow" });
    }

    toggleFoodEntries = (ev) => {
        console.log("DOTS!!!");
        this.setState({ foodEntriesClasses: this.state.foodEntriesClasses === "foodEntries lineDown" ? "foodEntries lineDown hidden" : "foodEntries lineDown" });
    }

    render = () => {
        return (
            <div onClick={(ev) => this.props.selectedChanged(ev, this)} className={this.state.topClasses}>
                <div className="mealTitle">{this.state.name === undefined ? this.nameDef : this.state.name}<img onClick={this.toggleFoodEntries} src="PLACEHOLDER DROPDOWN" alt="..." /></div>
                <hr />
                <Note />
                <hr />
                <div className={this.state.foodEntriesClasses}>
                    {this.state.foodEntries}
                </div>
                <div className="mealTotal">
                    <span>Meal Total:</span>
                    <label>321/123/213</label>
                </div>
            </div>
        );
    }
}

export default MealEntry;