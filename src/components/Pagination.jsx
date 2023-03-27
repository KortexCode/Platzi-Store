import React, { useState } from 'react';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';

function Pagination(){
    const {numPage} = useParams();
    const [page, setPage] = useState(numPage ? parseInt(numPage): 1);
    const navigate = useNavigate();
    console.log("PaGE", page);
    
    const hanldeChangePageNext = () => { 
        let num = page+1;
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
                <p>Page {numPage} </p>
            </div>
            <div className='Pagination__btn-container'>
                <button className='Pagination__btn' 
                    type='button' onClick={()=>hanldeChangeLastOrFirtsPage(1)}>{"<<"} 
                </button>
                <button className='Pagination__btn' type='button' onClick={hanldeChangePageBack}><FaAngleLeft/></button>
                <button className='Pagination__btn' type='button' onClick={hanldeChangePageNext}><FaAngleRight/></button>
                <button className='Pagination__btn' 
                    type='button' onClick={()=>hanldeChangeLastOrFirtsPage(42)}>{">>"} 
                </button>
            </div>      
        </div>
    )
}

export {Pagination}