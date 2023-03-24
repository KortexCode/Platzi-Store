import React, { useEffect, useMemo, useState } from 'react';
import { FaAngleRight, FaHeart } from "react-icons/fa";

//Estado inicial
const initialState = {
    id: [],
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
      id: [...state.id, payload],
    },
    [actionType.removeToFavorite]:{
        ...state,
        id: payload,
    },
    [actionType.search]:{
        ...state,
        search: payload,
    },
});

function reducer(state, action){
    console.log(action.type)
    return objectReducer(state, action.payload)[action.type] || state;
}

function Characters({darkMode}){
    //USE_STATE
    const [dataCharacter, setDataCharacter] = useState([]);
    //USE_REDUCER
    const [state, dispatch] = React.useReducer(reducer, initialState);
    //Desestructuración del state
    const {id, search} = state;
    console.log("lista de id", id)

    const handleAddtoFavorite = (id) => dispatch({
        type: actionType.addToFavorite, 
        payload: id,
    });
    const handleRemovetoFavorite = (newList) => dispatch({
        type: actionType.removeToFavorite, 
        payload: newList,
    });
    const handleSearch = ({target}) => dispatch({
        type: actionType.search, 
        payload: target.value,
    });
    //USE MEMO
    const filteredCharacters = useMemo(()=> dataCharacter.filter((item)=>{
            return item.name.toLowerCase().includes(search.toLowerCase())})
    , [dataCharacter, search]);
 
    //Función que modifica la vista de botón de favoritos
    function mark(item){
        //Filtrando ids si son duplicados o no
        const doubleId = id.filter((id)=>{
            return item.id == id;
        });
        //Remover el id repetido de favoritos y actualizar la lista
        if(doubleId.length > 1){
            const newList = id.filter((id)=>{
                return id != doubleId[0];
            })
            handleRemovetoFavorite(newList);
        }
        //Marcar los iconos al agregar o remover de favoritos
        if(doubleId.length == 0 || doubleId.length > 1)
            return "rgb(112, 112, 245)";
        else
            return "red";      
    }
  
    //USE_EFFECT
    useEffect(()=>{
        const data = fetch("https://rickandmortyapi.com/api/character");
        Promise.resolve(data)
        .then((result)=> result.json())
        .then((character)=> {setDataCharacter(character.results)});
    }, []);
   
    return(
        <div className='Characters'>
            <div className='Characters__input'>
                <label htmlFor="search">Search:</label>
                <input type="text" id="search" onChange={handleSearch} placeholder="search some character"/>
            </div>
            <h2 className={`Characters__title ${darkMode ? "Characters__title--dark" : false}`}>
                Rick and Morty characters
            </h2>
            <div className='Characters__carts-container'>
                {filteredCharacters.map((item)=>(
                    <div key={item.id} className='Characters-cart'>
                        <img className='Characters-cart__img' src={item.image}></img>
                        <div className='Characters-cart__data'>
                            <p className={`description ${darkMode ? "description--dark": false}`}>
                                <FaAngleRight className='ico'/>Name: <span className={`value ${darkMode ? "value--dark" : false}`}>
                                        {item.name}
                                    </span>
                            </p>
                            <p className={`description ${darkMode ? "description--dark": false}`}>
                                <FaAngleRight/>Gender: <span className={`value ${darkMode ? "value--dark" : false}`}>
                                            {item.gender}
                                        </span>
                            </p>
                            <p className={`description ${darkMode ? "description--dark": false}`}>
                                <FaAngleRight/>Status: <span className={`value ${darkMode ? "value--dark" : false}`}>
                                            {item.status}
                                        </span>
                            </p>
                            <p className={`description ${darkMode ? "description--dark": false}`}>
                                <FaAngleRight/>Species: <span className={`value ${darkMode ? "value--dark" : false}`}>
                                            {item.species}
                                        </span>
                            </p>
                            <p className={`description ${darkMode ? "description--dark": false}`}>
                                <FaAngleRight/>Origin: <span className={`value ${darkMode ? "value--dark" : false}`}>
                                            {item.origin.name}
                                        </span>
                                
                            </p>
                            <p className={`description ${darkMode ? "description--dark": false}`}>
                                <FaAngleRight/>Location: <span className={`value ${darkMode ? "value--dark" : false}`}>
                                            {item.location.name}
                                        </span>
                            </p>
                            <FaHeart size={20} style={{
                                margin: "5px",
                                position: "absolute",
                                bottom: "5px",
                                right: "3px",
                                color: mark(item),
                            }} onClick={()=>{handleAddtoFavorite(item.id)}} />
                        </div> 
                    </div>
                ))}
            </div>
            
        </div>
    )
}

export {Characters}