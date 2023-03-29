import React from "react";
import { Link, useRouteError } from "react-router-dom";

function ErrorPage(){
    const error = useRouteError();
    return(
        <div className="error">
            <h2 className="error__title">{error.status}</h2>
            <h2 className="error__text">{error.statusText}</h2>
            <Link to="/" className="error__link">Go back</Link>
        </div>
    )
}

export {ErrorPage}