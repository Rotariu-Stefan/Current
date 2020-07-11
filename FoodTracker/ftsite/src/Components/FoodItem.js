/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import PropTypes from "prop-types";


class FoodItem extends React.Component {
  static propTypes = {
    foodItem: PropTypes.object.isRequired,
    updateSelectedFood: PropTypes.func.isRequired,
    signalSelect: PropTypes.bool,
  };

  static defaultProps = { signalSelect: false };
  static defaultFoodItem = {
    // entryid: 0,
    foodid: 0,
    foodname: "Nothing",
    brand: "Nowhere",
    fat: 0, carbs: 0, protein: 0,
    sizeinfo: null, userid: 0, pic: "empty.png", price: 0,
    isdish: false,
    note: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      foodItem: (props.foodItem) ? props.foodItem : { ...FoodItem.defaultFoodItem },
      isSelected: false,
    };
  }

  componentDidMount() {
    if (this.props.signalSelect) {
      this.onSelectedFoodChanged(this);
    }
  }

  componentDidUpdate() {
    if (this.props.foodItem !== this.state.foodItem) {
      this.setState({ foodItem: this.props.foodItem });
    }
  }

  render() {
    const { foodItem, isSelected } = this.state;
    const { foodname, brand, fat, carbs, protein, sizeinfo } = foodItem;

    const selectedOrNot = isSelected ? " feSelected" : "";
    const per = sizeinfo === null ? "1" : "100g";

    return (
      <div
        className={`foodItem lineDown${selectedOrNot}`} role="menuitem" tabIndex="0"
        onClick={this.onSelectedFoodChanged}
      >
        <span className="name_brand">{`${foodname} ${brand ? `@${brand}` : ""}`}</span>
        <span className="macro">{`${fat}/${carbs}/${protein}`}</span>
        <span className="per">{per}</span>
      </div>
    );
  }

    onSelectedFoodChanged = () => this.props.updateSelectedFood(this);

    toggleSelected = () => this.setState({ isSelected: !this.state.isSelected });
}

export default FoodItem;
