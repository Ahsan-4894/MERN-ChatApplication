import React, { useState } from 'react'
import {TextField, Button} from "@mui/material"
import {useInputValidation } from '6pp'
import {UsernameValidator, PasswordValidator, EmailValidator } from '../utils/validation.jsx'
const Login = () => {
  const [isLoggedIn, setLoggedIn] = useState(true);
  
  const username=useInputValidation("", UsernameValidator);
  const password=useInputValidation("", PasswordValidator);
  const email=useInputValidation("", EmailValidator);

  const toggleLogin = ()=>{
    setLoggedIn(!isLoggedIn); 
  }
  const handleSignUp = (e)=>{
      e.preventDefault();
  }

  const handleLogin = (e)=>{
    e.preventDefault();
  }



  return (
    <>
      <section className='flex justify-center items-center h-screen bg-blue-500'>
      {
        isLoggedIn ? 
        <>
          <div className='flex flex-col items-center w-[30%] h-[30rem] shadow-2xl bg-white rounded-xl'>
            <h1 className='mt-16'>LogIn</h1>
            <form className='mt-8'>
              <TextField required  id='email' type='text' variant='outlined' label='Email' value={email.value} onChange={email.changeHandler}></TextField><br/><br/>
              {
                email.error && (
                  <h5 className='text-red-600'>Email is invalid</h5>
                )
              }
              <TextField required  id='password' type='password' variant='outlined' label='Password' value={password.value} onChange={password.changeHandler}></TextField><br /><br />
              {
                password.error && (
                  <h5 className='text-green-700'>Passowrd is weak</h5>
                )
              }
              
              <Button onClick={handleLogin} fullWidth variant='contained' color='primary'>Log In</Button><br /><br />
              <Button onClick={toggleLogin} variant='outlined' color='primary'>Sign Up Instead</Button>
            </form>  

          </div>
        </> 
        : 
        <>
          <div className='flex flex-col items-center w-[30%] h-[30rem] shadow-2xl bg-white rounded-xl'>
            <h1 className='mt-16'>Sign Up</h1>
            <form className='mt-8'>
              <TextField required  id='username' type='text' variant='outlined' label='Name' value={username.value} onChange={username.changeHandler}></TextField><br/><br/>
              {
                username.error && (
                  <h5 className='text-red-600'>username is invalid</h5>
                )
              }
              
              <TextField required  id='email' type='text' variant='outlined' label='Email' value={email.value} onChange={email.changeHandler}></TextField><br/><br/>
              {
                email.error && (
                  <h5 className='text-red-600'>Email is invalid</h5>
                )
              }
              
              <TextField required  id='password' type='password' variant='outlined' label='Password' value={password.value} onChange={password.changeHandler}></TextField><br /><br />
              {
                password.error && (
                  <h5 className='text-red-600'>password is weak</h5>
                )
              }
              
              <Button onClick={handleSignUp} fullWidth variant='contained' color='primary'>Sign In</Button><br /><br />
              <Button onClick={toggleLogin} variant='outlined' color='primary'>Login Instead</Button>
            </form>  

          </div>
        </>
      } 
      </section>
      
    </>
  )
}

export default Login
