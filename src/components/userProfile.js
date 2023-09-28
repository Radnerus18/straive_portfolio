import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark,faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
function UserProfile({onsetLogOut}) {
    const [isToggle, setIsToggle] = useState(false)
    const handleToggle = () => {
        setIsToggle(!isToggle)
    }
    const handleLogouts =()=>{
        sessionStorage.setItem('isLogged',false)
        onsetLogOut(false)
    }
    return (
        <React.Fragment>
            <div>
                <Button variant='outline-secondary' onClick={handleToggle}>{isToggle ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faBars} />}</Button>
            </div>
            {
                isToggle && <div className='card' style={{zIndex:9,position:'absolute',top:'40px',right:'0px',width:'350px'}}>
                    <p>Hello {sessionStorage.getItem('LoggedUser')}</p>
                    <Button variant='outline-warning'><FontAwesomeIcon icon={faRightFromBracket} onClick={handleLogouts}/> Log Out</Button>
                </div>
            }
        </React.Fragment>
    )
}

export default UserProfile