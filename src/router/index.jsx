import React from 'react'
import { createHashRouter, createRoutesFromElements, Route } from "react-router-dom";
import { PublicLayout } from "../layout/PublicLayout";
import { HomePage } from '../pages/HomePage';

const router = createHashRouter(
    createRoutesFromElements(
        
        <Route path="/" element={<PublicLayout/>} >
            <Route index={true} path="/page" element={<HomePage/>}/>
            <Route path="/page/:numPage" element={<HomePage/>}/>
        </Route>
          
       
    )  
)

export {router}