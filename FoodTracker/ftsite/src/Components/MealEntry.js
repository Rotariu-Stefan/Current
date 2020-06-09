import React from 'react';
import FoodEntry from './FoodEntry';
import Note from './Note';

class MealEntry extends React.Component {
    static defaultMealEntry = {
        mealname: "New Meal",
        portion: 1,
        note: null,
        foodentries: []
    };

    constructor(props) {
        super(props);

        this.state = {
            mealEntry: props.mealEntry ? props.mealEntry : { ...MealEntry.defaultMealEntry },
            foodEntries: [],
            foodCounter: 0,
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
                    removeFoodEntry={this.onRemoveFoodEntry}
                    className="lineDown"
                    addToMeal={this.addNewFoodEntryMacros}
                    key={this.state.foodCounter} />);
                this.state.foodCounter++;
            }
    }

    addNewFoodEntry = (ev, newFoodEntry) => {
        const { foodEntries } = this.state;
        let { foodCounter } = this.state;

        foodEntries.push(<FoodEntry foodEntry={newFoodEntry} removeFoodEntry={this.onRemoveFoodEntry} addToMeal={this.addNewFoodEntryMacros} key={foodCounter++} className="lineDown" />);

        this.setState({
            foodEntries: foodEntries,
            foodCounter: foodCounter,
        });
    };

    onRemoveFoodEntry = (ev, sender) => {
        const { foodEntries, mealEntry, fat, carbs, protein } = this.state;
        const { portion } = mealEntry;

        for (let i = 0; i < foodEntries.length; i++)
            if (foodEntries[i].key.toString() === sender._reactInternalFiber.key) {
                mealEntry.foodentries.splice(i, 1);
                foodEntries.splice(i, 1)

                this.setState({
                    foodEntries: foodEntries,
                    mealEntry: mealEntry,
                    fat: fat - sender.state.fatRes * portion,
                    carbs: carbs - sender.state.carbsRes * portion,
                    protein: protein - sender.state.proteinRes * portion
                });
                this.props.addToDay(0 - sender.state.fatRes * portion, 0 - sender.state.carbsRes * portion
                    , 0 - sender.state.proteinRes * portion);
            }

        this.props.updateDayMF(this);
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

    onUpdateAttach = (newNote) => {
        const { mealEntry } = this.state;

        mealEntry.note = newNote;
        this.setState({
            mealEntry: mealEntry
        });
    };

    onRemoveNote = () => {
        const { mealEntry } = this.state;

        mealEntry.note = null;
        this.setState({
            mealEntry: mealEntry
        });
        this.props.updateDay();
    };

    addNewFoodEntryMacros = (newfat, newcarbs, newprotein) => {
        const { portion } = this.state.mealEntry;

        this.state.fat += newfat * portion;
        this.state.carbs += newcarbs * portion;
        this.state.protein += newprotein * portion;
        this.setState({});

        this.props.addToDay(newfat * portion, newcarbs * portion, newprotein * portion);
    };

    render = () => {
        const { mealEntry, isHighlighted, isMin, foodEntries, fat, carbs, protein } = this.state;
        const { mealname, note, portion } = mealEntry;

        return (
            <div onClick={(ev) => this.props.selectedChanged(ev, this)}
                className={"mealArea boxShow" + (isHighlighted ? " highlight" : "")}>
                <div className="mealTitle">
                    {`${mealname} (x${portion})`}
                    <img onClick={(ev) => this.props.removeMeal(ev, this)} src="SitePics/icons8-cancel-20.png" alt="X"
                        className="managerImg" />
                    <img onClick={this.toggleMinMax} src={isMin ? "SitePics/icons8-plus-20.png" : "SitePics/icons8-minus-20.png"} alt={isMin ? "+" : "-"}
                        className="managerImg" />
                </div>
                <Note removeNote={this.onRemoveNote} updateAttach={this.onUpdateAttach} note={note}
                    key={this._reactInternalFiber.key + (note ? "_note" : "0")} isMin={isMin} />
                <div className={"foodEntries lineDown" + (isMin ? " hidden" : "")}>
                    {foodEntries}
                </div>
                <div className="mealTotal">
                    <span>Meal Total:</span>
                    <span>{`${fat.toFixed(1)}|${carbs.toFixed(1)}|${protein.toFixed(1)}`}</span>
                </div>
            </div>
        );
    };

    componentDidMount = () => {
        if (this.props.signalSelect)
            this.props.selectedChanged(null, this);
        else
            this.setState({});
    };
}

export default MealEntry;