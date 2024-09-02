import React from 'react'
import {Avatar, AvatarGroup} from '@mui/material'
import { TransformImage } from '../../lib/features'

const AvatarCard = ({avatar=[], max=4}) => {
  return (
    <div className='flex flex-col '>
        <AvatarGroup max={max}>
            <div className='h-[4rem] w-[3rem]'>
            {
                avatar.map((image,index)=>(
                    <Avatar key={Math.random()*1000} src={TransformImage(image)} alt={`Avatar ${index}`} sx={{width:"2rem", height:"2rem", top:"1rem", position:'relative'}}/>
                ))
            }
            </div>
        </AvatarGroup>
    </div>
  )
}

export default AvatarCard
