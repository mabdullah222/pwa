import React, { useEffect } from "react";
import { useState } from "react";
import PlantContext from "./plantContext";


const PlantState = (props) => {


    const [selectedPlant, setSelectedPlant] = useState('');

    useEffect(() => {
        console.log(selectedPlant);
    }, [selectedPlant])

    const updateSelectedPlant = (plant) => {
        setSelectedPlant(plant);
    }

    return(
        <PlantContext.Provider value={{selectedPlant, updateSelectedPlant}}>
            {props.children}
        </PlantContext.Provider>
    );
}

export default PlantState;