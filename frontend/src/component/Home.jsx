import React, { useEffect, useState } from 'react'
import Listings from './Listings';
import axios from "axios"
import NavBar from './NavBar';
import Footer from './Footer';

function Home() {
    const [listings,setListings] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8080/listings")
        .then((res)=>{
            setListings(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    })
    return (
        <>
        <NavBar/>
        <div className="container mt-4">
                <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1"> {/* Add the row class for proper grid */}
                    {
                        listings.map((list) =>
                            <Listings key={list._id} list={list} />
                        )
                    }
                </div>
            </div>
        <Footer/>
        </>

    )
}

export default Home