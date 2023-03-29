import React from 'react';

function AddedToFavorites({children, darkMode}){

    return(
        <section className='AddedToFavorites'>
            <h2 className={`AddedToFavorites__title ${darkMode && 'AddedToFavorites__title--dark-mode'}`} >
                Favorite Characters
            </h2>
            <div className='AddedToFavorites__container'>
                {children}
            </div>      
        </section>
    )
}

export {AddedToFavorites}
