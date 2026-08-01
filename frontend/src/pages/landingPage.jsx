import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom'

export default function landingPage() {
  return (
    <div className='landingPageContainer'>
      <nav>
        <div className='navHeader' > 
          <h2>Video Call</h2>
        </div>
        <div className='navlist'>
          <p>Join as Guest</p>
          <p>Register</p>
          <div roll = "button">
            <p>Login</p>
          </div>
        </div>
      </nav>


     <div className='landingMainContainer'>
      <div>
        <h1><span style = {{color:"#ff9839"}}>Connect</span> with your Loved Ones</h1>
        <p>Cover a distance by Video Call</p>

        <div role = 'button' className='start-button'>
          <Link to={"/auth"}> Get Started</Link>
        </div>

      </div>
      <div>
         <img src = "/mobile.png" alt ="mobile image"/>
      </div>
     </div>


    </div>
    
  )
}