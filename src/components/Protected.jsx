import React from 'react'
import { Navigate } from "react-router-dom";
function Protected({element}) {
    let user=localStorage.getItem('user')
    if (!user){
        return <Navigate to="/" replace />;
    }
    else{
        return (
            <>
                {element}
            </>
            )
    }
}

export default Protected