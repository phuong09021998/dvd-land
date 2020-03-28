import React, { useState } from 'react'
import Login from './Login'
import Register from './Register'

const LoginRegister = (props) => {

    const [toggleBox, setToggleBox] = useState(false)


    const handleLoginClick = () => setToggleBox(false)
    const handleRegisterClick = () => setToggleBox(true)



    return (
        <div className="login_register_wrapp">
            <h1 className="login_title">My Account</h1>
            <div className="login_register">
                <div className="title_wrapp">
                    <span 
                        className="login_subtitle" 
                        id={toggleBox ? '' : 'login_active'}
                        onClick={handleLoginClick}
                    >Login</span>
                    <span 
                        className="login_subtitle"
                        id={toggleBox ? 'login_active' : ''}
                        onClick={handleRegisterClick}
                    >Register</span>
                </div>

                <div className="login_box_wrapp">
                   
                    {toggleBox ?
                        <Register />
                    : <Login {...props} />}
                </div>
                
            </div>
        </div>
    )
}

export default LoginRegister