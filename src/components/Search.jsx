import React, { forwardRef, memo, useRef, useState } from 'react';
import { FaSearch } from "react-icons/fa";

const Search = memo( function({
    handleSearch, filteredCharacters, darkMode, search, showPageNotExist
}){
    //USE REF
    const inputSearch = useRef(null);
    //Variable show mostrará mensaje al no encontrar coincidencias
    let show = true;
    //El valor de show se modificará sólo cuando exista información en el input
    if(!(search == ""))
        show = filteredCharacters.length ? true : false;

    const handleShowMessage = () => {  
        handleSearch(inputSearch);
    }
    
    return(
        <div className='Search'>
            <div className='Search__input-container'>
                <input type="text" id="search" disabled={showPageNotExist}
                    ref={inputSearch} onChange={handleShowMessage} 
                    placeholder="search some character" 
                />
                <FaSearch/>  
            </div>
           {!show && 
            <p className={`Search__message ${darkMode && "Search__message--darkmode"}`}>
                {`There is no matches to "${search}"`}
            </p>}
        </div>
    )
});

export {Search}

/* Ejemplo con forwardRef */

/* const Search = forwardRef(function ({handleSearch}, ref){
    console.log("favoritos")
    return(
        <div className='Characters__input'>
            <label htmlFor="search">Search:</label>
            <input type="text" id="search" 
                ref={ref} onChange={handleSearch} 
                placeholder="search some character" 
            />
        </div>
    )
}); */