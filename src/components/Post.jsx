import axios from 'axios';
import React,{useRef, useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { setPost } from '../features/Posts';


function Post({desc,username,pics,answers,id,date,likes}) {
  let currentUser=localStorage.getItem('user')
    const dispatch=useDispatch()
    const inputRef=useRef(null);
    const [index, setIndex] = useState(0);
    const [answer,setAnswer]=useState(answers);

    // Modal Cotrols
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    let HandleTranslate=async ()=>
    {
        let targetText=document.getElementById('texttotranslate').innerText;
        const encodedParams = new URLSearchParams();
        encodedParams.set('q', targetText);
        encodedParams.set('target', 'ur');
        encodedParams.set('source', 'en');

        const options = {
        method: 'POST',
        url: 'https://google-translate1.p.rPostdPost.com/language/translate/v2',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/gzip',
            'X-RPostdPost-Key': '41c6083838msh9d1706979e455a1p126bfdjsn4e945483e243',
            'X-RPostdPost-Host': 'google-translate1.p.rPostdPost.com'
        },
        data: encodedParams,
        };

        try {
            const response = await axios.request(options);
            document.getElementById('texttotranslate').innerText=response.data.data.translations[0]['translatedText'];
        } catch (error) {
            console.error(error);
        }
    }

    let saveAns=async (e)=>{
        let value=inputRef.current.lastElementChild.value
        let response=await axios.post('http://localhost:8000/Post/addAns',{user:"Muhammad Abdullah",ans:value,id:id})
        if (response.data.status===200){
            setAnswer([...answer,{user:currentUser,ans:value}])
            inputRef.current.lastElementChild.value=""
        }
    }

    let deletePost=async ()=>{
      let response=await axios.post('http://localhost:8000/Post/deletePost',{id:id});
      if (response.data.status==200){
        let response=await axios.get('http://localhost:8000/Post/posts')
        dispatch(setPost(response.data))
      }
    }

  return (
    <div className='container' style={{margin:"7px 0 5px 0"}}>
        <div className="card" style={{width: "28rem",margin:"auto"}}>
        <Carousel activeIndex={index} onSelect={handleSelect}>
        {pics.map(element=>{
            return <Carousel.Item>
            <img
              className="d-block w-100"
              src={process.env.PUBLIC_URL+"/uploads/"+element}
              alt="Error Loading Image"
            />
          </Carousel.Item>
        })}
    </Carousel>
        <div className="card-body">
            <h5 className="card-title">{username}</h5>
            <p className="card-text" id="texttotranslate">{desc}</p>
            <p className="card-text" id="texttotranslate" style={{fontSize:"10px"}}>Posted At: {date}</p>
            <button type="button" class="btn btn-info mx-1" onClick={HandleTranslate}>Translate</button>
                <button type="button" class="btn btn-primary" onClick={handleShow}>
                    Answers<span class="badge bg-secondary mx-1">{answer.length}</span>
                </button>
                {
                  currentUser===username?<button type="button" class="btn btn-danger mx-1" onClick={deletePost}>Delete</button>:<></>
                }
            

        </div>
        </div>
        
        {/* Modal */}
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Answers</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{overflow:"scroll",height:"300px"}}>
        {answer.map(element=>{
            return <div class="card my-1">
            <div class="card-body">
            <h5>{element.user}</h5>
                <p class="card-text">{element.ans}.</p>
            </div>
            </div>
        })}
        </Modal.Body>
        <Modal.Footer>
        <InputGroup size="sm" className="mb-3" ref={inputRef}>
        <InputGroup.Text id="inputGroup-sizing-sm" >Post Answer</InputGroup.Text>
        <Form.Control
          aria-label="Answer"
          aria-describedby="inputGroup-sizing-sm"
        />
      </InputGroup>
          <Button variant="primary" onClick={saveAns} >
            Post
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Post