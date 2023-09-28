import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Sidenav from './components/sidebar';
import PortFoliocards from './components/portfolio';
import LoginForm from './components/loginForm';
import UserProfile from './components/userProfile';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
function App() {
  const [selectedData, setSelectedData] = useState('*')
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('isLogged') === 'true') {
      setIsLogged(true)
    } else {
      setIsLogged(false)
    }
  },[isLogged])
  const handleLogOut = ()=>{
    sessionStorage.setItem('isLogged',false)
    setIsLogged(false)
  }
  const mainApp = (
    <div className="App d-flex flex-row justify-between gap-3">
      <div style={{ position: 'fixed' }}>
        <Sidenav filterData={setSelectedData}></Sidenav>
      </div>
      <div className='d-flex flex-row' style={{position:'absolute',right:'0px'}}>
        <UserProfile onsetLogOut = {setIsLogged}></UserProfile>
        <Button variant='outline-warning' onClick={handleLogOut}><FontAwesomeIcon icon={faRightFromBracket}/> Log Out</Button>
      </div>
      <div style={{ position: 'absolute', left: '215px',top:'30px' }}>
        <PortFoliocards displayContent={selectedData}></PortFoliocards>
      </div>
    </div>
  )
  return (
    <React.Fragment>
      {
        isLogged ? mainApp : <LoginForm provideAccess={setIsLogged} />
      }
    </React.Fragment>
  );
}

export default App;
