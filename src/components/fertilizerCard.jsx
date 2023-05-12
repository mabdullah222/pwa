import React from "react";

const FertilizerCard = ({name, category, pest, activeIngredient, dose, factor}) => {

    const matches = dose[0].match(/\d+(\.\d+)?/g); // find all numbers in string
    const firstNumber = parseFloat(matches[0]); // convert the first matched number to a number
    const result = firstNumber * factor;

    return (
        <div className="flex flex-col bg-slate-200 mb-2 mt-2 p-3 rounded-lg shadow-md box-border">
            <div>
                <h1 className="text-primary mb-2 text-1xl font-medium leading-tight">{name}</h1>
            </div>
            <div className="flex justify-between">
                <div className="col flex flex-col">
                    <div>
                        <h1 className="text-primary mb-2 text-1xl font-medium leading-tight">Product Name</h1>
                    </div>
                    <div>
                        <ul>
                            {activeIngredient}
                        </ul>
                    </div>
                </div>
                <div className="col flex flex-col">
                    <div>
                        <h1 className="text-primary mb-2 text-1xl font-medium leading-tight">Dosage</h1>
                    </div>
                    <div>
                        <p>{result}<span>kg</span></p>
                    </div>
                </div>
                <div className="col flex flex-col">
                    <div>
                        <h1 className="text-primary mb-2 text-1xl font-medium leading-tight">Pest</h1>
                    </div>
                    <div><h1>{pest}</h1></div>
                </div>
                <div className="col flex flex-col">
                    <div>
                        <h1 className="text-primary mb-2 text-1xl font-medium leading-tight">Category</h1>
                    </div>
                    <div><h1>{category}</h1></div>
                </div>
            </div>
        </div>
    );
};

export default FertilizerCard;
