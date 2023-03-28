import React from "react";

function ErrorPage(){
    return(
        <div className="error">
            <h2 className="error__title">404</h2>
            <h2 className="error__text">No encontramos la página que buscas</h2>
           {/*  <img className="error__img" src={imgError}></img> */}
            <div className="error__comment-container">
                <p className="error__comment">Gomenne</p>
            </div>
        </div>
    )
}

export {ErrorPage}