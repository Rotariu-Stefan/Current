// SEND ANDU !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! JOS !!
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable max-lines */
import React from "react";
import PropTypes from "prop-types";

import FoodEntry from "../../Components/FoodEntry";
import FoodItem from "../../Components/FoodItem";
import { getServerURL } from "../../methods";
import { AppContext } from "../../AppContext";


const getNewFoodItem = (currentUser) => {
  return {
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
  };
};

class AddFoodArea extends React.Component {
  static contextType = AppContext;
  static propTypes = {
    updateAddNewFoodEntry: PropTypes.func.isRequired,
    onAddNewMeal: PropTypes.func.isRequired,
    onSelectedFoodChanged: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.newFoodKey = "mustchange";
    this.state = {
      selectedFood: null,
      amount: "",
      measure: "---",

      sFoodItems: [],
      sFoodCounter: 0,
      searchareaIsLoading: true,
      searchCounter: 0,

      newFoodForm: false,
      newFoodItem: null,
    };
  }

  componentDidMount() {
    this.setInitialState();
  }

  render() {
    const { amount, measure, mealareaIsLoading, searchareaIsLoading, sFoodItems, newFoodForm }
      = this.state;

    const searchAreaOrLoading = searchareaIsLoading ? "LOADING..." : sFoodItems;


    return (
      <div className="addFoodArea subblock boxShow">
        {newFoodForm ? (
          <div className="newFoodForm">
            <div className="newFoodHeader">
              <span className="textHigh">Create New Food:</span>
              <button className="ftButton" onClick={this.onToggleFoodForm}>
                +Select</button>
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
              onChange={(ev) => this.onSearchFoodItems(document.querySelector(".search").value, ev.currentTarget.checked)}
            />
            ALL
            <button
              className="ftButton"
              onClick={this.onToggleFoodForm}
            >
              +New
            </button>
            <input
              className="search" placeholder="search text" type="text"
              onChange={(ev) => this.onSearchFoodItems(ev.currentTarget.value, document.querySelector(".isAll").checked)}
              onKeyDown={this.onSearchKey}
            />
          </div>,
          <div key="searchResults" className="searchResults boxShow">
            {searchAreaOrLoading}
          </div>,
        ]}
        <div className="amountForm boxShow">
          <span className="textHigh">Quantity: </span>
          <input
            className="amountSize" disabled={searchareaIsLoading} maxLength="10"
            placeholder={this._getAmountDefault()} type="text" value={amount}
            onChange={(ev) => this.setState({ amount: ev.currentTarget.value })} onKeyDown={this.onAmountKey}
          />
          <select
            disabled={searchareaIsLoading} id="measureSelect" value={measure}
            onChange={(ev) => this.setState({ measure: ev.currentTarget.value })}
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
          <button className="newMeal ftButton" disabled={mealareaIsLoading} onClick={this.onAddNewMeal}>
            ADD NEW MEAL
          </button>
        </div>
      </div>
    );
  }

  onSearchFoodItems = (searchTerms, isAll) => {
    this.setState({
      sFoodItems: [],
      searchareaIsLoading: true,
      searchCounter: this.state.searchCounter + 1,
    });
    const typeDelay = 150;
    const sc = this.state.searchCounter + 1;

    setTimeout(async(searchCounter = sc) => {
      if (searchCounter < this.state.searchCounter) {
        return;
      }

      let { sFoodCounter } = this.state;
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

      const sFoodItems = [];
      let first = true;
      for (const f of res) {
        sFoodCounter += 1;
        if (!first) {
          sFoodItems.push(
            <FoodItem
              key={sFoodCounter} foodItem={f}
              updateSelectedFood={this.updateSelectedFood}
            />);
        } else {
          sFoodItems.push(
            <FoodItem
              key={sFoodCounter} foodItem={f} signalSelect={true}
              updateSelectedFood={this.updateSelectedFood}
            />);
          first = false;
        }
      }

      // SEND ANDU !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      // if (first) {
      //   this.setState({
      //     selectedFood: null,
      //     measure: "---",
      //     sFoodItems,
      //     sFoodCounter,
      //     searchareaIsLoading: false,
      //   })
      // } else {
      //   this.setState({
      //     sFoodItems,
      //     sFoodCounter,
      //     searchareaIsLoading: false,
      //   })
      // }

      this.setState({
        selectedFood: first ? null : this.state.selectedFood,
        measure: first ? "---" : this.state.measure,
        sFoodItems,
        sFoodCounter,
        searchareaIsLoading: false,
      });
    }, typeDelay);
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
    document.querySelector(".search").select();

    this.setState({
      selectedFood: sender,
      amount: "",
      measure: sender.state.foodItem.sizeinfo === null ? "Pieces" : "Grams",
    });

    this.props.onSelectedFoodChanged(sender);
  };

