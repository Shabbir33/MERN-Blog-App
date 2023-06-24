import React, { useEffect, useState } from "react";
import axios from "axios";
import authStore from "../stores/authStore";

const Form = (props) => {
    const store = authStore();

    useEffect(() => {
        store.refreshPage();
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        await store.loginOrSignup(props.request)
    }



    return (
        <form className={props.classType} onSubmit={handleSubmit}>
            <h1>{props.heading}</h1>
            <input type="text" 
                name="username"
                placeholder="username" 
                value={store.form.username}
                onChange={store.updateForm}
            />
            <input type="password" 
                name="password"
                placeholder="password" 
                value={store.form.password} 
                onChange={store.updateForm}
            />
            <button>{props.buttonName}</button>
        </form>
    )
}

export default Form