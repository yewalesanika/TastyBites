import axios from 'axios'
import React, { useReducer,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const initialState = {
    rating: '',
    Comment: ''
}

const formReducer = (state, action) => {
    switch (action.type) {
        case "SET_RATING":
            return { ...state, rating: action.payload }

        case "SET_COMMENT":
            return { ...state, comment: action.payload }

        case "RESET_FORM":
            return initialState; // Reset to initial state

        default:
            return state;
    }
}

function Reviews() {
    let { id } = useParams();
    let [formState, dispatch] = useReducer(formReducer, initialState);
    const navigate = useNavigate();
    const addReview = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:8080/listings/${id}/reviews`, formState)
            .then(() => {
                dispatch({ type: "RESET_FORM" });
                navigate(`/listings/${id}`);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        "use strict";

        const forms = document.querySelectorAll(".needs-validation");

        Array.from(forms).forEach((form) => {
            form.addEventListener(
                "submit",
                (event) => {
                    if (!form.checkValidity()) {
                        event.preventDefault();
                        event.stopPropagation();
                    }

                    form.classList.add("was-validated");
                },
                false
            );
        });
    }, []);

    return (
        <div className="col-8">
            <h4>Leave a review</h4>
            <form onSubmit={addReview} noValidate className="needs-validation">
                <div className="">
                    <label htmlFor="rating" className="form-label">Rating</label>
                    <input type="range" value={formState.rating} className="form-control" min={0} max={5} id='rating' onChange={(e) => dispatch({ type: "SET_RATING", payload: (e.target.value) })} name='rating' />
                </div>
                <div className="">
                    <label htmlFor="comment" className="form-label">Comment</label>
                    <textarea name="comment" required value={formState.comment} className="form-control" id="" cols={40} rows={5} onChange={(e) => dispatch({ type: "SET_COMMENT", payload: (e.target.value) })}></textarea>
                    <div className="invalid-feedback">
                        Please enter comment
                    </div>
                </div>
                <button className='btn btn-success mt-3'>Submit</button>
            </form>
        </div>
    )
}

export default Reviews