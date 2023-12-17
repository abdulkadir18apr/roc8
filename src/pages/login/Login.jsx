// Login.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import './login.css';
import { loginUser } from '../../reducers/authSlice';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';


const Login = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLogin=useSelector((state)=>state.auth.isLogin);
  const location=useLocation();
console.log(location)

  useEffect(()=>{

    if(isLogin){
        navigate(`/dashboard`)
    }
  },[isLogin])
  const handleLogin = () => {
    dispatch(loginUser({email,password}))
    
  };
  const handleTestLogin = () => {

    dispatch(loginUser({email:"yash@gmail.com",password:"12345678"}))
    
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
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
       <div className="buttons">
       <button type="button" onClick={handleLogin}>
          Login
        </button>
        <button type="button" onClick={handleTestLogin}>
          Test Login
        </button>
       </div>
        <NavLink to="/signup">New User?</NavLink>
      </form>
    </div>
  );
};

export default Login;
