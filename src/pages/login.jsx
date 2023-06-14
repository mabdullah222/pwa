import React from 'react'
import LoginCard from '../components/LoginCard.jsx'

const Login = () => {
    return (
        <div class="h-11/12 flex justify-center items-center flex-wrap box-border">
                <div>
                        <img className='laptop:hidden block h-36 w-36 mt-2 mb-4'  src={process.env.PUBLIC_URL+`/images/logo2better.png`} alt="" />
                </div>
                <LoginCard />
        </div>
    )
}

export default Login