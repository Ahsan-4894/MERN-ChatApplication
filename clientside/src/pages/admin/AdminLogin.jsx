import React, { useState } from 'react'
import {TextField, Button, IconButton, Typography} from "@mui/material"
import {useInputValidation } from '6pp'
import WavingHandIcon from '@mui/icons-material/WavingHand';
import {UsernameValidator, PasswordValidator, EmailValidator } from '../../utils/validation.jsx'
import toast, {Toaster} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';



const AdminLogin = () => {
    const navigate = useNavigate();
    const password=useInputValidation("", PasswordValidator);
    
    const handleLogin = ()=>{
        toast.success("Login Successfully!")
        setTimeout(()=>{
          redirectToDashBoard();
        }, 4000);
    }
    const redirectToDashBoard = ()=>navigate("/admin/dashboard")
  return (
    
    <section className='flex justify-center items-center h-screen bg-blue-500 '> 
        <div><Toaster /></div>
          <div className='flex flex-col items-center w-[30%] h-[30rem] shadow-2xl shadow-white bg-white rounded-xl'>
            <Typography alignItems={"center"} sx={{
                marginTop:"6.4rem"
            }}>Hello Admin</Typography>
            <IconButton color='primary' >
                <WavingHandIcon />
            </IconButton>
            <form className='mt-8'>
              
              <TextField required  id='password' type='password' variant='outlined' label='Password' value={password.value} onChange={password.changeHandler}></TextField><br /><br />
              {
                password.error && (
                  <Typography variant='caption'>Password is weak</Typography>
                )
              }
              
              <Button onClick={handleLogin} fullWidth variant='contained' color='primary'>Log In</Button><br /><br />
            </form>  

          </div>
      </section>
  );
}

export default AdminLogin
