import React, { useState } from "react";
import { toast } from "react-toastify";
import "./component.css";
const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    user_email: "",
    user_password: "",
  });

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const { user_email, user_password } = inputs;
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { user_email, user_password };
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Logged in Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div id="formdiv" className="p-3 text-bg-dark shadow-lg mb-5">
      <h1 className="text-center my-3">Login</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="email"
          name="user_email"
          placeholder="Email"
          className="form-control my-3"
          value={user_email}
          onChange={(e) => onChange(e)}
        />
        <input
          type="password"
          name="user_password"
          placeholder="Password"
          className="form-control my-3"
          value={user_password}
          onChange={(e) => onChange(e)}
        />
        <div className="text-center">
          <button className="btn btn-danger">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
