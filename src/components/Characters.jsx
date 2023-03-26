import React from 'react';

function Characters({children, darkMode}){
   
    return(
        <div className='Characters'>
            <h2 className={`Characters__title ${darkMode ? "Characters__title--dark" : false}`}>
                    Rick and Morty characters
            </h2>
            <div className='Characters__carts-container'>
                {children}
            </div>
        </div> 
    )
}

export {Characters}