import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';




const DiseaseCard = ({ name, image, desc }) => {
        const [isFlipped, setIsFlipped] = useState(false);

        const handleClick = () => {
                setIsFlipped(!isFlipped);
                console.log("flipping")
                console.log(isFlipped)
        };

        return (
                <div onClick={() => handleClick()} className={`rounded-lg shadow-md box-border bg-slate-200 laptop:bg-slate-100 hover:bg-slate-200 hover:scale-x-110 hover:scale-y-110 inline-block justify-self-auto my-3 w-[20rem] h-[13rem] p-2 transform transition-all duration-500`}>
                        <div className="front z-1">
                                <img src={image[0]} alt="" className="w-full h-[7rem] rounded-lg" />
                                <div className="p-2">
                                        <h1 className="text-emerald-800 font-semibold my-2 text-1xl  leading-tight">{name}</h1>
                                </div>
                        </div>

                {isFlipped ? 
                        <div>
                        <Modal className='my-8 mt-20    ' show={isFlipped} onClick={handleClick}>

                                <Modal.Header className='bg-emerald-800' closeButton>
                                        <Modal.Title className='text-slate-200 '>{name}</Modal.Title>
                                </Modal.Header>

                                <Modal.Body className='h-[30rem] overflow-x-hidden overflow-y-auto '>
                                        <img className=" rounded h-40 w-11/12 mx-auto" src={image[0]} alt="diseaseimage" />
                                        <p className="mx-4 p-1 mt-4 mb-3 text-xl text-lime-900">{name}</p>
                                        <p  className="mx-3 p-2 pt-0 ">{desc}</p>
                                </Modal.Body>
                        </Modal>
                        </div>
                        : null
                        }  
                       
                </div >
                
        );
};

export default DiseaseCard;