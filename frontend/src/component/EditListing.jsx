import axios from 'axios'
import React, { useEffect, useReducer } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

const initialState={
  title: "",
  description: "",
  price: ""
}

const formReducer=(state,action)=>{
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

  let {id} = useParams();
  const [formState,dispatch] = useReducer(formReducer,initialState);
  const navigate = useNavigate();

  useEffect(()=>{
    axios.get(`http://localhost:8080/listings/${id}/edit`)
    .then((res)=>{
      dispatch({
        type:"FORM_DATA",
        payload:{
          title:res.data.title,
          description:res.data.description,
          price:res.data.price,
        }
      })
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])

  const update=(e)=>{
    e.preventDefault();
    axios.put("http://localhost:8080/listings/" + id, formState)
        .then(() => {
            navigate("/listings");
        })
        .catch((err) => {
            console.log(err);
        })
  }
  return (
    <>
    <NavBar/>
      {/* <form onSubmit={update}>
        <input type="text" placeholder="Enter Title" value={formState.title} name="title" onChange={(e) => dispatch({ type: "EDIT_TITLE", payload: (e.target.value) })} /><br /><br />
        <textarea name="description" placeholder="Enter description" value={formState.description} onChange={(e) => dispatch({ type: "EDIT_DESCRIPTION", payload: (e.target.value) })}></textarea><br /><br />
        <input type="text" placeholder="Enter image link" name="image" /><br /><br />
        <input type="text" placeholder="Enter price" name="price" value={formState.price} onChange={(e) => dispatch({ type: "EDIT_PRICE", payload: (e.target.value) })} /><br /><br />
        <button>Submit</button>
      </form> */}
      <div className="col-8 offset-2">
                <h4 className="mt-2">Edit Post</h4>
                <form onSubmit={update}>
                    <div style={{ marginBottom: '-2rem' }}>
                        <label for="title" className="form-label">Title</label>
                        <input type="text" className="form-control" value={formState.title} name="title"onChange={(e) => dispatch({ type: "EDIT_TITLE", payload: (e.target.value) })} /><br /><br />
                    </div>
                    <div style={{ marginBottom: '-2rem' }}>
                        <label for="description" className="form-label">Description</label>
                        <textarea name="description" className="form-control" value={formState.description} onChange={(e) => dispatch({ type: "EDIT_DESCRIPTION", payload: (e.target.value) })}></textarea><br /><br />
                    </div>
                    <div style={{ marginBottom: '-2rem' }}>
                        <label for="image" className="form-label">Image</label>
                        <input type="text" className="form-control" placeholder="Enter image link" name="image" /><br /><br />
                    </div>
                    <div style={{ marginBottom: '-2rem' }}>
                        <label for="price" className="form-label">Price</label>
                        <input type="text" className="form-control" value={formState.price} onChange={(e) => dispatch({ type: "EDIT_PRICE", payload: (e.target.value) })} /><br /><br />
                    </div>
                    <button className="btn btn-success" style={{ marginBottom: '1rem' }}>Edit</button>
                </form>
            </div>
    <Footer/>
    </>
  )
}

export default EditListing