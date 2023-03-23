import React, {useState} from 'react';

function Header(){
    const [darkMode, setDarkMode] = useState(false);
    return(
        <div className='Header'>
            <h3>ReactHooks</h3>
            <button 
                className={darkMode ? "dark-mode" : "light-mode"} 
                type='button'
                onClick={()=>{setDarkMode(prevState => !prevState)}}>
                {darkMode ? "Dark Mode" : "Light Mode"}
            </button>
        </div>
    )
}
export {Header}