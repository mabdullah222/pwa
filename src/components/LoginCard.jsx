import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";


const LoginCard = () => {
        const [loginData, setLoginData] = useState({username:"",password:""});
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
                        localStorage.setItem('crops',JSON.stringify(response.data.data.crops))
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
                <div className="laptop:mt-10 w-4/5 p-3 border rounded shadow-[-10px_10px_0_0px] laptop:shadow-[-15px_15px_0_0px]  shadow-emerald-500 laptop:shadow-emerald-500 transition duration-100 hover:shadow-[-25px_25px_0_0px] hover:shadow-emerald-500">
                        <div className= "flex laptop:block laptop:mb-4 w-1/4 h-1/4">
                                <img 
                                        src={process.env.PUBLIC_URL+`/images/logo2better.png`} 
                                        className="w-full m-auto h-full inline-block laptop:w-1/4 laptop:hidden"
                                        alt="logo" />
                                <div
                                        className="text-4xl text-emerald-600 font-bold m-3 p-3 inline-block"
                                >
                                        Kashtkaar
                                </div>
                        </div>
                        <div className="block w-full laptop:flex laptop:justify-between ">
                                <div className="block bg-gray-100 rounded w-full p-3 laptop:px-5">
                                        <h1 className="text-3xl my-5 text-emerald-600">Login</h1>

                                        <label htmlFor="phoneNumber" className="block text-lg mt-3 mb-1">
                                                Username:
                                        </label>

                                        <input
                                                type="text"
                                                id="username"
                                                name="username"
                                                onChange={handleData}
                                                placeholder="johndoe"
                                                className="block border-b-4 rounded rounded-b-none border-emerald-800 w-full p-2 my-2 "
                                        />

                                        <label htmlFor="phone" className="block text-lg mt-3 mb-1">
                                                Password:
                                        </label>


                                        <input
                                                type="password"
                                                id="phone"
                                                name="password"
                                                onChange={handleData}
                                                placeholder=""
                                                className="block border-b-4 rounded rounded-b-none border-emerald-800 w-full p-2 my-2"
                                        />
                                        <button
                                                onClick={checkLoginData}
                                                className="block border rounded border-emerald-100 bg-emerald-600 text-white w-full p-3 my-4 mb-2 transition duration-200 hover:bg-emerald-900"
                                        >
                                                Login
                                        </button>
                                        <div className="w-full text-center m-0">
                                                <p className="text-lg text-emerald-900">Or</p>
                                        </div>
                                        <Link
                                                to="/Signup"
                                                className="block border rounded border-emerald-100 bg-emerald-600 text-white w-full p-3 my-4 mt-2 transition duration-200 hover:bg-emerald-900 text-center"
                                        >
                                                Sign Up!
                                        </Link>
                                        
                                        <ToastContainer />
                                </div>
                                <div className=" rounded-r-md border-slate-100" >
                                        {/* <img src="https://nypost.com/wp-content/uploads/sites/2/2019/05/crop-farmer.jpg?quality=75&strip=all" alt="farmerimg" */}
                                        <img src={process.env.PUBLIC_URL+`/images/farmer.jpg`} alt="farmerimg"
                                        className="w-full h-full rounded-r object-fill hidden laptop:inline-block" />
                                </div>
                        </div>
                </div>
        );
};

export default LoginCard;
