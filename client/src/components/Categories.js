import React from 'react';
import {Link } from "react-router-dom";
function Categories() {
    return (
        <>
        <div className="container categories-parent-container">
        <p></p>
        </div>
            <div className="container shadow-sm bg-white rounded categories-child-container">
                <Link className="categories-link" to="">All</Link>
                <Link className="categories-link" to="">Rebirth</Link>
                <Link className="categories-link" to="">Tragedy</Link>
                <Link className="categories-link" to="">The Quest</Link>
                <Link className="categories-link" to="">Return</Link>
            </div>
        </>
    );
}

export default Categories;
