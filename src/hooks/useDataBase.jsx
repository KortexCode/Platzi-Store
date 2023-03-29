import React, { useCallback, useEffect, useMemo } from 'react';


//Estado inicial
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
    [actionType.showErrorMessage]:{
        ...state,
        showPageNotExist: payload,
    },
});

function reducer(state, action){
    return objectReducer(state, action.payload)[action.type] || state;
}

function useDataBase(Api){
    //USE_REDUCER
    const [state, dispatch] = React.useReducer(reducer, initialState);
    //Desestructurando el estado
    const {idInfavorites, dataCharacter, 
        darkMode, search, openFavorites, showPageNotExist} = state;
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
        let dataError = true;
        /* const data = fetch(Api); */
        (async function dataResponse(dataApi){
            
            const result = await fetch(dataApi);
            if(!result.ok){
                console.log("first", result.ok)
                /* handleShowDataApi([]) */
                handleErrorMessage(true);
                return;
            }
            console.log("se hizo consulta")
            const characters = await result.json();
            console.log("respues", characters )
            if(showPageNotExist){
                handleErrorMessage(false);
            }
            handleShowDataApi(characters.results)  
        })(Api);

        if(!dataError){
            throw {
                status:"404",
                statusText:"Data Not Found",
            }
        }
        
       
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