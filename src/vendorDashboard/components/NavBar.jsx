import React from 'react'

const NavBar = ({ showLoginHandler, showRegisterHandler,showLogOut,logOutHandler}) => {
  const firmName = localStorage.getItem('firmName')
  return (
    <div className="navSection">

      <div className='logocontainer'>
      <div className='logo'><label >SH</label></div>
      <div className="company">Seller Hub</div>
      
      </div>
      <div className="firmName">
        <h4>Trade Name: {firmName}</h4>
      </div>

      <div className="userAuth">
        {!showLogOut?<>
        <div className='btn-container'>
          <button onClick={showLoginHandler} className='btn-nav'>Login</button>
          <button onClick={showRegisterHandler} className='btn-nav'>Register</button>
          </div>

        </> :     <span onClick={logOutHandler} className='btn-nav'>Logout</span>  }
        


       
        
        
      </div>
    </div>
  );
};

export default NavBar;