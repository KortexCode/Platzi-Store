import React from "react";
import { useRouteError } from "react-router-dom";

function ErrorPage(){
    const error = useRouteError();
    console.log("error", error);
    return(
        <div className="error">
            <h2 className="error__title">{error.status}</h2>
            <h2 className="error__text">{error.statusText}</h2>
        </div>
    )
}

export {ErrorPage}