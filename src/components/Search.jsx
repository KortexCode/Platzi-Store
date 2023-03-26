import React, { forwardRef, memo } from 'react';

const Search = memo( function({handleSearch, inputSearch}){
    
    return(
        <div className='Characters__input'>
            <label htmlFor="search">Search:</label>
            <input type="text" id="search" 
                ref={inputSearch} onChange={handleSearch} 
                placeholder="search some character" 
            />
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