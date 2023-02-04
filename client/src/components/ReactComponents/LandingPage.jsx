
import React from 'react';
import { useNavigate } from "react-router-dom";

function LandingPage(props) {
    const navigate = useNavigate()

    function startGame (){
navigate('/game')
    }

    function returnToLogin(){
        navigate('/login')
    }
    return (
        <div className='babble-island'>
            <h1>Welcome {props.user.nickName} </h1>

            <div class ='menu-items' >
                <div class = 'menu-button' onClick={startGame}>
                    <h2>Start</h2>
                </div>
                <div class = 'menu-button' onClick={returnToLogin}>
                    <h2>Exit</h2>
                </div>


            </div>

        </div>
    );
}

export default LandingPage;