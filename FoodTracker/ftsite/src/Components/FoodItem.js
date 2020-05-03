import React from 'react';

const FoodItem = ({ name_brand, macros, per }) => {
    const name_brandDef = "default @etc";
    const macrosDef = "1/0/0";
    const perDef = "p/100g";
    return (
        <div className="foodItem lineDown">
            <label className="name_brand">{name_brand === undefined ? name_brandDef : name_brand}</label>
            <label className="macro">{macros===undefined?macrosDef:macros}</label>
            <label className="per">{per===undefined?perDef:per}</label>
        </div>
    );
}

export default FoodItem;