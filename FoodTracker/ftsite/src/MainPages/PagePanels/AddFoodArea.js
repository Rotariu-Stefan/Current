/* eslint-disable no-console */
/* eslint-disable no-alert */
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
    onAddNewFoodEntry: PropTypes.func.isRequired,
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

  UNSAFE_componentWillMount=() => {
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
      this.onLoadSFoodItems("", false);
    }, 0);
  };

  render = () => {
    const { amount, measure, mealareaIsLoading, searchareaIsLoading, sFoodItems, newFoodForm }
      = this.state;

    const searchAreaOrLoading = searchareaIsLoading ? "LOADING..." : sFoodItems;

    return (
      <div className="addFoodArea subblock boxShow">
        {newFoodForm ? (
          <div className="newFoodForm">
            <div className="newFoodHeader">
              <span className="textHigh">Create New Food:</span>
              <button className="ftButton" onClick={() => this.setState({ newFoodForm: false })}>
                +Select</button>
            </div>
            <span>Name:</span>
            <input
              maxLength="50" placeholder="name" type="text"
              onChange={(ev) => this.changeNewFoodValue("foodname", ev.currentTarget.value)}
            />
            <span>Brand:</span>
            <input
              maxLength="50" placeholder="brand" type="text"
              onChange={(ev) => this.changeNewFoodValue("brand", ev.currentTarget.value)}
            />
            <span>Macros:</span>
            <div>
              <input
                maxLength="5" placeholder="0" type="text"
                onChange={(ev) => this.changeNewFoodValue("fat", ev.currentTarget.value)}
              />
              <span>Fat</span>
              <input
                maxLength="5" placeholder="0" type="text"
                onChange={(ev) => this.changeNewFoodValue("carbs", ev.currentTarget.value)}
              />
              <span>Carbs</span>
              <input
                maxLength="5" placeholder="0" type="text"
                onChange={(ev) => this.changeNewFoodValue("protein", ev.currentTarget.value)}
              />
              <span>Protein</span>
            </div>
            <span>Per:</span>
            <div>
              <select
                className="smallerInput"
                onChange={(ev) => this.changeNewFoodValue("per", ev.currentTarget.value)}
              >
                <option>100Grams</option>
                <option>1Piece</option>
              </select>
              <span>Piece Size:</span>
              <input
                className="PSInput smallerInput" defaultValue="100" maxLength="5" placeholder="null" type="text"
                onChange={(ev) => this.changeNewFoodValue("sizeinfo", ev.currentTarget.value)}
              />
            </div>
            <span>Price:</span>
            <div>
              <input
                className="smallerInput" maxLength="10" placeholder="0" type="text"
                onChange={(ev) => this.changeNewFoodValue("price", ev.currentTarget.value)}
              />
              <div>
                <span>Is Dish?</span>
                <input type="checkbox" onChange={(ev) => this.changeNewFoodValue("isdish", ev.currentTarget.checked)} />
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
              onChange={(ev) => this.loadSFoodItems(document.querySelector(".search").value, ev.currentTarget.checked)}
            />
            ALL
            <button
              className="ftButton"
              onClick={() => this.setState({ newFoodForm: true, selectedFood: null, measure: "Grams", amount: 100 })}
            >
              +New
            </button>
            <input
              className="search" placeholder="search text" type="text"
              onChange={(ev) => this.onLoadSFoodItems(ev.currentTarget.value, document.querySelector(".isAll").checked)}
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
  };

  onAddNewMeal = () => {
    const newMName = document.querySelector(".newMName");
    const newMPortion = document.querySelector(".newMPortion");
    this.props.onAddNewMeal(newMName, newMPortion);
  };

  onLoadSFoodItems = (searchTerms, isAll) => {
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
              onSelectedFoodChanged={this.onSelectedFoodChanged}
            />);
        } else {
          sFoodItems.push(
            <FoodItem
              key={sFoodCounter} foodItem={f} signalSelect={true}
              onSelectedFoodChanged={this.onSelectedFoodChanged}
            />);
          first = false;
        }
      }

      this.setState({
        selectedFood: first ? null : this.state.selectedFood,
        measure: first ? "---" : this.state.measure,
        sFoodItems,
        sFoodCounter,
        searchareaIsLoading: false,
      });
    }, typeDelay);
  };

  onSelectedFoodChanged = (ev, sender) => {
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

  // TODO:Up/Down keys map?
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
      // TODO:Change Measure
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

      this.props.onAddNewFoodEntry(newFoodEntry);
    }
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

  changeNewFoodValue = (field, value) => {
    const aux = this.state.newFoodItem;

    if (field === "per") {
      const psi = document.querySelector(".PSInput");
      if (value === "1Piece") {
        psi.disabled = true;
        psi.value = "";
        aux.sizeinfo = null;
        this.setState({ amount: 1 });
      } else {
        document.querySelector(".PSInput").disabled = false;
        psi.value = 100;
        aux.sizeinfo = 100;
        this.setState({ amount: 100 });
      }
    } else {
      if (field === "isdish") {
        aux.foodentries = value === true ? [] : null;
      }
      if (field === "sizeinfo") {
        value = value === "" ? null : value;
      }
      if (field === "fat" || field === "carbs" || field === "protein") {
        value = value === "" ? 0 : value;
      }
      aux[field] = value;
    }

    this.setState({
      newFoodItem: aux,
      measure: aux.sizeinfo === null ? "Pieces" : "Grams",
    });
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
