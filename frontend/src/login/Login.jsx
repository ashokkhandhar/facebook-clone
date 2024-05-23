import React, { useState } from 'react';
import axiosInstance from '../configs/axiosConfig';
import './Login.css';
import { json, useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import API_URL from '../api_url';
import Button from 'react-bootstrap/Button'
import axios from 'axios';

const Login = (props) => {

  const [isLoginMode, setIsLoginMode] = useState(props.isLoginMode);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLoginMode) {
      handleLogin();
    }
    else {
      handleSignup();
    }

  };

  const handleLogin = async () => {

    const userData = {email, password};

    try {
      const response = await axiosInstance.post(API_URL + '/auth/login', userData, {withCredentials: true});
      console.log("login successful");
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      console.log(JSON.parse(localStorage.getItem("userInfo")));
      setError(null);
      navigate('/');
    } catch(error) {
      setError(error.response.data || "Error while login, please login again");
    }
  }

  const handleSignup = async () => {

    const userData = {email, password, username, age};

    try {
      const response = await axiosInstance.post(API_URL + '/auth/register', userData, {withCredentials: true});
      console.log("Register successful");
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      setError(null);
      navigate('/');
    } catch(error) {
      setError(error.response.data || "Error while signup, please signup again");
    }
  }

  return (
    <div className='login-container'>
      <div className='login-form'>
        { errorMessage ? <Alert key="danger" variant="danger">
          {errorMessage}
        </Alert> : null}
        <h2 className='form-heading'>{isLoginMode? 'Login': 'Signup'} </h2>
        <form onSubmit={handleSubmit}>
          {!isLoginMode ? 
            <>
              <div className='form-group'>
                <label htmlFor='username'>Username:</label>
                <input type='text' id='username' value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>
              <div className='form-group'>
                <label htmlFor='age'>Age:</label>
                <input type='number' id='age' value={age} onChange={(e) => setAge(e.target.value)} required />
              </div> 
            </>: null }
          <div className='form-group'>
            <label htmlFor='email'>Email:</label>
            <input type='text' id='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password:</label>
            <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <Button type='submit'>{isLoginMode? 'Login' : 'Signup'}</Button>
        </form>

        <p onClick={()=> setIsLoginMode(!isLoginMode)}>
          {isLoginMode? 'New User? Sign up' : 'Already have an account? Login'}
        </p>
      </div>
    </div>
  )
};

export default Login;