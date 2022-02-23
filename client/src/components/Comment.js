import React from 'react'

function Comment(props) {

    return (
        <>
            <div class="card mt-4 mb-4">
                <div class="card-body d-flex">
                    <div className="profilephoto">
                        <img src={props.profilephoto} className="rounded-circle" alt="comment user" />
                    </div>
                    <div className="details" style={{ width: "90%" }}>
                        <>
                            <h6 className='mx-3'>{props.name}</h6>
                            <p className='mx-3'>{new Date(props.date).toDateString()}</p>
                            <p className='mx-3'>{props.comment}</p>
                        </>
                    </div>
                    <div className="deletepost text-end">
                        <button type="button" className="btn btn-danger" ><i className="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Comment