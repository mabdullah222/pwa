import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FertilizerCard from '../components/fertilizerCard'
import { BiMinus, BiPlus } from "react-icons/bi"
import { useContext } from "react";
import PlantContext from '../context/plant/plantContext';
import { useParams } from "react-router-dom";
import axios from 'axios';


const Fertilizer = () => {
        const a = useContext(PlantContext);
        const cropToBeGiven = a.selectedPlant.charAt(0).toUpperCase() + a.selectedPlant.slice(1);

        const [data, setData] = useState([])


        let fetchData = async () => {
                let response = await axios.get(`http://localhost:8000/medicine/searchformedicines/${cropToBeGiven}`)
                setData(response.data);
        }

        useEffect(() => {
                fetchData();
        }, [])

        const params = useParams();
        const { crop } = params;

        const navigate = useNavigate();

        const goBack = () => {
                navigate("/dashboard");
        }

        const [plotSize, setPlotSize] = useState(2.5);

        const decreasePlot = () => {
                if (plotSize > 0.5) {
                        let size = plotSize;
                        setPlotSize(size - 0.5);
                }
        }
        const increasePlot = () => {
                let size = plotSize;
                setPlotSize(size + 0.5);
        }

        return (
                <div className='h-full w-full p-2'>
                        <button onClick={() => goBack()} className='absolute top-3 right-2 w-[4rem] bg-slate-200 p-2 rounded-lg hover:bg-slate-400 hover:text-white'>Back</button>
                        {/* <h1 className='text-emerald-800 mb-2 text-5xl font-medium leading-tight'>Fertilizer</h1> */}
                        <h1 className='text-emerald-800 mb-2 text-5xl font-medium leading-tight'>Fertilizer</h1>
                        <div>
                                <h3 className='text-emerald-800 mb-2 mt-3 text-3xl font-medium leading-tight'>Unit</h3>
                                <input type="radio" name="acre" id="acre" checked />
                                <label htmlFor="acre">Acre</label>
                        </div>
                        <div className="mt-4">
                                <h4>Plot Size</h4>
                                <div className='flex flex-col justify-center'>
                                        <div className='flex justify-center mb-8 items-center'>
                                                <BiMinus onClick={decreasePlot} size={40} className='bg-slate-200 rounded-full hover:bg-slate-400 cursor-pointer' />
                                                <div className='bg-slate-100 rounded-lg w-[8rem] text-emerald-800 ml-2 mr-2 text-3xl font-medium leading-tight text-center py-2'> {plotSize} </div>
                                                <BiPlus onClick={increasePlot} size={40} className='bg-slate-200 rounded-full hover:bg-slate-400 cursor-pointer' />
                                        </div>
                                        {/* <div className='flex justify-center'>
                        <button className='w-[15rem] mt-4 bg-slate-400 p-2 rounded-full hover:bg-slate-700 hover:text-white'>Calculate</button>
                    </div> */}
                                </div>
                        </div>

                        <div className='laptop:p-5'>
                                <h3 className='text-xl text-emerald-900 my-2 font-semibold'>Below are the recommendations of fertilizers to you can select for this crop</h3>
                                {
                                        data.map((item) => {
                                                return (
                                                        <FertilizerCard factor={plotSize} category={item.category} dose={item.dose} activeIngredient={item.activeIngredient} name={item.name} pest={item.pest} />
                                                );
                                        })
                                }
                        </div>
                </div>
        )
}

export default Fertilizer