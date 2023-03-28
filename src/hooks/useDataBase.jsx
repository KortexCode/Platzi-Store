import React, { useCallback, useEffect, useMemo } from 'react';


//Estado inicial
const initialState = {
    idInfavorites: [],
    search: "",
    dataCharacter: [],
    darkMode: false,
    openFavorites: false,
}
//Action types
const actionType = {
    showDataFromApi: "Mostrar datos de la Api",
    addToFavorite: "add to favorites",
    removeToFavorite: "remove from favorites",
    makeSearch: "make a search",
    toggleStyleMode: "toggle style move",
    toggleOpenFavorites: "Open favorite section",
}
//ObjectReducer que devuelve todas las posibles acciones dentro de un objeto
const objectReducer = (state, payload)=>({
    [actionType.showDataFromApi]:{
        ...state,
        dataCharacter: payload,
    },
    [actionType.addToFavorite]:{
      ...state,
      idInfavorites: [...state.idInfavorites, payload],
    },
    [actionType.removeToFavorite]:{
        ...state,
        idInfavorites: payload,
    },
    [actionType.toggleStyleMode]:{
        ...state,
        darkMode: payload,
    },
    [actionType.makeSearch]:{
        ...state,
        search: payload,
    },
    [actionType.toggleOpenFavorites]:{
        ...state,
        openFavorites: payload,
    },
});

function reducer(state, action){
    return objectReducer(state, action.payload)[action.type] || state;
}

function useDataBase(Api){
    //USE_REDUCER
    const [state, dispatch] = React.useReducer(reducer, initialState);
    //Desestructurando el estado
    const {idInfavorites, dataCharacter, darkMode, search, openFavorites} = state;
    //Funciones manejadoras
    const handleShowDataApi = (arrayList) => dispatch({
        type: actionType.showDataFromApi, 
        payload: arrayList,
    });
    const handleAddtoFavorite = (id) => dispatch({
        type: actionType.addToFavorite, 
        payload: id,
    });
    const handleToggleFavorites = (state) => dispatch({
        type: actionType.toggleOpenFavorites, 
        payload: state,
    });
    const handleRemovetoFavorite = (newList) => dispatch({
        type: actionType.removeToFavorite, 
        payload: newList,
    });
    const handleSearch = useCallback(
        (inputSearch)=> dispatch({
            type: actionType.makeSearch, 
            payload: inputSearch.current.value,
        }),[]
    );
    const handleToggleDarkMode = (toggle) => dispatch({
        type: actionType.toggleStyleMode, 
        payload: toggle,
    });
    //USE MEMO
    const filteredCharacters = useMemo(()=> dataCharacter.filter((item)=>{
        return item.name.toLowerCase().includes(search.toLowerCase())})
    , [dataCharacter, search]);
    //USE_EFFECT
    useEffect(()=>{
        const data = fetch(Api);
        Promise.resolve(data)
        .then((result)=> result.json())
        .then((characters)=> {handleShowDataApi(characters.results)});
    }, [Api]);

    //TESTING
    console.log("ids", idInfavorites);
    return {
        idInfavorites,
        dataCharacter,
        darkMode,
        search,
        openFavorites,
        filteredCharacters,
        handleAddtoFavorite,
        handleRemovetoFavorite,
        handleToggleDarkMode,
        handleSearch,
        handleToggleFavorites,
    }
}

export {useDataBase}