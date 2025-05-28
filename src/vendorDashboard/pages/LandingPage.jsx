// import React , {useState , useEffect, use} from 'react'
// import NavBar from '../components/NavBar'
// import SideBar from '../components/SideBar'
// import Login from '../components/forms/Login'
// import Register from '../components/forms/Register'
// import AddFirm from '../components/forms/AddFirm'
// import AddProduct from '../components/forms/AddProduct'
// import Welcome from '../components/Welcome'
// import AllProducts from '../components/AllProducts'

// const LandingPage = () => {
//   const [showLogin , setShowLogin] = useState(false)
//   const [showRegister , setShowRegister] = useState(false)
//   const [showFirm , setShowFirm] =useState(false)
//   const [showProduct ,setShowProduct] = useState(false)
//   const [showWelcome, setShowWelcome] = useState(false)
//   const [showAllProducts,setShowAllProducts]  = useState(false)
//   const [showLogOut,setShowLogOut] = useState(false)
//   const [showFirmTitle, setShowFirmTitle] = useState(true)

//   useEffect(()=>{
//     const loginToken = localStorage.getItem('loginToken');
//     if(loginToken){
//       setShowLogOut(true)

//     }

//   },[])

//   useEffect(()=>{
//     const firmName = localStorage.getItem("firmName")
//     if(firmName){
//       setShowFirmTitle(false)
//     }

//   },[])

  
  

//   // const logOutHandler = ()=>{
//   //   confirm("are you sure to logout?")
//   //   localStorage.removeItem("loginToken");
//   //   localStorage.removeItem("firmId");
//   //   localStorage.removeItem("firmName");
//   //   setShowLogOut(false)
//   //   setShowFirmTitle(true)
    
    
//   // }
//   const logOutHandler = () => {
//     // Show the confirm box and check the user's response
//     const isConfirmed = confirm("Are you sure you want to log out?");
    
//     // If user clicked "OK", proceed with logging out
//     if (isConfirmed) {
//       localStorage.removeItem("loginToken");
//       localStorage.removeItem("firmId");
//       localStorage.removeItem("firmName");
//       setShowLogOut(false);
//       setShowFirmTitle(true);
//     } else {
//       // Optionally, you can log that the user canceled the logout.
//       console.log("User canceled the logout.");
//     }
//   }
  


//   const showLoginHandler = ()=>{
//     setShowLogin(true)
//     setShowRegister(false)//both didnt open sametime
//     setShowFirm(false)
//     setShowProduct(false)
//     setShowWelcome(false)
//     setShowAllProducts(false)
//   }
  

//   const showRegisterHandler = ()=>{
//     setShowRegister(true)
//     setShowLogin(false)//both didnt open 
//     setShowFirm(false)
//     setShowProduct(false)
//     setShowWelcome(false)
//     setShowAllProducts(false)


//   }

//   const showFirmHandler = ()=>{

//     if(showLogOut){
//       setShowRegister(false)
//       setShowLogin(false)//both didnt open 
//       setShowFirm(true)
//       setShowProduct(false)
//       setShowWelcome(false)
//       setShowAllProducts(false)

//     }else{
      
//       alert("Please Login")
//       setShowLogin(true)
//       setShowRegister(false)
     
//     }
//   }

//   const showProductHandler = ()=>{
//     if(showLogOut){
//     setShowRegister(false)
//     setShowLogin(false)//both didnt open 
//     setShowFirm(false)
//     setShowProduct(true)
//     setShowWelcome(false)
//     setShowAllProducts(false)
//     }else{
//       alert("Please Login");
//       setShowLogin(true);
//       setShowRegister(false)
//     }


//   }

//   const showWelcomeHandler = () => {
//     setShowRegister(false);
//     setShowLogin(false); // Ensure Login form disappears
//     setShowFirm(false);
//     setShowProduct(false);
//     setShowWelcome(true);
//     setShowAllProducts(false)
//   }

//   const showAllProductsHandler = () => {
//     if(showLogOut){
//     setShowRegister(false);
//     setShowLogin(false); 
//     setShowFirm(false);
//     setShowProduct(false);
//     setShowWelcome(false);
//     setShowAllProducts(true);
  
//   }else{
//     alert("Please Login");
//     setShowLogin(true);
//     setShowRegister(false)
//   }  
// }



  
//   return (
//     <>
//     <section className='landingSection'>

