import React, { useEffect } from "react";
import { useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useContext } from "react";
import PlantContext from "../context/plant/plantContext";
import { BiPlus } from "react-icons/bi"
import { useNavigate } from "react-router-dom";

const PlantCarousel = () => {
    const navigate = useNavigate();

    const a = useContext(PlantContext);

    const slideLeft = () => {
        var slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft - 500;
    };

    const slideRight = () => {
        var slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft + 500;
    };

    const [data, setData] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    const openAll = () => {
        navigate('/openAll');
    }

    useEffect(() => {
        let crops = JSON.parse(localStorage.getItem('crops'));
        setData(crops);
        a.updateSelectedPlant(crops[0])
        setSelectedImage(crops[0])
    }, [])

    const handleImageClick = (item) => {
        a.updateSelectedPlant(item);
        setSelectedImage(item);
    }

    return (
        <>
            <div className="relative flex items-center">
                <MdChevronLeft
                    className="cursor-pointer opacity-50 hover:opacity-100"
                    onClick={slideLeft}
                    size={40}
                />
                <div
                    id="slider"
                    className="flex flex-wrap gap-4 scroll h-full w-full overflow-x-scroll scroll-smooth whitespace-nowrap scrollbar-hide p-2"
                >
                    <BiPlus
                        type="button"
                        onClick={() => openAll()}
                        className="inline-block h-[80px] w-[80px] cursor-pointer rounded-full p-3 duration-300 ease-in-out hover:scale-105 bg-slate-300 text-white"
                    />
                    {data.map((item) => {
                        const isSelected = item === selectedImage;
                        const classNames = `inline-block h-[90px] w-[90px] cursor-pointer rounded-full p-1 duration-300 ease-in-out hover:scale-105 ${isSelected ? 'selected' : ''}`;
                        return (
                            <img
                                type="button"
                                onClick={() => handleImageClick(item)}
                                className={classNames}
                                src={process.env.PUBLIC_URL+`/Assets/${item}.png`}
                                alt={item}
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

export default PlantCarousel;
