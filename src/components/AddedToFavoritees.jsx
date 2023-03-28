import React from 'react';

function AddedToFavorites({children}){

    
    return(
        <section className='AddedToFavorites'>
            <h2 className='AddedToFavorites__title'>Favorites</h2>
            <div className='AddedToFavorites__container'>
                {children}
            </div>      
        </section>
    )
}

export {AddedToFavorites}
