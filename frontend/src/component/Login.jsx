import NavBar from './NavBar';
import Footer from './Footer';
import { useEffect, useReducer } from 'react';
import axios from 'axios'

const initialState = {
    username: "",
    password: ""
}

const formReducer = (state, action) => {
    switch (action.type) {

        case "SET_USERNAME":
            return { ...state, username: action.payload }

        case "SET_PASSWORD":
            return { ...state, password: action.payload }

        case "FORM_DATA":
            return {
                ...state,
                username: action.payload.username,
                password: action.payload.password
            }

        default:
            return state

    }
}

function Login() {
    const [formState, dispatch] = useReducer(formReducer, initialState);

    const submit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/login", formState)
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
            <NavBar></NavBar>
            <h3 className="col-6 offset-3 mt-3">Login Up for Wanderlust</h3>
            <div className="row mt-3 mb-3">
                <div className="col-6 offset-3">
                    <form onSubmit={submit} noValidate className="needs-validation">
                        <div className="">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" required className="form-control" name="username" onChange={(e) => dispatch({ type: "SET_USERNAME", payload: (e.target.value) })} />
                            <div className="invalid-feedback">
                                Please enter username
                            </div>
                        </div>
                        <div className="">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" required className="form-control" name="password" onChange={(e) => dispatch({ type: "SET_PASSWORD", payload: (e.target.value) })} />
                            <div className="invalid-feedback">
                                Please enter password
                            </div>
                        </div>
                        <button className='btn btn-success mt-3'>Submit</button>
                    </form>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default Login