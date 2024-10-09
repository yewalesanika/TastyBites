import { useReducer,useEffect } from "react"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from "./NavBar";
import Footer from "./Footer";

const initialState = {
    title: "",
    description: "",
    price: ""
}

const formReducer = (state, action) => {
    switch (action.type) {
        case "SET_TITLE":
            return { ...state, title: action.payload }

        case "SET_DESCRIPTION":
            return { ...state, description: action.payload }

        case "SET_PRICE":
            return { ...state, price: action.payload }

        default:
            return state
    }
}

function CreateListing() {

    const [formState, dispatch] = useReducer(formReducer, initialState);
    const navigate = useNavigate();

    const submit = (e) => {
        e.preventDefault();
        console.log(formState);
        axios.post("http://localhost:8080/listings", formState)
            .then((res) => {
                navigate("/listings");
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
        <>
            <NavBar></NavBar>
            <div className="">
                <div className="col-8 offset-2">
                    <h4 className="mt-2">Create New Post</h4>
                    <form onSubmit={submit} noValidate className="needs-validation">
                        <div>
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" required className="form-control" placeholder="Enter Title" name="title" onChange={(e) => dispatch({ type: "SET_TITLE", payload: (e.target.value) })} />
                            <div className="invalid-feedback">
                                Please enter title
                            </div>
                        </div>
                        <div>
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea name="description" required className="form-control" placeholder="Enter description" onChange={(e) => dispatch({ type: "SET_DESCRIPTION", payload: (e.target.value) })}></textarea>
                            <div className="invalid-feedback">
                                Please enter description
                            </div>
                        </div>
                        <div>
                            <label htmlFor="image" className="form-label">Image</label>
                            <input type="text" className="form-control" placeholder="Enter image link" name="image" />
                        </div>
                        <div>
                            <label htmlFor="price" className="form-label">Price</label>
                            <input type="text" required className="form-control" placeholder="Enter price" name="price" onChange={(e) => dispatch({ type: "SET_PRICE", payload: (e.target.value) })} />
                            <div className="invalid-feedback">
                                Please enter price.
                            </div>
                        </div>
                        <button className="btn btn-success" style={{ marginBottom: '1rem',  marginTop:'1rem'}}>Submit</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default CreateListing