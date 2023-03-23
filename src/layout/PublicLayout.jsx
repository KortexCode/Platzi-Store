import React, { useState } from 'react'
import { Characters } from '../components/Characters'
import { Header } from '../components/Header'

function PublicLayout(){
    const [darkMode, setDarkMode] = useState(false);
    return(
        <>
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            <Characters darkMode={darkMode}/>
        </>

    )
}

export {PublicLayout}