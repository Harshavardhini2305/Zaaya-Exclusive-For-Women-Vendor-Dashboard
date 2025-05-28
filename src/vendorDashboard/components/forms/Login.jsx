

import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';
import Swal from 'sweetalert2';

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
Swal.fire('Error', 'Please enter both email and password.', 'warning');        return;
    }
    
    // if (!validateEmail(email)) {
    //   Swal.fire('Invalid Email', 'Please enter a valid email address.', 'warning');
    //   return;
    // }

    try {
        const response = await fetch(`${API_URL}/vendor/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        // if (response.ok) {
        //     Swal.fire('Success', 'Login successful!', 'success');            setEmail("");
        //     setPassword("");

        //     localStorage.setItem('loginToken', data.token);
        //     showWelcomeHandler();
        
        // }

        if (!response.ok) {
      // This handles wrong credentials
      Swal.fire('Login Failed', data.error || 'Invalid email or password.', 'error');
      return;
    }

    // ✅ Login success
    Swal.fire('Success', 'Login successful!', 'success');
    setEmail("");
    setPassword("");

      localStorage.setItem('loginToken', data.token);
    showWelcomeHandler();

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
      Swal.fire('Error', 'Something went wrong. Please try again.', 'error');
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



// import React, { useState } from 'react';
// import { API_URL } from '../../data/apiPath';
// import Swal from 'sweetalert2';

// const Login = ({ showWelcomeHandler }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const togglePasswordVisibility = () => {
//     setShowPassword((prev) => !prev);
//     console.log("Password visibility toggled:", !showPassword);
//   };

//   const validateEmail = (email) => {
//     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   };

//   const loginHandler = async (e) => {
//     e.preventDefault();

//     if (!email.trim() || !password.trim()) {
//       Swal.fire('Error', 'Please enter both email and password.', 'warning');
//       return;
//     }

//     if (!validateEmail(email)) {
//       Swal.fire('Invalid Email', 'Please enter a valid email address.', 'warning');
//       return;
//     }

//     try {
//       const response = await fetch(`${API_URL}/vendor/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password })
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         Swal.fire('Login Failed', data.message || 'Invalid email or password. Please try again.', 'error');
//         return;
//       }

//       Swal.fire('Success', 'Login successful!', 'success');

//       setEmail("");
//       setPassword("");

//       localStorage.setItem('loginToken', data.token);

//       const vendorId = data.vendorId;
//       console.log("Checking vendor ID:", vendorId);

//       const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`);
//       const vendorData = await vendorResponse.json();

//       if (vendorResponse.ok) {
//         const vendorFirmId = vendorData.vendorFirmId;
//         localStorage.setItem('firmId', vendorFirmId);
//         console.log("Firm ID:", vendorFirmId);

//         const vendorFirmName = vendorData.vendor.firm?.[0]?.firmName || '';
//         localStorage.setItem('firmName', vendorFirmName);
//         console.log("Firm Name:", vendorFirmName);

//         showWelcomeHandler();

//         setTimeout(() => {
//           window.location.reload();
//         }, 3000);
//       } else {
//         Swal.fire('Error', 'Failed to fetch vendor details.', 'error');
//       }

//     } catch (error) {
//       console.error("Error during login:", error);
//       Swal.fire('Error', 'Something went wrong. Please try again.', 'error');
//     }
//   };

//   return (
//     <div className="loginSection">
//       <form className="authForm" onSubmit={loginHandler}>
//         <h3>Vendor Login</h3>

//         <label>Email</label>
//         <input
//           type="text"
//           name="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Enter your email"
//         />

//         <div className="password-container">
//           <label>Password</label>
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter your password"
//           />
//           <button
//             type="button"
//             onClick={togglePasswordVisibility}
//             className="password-btn"
//           >
//             {showPassword ? "🙈 Hide" : "👁 Show"}
//           </button>
//         </div>

//         <div className="button">
//           <button type="submit">Submit</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;













