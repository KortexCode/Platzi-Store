import React from 'react'
import { createHashRouter, createRoutesFromElements, Route } from "react-router-dom";
import { PublicLayout } from "../layout/PublicLayout";

const router = createHashRouter(
    createRoutesFromElements(
        <Route path="/" element={<PublicLayout/>} >

        </Route>
    )
)

export {router}