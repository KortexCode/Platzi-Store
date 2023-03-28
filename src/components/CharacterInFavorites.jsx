import React from 'react';

function CharacterInFavorites({item, darkMode}){

    return(
       <div className='CharacterInFavorites'>
            <img className='CharacterInFavorites__img' src={item.image} alt={item.name} />
            <p className={`CharacterInFavorites__name ${darkMode && 'CharacterInFavorites__name--dark-mode'}`}>
                {item.name}
            </p>
        </div>
    )
}

export {CharacterInFavorites}