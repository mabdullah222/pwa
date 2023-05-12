import React, { useEffect } from "react";
import { useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useContext } from "react";
import PlantContext from "../context/plant/plantContext";
import axios from "axios";

const UserPlants = () => {
    const a = useContext(PlantContext);

    const slideLeft = () => {
        var slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft - 500;
    };

    const slideRight = () => {
        var slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft + 500;
    };

    // There will be another api call that will fill the array with the users already selected item first. That api call will be reponsible for the upper carousel.
    const [data, setData] = useState([]);



    async function fetchData() {
        try{
            const response = await axios.get(' http://localhost:3333/todos');
            setData(response.data);
        }catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            {/* <img className='w-full h-[440px] object-cover' src="https://www.nicepng.com/png/detail/191-1914574_svg-freeuse-library-barley-vector-spike-wheat-wheat.png" alt="" /> */}
            <div className="relative flex items-center">
                <MdChevronLeft
                    className="cursor-pointer opacity-50 hover:opacity-100"
                    onClick={slideLeft}
                    size={40}
                />
                <div
                    id="slider"
                    className="scroll h-full w-full overflow-x-scroll scroll-smooth whitespace-nowrap scrollbar-hide"
                >
                    {data.map((item) => {
                        return (
                            <img
                                type="button"
                                key={item.id}
                                className="inline-block h-[90px] w-[90px] cursor-pointer rounded-full p-1"
                                src={item.img}
                                alt={item.crop}
                            />
                        );
                    })}
                </div>
                <MdChevronRight
                    className="cursor-pointer opacity-50 hover:opacity-100"
                    onClick={slideRight}
                    size={40}
                />
            </div>
        </>
    );
};

export default UserPlants;
