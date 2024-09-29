import { useReducer } from "react"
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
        axios.post("http://localhost:8080/listings/new", formState)
            .then((res) => {
                navigate("/listings");
            })
            .catch((err) => {
                console.log(err);
            })
    }
    return (
        <>
            <NavBar></NavBar>
            <div className="">
            <div className="col-8 offset-2">
                <h4 className="mt-2">Create New Post</h4>
                <form onSubmit={submit}>
                    <div style={{ marginBottom: '-2rem' }}>
                        <label for="title" className="form-label">Title</label>
                        <input type="text" className="form-control" placeholder="Enter Title" name="title" onChange={(e) => dispatch({ type: "SET_TITLE", payload: (e.target.value) })} /><br /><br />
                    </div>
                    <div style={{ marginBottom: '-2rem' }}>
                        <label for="description" className="form-label">Description</label>
                        <textarea name="description" className="form-control" placeholder="Enter description" onChange={(e) => dispatch({ type: "SET_DESCRIPTION", payload: (e.target.value) })}></textarea><br /><br />
                    </div>
                    <div style={{ marginBottom: '-2rem' }}>
                        <label for="image" className="form-label">Image</label>
                        <input type="text" className="form-control" placeholder="Enter image link" name="image" /><br /><br />
                    </div>
                    <div style={{ marginBottom: '-2rem' }}>
                        <label for="price" className="form-label">Price</label>
                        <input type="text" className="form-control" placeholder="Enter price" name="price" onChange={(e) => dispatch({ type: "SET_PRICE", payload: (e.target.value) })} /><br /><br />
                    </div>
                    <button className="btn btn-success" style={{ marginBottom: '1rem' }}>Submit</button>
                </form>
            </div>
            </div>
            <Footer />
        </>
    )
}

export default CreateListing