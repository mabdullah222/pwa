import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";


const LoginCard = () => {
        const [loginData, setLoginData] = useState({username:"",phone:""});
        const navigator=useNavigate()
        let handleData=(e)=>{
                setLoginData({...loginData,[e.target.name]:e.target.value})
        }

        // Creating function to check if the login data is valid or not. Check it against the correct login data.
        const checkLoginData = async () => {
                let response=await axios.post('http://localhost:8000/api/login',loginData)
                if (response.data.status==200){
                        console.log(response.data)
                        localStorage.setItem('user',response.data.data.username)
                        localStorage.setItem('crops',response.data.data.crops)
                        LoginSuccess();
                        navigator('/dashboard')
                }
                else{
                        LoginError();
                }
        };

        // Creating function to display toast message when login is successful.
        const LoginSuccess = () => {
                return toast.success("Login Successful");
        };

        // Creating function to display toast message when login is unsuccessful.
        const LoginError = () => {
                return toast.error("This account does not exists. Please try again.");
        };

        return (
                <div className="block bg-gray-100 rounded shadow-md w-4/5 px-5 py-3">
                        <h1 className="text-3xl my-5 text-lime-900">Login</h1>

                        <label htmlFor="phoneNumber" className="block text-lg mt-3 mb-1">
                                Username:
                        </label>

                        <input
                                type="text"
                                id="username"
                                name="username"
                                onChange={handleData}
                                placeholder="johndoe"
                                className="block border-b-4 rounded rounded-b-none border-lime-800 w-full p-2 my-2 "
                        />

                        <label htmlFor="phone" className="block text-lg mt-3 mb-1">
                                Phone Number:
                        </label>


                        <input
                                type="text"
                                id="phone"
                                name="phone"
                                onChange={handleData}
                                placeholder="0123-4567890"
                                className="block border-b-4 rounded rounded-b-none border-lime-800 w-full p-2 my-2 "
                        />
                        <button
                                onClick={checkLoginData}
                                className="block border rounded border-lime-100 bg-lime-800 text-white w-full p-2 my-2"
                        >
                                Login
                        </button>
                        <ToastContainer />

                </div>
        );
};

export default LoginCard;
