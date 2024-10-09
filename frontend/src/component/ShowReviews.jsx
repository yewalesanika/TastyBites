import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function ShowReviews({ listingReview }) {
    let { id } = useParams();
    const navigate = useNavigate();
    const deleteReview = (rId) => {
        axios.delete(`http://localhost:8080/listings/${id}/reviews/${rId}`)
            .then(() => {
                navigate(`/listings`);
            })
            .catch((err) => {
                console.log(err);
            })

    }
    return (
        <div className="row">
            {
                listingReview.map((review) =>
                    <div className="card col-5 ms-3 mb-3" key={review._id}>
                        <div className="card-body">
                            <div className="card-title">Sanika</div>
                            <div className="card-text">
                                {review.rating}<br />
                                {review.comment}<br />
                                <div className="mb-3 mt-2">
                                    <button className="btn btn-success" onClick={(e) => deleteReview(review._id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ShowReviews