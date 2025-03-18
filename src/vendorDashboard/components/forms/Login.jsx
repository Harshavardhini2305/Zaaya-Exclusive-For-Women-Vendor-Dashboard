

import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';

const Login = ({showWelcomeHandler}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New state

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
    console.log("Password visibility toggled: ", !showPassword);
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
        alert("Please enter both email and password.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/vendor/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Login success');
            setEmail("");
            setPassword("");

            localStorage.setItem('loginToken', data.token);
            showWelcomeHandler();
        
        }

        const  vendorId = data.vendorId
        console.log( "cheking forvendor id",vendorId)

        const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`) 
        const vendorData = await vendorResponse.json();

        if(vendorResponse.ok){
          const vendorFirmId = vendorData.vendorFirmId;
          localStorage.setItem('firmId',vendorFirmId);

          console.log("checking for firm id",vendorFirmId);
          const vendorFirmName = vendorData.vendor.firm[0].firmName;
          console.log("cheeckingfor firm name",vendorFirmName);

          localStorage.setItem('firmName',vendorFirmName);
          
          

        }
        setTimeout(() => {
          window.location.reload();
        }, 3000);

    } catch (error) {
        console.error("Error during login:", error);
        alert("Something went wrong. Please try again.");
    }
  }
  return (
    <div className="loginSection">
      <form className="authForm" onSubmit={loginHandler}>
        <h3>Vendor Login</h3>
        <label>Email</label>
        <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
        <br />
      
        <div className="password-container">
          <label>Password</label>
  <input 
    type={showPassword ? "text" : "password"}  
    name="password" 
    value={password} 
    onChange={(e) => setPassword(e.target.value)} 
    placeholder="Enter your password"
   
  />
  <button 
    type="button" 
    onClick={togglePasswordVisibility}  
    className="password-btn"
  >
    {showPassword ? "🙈 Hide" : "👁 Show"}
  </button>
</div>


        
        <div className="button">
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
























