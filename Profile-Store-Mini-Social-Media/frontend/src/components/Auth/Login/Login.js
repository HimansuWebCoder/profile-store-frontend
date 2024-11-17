import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../../../utils/utils";
import "./Login.css";

function Login() {
	const [ loginInput, setLoginInput ] = useState("");
	const [input, setInput] = useState("");
	const [ password, setPassword ] = useState("");
    const navigate = useNavigate();

function submitHandler() {
		fetch(`${apiUrl}/login`, {
			    method: "post",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({email: loginInput, password: password}),
				credentials: "include"
		})
		.then((response) => {
           if (response.ok) {
		        navigate("/profiles");
		      } else {
		        console.error("Login failed");
		        alert("email incorrect or Login failed")
		      }
		})
		 .catch((error) => {
	      console.error("An error occurred:", error);
	    });
}

	function inputHandler(e) {
		setLoginInput(e.target.value); 
	}

	function passwordHandler(e) {
		setPassword(e.target.value); 
	}

	return (
		<div className="max-w-[500px] m-auto mt-5 p-5 h-auto bg-blue-500 flex justify-center flex-col text-center">
			<h1 className="text-white text-[2rem]">Login</h1>
			<p className="text-white bg-violet-500">Test user login: Email: h@gmail.com    Password: 123</p>
            <input className="text-black w-[50%] m-auto p-2 rounded-full text-[1.2rem]"  type="text" value={loginInput} onChange={inputHandler} placeholder="Enter Your Email" /><br/>
            <input className="text-black w-[50%] m-auto p-2 rounded-full text-[1.2rem]" type="text" value={password} onChange={passwordHandler} placeholder="Enter Your Password"/><br/>
            <button className="text-white text-[2rem] bg-black w-[120px] p-2 rounded-full m-auto mt-4" onClick={submitHandler}>submit</button>
		</div>
	);
}

export default Login;
