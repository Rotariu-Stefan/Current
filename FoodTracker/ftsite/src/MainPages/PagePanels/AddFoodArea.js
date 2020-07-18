/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable max-lines */
import React from "react";
import PropTypes from "prop-types";

import FoodEntry from "../../Components/FoodEntry";
import FoodItem from "../../Components/FoodItem";
import { getServerURL } from "../../methods";
import { AppContext } from "../../AppContext";


class AddFoodArea extends React.Component {
  static contextType = AppContext;
  static propTypes = {
    isDayLoading: PropTypes.bool.isRequired,
    updateAddNewFoodEntry: PropTypes.func.isRequired,
    updateAddNewMeal: PropTypes.func.isRequired,
    updateSelectedFood: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedFood: null,
      amount: "",
      measure: "---",

      searchareaIsLoading: true,
      searchTerms: "",
      isAll: false,

      newFoodForm: false,
      newFoodItem: null,
    };
    this.foodItemsCounter = 0;
    this.searchCounter = 0;
  }

  componentDidMount() {
    this.setInitialState();
  }

  render() {
    const { amount, measure, searchareaIsLoading, newFoodForm } = this.state;
    const { isDayLoading } = this.props;

    return (
      <div className="addFoodArea subblock boxShow">
        {newFoodForm ? (
          <div className="newFoodForm">
            <div className="newFoodHeader">
              <span className="textHigh">Create New Food:</span>
              <button className="ftButton" onClick={this.onToggleFoodForm}>
                +Select
              </button>
            </div>
            <span>Name:</span>
            <input
              data-field="foodname" maxLength="50" placeholder="name" type="text"
              onChange={this.onChangeFoodValue}
            />
            <span>Brand:</span>
            <input
              data-field="brand" maxLength="50" placeholder="brand" type="text"
              onChange={this.onChangeFoodValue}
            />
            <span>Macros:</span>
            <div>
              <input
                data-field="fat" maxLength="5" placeholder="0" type="text"
                onChange={this.onChangeFoodValue}
              />
              <span>Fat</span>
              <input
                data-field="carbs" maxLength="5" placeholder="0" type="text"
                onChange={this.onChangeFoodValue}
              />
              <span>Carbs</span>
              <input
                data-field="protein" maxLength="5" placeholder="0" type="text"
                onChange={this.onChangeFoodValue}
              />
              <span>Protein</span>
            </div>
            <span>Per:</span>
            <div>
              <select className="smallerInput" data-field="per" onChange={this.onChangeFoodValue} >
                <option>100Grams</option>
                <option>1Piece</option>
              </select>
              <span>Piece Size:</span>
              <input
                className="PSInput smallerInput" data-field="sizeinfo" defaultValue="100" maxLength="5"
                placeholder="null" type="text" onChange={this.onChangeFoodValue}
              />
            </div>
            <span>Price:</span>
            <div>
              <input
                className="smallerInput" data-field="price" maxLength="10" placeholder="0"
                type="text" onChange={this.onChangeFoodValue}
              />
              <div>
                <span>Is Dish?</span>
                <input data-field="isdish" type="checkbox" onChange={this.onChangeFoodValue} />
              </div>
            </div>
            <span className="afaInfo">
              To add certain details (dish, composition, photo, note)or further edit foods go to Your Foods section.
            </span>
          </div>
        ) : [
          <div key="searchForm" className="searchForm boxShow">
            <span className="textHigh">Search Food: </span>
            <input
              className="isAll" maxLength="100" type="checkbox"
              onChange={this.onIsAllChange}
            />
            ALL
            <button className="ftButton" onClick={this.onToggleFoodForm} >
              +New
            </button>
            <input
              className="search" placeholder="search text" type="text"
              onChange={this.onSearchTermsChange} onKeyDown={this.onSearchKey}
            />
          </div>,
          <div key="searchResults" className="searchResults boxShow">
            {searchareaIsLoading ? "LOADING..." : this._getFoodItems()}
          </div>,
        ]}
        <div className="amountForm boxShow">
          <span className="textHigh">Quantity: </span>
          <input
            className="amountSize" disabled={searchareaIsLoading} maxLength="10"
            placeholder={this._getAmountDefault()} type="text" value={amount}
            onChange={this.onAmountChange} onKeyDown={this.onAmountKey}
          />
          <select
            disabled={searchareaIsLoading} id="measureSelect" value={measure}
            onChange={this.onMeasureChange}
          >
            <option className={this._getMeasureVisible("Grams")}>
              Grams</option>
            <option className={this._getMeasureVisible("Pieces")}>
              Pieces</option>
            <option className="hidden">---</option>
          </select>
        </div>
        <div className="searchEntry boxShow">
          <span className="textHigh lineDown">Current Entry:</span>
          {this._currentEntry()}
          <button className="ftButton" disabled={searchareaIsLoading} onClick={this.onAddNewFoodEntry}>
            ADD FOOD ENTRY
          </button>
        </div>
        <hr />
        <div className="addMealArea">
          <div>
            <span className="textHigh">Meal Name:</span>
            <input className="newMName" placeholder={"Meal#"} type="text" />
            <span className="textHigh">Portion:</span>
            <input className="newMPortion" maxLength="5" placeholder="1" type="text" />
          </div>
          <button className="newMeal ftButton" disabled={isDayLoading} onClick={this.onAddNewMeal}>
            ADD NEW MEAL
          </button>
        </div>
      </div>
    );
  }

  onSearchTermsChange = (ev) => this.setState({ searchTerms: ev.currentTarget.value },
    this.loadFoodItems);

  onIsAllChange = (ev) => this.setState({ isAll: ev.currentTarget.checked },
    this.loadFoodItems);

  onMeasureChange = (ev) => this.setState({ measure: ev.currentTarget.value });
  onAmountChange = (ev) => this.setState({ amount: ev.currentTarget.value });

  onSearchKey = (ev) => {
    const { selectedFood } = this.state;

    switch (ev.key) {
      case "Enter":
        this.onAddNewFoodEntry();
        ev.preventDefault();
        break;
      case "Tab":
        document.querySelector(".amountSize").select();
        ev.preventDefault();
        break;
      case "Escape":
        document.querySelector(".search").value = "";
        ev.preventDefault();
        break;
      case "ArrowUp":
        if (selectedFood) {
          const selectedIndex = Number(selectedFood._reactInternalFiber.key);
          const foodList = document.querySelectorAll(".foodItem");

          if (selectedIndex > 0) {
            foodList[selectedIndex - 1].click();
          }
        }
        ev.preventDefault();
        break;
      case "ArrowDown":
        if (selectedFood) {
          const selectedIndex = Number(selectedFood._reactInternalFiber.key);
          const foodList = document.querySelectorAll(".foodItem");

          if (selectedIndex < foodList.length - 1) {
            foodList[selectedIndex + 1].click();
          }
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
        document.querySelector(".search").select();
        ev.preventDefault();
        break;
      case "Escape":
        document.querySelector(".amountSize").value = "";
        ev.preventDefault();
        break;
      case "ArrowUp":
        this.setState({ amount: this.state.amount + 1 });
        ev.preventDefault();
        break;
      case "ArrowDown":
        this.setState({ amount: this.state.amount - 1 });
        ev.preventDefault();
        break;
      default:
        break;
    }
  };

  onAddNewFoodEntry = () => {
    const { newFoodForm, newFoodItem, selectedFood, amount, measure } = this.state;

    const errorMessage = this.addNewFoodEntryChecks();
    if (errorMessage) {
      alert(errorMessage);
    } else {
      const newFoodEntry = newFoodForm ? newFoodItem : selectedFood.state.foodItem;
      newFoodEntry.amount = amount ? amount : document.querySelector(".amountSize").placeholder;
      newFoodEntry.measure = measure;

      this.props.updateAddNewFoodEntry(newFoodEntry);
    }
  };

  onAddNewMeal = () => {
    const newMName = document.querySelector(".newMName").value;
    const newMPortion = document.querySelector(".newMPortion").value;
    this.props.updateAddNewMeal(newMName, newMPortion);
  };

  onToggleFoodForm = () => {
    const { newFoodForm } = this.state;

    if (newFoodForm) {
      this.setState({ newFoodForm: !newFoodForm });
    } else {
      this.setState({ newFoodForm: true, selectedFood: null, measure: "Grams", amount: 100 });
    }
  };

  onChangeFoodValue = (ev) => {
    const { newFoodItem } = this.state;
    const { value } = ev.currentTarget;

    const field = ev.currentTarget.getAttribute("data-field");
    const psi = document.querySelector(".PSInput");

    switch (field) {
      case "per":
        if (value === "1Piece") {
          psi.disabled = true;
          psi.value = "";
          newFoodItem.sizeinfo = null;
          this.setState({ amount: 1 });
        } else {
          psi.disabled = false;
          psi.value = 100;
          newFoodItem.sizeinfo = 100;
          this.setState({ amount: 100 });
        }
        break;
      case "isdish":
        newFoodItem.foodentries = value === true ? [] : null;
        break;
      case "sizeinfo":
        newFoodItem[field] = value === "" ? null : value;
        break;
      case "fat":
      case "carbs":
      case "protein":
        newFoodItem[field] = value === "" ? 0 : value;
        break;
      default:
        newFoodItem[field] = value;
    }

    this.setState({
      newFoodItem,
      measure: newFoodItem.sizeinfo === null ? "Pieces" : "Grams",
    });
  };

  loadFoodItems = (searchTerms = this.state.searchTerms, isAll = this.state.isAll) => {
    this.setState({
      sFoodItems: [],
      searchareaIsLoading: true,
    });

    this.searchCounter += 1;
    const sc = this.searchCounter;
    const typeDelay = 200;
    setTimeout(() => this.searchFoodItems(searchTerms, isAll, sc), typeDelay);
  };

  searchFoodItems = async(searchTerms, isAll, searchCounter) => {
    if (searchCounter < this.searchCounter) {
      return;
    }

    const { currentUser } = this.context;
    let res = await fetch(`${getServerURL()}/dailymeals/foodsearch`, {
      method: "get",
      headers: {
        "content-type": "application/json",
        "userid": currentUser.userid,
        "search": searchTerms,
        "isall": isAll,
      },
    });
    res = await res.json();
    if (searchCounter < this.state.searchCounter) {
      return;
    }

    if (res.length === 0) {
      this.setState({
        selectedFood: null,
        measure: "---",
        amount: "",
      });
    }
    this.setState({
      sFoodItems: res,
      searchareaIsLoading: false,
    });
  };

  addNewFoodEntryChecks = () => {
    const { newFoodForm, newFoodItem, selectedFood, amount, measure } = this.state;

    if (newFoodForm) {
      if (newFoodItem.foodname === "") {
        return "New Food must have a Name !";
      }
      const sum = Number(newFoodItem.fat) + Number(newFoodItem.carbs) + Number(newFoodItem.protein);
      if (isNaN(sum) || (measure === "Grams" && (sum > 100 || sum <= 0))) {
        return "Macro value are wrong!";
      }
      if (isNaN(newFoodItem.price)) {
        return "Price value is wrong!";
      }
      if (isNaN(newFoodItem.sizeinfo) || newFoodItem.sizeinfo < 0) {
        return "Piece Size value is wrong!";
      }
    } else if (selectedFood === null) {
      return "Must select a Food Item !";
    }
    if (isNaN(amount)) {
      return "Must Enter Valid Number for Amount!";
    }

    return "";
  };

  updateSelectedFood = (sender) => {
    const { selectedFood } = this.state;

    if (sender === selectedFood) {
      return;
    }
    if (selectedFood) {
      selectedFood.toggleSelected();
    }
    sender.toggleSelected();

    this.setState({
      selectedFood: sender,
      amount: "",
      measure: sender.state.foodItem.sizeinfo === null ? "Pieces" : "Grams",
    });

    this.props.updateSelectedFood(sender);
  };

  resetAfterAdd = () => {
    const { newFoodForm } = this.state;
    const { currentUser } = this.context;

    if (newFoodForm) {
      this.setState({
        newFoodItem: {
          foodname: "",
          brand: "",
          fat: 0, carbs: 0, protein: 0,
          price: 0,
          sizeinfo: 100,
          isdish: false,
          pic: "empty.png",
          userid: currentUser.userid,
          noteid: null,
          foodentries: null,
        },
      });
    } else {
      document.querySelector(".search").select();
    }
  };

  setInitialState=() => {
    const { currentUser } = this.context;

    this.setState({
      newFoodItem: {
        foodname: "",
        brand: "",
        fat: 0, carbs: 0, protein: 0,
        price: 0,
        sizeinfo: 100,
        isdish: false,
        pic: "empty.png",
        userid: currentUser.userid,
        noteid: null,
        foodentries: null,
      },
    }, this.loadFoodItems);
  };

  _currentEntry = () => {
    const { selectedFood, measure, newFoodForm, newFoodItem } = this.state;

    const selectedOrNull = selectedFood ? { ...selectedFood.state.foodItem } : { ...FoodItem.defaultFoodItem };
    const newEntry = newFoodForm ? newFoodItem : selectedOrNull;
    newEntry.measure = measure;
    newEntry.amount = this._getAmountCurrent();

    return <FoodEntry foodEntry={newEntry} readOnly="true" />;
  };

  _getAmountCurrent = () => {
    const { amount } = this.state;

    if (amount) {
      return amount;
    }

    return this._getAmountDefault();
  };

  _getAmountDefault = () => {
    const { selectedFood, measure } = this.state;

    if (!selectedFood) {
      return 0;
    }
    if (measure === "Pieces") {
      return 1;
    }
    const { sizeinfo } = selectedFood.state.foodItem;

    return sizeinfo === 0 ? 100 : sizeinfo;
  };

  _getMeasureVisible = (measure) => {
    const { selectedFood } = this.state;
    if (!selectedFood) {
      return "hidden";
    }

    const { foodItem } = selectedFood.state;
    if (measure === "Grams") {
      return foodItem.sizeinfo === null ? "hidden" : "";
    }
    if (measure === "Pieces") {
      return foodItem.sizeinfo === 0 ? "hidden" : "";
    }

    return "";
  };

  _getFoodItems = () => {
    const { sFoodItems } = this.state;

    this.foodItemsCounter = 0;

    return sFoodItems.map(this._getFoodItem);

  };

  _getFoodItem = (item) => {
    const fi = (
      <FoodItem
        key={this.foodItemsCounter} foodItem={item} signalSelect={this.foodItemsCounter === 0}
        updateSelectedFood={this.updateSelectedFood}
      />);
    this.foodItemsCounter += 1;

    return fi;
  };
}

export default AddFoodArea;
