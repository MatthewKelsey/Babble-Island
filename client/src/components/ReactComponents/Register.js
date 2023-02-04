//@ts-ignore

import React, { useState } from "react";
// import auth from '../utils/auth';
import { useNavigate } from "react-router-dom";
import  {register}  from "../ApiClient.js";


const initialState = {
  userName: "",
  password: "",
  nickName: "",
  
};

const Register = (props) => {
  const navigate = useNavigate();
  const [state, setState] = useState(initialState);
  const [exists, setExists] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {userName, password, nickName} = state;
    const user = { userName, password, nickName};
    const res = await register(user);
    console.log({ res });
    if (res.status === 409) {
      alert(`${res.message}`);
      setState(initialState);
      setExists(true);
    } else {
      props.setUser(res);
      navigate("/landing")
    }
  };

  const loginHandle = () => {
    navigate("/login");
  };

  const validateForm = () => {
    return (
      !state.userName || !state.password || !state.nickName 
    );
  };

  return (
    <div className="babble-island">

      <h1>Babble Island</h1>
    <section className="register">
     
      <br></br>
 
      <h2>Register</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User Name"
          name="userName"
          value={state.userName}
          onChange={handleChange}
        />
        <br></br>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
        <br></br>
        <input
          type="text"
          placeholder="Nick Name"
          name="nickName"
          value={state.nickName}
          onChange={handleChange}
        />
        <br></br>
        
        <br></br>
        <button className="form-submit" type="submit" disabled={validateForm()}>
          &nbsp;Register&nbsp;
        </button>
      </form>
      <br></br>
      {exists ? <p> User already exists. Please login</p> : "Already a user?"}
      <br></br>
      <br></br>
      <button onClick={loginHandle} className="form-submit">
        Login
      </button>
    </section>
    </div>
  );
};

export default Register;
