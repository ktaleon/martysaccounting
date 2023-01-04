import React, {useState} from "react";
import { toast } from 'react-toastify';
import './component.css';
const Expenses = () => {
    const [inputs, setInputs] =  useState({
        ingredients: "",
        salary:"",
        utilities: ""
    });

    const onChange = e => {   
        setInputs({...inputs, [e.target.name] : e.target.value});
    };
    
    const { ingredients, salary, utilities} = inputs;
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = {ingredients, salary, utilities};
            console.log(body)
            const response = await fetch("http://localhost:5000/expenses", {
                method: "POST",
                headers: { Authorization: localStorage.getItem("token"),
                "Content-Type" : "application/json"},
                body: JSON.stringify(body)
            });

            
             const parseRes = await response.json();
             console.log(parseRes)
            toast.success("Successfully Added!");
            setInputs({
                ingredients:"",
                salary:"",
                utilities:"",
            })
                
        } catch (error) {
            toast.error("Failed! Missing Input or Upload Error");
            console.error(error.message);
        }
    };

    return(
        <div className="p-3 text-bg-dark shadow-lg mb-5">
            <h1 className="text-center my-3">Expenses</h1>
            <form onSubmit={onSubmitForm}>
                <input 
                    type="number" 
                    name="ingredients" 
                    placeholder="Ingredients Expense" 
                    className="form-control my-3"
                    value={ingredients} 
                    onChange={e => onChange(e)}/>
                <input 
                    type="number"
                    name="salary" 
                    placeholder="Salary Expense" 
                    className="form-control my-3"
                    value={salary} 
                    onChange={e => onChange(e)}/>
                <input 
                    type="number"
                    name="utilities" 
                    placeholder="Utilities Expense" 
                    className="form-control my-3"
                    value={utilities} 
                    onChange={e => onChange(e)}/>
                <div className="text-center">
                    <button className="btn btn-danger">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Expenses;