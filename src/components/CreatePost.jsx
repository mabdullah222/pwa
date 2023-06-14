import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function CreatePost() {
        const navigate = useNavigate();
        const [crops,setCrops]=useState([]);
        const [post, setPost] = useState({ user: localStorage.getItem('user'), time: new Date().toLocaleString(), desc: "", image: [] })

        let populate=async ()=>{
                let response=await axios.get('http://localhost:8000/medicine/list');
                console.log(response.data)
                let data=response.data.map(element=>{
                        return {key:element,value:element.toLowerCase()}
                })
                setCrops(data);
        }
        useEffect(()=>
        {
                populate();   
                console.log(crops);    
        },[])

        const handleFileChange = (event) => {
                setPost({ ...post, image: event.target.files });
        };

        let handleSubmit = async (e) => {
                e.preventDefault();
                const formData = new FormData();
                for (let i = 0; i < post.image.length; i++) {
                        formData.append("files", post.image[i]);
                }
                formData.append('desc', post.desc)
                formData.append('crop', document.getElementById('crop').value)
                formData.append('user', post.user)
                formData.append('time', post.time);
                let response = await axios.post("http://localhost:8000/Post/createPost", formData);
                if (response.data.status === 200) {
                        navigate('/community');
                }
                else {
                        document.getElementById('error').click();
                }
        }


        let handleBack = (e) => {
                navigate('/community');
        }

        return (
                <>
                        <div className='m-6 mt-10 laptop:m-20'>
                                <form>
                                        <div className="my-4">
                                                <div className="mb-3">
                                                        <label htmlFor="crop" className="form-label text-lg text-emerald-800">Select the Crop</label>
                                                        <select id="crop" className="form-select">
                                                                {crops.map(element => {
                                                                        return <option value={element.value}>{element.key}</option>
                                                                })}

                                                        </select>
                                                </div>
                                        </div>

                                        <div className="my-3">
                                                <label for="description" className="form-label text-lg text-emerald-800" >Description Of the Problem</label>
                                                <textarea className="form-control" aria-label="With textarea" id="description" onChange={(e) => { setPost({ ...post, desc: e.target.value }) }}></textarea>
                                        </div>

                                        <div className="my-3">
                                                <input type="file" name="files" multiple onChange={handleFileChange} />
                                        </div>

                                        <div className='flex justify-between w-full'>
                                                <button type="submit" className="btn bg-emerald-800 text-lg text-slate-200 hover:bg-emerald-600 hover:text-emerald-950" onClick={handleSubmit}>Submit</button>
                                                <button type="button" className="btn bg-slate-200 text-lg text-emerald-800 hover:bg-slate-300" onClick={handleBack} id='askbtn'>Go Back</button>
                                        </div>
                                </form>


                                
                        </div>

                        <button type="button" className="btn btn-primary" id="error" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ visibility: "hidden" }}>
                                Launch demo modal
                        </button>
                        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                        <div className="modal-content">
                                                <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                        Error Uploading the post! Try Again
                                                </div>
                                                <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </>
        )
}

export default CreatePost