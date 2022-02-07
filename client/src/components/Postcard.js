import React from 'react';

function Postcard(props) {
    return (
        <>
            <div className="post-body">
                <div className="post-body-image"><img src='https://images.pexels.com/photos/10685200/pexels-photo-10685200.jpeg'></img></div>
                <div className="post-body-details">
                    <p className="post-body-details-category">{props.category}</p>
                    <p className="post-body-details-title">{props.title}</p>
                    <p className="post-body-details-author">{props.author}</p>
                    <p className="post-body-details-description">{props.desc}</p>
                    
                </div>
            </div>
        </>
    );
}

export default Postcard;
