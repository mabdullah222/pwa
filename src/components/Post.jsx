import axios from 'axios';
import React, { useRef, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { setPost } from '../features/Posts';


function Post({ desc, username, pics, answers, id, date, likes }) {
        let currentUser = localStorage.getItem('user')
        const dispatch = useDispatch()
        const inputRef = useRef(null);
        const [index, setIndex] = useState(0);
        const [answer, setAnswer] = useState(answers);

        // Modal Cotrols
        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        const handleSelect = (selectedIndex, e) => {
                setIndex(selectedIndex);
        };

        let HandleTranslate = async () => {
                let targetText = document.getElementById('texttotranslate').innerText;
                const encodedParams = new URLSearchParams();
                encodedParams.set('q', targetText);
                encodedParams.set('target', 'ur');
                encodedParams.set('source', 'en');

                const options = {
                method: 'POST',
                url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
                headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept-Encoding': 'application/gzip',
                'X-RapidAPI-Key': 'c181345e6fmsh1ec154311ffb96ep1d8886jsnb46e2ffb475b',
                'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
                },
                data: encodedParams,
                };

                try {
                        const response = await axios.request(options);
                        document.getElementById('texttotranslate').innerText=response.data.data.translations[0]['translatedText']
                } catch (error) {
                        console.error(error);
                }
}


        let saveAns = async (e) => {
                let value = inputRef.current.lastElementChild.value
                let response = await axios.post('http://localhost:8000/Post/addAns', { user:localStorage.getItem('user'), ans: value, id: id })
                if (response.data.status === 200) {
                        setAnswer([...answer, { user: currentUser, ans: value }])
                        inputRef.current.lastElementChild.value = ""
                }
        }

        let deletePost = async () => {
                let response = await axios.post('http://localhost:8000/Post/deletePost', { id: id });
                if (response.data.status == 200) {
                        let response = await axios.get('http://localhost:8000/Post/posts')
                        dispatch(setPost(response.data))
                }
        }

        return (
                <div className='m-3 '>
                        <div className="card w-11/12 m-auto laptop:w-1/2 border-0">
                                <Carousel className='rounded-t-md border border-b-0' activeIndex={index} onSelect={handleSelect}>
                                        {pics.map(element => {
                                                return <Carousel.Item>
                                                        <img
                                                                className="d-block w-100 h-64 laptop:h-[30rem]"
                                                                src={process.env.PUBLIC_URL + "/uploads/" + element}
                                                                alt="Error Loading Image"
                                                        />
                                                </Carousel.Item>
                                        })}
                                </Carousel>
                                <div className="card-body rounded-b-md bg-slate-200">
                                        <div className='p-3 pb-2'>
                                                <h5 className="card-title italic text">{username}</h5>
                                                <p className="card-text text-lg" id="texttotranslate">{desc}</p>
                                                <p className="card-text text-xs mb-2" id="texttotranslate">Posted At: {date}</p>
                                        </div>
                                        <div className='pb-2 px-2 flex justify-between'>
                                                <div>
                                                        <button type="button" class=" btn bg-sky-500 text-white mx-1" onClick={HandleTranslate}>Translate</button>
                                                        <button type="button" class="btn bg-emerald-600 text-white" onClick={handleShow}>
                                                                Answers<span class="badge bg-secondary mx-1">{answer.length}</span>
                                                        </button>
                                                </div>
                                                <div>
                                                        {
                                                                currentUser === username ? <button type="button" class="btn bg-red-700 text-white mx-2" onClick={deletePost}>&#10005;</button> : <></>
                                                        }
                                                </div>
                                        </div>

                                </div>
                        </div>

                        {/* Modal */}
                        <Modal className='my-28' show={show} onHide={handleClose}>
                                <Modal.Header className='bg-emerald-800' closeButton>
                                        <Modal.Title className='text-slate-200'>Answers</Modal.Title>
                                </Modal.Header>
                                <Modal.Body className='h-80 overflow-x-hidden overflow-y-auto '>
                                        {answer.map(element => {
                                                return <div class="card my-1">
                                                        <div class="card-body">
                                                                <h5 className='italic'>{element.user}</h5>
                                                                <p class="card-text ml-2">{element.ans}</p>
                                                        </div>
                                                </div>
                                        })}
                                </Modal.Body>
                                <Modal.Footer className='bg-slate-100'>
                                        <InputGroup size="sm" className="mb-3" ref={inputRef}>
                                                <InputGroup.Text id="inputGroup-sizing-sm" >Post Answer</InputGroup.Text>
                                                <Form.Control
                                                        aria-label="Answer"
                                                        aria-describedby="inputGroup-sizing-sm"
                                                />
                                        </InputGroup>
                                        <Button className='btn bg-emerald-900 text-white ' variant="" onClick={saveAns} >
                                                Post
                                        </Button>
                                </Modal.Footer>
                        </Modal>
                </div>
        )
}

export default Post