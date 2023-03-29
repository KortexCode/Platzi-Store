import React, { useState } from 'react';
import { 
    FaAngleRight, 
    FaAngleLeft, 
    FaAngleDoubleLeft,
    FaAngleDoubleRight  } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';

function Pagination({darkMode}){
    const {numPage} = useParams();  
    //Estado que recuerda posición en la paginación
    const [page, setPage] = useState(numPage ? parseInt(numPage): 1); 
    //hide ocultará información de posición en la paginación
    let hide = true;
    //Si el parámetro de navegación tiene datos...
    if(numPage){
        //Se valida el tipo de datos para cambiar el valor de hide si cumple las condiciones
        const arrayNumPage = [...numPage];
        const valid = arrayNumPage.some((item)=>{
            //Verificamos si el parámetro de navegación incluye caracterés que al volverlos
            //enteros generen un NaN.
            const num = parseInt(item);
            return Number.isNaN(num);
    
        })
        //Si el parámetro de navegación en NaN, menor que 1 o mayor que 42, entonces...
        if(valid || (numPage < 1 || numPage > 42)){
           hide = false;//Si cumple, ocultamos la información de posición en la paginación
        }
        
    }
    const navigate = useNavigate();
    //Función que desplaza 1 página a la derecha
    const hanldeChangePageNext = () => { 
        if(hide){
            if(!numPage){
                setPage(2);
                navigate(`page/${2}`);
                return;
            }
            let num =  parseInt(numPage) + 1;
            if(num <= 42){
                setPage(num);
                navigate(`page/${num}`);
                return;
            }   
        }
    }
    //Función que desplaza 1 página a la izquierda
    const hanldeChangePageBack = () => { 
        if(hide){
            const num = parseInt(numPage)-1;
            if(num >= 1){
                setPage(num);
                navigate(`page/${num}`)
                return;
            }    
        }
    }
    //Mueve la página hasta el principio o final dependiendo del parámetro que pase cada botón
    const hanldeChangeLastOrFirtsPage = (num) => { 
        setPage(num);
        navigate(`page/${num}`)
    }

    return(
        <div className='Pagination'>
            { hide && <div className='Pagination__info'>
                <p className={`${darkMode && "Pagination--dark-mode"}`} >Page {numPage ? parseInt(numPage): 1} of 42</p>
            </div>}
            <div className='Pagination__btn-container'>
                <button className='Pagination__btn' 
                    type='button' onClick={()=>hanldeChangeLastOrFirtsPage(1)}>
                        <FaAngleDoubleLeft /> 
                </button>
                <button className='Pagination__btn' type='button' onClick={hanldeChangePageBack}>
                    <FaAngleLeft />
                </button>
                <button className='Pagination__btn' type='button' onClick={hanldeChangePageNext}>
                    <FaAngleRight/>
                </button>
                <button className='Pagination__btn' 
                    type='button' onClick={()=>hanldeChangeLastOrFirtsPage(42)}>
                        <FaAngleDoubleRight />
                </button>
            </div>      
        </div>
    )
}

export {Pagination}