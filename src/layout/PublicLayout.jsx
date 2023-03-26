import React, { useRef, useState } from 'react';
import { IconContext } from 'react-icons';
import { Characters } from '../components/Characters';
import {CharacterCarts} from '@components/CharacterCarts';
import { Header } from '../components/Header';
import { Search } from '../components/Search';
import { useDataBase } from '../hooks/useDataBase';

function PublicLayout(){
    const {
        idInfavorites,
        darkMode,
        handleAddtoFavorite,
        handleRemovetoFavorite,
        handleToggleDarkMode,
        handleSearch,
        filteredCharacters,
    } = useDataBase();

    return(
        
        <IconContext.Provider value={{color: "red"}}>
            <Header darkMode={darkMode} handleToggleDarkMode={handleToggleDarkMode} />
            <Search handleSearch={handleSearch} />
            <Characters darkMode={darkMode}>     
                {filteredCharacters.map((item)=>(<CharacterCarts handleAddtoFavorite={handleAddtoFavorite}
                     item={item} idInfavorites={idInfavorites} darkMode={darkMode}
                     handleRemovetoFavorite={handleRemovetoFavorite} key={item.id}
                    />))}     
            </Characters>
        </IconContext.Provider>

    )
}

export {PublicLayout}