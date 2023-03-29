import React, { useState } from 'react';
import { 
    FaAngleRight, 
    FaAngleLeft, 
    FaAngleDoubleLeft,
    FaAngleDoubleRight  } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';

function Pagination({darkMode}){
    const {numPage} = useParams();  
    const [page, setPage] = useState(numPage ? parseInt(numPage): 1); 
    const navigate = useNavigate();
    
    const hanldeChangePageNext = () => { 
        let num = parseInt(numPage)+1;
        if(num <= 42){
            setPage(num);
            navigate(`page/${num}`)
            return;
        }   
    }
    const hanldeChangePageBack = () => { 
        const num = page-1;
        if(num >= 1){
            setPage(num);
            navigate(`page/${num}`)
            return;
        }    
    }
    const hanldeChangeLastOrFirtsPage = (num) => { 
        setPage(num);
        navigate(`page/${num}`)
    }

    return(
        <div className='Pagination'>
            <div className='Pagination__info'>
                <p className={`${darkMode && "Pagination--dark-mode"}`} >Page {numPage ? parseInt(numPage): 1} of 42</p>
            </div>
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