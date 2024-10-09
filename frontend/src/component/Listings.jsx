import React from 'react'
import { Link } from 'react-router-dom'

function Listings({ list }) {
    return (
        <>
            {
                list ?
                    <Link to={`/listings/${list._id}`} style={{ textDecoration: 'none' }}>
                        <div className="card card-listing p-3" >
                            <img src={list.image} className="card-img-top" style={{ height: '15rem' }} alt="listing_img" />
                            <div className="card-img-overlay"> </div>
                                <div className="card-body">
                                    <p className="card-text">
                                        {list.title}<br />
                                        &#8377;{list.price}
                                    </p>
                            </div>
                        </div>
                    </Link>
                    : <h2>Loading</h2>
            }
        </>
    )
}

export default Listings