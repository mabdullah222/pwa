import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserPlants from '../components/userPlants';

const OpenAll = () => {

    const navigate = useNavigate();

    const goBack = () => {
        navigate("/dashboard");
    }

    const goBackAndAddData = async () => {
        localStorage.setItem('crops', JSON.stringify(selectedImages))
        try {
            // await axios.post('http://localhost:8000/updateCrops', { crops: selectedImages });
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
        }
    }

    const [data, setData] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);

    async function fetchData() {
        try {
            const response = await axios.get('http://localhost:8000/medicine/list');
            setData(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        let crops = JSON.parse(localStorage.getItem('crops'));
        setSelectedImages(crops);
        fetchData();
    }, [])

    const handleImageClick = (crop) => {
        setSelectedImages((prevSelectedImages) => {
            if (prevSelectedImages.includes(crop.charAt(0).toLowerCase() + crop.slice(1))) {
                // Crop is already selected, remove it from the selection
                return prevSelectedImages.filter(item => item !== crop.charAt(0).toLowerCase() + crop.slice(1));
            } else {
                // Crop is not selected, add it to the selection
                return [...prevSelectedImages, crop.charAt(0).toLowerCase() + crop.slice(1)];
            }
        });
        console.log(selectedImages)
    };
    
    
    return (
        <div className='h-full w-full p-3'>
            <button onClick={() => goBack()} className='absolute top-3 right-2 w-[4rem] bg-slate-200 p-2 rounded-lg hover:bg-slate-400 hover:text-white transition duration-300 ease-in-out'>Back</button>

            <div className='flex flex-wrap gap-4 w-90 bg-slate-100 rounded-lg'>
                {data.map((crop) => {
                    const isSelected = selectedImages.includes(crop.charAt(0).toLowerCase() + crop.slice(1));
                    const classNames = `inline-block h-[90px] w-[90px] cursor-pointer rounded-full p-1 duration-300 ease-in-out hover:scale-105 ${isSelected ? 'selected' : ''}`;
                    return (
                        <img
                            key={crop}
                            type="button"
                            className={classNames}
                            onClick={() => handleImageClick(crop)}
                            src={process.env.PUBLIC_URL+`/Assets/${crop}.png`}
                            alt={crop}
                        />
                    );
                })}
            </div>
            <button onClick={() => goBackAndAddData()} className='w-[4rem] bg-green-400 p-2 rounded-lg hover:bg-green-600 hover:text-white mt-4 transition duration-500'> Done </button>
        </div>
    )
}

export default OpenAll
