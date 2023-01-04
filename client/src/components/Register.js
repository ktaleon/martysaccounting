import React, {useState} from "react";
import { toast } from 'react-toastify';
import './component.css';
const Register = ({setAuth}) => {
    const [inputs, setInputs] =  useState({
        first_name: "",
        last_name: "",
        user_email: "",
        user_password:""
    });

    const onChange = e => {   
        setInputs({...inputs, [e.target.name] : e.target.value});
    };
    
    const {first_name, last_name, user_email, user_password} = inputs;
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = {first_name, last_name, user_email, user_password};
            const response = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: { "Content-Type" : "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();
            console.log(parseRes);
            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
                setAuth(true);
                toast.success("Register Successfully");
            } 
            else {
                setAuth(false);
                toast.error(parseRes);
            }
        } catch (error) {
            toast.error("User Already Exists ./.");
        }
    };

    return(
        <div id="maindiv">
            <div id="formdiv" className="p-3 text-bg-dark shadow-lg p-3 mb-5">
                <h1 className="text-center my-3">Register</h1>
                <form  onSubmit={onSubmitForm}>
                    <div className="row">
                        <div className="col">
                            <input 
                                type="text" 
                                name="first_name" 
                                placeholder="First Name" 
                                className="form-control"
                                value={first_name}
                                onChange={e => onChange(e)}/>
                        </div>
                        <div className="col">
                            <input 
                                type="text" 
                                name="last_name" 
                                placeholder="Last Name" 
                                className="form-control"
                                value={last_name} 
                                onChange={e => onChange(e)}/>
                        </div>
                    </div>
                    <input 
                        type="email" 
                        name="user_email" 
                        placeholder="Email" 
                        className="form-control my-3"
                        value={user_email} 
                        onChange={e => onChange(e)}/>
                    <input 
                        type="password"
                        name="user_password" 
                        placeholder="Password" 
                        className="form-control my-3"
                        value={user_password} 
                        onChange={e => onChange(e)}/>
                    <div className="text-center">
                        <button className="btn btn-danger">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;