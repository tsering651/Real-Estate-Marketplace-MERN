import  { useState } from 'react';
import '../styles/sign-up.css'; // Import your CSS file

function App() {
  
  const [formData,setformData]=useState({});

  const handleChange = (e)=>{
          setformData({
             ...formData,
             [e.target.id]:e.target.value,
          })
  }
  const handleSubmit= async (e)=>{
    e.preventDefault();
    const res=await fetch('/api/auth/signup',
    {
      method:'POST',
      headers:{
        'content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    }
    );
    const data=await res.json();
    console.log(data);

     

  }
 // console.log(formData);

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
         
          onChange={handleChange}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
         
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          required
        />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
        
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default App;
