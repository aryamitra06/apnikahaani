import React from 'react';
import {Link } from "react-router-dom";
function Categories() {
    return (
        <>
        <div className="container categories-parent-container">
        <p></p>
        </div>
            <div className="container shadow-sm bg-white rounded categories-child-container">
                <Link className="categories-link" to="/">All</Link>
                <Link className="categories-link" to="/?category=Rebirth">Rebirth</Link>
                <Link className="categories-link" to="/?category=Tragedy">Tragedy</Link>
                <Link className="categories-link" to="/?category=Quest">Quest</Link>
                <Link className="categories-link" to="/?category=return">Return</Link>
            </div>
        </>
    );
}

export default Categories;
