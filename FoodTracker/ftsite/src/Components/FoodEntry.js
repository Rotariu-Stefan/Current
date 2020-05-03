import React from 'react';

const FoodEntry = ({amount, name_brand, macros, macrores }) => {

    const amountDef = 0;
    const name_brandDef = "nothing @sv";
    const macrosDef = "0/0/1";
    const macroresDef = "00/00/111";

    return (
        <div className="foodEntry lineDown">
            <label className="amount">{amount === undefined ? amountDef : amount}</label>
            <label className="name_brand">{name_brand === undefined ? name_brandDef : name_brand}</label>
            <label className="macro">{macros === undefined ? macrosDef : macros}</label>
            <label className="macroRes">{macrores === undefined ? macroresDef : macrores}</label>
        </div>
    );
}

export default FoodEntry;