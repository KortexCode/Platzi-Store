import React, { useState } from 'react';
import { FaHeart } from "react-icons/fa";

function CharacterCarts(
    {
        item, 
        idInfavorites,
        darkMode,
        openFavorites,
        handleAddtoFavorite,
        handleRemovetoFavorite,
        handleToggleFavorites,  
    })
{
    //Verificando si se encuentra en favoritos
    const idInList = idInfavorites.find((character)=>{
        return item.id == character.id;
    });
    const [addToFavorite, setAddToFavorite] = useState(idInList ? true : false);

    //Función que modifica la vista de botón de favoritos
    const verifyIdsToAddOrRemove = ()=>{
        //Filtrando ids si son duplicados o no
        const idInList = idInfavorites.find((character)=>{
            return item.id == character.id;
        });
        //Remover el id repetido de favoritos y actualizar la lista
        if(idInList) {
            const newArray = idInfavorites.filter((character)=>{
                return character.id !== idInList.id;
            })
            if(!newArray.length){
                handleToggleFavorites(false);
            }
            handleRemovetoFavorite(newArray);
            setAddToFavorite(prevState => !prevState);
        }
        else{
            if(!openFavorites){
                handleToggleFavorites(true);
            }
            handleAddtoFavorite(item);
            setAddToFavorite(prevState => !prevState);
        }   
    }
    
    return (
        
        <div key={item.id} className='Characters-cart'>
            <img className='Characters-cart__img' src={item.image}></img>
            <div className='Characters-cart__data'>
                <p className={`description ${darkMode ? "description--dark": false}`}>
                    Name: <span className={`value ${darkMode ? "value--dark" : false}`}>
                            {item.name}
                        </span>
                </p>
                <p className={`description ${darkMode ? "description--dark": false}`}>
                    Gender: <span className={`value ${darkMode ? "value--dark" : false}`}>
                                {item.gender}
                            </span>
                </p>
                <p className={`description ${darkMode ? "description--dark": false}`}>
                    Status: <span className={`value ${darkMode ? "value--dark" : false}`}>
                                {item.status}
                            </span>
                </p>
                <p className={`description ${darkMode ? "description--dark": false}`}>
                    Species: <span className={`value ${darkMode ? "value--dark" : false}`}>
                                {item.species}
                            </span>
                </p>
                <p className={`description ${darkMode ? "description--dark": false}`}>
                    Origin: <span className={`value ${darkMode ? "value--dark" : false}`}>
                                {item.origin.name}
                            </span>

                </p>
                <p className={`description ${darkMode ? "description--dark": false}`}>
                    Location: <span className={`value ${darkMode ? "value--dark" : false}`}>
                                {item.location.name}
                            </span>
                </p>
            </div> 
            <FaHeart size={20} 
                    style={{
                        margin: "5px",
                        color: addToFavorite ? "red" : "rgb(112, 112, 245)",
                        alignSelf: "end",
                        justifySelf: "end",
                    }}  
                    onClick={verifyIdsToAddOrRemove} 
            />
        </div>

    )
}

export {CharacterCarts}