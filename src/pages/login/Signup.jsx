// Login.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import './login.css';
import { loginUser, signupUser } from '../../reducers/authSlice';
import { Link, NavLink, useNavigate } from 'react-router-dom';


const Signup = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const[firstName,setFirstName]=useState('')
  const [lastName,setLastName]=useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLogin=useSelector((state)=>state.auth.isLogin);


  useEffect(()=>{
    if(isLogin){
        navigate("/dashboard")
    }
  },[isLogin])
  const handleLogin = () => {
    dispatch(signupUser({email,password}))
    
  };

  return (
    <div className="login-container">
      <h2>Signup</h2>
      <form>
      <label>First-Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
          <label>Last-Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={handleLogin}>
          Signup
        </button>
        <NavLink to="/">Already a user?</NavLink>
      </form>
    </div>
  );
};

export default Signup;
