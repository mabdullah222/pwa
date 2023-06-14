import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Fertilizer from './pages/fertilizer';
import PlantState from './context/plant/plantState';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css"
import OpenAll from './pages/openAll';
import Community from './components/Community'
import CreatePost from './components/CreatePost';
import Protected from "./components/Protected"
import Diseases from './components/Diseases';
import Signup from './components/Signup';
import You from './pages/You';
// Making a dashboard route using react-router-dom

function App() {

return (
        <div className="App">
                <PlantState>
                        <Router>
                                <Navbar />
                                <Routes>
                                        <Route path='community' element={<Protected element={<Community/>}/>}/>
                                        <Route path='postForm' element={<Protected element={<CreatePost/>}/>}></Route>
                                        <Route exact path="/" element={<Login />} />
                                        <Route exact path="/signup" element={<Signup />} />
                                        <Route exact path="/dashboard" element={<Protected element={<Dashboard />}></Protected>} />
                                        <Route exact path="/fertilizer/:crop" element={<Protected element={<Fertilizer></Fertilizer>} />} />
                                        <Route exact path="/pesticide/:crop" element={<Protected element={<Diseases></Diseases>} />} />
                                        <Route exact path="/openAll" element={<Protected element={<OpenAll></OpenAll>} />} />
                                        <Route exact path="/You" element={<Protected element={<You></You>}></Protected>}></Route>
                                        <Route path="/*" element={<h1>404 Page Not Found</h1>}></Route>
                                </Routes>
                        </Router>
                </PlantState>
                <ToastContainer />
        </div>
        );
}

export default App;