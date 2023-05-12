import React,{useEffect, useState} from 'react'
import Post from './Post'
import { useNavigate } from 'react-router-dom';
import CreatePost from './CreatePost';  
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { setPost } from '../features/Posts';

function Community() {
  const dispatch=useDispatch()
    const navigate=useNavigate();
    const posts=useSelector(state=>state.Post.value)
    let handleForm=(e)=>
    {
        navigate('/postForm')
    }


    let getPosts=async()=>
    {
      let response=await axios.get('http://localhost:8000/Post/posts');
      console.log(response)
      dispatch(setPost(response.data));
    }

    useEffect(()=>{
      getPosts();
    },[])



  return (
    <div className='container'>
        {posts.map(element=>{
          return <Post key={element._id} desc={element.desc} username={element.user} pics={element.image} answers={element.answer} cropname={element.crop} date={element.time} likes={element.Likes} id={element._id}></Post>
        })}
        <button type="button" class="btn btn-info" onClick={handleForm} id='askbtn'>Ask Community</button>
    </div>

  )
}

export default Community