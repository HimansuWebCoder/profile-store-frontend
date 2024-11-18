import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../../../utils/utils";
import "./Signup.css";

function Signup() {
	const [ name, setName ] = useState("");
	const [ signupInput, setSignupInput ] = useState("");
	const [ password, setPassword ] = useState("");
	const [input, setInput] = useState("");
    const navigate = useNavigate();

function submitHandler() {
		fetch(`${apiUrl}/signup`, {
			    method: "post",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({name: name, email: signupInput, password: password}),
				credentials: "include"
		})
		.then((response) => {
           if (response.ok) {
		        navigate("/home/profiles");
		      } else {
		        console.error("Login failed");
		      }
		})
		 .catch((error) => {
	      console.error("An error occurred:", error);
	    });
}

	function inputHandler(e) {
		setSignupInput(e.target.value); 
	}


	function passwordHandler(e) {
		setPassword(e.target.value); 
	}

	function nameHandler(e) {
		setName(e.target.value); 
	}


	return (
		<div className="max-w-[500px] m-auto mt-5 p-5 h-auto bg-blue-500 flex justify-center flex-col text-center ">
		    <h1 className="text-white text-[2rem]">Signup</h1>
		    <input className="text-black w-[80%] m-auto p-2 rounded text-[1.2rem]" type="text" value={name} onChange={nameHandler} placeholder="Enter your Name " /><br/>
            <input className="text-black w-[80%] m-auto p-2 rounded text-[1.2rem]" type="text" value={signupInput} onChange={inputHandler} placeholder="Enter Your Email" /><br/>
            <input className="text-black w-[80%] m-auto p-2 rounded text-[1.2rem]" type="text" value={password} onChange={passwordHandler} placeholder="Enter your Password "/><br/>
            <button className="text-white text-[2rem] bg-black w-[120px] p-2 rounded m-auto mt-4" onClick={submitHandler}>submit</button>
		</div>
	);
}

export default Signup;