  onSearchKey = (ev) => {
    const { selectedFood, sFoodItems } = this.state;

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
          for (let i = 0; i < sFoodItems.length; i += 1) {
            if (sFoodItems[i].key === selectedFood._reactInternalFiber.key) {
              if (i === 0) {
                break;
              } else {
                document.querySelectorAll(".foodItem")[i - 1].click();
              }
            }
          }
        }
        ev.preventDefault();
        break;
      case "ArrowDown":
        if (selectedFood) {
          for (let i = 0; i < sFoodItems.length; i += 1) {
            if (sFoodItems[i].key === selectedFood._reactInternalFiber.key) {
              if (i === sFoodItems.length - 1) {
                break;
              } else {
                document.querySelectorAll(".foodItem")[i + 1].click();
              }
            }
          }
        }
        ev.preventDefault();
        break;
      default:
        break;
    }
  };

  onAmountKey = (ev) => {
    // TODO:Up/Down keys map?
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
      // TODO:Change Measure maybe??
        console.log(ev.key);
        ev.preventDefault();
        break;
      case "ArrowDown":
      // TODO:Change Measure??
        console.log(ev.key);
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
    this.props.onAddNewMeal(newMName, newMPortion);
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
      case "fat" || "carbs" || "protein":
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

  resetAfterAdd = () => {
    const { newFoodForm } = this.state;
    const { currentUser } = this.context;

    if (newFoodForm) {
      this.setState({
        newFoodForm: false,
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
      }, () => document.querySelector(".search").select());
    }
    document.querySelector(".search").select();
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
    });

    setTimeout(() => {
      this.onSearchFoodItems("", false);
    }, 0);
  };

  _currentEntry = () => {
    const { selectedFood, amount, measure, newFoodForm, newFoodItem } = this.state;

    if (newFoodForm) {
      this.newFoodKey = this.newFoodKey === "mustchange" ? "willchange" : "mustchange";

      return (
        <FoodEntry
          key={this.newFoodKey} amount={amount} foodItem={newFoodItem}
          measure={measure} readOnly="true"
        />);
    } else
    if (selectedFood) {
      return (
        <FoodEntry
          key={selectedFood.state.foodItem.foodid.toString() + amount + measure}
          amount={this._getAmountCurrent()} foodItem={selectedFood.state.foodItem} measure={measure} readOnly="true"
        />);
    }

    return <FoodEntry key={"F0"} readOnly="true" />;
  };

  _getAmountCurrent = () => {
    const { amount, measure, selectedFood } = this.state;
    const { sizeinfo } = selectedFood.state.foodItem;

    if (amount) {
      return amount;
    }
    if (!selectedFood) {
      return 0;
    }
    if (measure === "Pieces") {
      return 1;
    }
    if (measure === "Grams") {
      return sizeinfo === 0 ? 100 : sizeinfo;
    }

    return 0;
  };

  _getAmountDefault = () => {
    const { selectedFood, measure } = this.state;

    if (!selectedFood) {
      return 0;
    }
    if (measure === "Pieces") {
      return 1;
    }
    const { foodItem } = selectedFood.state;

    return foodItem.sizeinfo === 0 ? 100 : foodItem.sizeinfo;
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
}

export default AddFoodArea;
