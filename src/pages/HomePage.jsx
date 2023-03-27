import React from 'react';
import { useParams } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { Characters } from '../components/Characters';
import {CharacterCarts} from '@components/CharacterCarts';
import { Header } from '../components/Header';
import { Search } from '../components/Search';
import { useDataBase } from '../hooks/useDataBase';
import { Pagination } from '../components/Pagination';

function HomePage(){
    const {numPage} = useParams();
    const Api = `https://rickandmortyapi.com/api/character?page=${numPage}`;
    const {
        idInfavorites,
        darkMode,
        handleAddtoFavorite,
        handleRemovetoFavorite,
        handleToggleDarkMode,
        handleSearch,
        filteredCharacters,
    } = useDataBase(Api);

    return(
        <IconContext.Provider value={{color: "red"}}>
            <Header darkMode={darkMode} handleToggleDarkMode={handleToggleDarkMode} />  
            <Search handleSearch={handleSearch} />
            <Pagination/>
            <Characters darkMode={darkMode}>     
                {filteredCharacters.map((item)=>(<CharacterCarts handleAddtoFavorite={handleAddtoFavorite}
                     item={item} idInfavorites={idInfavorites} darkMode={darkMode}
                     handleRemovetoFavorite={handleRemovetoFavorite} key={item.id}
                    />))}     
            </Characters>
        </IconContext.Provider>
    )

}

export {HomePage}