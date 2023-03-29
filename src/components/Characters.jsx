import React from 'react';

function Characters({children, darkMode}){
   
    return(
        <div className='Characters'>
            <div className='Characters__carts-container'>
                {children}
            </div>
        </div> 
    )
}

export {Characters}