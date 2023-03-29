import React, { useCallback, useEffect, useMemo } from 'react';

//Estado inicial de las variables-estado de la App.
const initialState = {
    idInfavorites: [],
    search: "",
    dataCharacter: [],
    darkMode: false,
    openFavorites: false,
    showPageNotExist:false,
}
//Action types
const actionType = {
    showDataFromApi: "Mostrar datos de la Api",
    addToFavorite: "add to favorites",
    removeToFavorite: "remove from favorites",
    makeSearch: "make a search",
    toggleStyleMode: "toggle style move",
    toggleOpenFavorites: "Open favorite section",
    showErrorMessage: "Show error message",
}
//ObjectReducer que contiene todas las posibles acciones dentro de un objeto
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
    [actionType.showErrorMessage]:{
        ...state,
        showPageNotExist: payload,
    },
});
//Función reductora
function reducer(state, action){
    return objectReducer(state, action.payload)[action.type] || state;
}
//Custom Hook que maneja la mayor parte de la lógica de datos
function useDataBase(Api){
    //USE_REDUCER
    const [state, dispatch] = React.useReducer(reducer, initialState);
    //Desestructurando el estado
    const {idInfavorites, dataCharacter, 
        darkMode, search, openFavorites, showPageNotExist} = state;
    //FUNCIONES MANEJADORAS
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
    const handleErrorMessage = (message) => dispatch({
        type: actionType.showErrorMessage, 
        payload: message,
    });
    //USE MEMO
    const filteredCharacters = useMemo(()=> dataCharacter.filter((item)=>{
        return item.name.toLowerCase().includes(search.toLowerCase())})
    , [dataCharacter, search]);
   
    
    //USE_EFFECT
    useEffect( ()=>{
        (async function dataResponse(dataApi){
            
            const result = await fetch(dataApi);
            //Si la respuesta es negativa, evitamos actualizar datos de consulta,
            //en cambio, se actualiza estado de mensaje de error.
            if(!result.ok){
                //Este estado indicará que no hubo resultados 
                handleErrorMessage(true);
                return;
            }
            //Si la consulta es exitosa
            const characters = await result.json();   
            //Si antes hubo error en los resultados...
            if(showPageNotExist){
                //retornamos a false el estadi showPageNotExist
                handleErrorMessage(false);
            }
            //Se actualiza el estado con almacena los datos de la Api
            handleShowDataApi(characters.results)  
        })(Api);  
    }, [Api]);
  
    return {
        idInfavorites,
        dataCharacter,
        darkMode,
        search,
        openFavorites,
        filteredCharacters,
        showPageNotExist,
        handleAddtoFavorite,
        handleRemovetoFavorite,
        handleToggleDarkMode,
        handleSearch,
        handleToggleFavorites,
    }
}

export {useDataBase}