import React from 'react';

function CharacterInFavorites({item}){

    return(
       <div className='CharacterInFavorites'>
            <img className='CharacterInFavorites__img' src={item.image} alt={item.name} />
            <p className='CharacterInFavorites__name'>{item.name}</p>
        </div>
    )
}

export {CharacterInFavorites}