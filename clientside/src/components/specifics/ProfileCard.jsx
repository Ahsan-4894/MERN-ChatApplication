import React from 'react'
import { Avatar } from '@mui/material'
import {Face as FaceIcon, CalendarMonth as CalendarIcon, AlternateEmail as UserNameIcon} from '@mui/icons-material'
import moment from 'moment'

const ProfileCard = () => {
  return (
    <div className='flex flex-col items-center'>
        <Avatar sx={{
            width:"15rem",
            height:"15rem",
            objectFit:"contain",
            marginTop:"3rem",
            border:"2px solid white"
        }} />
        <ProfileScreen heading={"Bio"} text={"Hello All"}/>
        <ProfileScreen heading={"Usernames"} text={"ahsan_4894"} Icon={<UserNameIcon color='primary'/>} />
        <ProfileScreen heading={"Name"} text={"Muhammad Ahsan"} Icon={<FaceIcon color='primary' />}/>
        <ProfileScreen heading={"Joined"} text={moment("2023-08-31T09:36:20.410Z").fromNow()} Icon={<CalendarIcon color='primary' />}/>
    </div>
  )
}
const ProfileScreen = ({text, Icon, heading})=>{
    return (
    <div className='text-2xl items-center justify-center flex flex-row h-[5rem] w-[18rem] text-black  '>
        {Icon &&Icon}
        <h1>{text}</h1>
    </div>
    );
}
export default ProfileCard
