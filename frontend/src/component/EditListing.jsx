import axios from 'axios'
import React, { useEffect, useReducer } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

const initialState = {
  title: "",
  description: "",
  price: ""
}

const formReducer = (state, action) => {
  switch (action.type) {
    case "EDIT_TITLE":
      return { ...state, title: action.payload }

    case "EDIT_DISCRIPTION":
      return { ...state, description: action.payload }

    case "EDIT_PRICE":
      return { ...state, price: action.payload }

    case "FORM_DATA":
      return {
        ...state,
        title: action.payload.title,
        description: action.payload.description,
        price: action.payload.price
      }

    default:
      return state

  }
}

function EditListing() {

  let { id } = useParams();
  const [formState, dispatch] = useReducer(formReducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/listings/${id}/edit`)
      .then((res) => {
        dispatch({
          type: "FORM_DATA",
          payload: {
            title: res.data.title,
            description: res.data.description,
            price: res.data.price,
          }
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  const update = (e) => {
    e.preventDefault();
    axios.put("http://localhost:8080/listings/" + id, formState)
      .then(() => {
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
      <NavBar />
      {/* <form onSubmit={update}>
        <input type="text" placeholder="Enter Title" value={formState.title} name="title" onChange={(e) => dispatch({ type: "EDIT_TITLE", payload: (e.target.value) })} /><br /><br />
        <textarea name="description" placeholder="Enter description" value={formState.description} onChange={(e) => dispatch({ type: "EDIT_DESCRIPTION", payload: (e.target.value) })}></textarea><br /><br />
        <input type="text" placeholder="Enter image link" name="image" /><br /><br />
        <input type="text" placeholder="Enter price" name="price" value={formState.price} onChange={(e) => dispatch({ type: "EDIT_PRICE", payload: (e.target.value) })} /><br /><br />
        <button>Submit</button>
      </form> */}
      <div className="col-8 offset-2">
        <h4 className="mt-2">Edit Post</h4>
        <form onSubmit={update} noValidate className="needs-validation">
          <div>
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" required className="form-control" value={formState.title} name="title" onChange={(e) => dispatch({ type: "EDIT_TITLE", payload: (e.target.value) })} />
            <div className="invalid-feedback">
              Please enter title
            </div>
          </div>
          <div>
            <label htmlFor="description" className="form-label">Description</label>
            <textarea name="description" required className="form-control" value={formState.description} onChange={(e) => dispatch({ type: "EDIT_DESCRIPTION", payload: (e.target.value) })}></textarea>
            <div className="invalid-feedback">
              Please enter description
            </div>
          </div>
          <div>
            <label fohtmlForr="image" className="form-label">Image</label>
            <input type="text" className="form-control" placeholder="Enter image link" name="image" /><br /><br />
          </div>
          <div>
            <label htmlFor="price" className="form-label">Price</label>
            <input type="text" required className="form-control" value={formState.price} onChange={(e) => dispatch({ type: "EDIT_PRICE", payload: (e.target.value) })} />
            <div className="invalid-feedback">
              Please enter price
            </div>
          </div>
          <button className="btn btn-success" style={{ marginBottom: '1rem',  marginTop:'1rem'}}>Edit</button>
        </form>
      </div>
      <Footer />
    </>
  )
}

export default EditListing