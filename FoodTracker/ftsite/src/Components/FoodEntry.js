import React from 'react';

const FoodEntry = ({
    amount = 0,
    name_brand = "nothing @sv",
    macros = "0/0/1",
    macrores = "00/00/111"
}) => {
    return (
        <div className="foodEntry lineDown">
            <span className="amount">{amount}</span>
            <span className="name_brand">{name_brand}</span>
            <span className="macro">{macros}</span>
            <span className="macroRes">{macrores}</span>
        </div>
    );
}

export default FoodEntry;