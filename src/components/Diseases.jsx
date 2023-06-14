import React, { useEffect, useState } from "react";
import DiseaseCard from '../components/diseaseCard';
import { useNavigate } from 'react-router-dom'
import { useContext } from "react";
import PlantContext from '../context/plant/plantContext';
import axios from "axios";


const Diseases = () => {
        const a = useContext(PlantContext);
        const cropToBeGiven = a.selectedPlant.charAt(0).toUpperCase() + a.selectedPlant.slice(1);

        const [disease, setDisease] = useState([])

        const navigate = useNavigate();

        const goBack = () => {
                navigate("/dashboard");
        }

        let fetchData = async () => {
                let response = await axios.get(`http://localhost:8000/medicine/searchfordiseases/${cropToBeGiven}`);
                console.log(response.data)
                setDisease(response.data);
        }
        useEffect(() => {
                fetchData();
        }, [])

                
        return (
                <div className="flex justify-center items-center w-5/6 laptop:w-full h-full mt-6">
                        <button onClick={() => goBack()} className='absolute top-3 right-2 w-[4rem] bg-slate-200 p-2 rounded-lg hover:bg-slate-500 hover:text-white  transition duration-300 ease-in-out'>Back</button>
                        <div className="flex flex-wrap justify-between w-[75%] ">
                                {disease.map((item) => {
                                        return(
                                        <div>
                                                <DiseaseCard name={item.name} image={item.images} desc={item.desc}></DiseaseCard>
                                        </div>
                                        )
                                })}
                        </div>
                </div>
        );
};

export default Diseases;