//     <NavBar showLoginHandler={showLoginHandler} showRegisterHandler={showRegisterHandler}  showLogOut={ showLogOut} logOutHandler={logOutHandler}/>

//     <div className="collectionSection">
//             <div>
//             <SideBar showFirmHandler= {showFirmHandler} 
//                   showProductHandler={showProductHandler}
//                   showAllProductsHandler = {showAllProductsHandler} 
//                   showFirmTitle = {showFirmTitle}
//                   />
//             </div>
                  
     

//       {showLogin && <Login showWelcomeHandler={showWelcomeHandler}  />}
//       {showRegister && <Register showLoginHandler={showLoginHandler}/>}


//      {showFirm && showLogOut && <AddFirm/>}
//      {showProduct && showLogOut &&<AddProduct/>}
//      {showWelcome && <Welcome/>}
//      {showAllProducts && showLogOut &&<AllProducts />}
      
      
      


//       </div>
      

//     </section>
//     </>
//   )
// }

// export default LandingPage


import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Login from '../components/forms/Login';
import Register from '../components/forms/Register';
import AddFirm from '../components/forms/AddFirm';
import AddProduct from '../components/forms/AddProduct';
import Welcome from '../components/Welcome';
import AllProducts from '../components/AllProducts';

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showFirm, setShowFirm] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);
  const [showFirmTitle, setShowFirmTitle] = useState(true);

  useEffect(() => {
    const loginToken = localStorage.getItem('loginToken');
    if (loginToken) {
      setShowLogOut(true);
    }
  }, []);

  useEffect(() => {
    const firmName = localStorage.getItem("firmName");
    if (firmName) {
      setShowFirmTitle(false);
    }
  }, []);

  const logOutHandler = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Yes, log me out'
    });

    if (result.isConfirmed) {
      localStorage.removeItem("loginToken");
      localStorage.removeItem("firmId");
      localStorage.removeItem("firmName");
      setShowLogOut(false);
      setShowFirmTitle(true);
      Swal.fire('Logged Out', 'You have been logged out.', 'success');
    }
  };

  const showLoginHandler = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
  };

  const showRegisterHandler = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
  };

  const showFirmHandler = () => {
    if (showLogOut) {
      setShowRegister(false);
      setShowLogin(false);
      setShowFirm(true);
      setShowProduct(false);
      setShowWelcome(false);
      setShowAllProducts(false);
    } else {
      Swal.fire('Please Login', 'You need to login first.', 'info');
      setShowLogin(true);
      setShowRegister(false);
    }
  };

  const showProductHandler = () => {
    if (showLogOut) {
      setShowRegister(false);
      setShowLogin(false);
      setShowFirm(false);
      setShowProduct(true);
      setShowWelcome(false);
      setShowAllProducts(false);
    } else {
      Swal.fire('Please Login', 'You need to login first.', 'info');
      setShowLogin(true);
      setShowRegister(false);
    }
  };

  const showWelcomeHandler = () => {
    setShowRegister(false);
    setShowLogin(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(true);
    setShowAllProducts(false);
  };

  const showAllProductsHandler = () => {
    if (showLogOut) {
      setShowRegister(false);
      setShowLogin(false);
      setShowFirm(false);
      setShowProduct(false);
      setShowWelcome(false);
      setShowAllProducts(true);
    } else {
      Swal.fire('Please Login', 'You need to login first.', 'info');
      setShowLogin(true);
      setShowRegister(false);
    }
  };

  return (
    <section className='landingSection'>
      <NavBar
        showLoginHandler={showLoginHandler}
        showRegisterHandler={showRegisterHandler}
        showLogOut={showLogOut}
        logOutHandler={logOutHandler}
      />

      <div className="collectionSection">
        <div>
          <SideBar
            showFirmHandler={showFirmHandler}
            showProductHandler={showProductHandler}
            showAllProductsHandler={showAllProductsHandler}
            showFirmTitle={showFirmTitle}
          />
        </div>

        {showLogin && <Login showWelcomeHandler={showWelcomeHandler} />}
        {showRegister && <Register showLoginHandler={showLoginHandler} />}
        {showFirm && showLogOut && <AddFirm />}
        {showProduct && showLogOut && <AddProduct />}
        {showWelcome && <Welcome />}
        {showAllProducts && showLogOut && <AllProducts />}
      </div>
    </section> 
  );
};

export default LandingPage;
