import React, { forwardRef, memo, useRef } from 'react';

const Search = memo( function({handleSearch}){

    //USE REF
    const inputSearch = useRef(null);
    
    return(
        <div className='Search__input'>
            <label htmlFor="search">Search:</label>
            <input type="text" id="search" 
                ref={inputSearch} onChange={()=> handleSearch(inputSearch)} 
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