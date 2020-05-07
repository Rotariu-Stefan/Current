import React from 'react';

const FoodItem = ({
    name_brand= "default @etc",
    macros = "1/0/0",
    per = "p/100g"
}) => {
    return (
        <div className="foodItem lineDown">
            <span className="name_brand">{name_brand}</span>
            <span className="macro">{macros}</span>
            <span className="per">{per}</span>
        </div>
    );
}

export default FoodItem;