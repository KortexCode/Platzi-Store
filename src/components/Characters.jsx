import React from 'react';

function Characters({children}){
   
    return(
        <div className='Characters'>
            <div className='Characters__carts-container'>
                {children}
            </div>
        </div> 
    )
}

export {Characters}