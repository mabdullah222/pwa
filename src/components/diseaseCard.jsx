import React, { useState } from "react";

const DiseaseCard = ({ name, image, desc }) => {
        const [isFlipped, setIsFlipped] = useState(false);

        const handleClick = () => {
                setIsFlipped(!isFlipped);
        };

        return (
                <div onClick={handleClick} className={`rounded-lg shadow-md box-border inline-block justify-self-auto my-1 w-[20rem] h-[13rem] p-2 transform transition-all duration-500`}>
                        <div className="front z-1">
                                <img src={image[0]} alt="" className="w-full h-[7rem] rounded-lg" />
                                <div className="p-2">
                                        <h1 className="text-primary mb-2 text-1xl font-medium leading-tight">{name}</h1>
                                </div>
                        </div>
                        {isFlipped && (
                                <div className="back z-50 absolute">
                                        <div className="z-50">{desc}</div>
                                </div>
                        )}
                </div >
                
        );
};

export default DiseaseCard;