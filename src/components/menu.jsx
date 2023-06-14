import React from "react";
import { GiFertilizerBag } from "react-icons/gi"
import { MdOutlinePestControl } from "react-icons/md"
import { useContext } from "react";
import PlantContext from "../context/plant/plantContext";
import { useNavigate } from "react-router-dom";


const Menu = () => {

    const a = useContext(PlantContext);

    const navigate = useNavigate();

    const navigateMenu = (event) => {
        navigate(`/${event}/${a.selectedPlant}`)
    }

    return (
        <div className="m-4 h-[9rem] flex items-center p-3 gap-2 rounded-lg bg-slate-300">
            <div onClick={() => {a.selectedPlant?navigateMenu("fertilizer"):console.log("")}} className="w-[175px] h-full p-2 rounded-lg bg-white hover:bg-slate-100 cursor-pointer">
                <GiFertilizerBag size={40} />
                <h3>Fertilizer, Pesticides Calculator</h3>
            </div>
            <div onClick={() =>{a.selectedPlant?navigateMenu("pesticide"):console.log("")}} className="w-[175px] h-full p-2 rounded-lg bg-white hover:bg-slate-100 cursor-pointer">
                <MdOutlinePestControl size={40} />
                <h3>Pests and Diseases</h3>
            </div>
        </div>
    );
};

export default Menu;
