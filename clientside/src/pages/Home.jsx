import React from 'react'
import AppLayout from '../layout/AppLayout.jsx'
import { Typography } from '@mui/material';

const Home = () => {
  return (
    <Typography p={"2rem"} textAlign={"center"} color={"black"} fontSize={"1.5rem"} fontFamily={'sans-serif'}>Select A Friend To Chat</Typography>
  )
}
export default AppLayout()(Home);
