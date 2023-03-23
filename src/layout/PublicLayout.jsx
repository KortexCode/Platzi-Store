import React from 'react'
import { Characters } from '../components/Characters'
import { Header } from '../components/Header'

function PublicLayout(){
    return(
        <>
            <h1>CHIKORITA</h1>
            <Header/>
            <Characters/>
        </>

    )
}

export {PublicLayout}