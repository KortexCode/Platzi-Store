import React, {useState} from 'react';

function Header({darkMode, setDarkMode}){
    const handleChangeMode = () => {  
        setDarkMode(prevState => !prevState);
        const body = document.querySelector("body");
        const remove = body.classList.contains("dark-mode");
        if(remove){
            body.classList.remove("dark-mode");
            return
        }
        body.classList.add("dark-mode");
    }
    return(
        <div className='Header'>
            <button 
                className={darkMode ? "Header-btn--dark" : "Header-btn"} 
                type='button'
                onClick={handleChangeMode}>
                {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
        </div>
    )
}
export {Header}