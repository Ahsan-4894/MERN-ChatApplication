import React from "react";
import { Skeleton } from "@mui/material";
export const LayOutLoader = () => {
  return (
    <div className="flex justify-between">
          
           <div className="h-screen w-[38rem]">
            <Skeleton variant='rectangular' height='100vh'/>
          </div>
          

          
          <div className="h-screen w-[38rem]">
            <Skeleton variant='rectangular' height='100vh'/>
          </div>
          

          
          <div className="h-screen w-[38rem]">
            <Skeleton variant='rectangular' height='100vh'/>
          </div> 
          
    </div>
  );
};
