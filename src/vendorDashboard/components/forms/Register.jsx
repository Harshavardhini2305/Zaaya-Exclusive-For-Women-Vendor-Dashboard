// import React, { useState } from 'react';
// import Swal from 'sweetalert2';
// import {API_URL} from '../../data/apiPath';

// const Register = ({showLoginHandler}) => {

//   const [username , setUsername] = useState("");
//   const [ email , setEmail] = useState("");
//   const [password,setpassword] = useState("");
//   const [error,setError] = useState("");
//   const [loading,setLoading] = useState(true);

//   //function to call api
//   const handleSubmit = async(e)=>{
//     e.preventDefault();//page doesnt refresh


//     if (!username.trim() || !email.trim() || !password.trim()) {
//       Swal.fire('Missing Fields', 'Please fill in all fields.', 'warning');
//       return;
//     }

//     setLoading(true);


//     try {
//       const response = await fetch(`${API_URL}/vendor/register`,{
//         method:'POST',
//         headers:{
//           'Content-Type':'application/json'
//         },
//         body:JSON.stringify({username,email,password})
//       })

//       const data = await response.json();
//       if(response.ok){
//         console.log(data);
//         //after form submssion it will getempty
//         setUsername("");
//         setEmail("");
//         setpassword("");
//         Swal.fire('Success', 'Vendor registered successfully!', 'success');
//         showLoginHandler()
        
//       }
//       else{
//         setError(data.error)
//       }

//     } catch (error) {
//       console.error("registration failed",error);
//       Swal.fire('Error', 'Something went wrong. Please try again.', 'error');

      
//     }
//   }


//   return (
//     <div className="registerSection">
//         <form className="authForm" onSubmit={handleSubmit}>

//             <h3>Vendor Register</h3>

//             <label>Username</label>
//             <input type="text" name="username" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="enter your username"/>

//             <label>Email</label>
//             <input type="text" name="email" value={email}onChange={(e)=>setEmail(e.target.value)} placeholder="enter your email"/>
             
//             <label >Password</label>
//             <input type="password" name="password" value={password} onChange={(e)=>setpassword(e.target.value)}placeholder="enter your password"/>
            
//             <div className="btnSubmit">
//                 <button type='submit'>Submit</button>
//             </div>
//         </form>
//     </div>
//   )
// }

// export default Register


// import React, { useState } from 'react';
// import Swal from 'sweetalert2';
// import { API_URL } from '../../data/apiPath';

// const Register = ({ showLoginHandler }) => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setpassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (!username.trim() || !email.trim() || !password.trim()) {
//       Swal.fire('Missing Fields', 'Please fill in all fields.', 'warning');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch(`${API_URL}/vendor/register`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ username, email, password })
//       });

//       const data = await response.json();
//       setLoading(false);

//       if (response.ok) {
//         Swal.fire('Success', 'Vendor registered successfully!', 'success');
//         setUsername("");
//         setEmail("");
//         setpassword("");
//         showLoginHandler();
//       } else {
//         setError(data.error || "Registration failed.");
//         Swal.fire('Error', data.error || 'Registration failed. Please try again.', 'error');
//       }

//     } catch (error) {
//       console.error("Registration failed", error);
//       setLoading(false);
//       Swal.fire('Error', 'Something went wrong. Please try again.', 'error');
//     }
//   };

//   return (
//     <div className="registerSection">
//       <form className="authForm" onSubmit={handleSubmit}>
//         <h3>Vendor Register</h3>

//         <label>Username</label>
//         <input
//           type="text"
//           name="username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Enter your username"
//         />

//         <label>Email</label>
//         <input
//           type="text"
//           name="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Enter your email"
//         />

//         <label>Password</label>
//         <input
//           type="password"
//           name="password"
//           value={password}
//           onChange={(e) => setpassword(e.target.value)}
//           placeholder="Enter your password"
//         />

//         <div className="btnSubmit">
//           <button type="submit" disabled={loading}>
//             {loading ? "Registering..." : "Submit"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { API_URL } from '../../data/apiPath';
import { Eye, EyeOff } from 'lucide-react'; // Optional: if using Lucide icons

const Register = ({ showLoginHandler }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() || !email.trim() || !password.trim()) {
      Swal.fire('Missing Fields', 'Please fill in all fields.', 'warning');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/vendor/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        Swal.fire('Success', 'Vendor registered successfully!', 'success');
        setUsername("");
        setEmail("");
        setPassword("");
        showLoginHandler();
      } else {
        setError(data.error || "Registration failed.");
        Swal.fire('Error', data.error || 'Registration failed. Please try again.', 'error');
      }

    } catch (error) {
      console.error("Registration failed", error);
      setLoading(false);
      Swal.fire('Error', 'Something went wrong. Please try again.', 'error');
    }
  };

  return (
    <div className="registerSection">
      <form className="authForm" onSubmit={handleSubmit}>
        <h3>Vendor Register</h3>

        <label>Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />

        <label>Email</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        <label>Password</label>
        <div className="password-input-wrapper" style={{ position: 'relative' }}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            style={{ paddingRight: '35px' }}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              color: '#555'
            }}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>

        <div className="btnSubmit">
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;

