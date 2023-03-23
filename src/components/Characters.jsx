import React, { useEffect, useState } from 'react';

function Characters({darkMode}){
    const [dataCharacter, setDataCharacter] = useState([]);
    useEffect(()=>{
        const data = fetch("https://rickandmortyapi.com/api/character");
        Promise.resolve(data)
        .then((result)=> result.json())
        .then((character)=> {setDataCharacter(character.results)});
    }, [])

    return(
        <div className='Characters'>
            <h2 className={`Characters__title ${darkMode ? "Characters__title--dark" : false}`}>
                Rick and Morty characters
            </h2>
            <div className='Characters__carts-container'>
                {dataCharacter?.map((item)=>(
                    <div key={item.id} className='Characters-cart'>
                        <img className='Characters-cart__img' src={item.image}></img>
                        <div className='Characters-cart__data'>
                            <p className={`description ${darkMode ? "description--dark": false}`}>
                                Name: 
                                <span className={`value ${darkMode ? "value--dark" : false}`}>
                                    {item.name}
                                </span>
                            </p>
                            <p className={`description ${darkMode ? "description--dark": false}`}>
                                Gender: 
                                <span className={`value ${darkMode ? "value--dark" : false}`}>
                                    {item.gender}
                                </span>
                            </p>
                            <p className={`description ${darkMode ? "description--dark": false}`}>
                                Status: 
                                <span className={`value ${darkMode ? "value--dark" : false}`}>
                                    {item.status}
                                </span>
                            </p>
                            <p className={`description ${darkMode ? "description--dark": false}`}>
                                Species: 
                                    <span className={`value ${darkMode ? "value--dark" : false}`}>
                                        {item.species}
                                    </span>
                            </p>
                            <p className={`description ${darkMode ? "description--dark": false}`}>
                                Origin: 
                                <span className={`value ${darkMode ? "value--dark" : false}`}>
                                    {item.origin.name}
                                </span>
                            </p>
                            <p className={`description ${darkMode ? "description--dark": false}`}>
                                Location: 
                                <span className={`value ${darkMode ? "value--dark" : false}`}>
                                    {item.location.name}
                                </span>
                            </p>
                        </div> 
                    </div>
                ))}
            </div>
            
        </div>
    )
}

export {Characters}