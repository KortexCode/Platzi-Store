import React, { forwardRef, memo, useRef, useState } from 'react';
import { FaSearch } from "react-icons/fa";

const Search = memo( function({handleSearch, filteredCharacters, darkMode, search}){
    const [showMessage, setShowState] = useState(false);
    //USE REF
    const inputSearch = useRef(null);

    const handleShowMessage = () => {  
        const show = filteredCharacters.length ? true : false;
        setShowState(show);
    }
    
    return(
        <div className='Search'>
            <div className='Search__input-container'>
                <input type="text" id="search" 
                    ref={inputSearch} onChange={()=> {handleSearch(inputSearch);
                    handleShowMessage()}} 
                    placeholder="search some character" 
                />
                <FaSearch/>  
            </div>
           {showMessage && 
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