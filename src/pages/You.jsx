import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { languages } from '../components/Signup'
import axios from 'axios'
const You = () => {

        const [data, setData] = useState({})
        let handleInput = (e) => {
                setData({ ...data, [e.target.name]: e.target.value })
                console.log(data)
        }

        let getUserData = async () => {
                let response = await axios.get(`http://localhost:8000/api/get/${localStorage.getItem('user')}`)
                setData(response.data)
                console.log(response.data)
        }

        // Axios here for his original data.
        useEffect(() => {
                getUserData()
        }, [])

        const navigate = useNavigate();

        const goBack = () => {
                navigate("/dashboard");
        }

        const submitData = async (e) => {
                e.preventDefault()
                await axios.post('http://localhost:8000/api/update', data);
                navigate('/dashboard')
        }

        return (
                <div className='main w-full h-full flex flex-col justify-center items-center p-2 laptop:m-4'>
                        <button onClick={() => goBack()}
                                className='absolute top-3 right-2 w-[4rem] bg-slate-200 p-2 rounded-lg hover:bg-slate-300 transition duration-300 ease-in-out'>Back</button>
                        <form
                                className='box flex flex-col w-5/6 mt-4 laptop:w-3/4 laptop:h-[40%] p-3 bg-emerald-700 gap-4 rounded-lg shadow-[-15px_15px_0_0px] shadow-slate-200'>
                                <div
                                        className='flex flex-col rounded-lg bg-white p-4 justify-between shadow-md box-border gap-2 transition duration-100 hover:translate-x-1 hover:-translate-y-1'>
                                        <label htmlFor="">Name</label>
                                        <input onChange={handleInput} type="text" value={data.name} placeholder='Enter name' name="name" className='border border-slate-400 rounded-lg p-2 transition duration-100 hover:translate-x-1 hover:-translate-y-1' />
                                </div>
                                <div
                                        className='flex flex-col rounded-lg bg-white p-4 justify-between shadow-md box-border gap-2 transition duration-100 hover:translate-x-1 hover:-translate-y-1'>
                                        <label htmlFor="">Username</label>
                                        <input onChange={handleInput} type="text" name='username' value={data.username} placeholder='Enter username' className='border border-slate-400 rounded-lg p-2' />
                                </div>
                                <div
                                        className='flex flex-col rounded-lg bg-white p-4 justify-between shadow-md box-border gap-2 transition duration-100 hover:translate-x-1 hover:-translate-y-1'>
                                        <label htmlFor="">Phone</label>
                                        <input onChange={handleInput} type="text" value={data.phone} name='phone' placeholder='Enter phone number' className='border border-slate-400 rounded-lg p-2' />
                                </div>
                                <div
                                        className='flex flex-col rounded-lg bg-white p-4 justify-between shadow-md box-border gap-2 transition duration-100 hover:translate-x-1 hover:-translate-y-1'>
                                        <h1>Language</h1>
                                        <select class="form-control" id="language" name='language' value={data.language} onChange={handleInput}>
                                                {
                                                        languages.map(element => {
                                                                return <option value={element.code}>{element.name}</option>
                                                        })
                                                }
                                        </select>
                                </div>
                                <div
                                        className='flex flex-col rounded-lg bg-white p-4 justify-between shadow-md box-border gap-2 transition duration-100 hover:translate-x-1 hover:-translate-y-1'>
                                        <label htmlFor="">New Password</label>
                                        <input onChange={handleInput} type="password" name='password' className='border border-slate-400 rounded-lg p-2' />
                                </div>
                                <button onClick={submitData}
                                        className='w-[6rem] bg-green-300 p-2 rounded-lg hover:bg-emerald-800 hover:text-white transition duration-300 ease-in-out'>Change</button>
                        </form>
                </div>
        )
}

export default You
