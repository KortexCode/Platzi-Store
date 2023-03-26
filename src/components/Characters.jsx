import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CharacterCarts } from './CharacterCarts';
import { Search } from './Search';

//Estado inicial
const initialState = {
    idInfavorites: [],
    search: "",
}
//Action types
const actionType = {
    addToFavorite: "add to favorites",
    removeToFavorite: "remove from favorites",
    search: "make a search",
}
//ObjectReducer que devuelve todas las posibles acciones dentro de un objeto
const objectReducer = (state, payload)=>({
    [actionType.addToFavorite]:{
      ...state,
      idInfavorites: [...state.idInfavorites, payload],
    },
    [actionType.removeToFavorite]:{
        ...state,
        idInfavorites: payload,
    },
    [actionType.search]:{
        ...state,
        search: payload,
    },
});

function reducer(state, action){
    return objectReducer(state, action.payload)[action.type] || state;
}

function Characters({darkMode}){
    //USE_REDUCER
    const [state, dispatch] = React.useReducer(reducer, initialState);
    //Desestructuración del state
    const {idInfavorites, search} = state;
    //USE_STATE
    const [dataCharacter, setDataCharacter] = useState([]);
    //USE MEMO
    const filteredCharacters = useMemo(()=> dataCharacter.filter((item)=>{
        return item.name.toLowerCase().includes(search.toLowerCase())})
    , [dataCharacter, search]);
    //USE REF
    const inputSearch = useRef(null);

    const handleAddtoFavorite = (id) => dispatch({
        type: actionType.addToFavorite, 
        payload: id,
    });
    const handleRemovetoFavorite = (newList) => dispatch({
        type: actionType.removeToFavorite, 
        payload: newList,
    });
    const handleSearch = useCallback(
        ()=> dispatch({
            type: actionType.search, 
            payload: inputSearch.current.value,
        }),[]
    );
    console.log("ids en favoritos", idInfavorites)
  
    //USE_EFFECT
    useEffect(()=>{
        const data = fetch("https://rickandmortyapi.com/api/character");
        Promise.resolve(data)
        .then((result)=> result.json())
        .then((character)=> {setDataCharacter(character.results)});
    }, []);
   
    return(
        <div className='Characters'>
            <Search handleSearch={handleSearch} inputSearch={inputSearch} />
            <h2 className={`Characters__title ${darkMode ? "Characters__title--dark" : false}`}>
                Rick and Morty characters
            </h2>
            <div className='Characters__carts-container'>
                {filteredCharacters.map((item)=>(<CharacterCarts handleAddtoFavorite={handleAddtoFavorite}
                     item={item} idInfavorites={idInfavorites} darkMode={darkMode}
                     handleRemovetoFavorite={handleRemovetoFavorite} key={item.id}
                    />))}
            </div>
        </div>
    )
}

export {Characters}