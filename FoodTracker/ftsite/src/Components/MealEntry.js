import React from 'react';
import FoodEntry from './FoodEntry';
import Note from './Note';

class MealEntry extends React.Component {
    constructor(props) {
        super(props);
        this.nameDef = "Meal";

        this.state = {
            name: props.name === undefined ? this.nameDef : props.name,
            foodEntries: [],
            foodKey: 1,
            highlight: false,
            min: false
        };

        this.state.foodEntries.push(<FoodEntry key="0" amount="100g" name_brand="cottage cheese @delaco" macros="4.5/2/12" macrores="111/111/111" />);
    }

    addNewFoodEntry = (ev) => {
        this.state.foodEntries.push(<FoodEntry key={this.state.foodKey} />);
        this.setState({
            foodEntries: this.state.foodEntries,
            foodKey: this.state.foodKey + 1,
        });
    }

    toggleHighlight = () => this.setState({
        highlight: !this.state.highlight
    });

    toggleMinMax = (ev) => {
        this.setState({
            min: !this.state.min
        });
        ev.stopPropagation();
    }

    render = () => {
        return (
            <div onClick={(ev) => this.props.selectedChanged(ev, this)} className={"mealArea boxShow" + (this.state.highlight ? " highlight" : "")}>
                <div className="mealTitle">{this.state.name}
                    <img onClick={(ev) => this.props.removeMeal(ev, this._reactInternalFiber.key)} src="PLACEHOLDER DROPDOWN" alt="X" />
                    <img onClick={this.toggleMinMax} src="PLACEHOLDER DROPDOWN" alt={this.state.min ? "+" : "-"} />
                </div>

                <hr />
                <Note />
                <hr />
                <div className={"foodEntries lineDown" + (this.state.min ? " hidden" : "")}>
                    {this.state.foodEntries}
                </div>
                <div className="mealTotal">
                    <span>Meal Total:</span>
                    <span>321/123/213</span>
                </div>
            </div>
        );
    }
}

export default MealEntry;