import React, { useState } from 'react'
import { IconContext } from 'react-icons';
import { Characters } from '../components/Characters'
import { Header } from '../components/Header'

function PublicLayout(){
    const [darkMode, setDarkMode] = useState(false);
    return(
        
        <IconContext.Provider value={{color: "red"}}>
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            <Characters darkMode={darkMode}/>
        </IconContext.Provider>

    )
}

export {PublicLayout}