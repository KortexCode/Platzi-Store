import React, { useEffect, useState } from 'react';

function Characters(){
    const [dataCharacter, setDataCharacter] = useState([]);
    useEffect(()=>{
        const data = fetch("https://rickandmortyapi.com/api/character");
        Promise.resolve(data)
        .then((result)=> result.json())
        .then((character)=> {setDataCharacter(character.results)});
    }, [])
    console.log(dataCharacter);

    return(
        <div className='character-cart'>
            <h2 className='character-cart__title'>Rick and Morty characters</h2>
            {dataCharacter?.map((item)=>(
                <div key={item.id} className='character-cart__container'>
                    <img className='character-cart__img' src={item.image}></img>
                    <div className='character-cart__data'>
                        <p>Name: {item.name}</p>
                        <p>Gender: {item.gender}</p>
                        <p>Status: {item.status}</p>
                        <p>Species: {item.species}</p>
                        <p>Origin: {item.origin.name}</p>
                        <p>Location: {item.location.name}</p>
                    </div> 
                </div>
            ))}
        </div>
    )
}

export {Characters}