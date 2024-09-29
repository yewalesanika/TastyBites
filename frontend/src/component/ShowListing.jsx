import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

function ShowListing() {
    const [showlist, setShowlist] = useState();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/listings/${id}`)
            .then((res) => {
                setShowlist(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [id])

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/listings/${id}`)
            .then((res) => {
                setShowlist(res.data)
                navigate("/listings");
            })
            .catch((err) => {
                console.log(err);
            })
    }
    return (
        <>
            <NavBar />
            <div className="">
                {showlist ? (
                    <>
                        <div className="col-8 offset-2 mt-2">
                            <div className="card col-6 offset-3" >
                                <h5>Details</h5>
                                <img src={showlist.image} class="card-img-top show-img" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title">{showlist.title}</h5>
                                    <p class="card-text">
                                    &#8377;{showlist.price}<br></br>
                                    {showlist.description} 
                                    </p>
                                </div>
                                <div className="btns">
                                    <Link to={`/listings/${showlist._id}/edit`}>
                                        <button className='btn btn-success'>Edit</button>
                                    </Link>
                                    <button className='btn btn-success offset-3' onClick={(e) => handleDelete(showlist._id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <h2>Loading...</h2>
                )}
            </div>
            <Footer />
        </>
    )
}

export default ShowListing