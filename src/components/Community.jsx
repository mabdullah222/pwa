import React, { useEffect, useState } from 'react'
import Post from './Post'
import { useNavigate } from 'react-router-dom';
import CreatePost from './CreatePost';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setPost } from '../features/Posts';

function Community() {
        const dispatch = useDispatch()
        const navigate = useNavigate();
        const posts = useSelector(state => state.Post.value)
        let handleForm = (e) => {
                navigate('/postForm')
        }


        let getPosts = async () => {
                let response = await axios.get('http://localhost:8000/Post/posts');
                console.log(response)
                dispatch(setPost(response.data));
        }

        useEffect(() => {
                getPosts();
        }, [])



        return (
                <div className=''>
                        {posts.map(element => {
                                return <Post 
                                className=""
                                key={element._id} desc={element.desc} username={element.user} 
                                pics={element.image} answers={element.answer} cropname={element.crop} 
                                date={element.time} likes={element.Likes} id={element._id}
                                >
                                </Post>
                        })}
                        <button type="button" className="hidden laptop:block btn bg-emerald-800 text-slate-200 hover:bg-emerald-600 bottom-4 right-4 fixed h-16 w-36" onClick={handleForm} id='askbtn'>Ask Community</button>
                            <button type="button" className="laptop:hidden btn bg-emerald-700 text-slate-200 bottom-6 right-2 h-14 w-14 rounded-3xl fixed p-1 active:bg-emerald-400" onClick={handleForm} id='askbtn'>
                                <img src={process.env.PUBLIC_URL+`/images/plus.png`} alt="newpost" className='h-5/6-full bg text-' />
                            </button>
                            {/* <button type="button" className="laptop:hidden btn bg-emerald-700 text-slate-200 bottom-6 right-2 h-14 w-14 rounded-3xl fixed p-1 active:bg-emerald-400" onClick={handleForm} id='askbtn'>
                                <img src={process.env.PUBLIC_URL+`/images/plus.png`} alt="newpost" className='h-5/6-full bg text-' />
                            </button> */}
                </div>

        )
}

export default Community