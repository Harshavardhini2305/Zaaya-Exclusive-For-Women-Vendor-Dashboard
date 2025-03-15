import React , {useState , useEffect, use} from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import Welcome from '../components/Welcome'
import AllProducts from '../components/AllProducts'

const LandingPage = () => {
  const [showLogin , setShowLogin] = useState(false)
  const [showRegister , setShowRegister] = useState(false)
  const [showFirm , setShowFirm] =useState(false)
  const [showProduct ,setShowProduct] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [showAllProducts,setShowAllProducts]  = useState(false)
  const [showLogOut,setShowLogOut] = useState(false)
  const [showFirmTitle, setShowFirmTitle] = useState(true)

  useEffect(()=>{
    const loginToken = localStorage.getItem('loginToken');
    if(loginToken){
      setShowLogOut(true)

    }

  },[])

  useEffect(()=>{
    const firmName = localStorage.getItem("firmName")
    if(firmName){
      setShowFirmTitle(false)
    }

  },[])

  
  

  const logOutHandler = ()=>{
    confirm("are you sure to logout?")
    localStorage.removeItem("loginToken");
    localStorage.removeItem("firmId");
    localStorage.removeItem("firmName");
    setShowLogOut(false)
    setShowFirmTitle(true)
    
    
  }


  const showLoginHandler = ()=>{
    setShowLogin(true)
    setShowRegister(false)//both didnt open sametime
    setShowFirm(false)
    setShowProduct(false)
    setShowWelcome(false)
    setShowAllProducts(false)
  }
  

  const showRegisterHandler = ()=>{
    setShowRegister(true)
    setShowLogin(false)//both didnt open 
    setShowFirm(false)
    setShowProduct(false)
    setShowWelcome(false)
    setShowAllProducts(false)


  }

  const showFirmHandler = ()=>{

    if(showLogOut){
      setShowRegister(false)
      setShowLogin(false)//both didnt open 
      setShowFirm(true)
      setShowProduct(false)
      setShowWelcome(false)
      setShowAllProducts(false)

    }else{
      
      alert("Please Login")
      setShowLogin(true)
     
    }
  }

  const showProductHandler = ()=>{
    if(showLogOut){
    setShowRegister(false)
    setShowLogin(false)//both didnt open 
    setShowFirm(false)
    setShowProduct(true)
    setShowWelcome(false)
    setShowAllProducts(false)
    }else{
      alert("Please Login");
      setShowLogin(true);
    }


  }

  const showWelcomeHandler = () => {
    setShowRegister(false);
    setShowLogin(false); // Ensure Login form disappears
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(true);
    setShowAllProducts(false)
  }

  const showAllProductsHandler = () => {
    if(showLogOut){
    setShowRegister(false);
    setShowLogin(false); 
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(true);
  
  }else{
    alert("Please Login");
    setShowLogin(true);
  }  
}

  
  return (
    <>
    <section className='landingSection'>

    <NavBar showLoginHandler={showLoginHandler} showRegisterHandler={showRegisterHandler}  showLogOut={ showLogOut} logOutHandler={logOutHandler}/>
    <div className="collectionSection">

      <SideBar showFirmHandler= {showFirmHandler} 
      showProductHandler={showProductHandler}
      showAllProductsHandler = {showAllProductsHandler} 
      showFirmTitle = {showFirmTitle}
      />


      {showLogin && <Login showWelcomeHandler={showWelcomeHandler}  />}
      {showRegister && <Register showLoginHandler={showLoginHandler}/>}


     {showFirm && showLogOut && <AddFirm/>}
     {showProduct && showLogOut &&<AddProduct/>}
     {showWelcome && <Welcome/>}
     {showAllProducts && showLogOut &&<AllProducts />}
      
      
      


      </div>
      

    </section>
    </>
  )
}

export default LandingPage