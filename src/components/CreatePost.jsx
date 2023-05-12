import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function CreatePost() {
    const navigate=useNavigate();
    let crops=[{"key":"Almond","value":"almond"},{"value":"apple","key":"Apple"},{value:"apricot",key:"Apricot"}]
    const [post,setPost]=useState({user:localStorage.getItem('user'),time:new Date().toLocaleString(),desc:"",image:[]})

    const handleFileChange = (event) => {
        setPost({...post,image:event.target.files});
    };

    let handleSubmit=async (e)=>
    {
        e.preventDefault();
        const formData = new FormData();
        for (let i = 0; i < post.image.length; i++) {
            formData.append("files", post.image[i]);
        }
        formData.append('desc',post.desc)
        formData.append('crop',document.getElementById('crop').value)
        formData.append('user',post.user)
        formData.append('time',post.time);
        let response=await axios.post("http://localhost:8000/Post/createPost", formData);
        if (response.data.status===200)
        {
            navigate('/community');
        }
        else
        {
            document.getElementById('error').click();
        }
    }


    let handleBack=(e)=>
    {
        navigate('/community');   
    }

  return (
    <>
    <div className='container'>
        <form>
            <div class="mb-3">
                <div class="mb-3">
                    <label htmlFor="crop" class="form-label">Select the Crop</label>
                    <select id="crop" class="form-select">
                        {crops.map(element=>
                        {
                            return <option value={element.value}>{element.key}</option>
                        })}
                        
                    </select>
                </div>
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Description Of the Problem</label>
                <textarea class="form-control" aria-label="With textarea" id="description" onChange={(e)=>{setPost({...post,desc:e.target.value})}}></textarea>
            </div>
            <div class="mb-3">
                <input type="file" name="files" multiple onChange={handleFileChange} />
            </div>

            <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
            <button type="button" class="btn btn-info" onClick={handleBack} id='askbtn'>Go Back</button>
    </div>

        <button type="button" class="btn btn-primary" id="error" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{visibility:"hidden"}}>
            Launch demo modal
        </button>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                Error Uploading the post! Try Again
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>
    </>
  )
}

export default CreatePost