import React, { useState } from 'react';
import { FaHeart } from "react-icons/fa";

function CharacterCarts(
    {
        item, 
        handleAddtoFavorite,
        idInfavorites,
        handleRemovetoFavorite,
        darkMode,  
    })
{
    const [addToFavorite, setAddToFavorite] = useState(false);

    //Función que modifica la vista de botón de favoritos
    const verifyIdsToAddOrRemove = ()=>{
        //Filtrando ids si son duplicados o no
        const idInList = idInfavorites.find((id)=>{
            return item.id == id;
        });
        //Remover el id repetido de favoritos y actualizar la lista
        if(idInList) {
            const newArray = idInfavorites.filter((id)=>{
                return id !== idInList;
            })
            handleRemovetoFavorite(newArray);
            setAddToFavorite(prevState => !prevState);
        }
        else{
            handleAddtoFavorite(item.id);
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
                <FaHeart size={20} 
                    style={{
                        margin: "5px",
                        position: "absolute",
                        bottom: "5px",
                        right: "3px",
                        color: addToFavorite ? "red" : "rgb(112, 112, 245)",
                    }}  
                    onClick={verifyIdsToAddOrRemove} 
                />
            </div> 
        </div>

    )
}

export {CharacterCarts}