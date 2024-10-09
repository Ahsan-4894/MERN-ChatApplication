import React from 'react'
import {DataGrid} from '@mui/x-data-grid'
import { Paper, Typography } from '@mui/material'

const Table = ({rows, columns, heading, rowHeight}) => {
  return (
    <section className='h-full  text-center'> 
      <Paper elevation={3} sx={{
        height:"100%",
        borderRadius:"2rem",
        padding:"1rem 2rem",
        width:"100%",
        overflow:"hidden",
      }}>
        <Typography variant='h6' sx={{
          textAlign:"center",
          padding:"2rem "
        }}>{heading}</Typography>
        <DataGrid rows={rows} columns={columns} rowHeight={rowHeight} style={{
          height:'80%',
        }}
        sx={{
          border:"none",
          ".table-header":{
            bgcolor:"gray",
            color:"white"
          }
        }}
        />
      </Paper>

    </section>
  
  )
}

export default Table
