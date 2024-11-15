import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../../../utils/utils";
import "./Signup.css";

function Signup() {
	const [ signupInput, setSignupInput ] = useState("");
	const [input, setInput] = useState("");
    const navigate = useNavigate();

function submitHandler() {
		fetch(`${apiUrl}/signup`, {
			    method: "post",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({email: signupInput}),
				credentials: "include"
		})
		.then((response) => {
           if (response.ok) {
		        navigate("/admin");
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

	return (
		<div className="w-[500px] m-auto mt-5 p-5 h-auto bg-blue-500 flex justify-center flex-col text-center ">
		    <h1 className="text-white text-[2rem]">Signup</h1>
            <input className="text-black w-[50%] m-auto p-2 rounded-full text-[1.2rem]" type="text" value={signupInput} onChange={inputHandler} placeholder="Signup here" />
            <button className="text-white text-[2rem] bg-black w-[120px] p-2 rounded-full m-auto mt-4" onClick={submitHandler}>submit</button>
		</div>
	);
}

export default Signup;
