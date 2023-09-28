import React, { useEffect, useState } from 'react'
import App from '../App';
function LoginForm({ provideAccess }) {
    const database = [
        {
            username: "user1",
            password: "pass1"
        },
        {
            username: "user2",
            password: "pass2"
        }
    ];

    const errors = {
        uname: "invalid username",
        pass: "invalid password"
    };
    const [isSubmitted, setIsSubmitted] = useState(false)   
    const [errorMessage, setErrorMessage] = useState({})
    

    const handleSubmit = (event) => {
        var { uname, pass } = document.forms[0]
        const userData = database.find(user => user.username === uname.value)
        if (userData) {
            sessionStorage.setItem('LoggedUser',uname.value)
            if (userData.password !== pass.value) {
                setErrorMessage({ name: "pass", message: errors.pass })
                sessionStorage.setItem('isLogged', false)
                provideAccess(false)
            } else {
                setIsSubmitted(true)
                sessionStorage.setItem('isLogged', true)
                provideAccess(true)
            }
        } else {
            setErrorMessage({ name: "uname", message: errors.uname })
            sessionStorage.setItem('isLogged', false)
            provideAccess(false)
        }
    }

    const renderErrorMessage = (name) => name === errorMessage.name && (
        <div>{errorMessage.message}</div>
    )
    const renderForm = (
        <div className='loginFormWrap d-flex flex-column'>
            <form className='loginForm' onSubmit={handleSubmit}>
                <div className='uname'>
                    <label for='uname'>UserName</label>
                    <input className='form-group' type='text' name='uname' />
                    {renderErrorMessage('uname')}
                </div>
                <div className='pass'>
                    <label for='pass'>Password</label>
                    <input className='form-group' type='password' name='pass' />
                    {renderErrorMessage('pass')}
                </div>
                <button className='loginsubmitBtn btn btn-warning' type='submit'>Login</button>
            </form>
        </div>
    )
    return (
        <React.Fragment>
            <div>
                {isSubmitted ? <App></App> : renderForm}
            </div>
        </React.Fragment>
    )
}

export default LoginForm