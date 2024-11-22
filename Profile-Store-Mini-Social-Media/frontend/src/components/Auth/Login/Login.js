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
		        navigate("/home/profiles");
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
		<div className="max-w-[500px] m-auto mt-5 p-5 mb-5 h-auto bg-[#222831] flex justify-center flex-col text-center">
		<div className="w-full  h-5 flex justify-end">
		    	<div className="w-[20px] h-[20px] rounded-full border"></div>
		    </div>
			<h1 className="text-white font-bold text-[2rem]">Login</h1>
			<p className="text-white bg-violet-500 mb-2">Test user login: Email: Papu@gmail.com    Password: 123</p>
			 <h2 className="text-[1.5rem]">Email</h2>
            <input className="text-black w-[80%] m-auto p-2 rounded text-[1.2rem]"  type="text" value={loginInput} onChange={inputHandler} placeholder="Enter Your Email" /><br/>
			 <h2 className="text-[1.5rem]">Password</h2>
            <input className="text-black w-[80%] m-auto p-2 rounded text-[1.2rem]" type="text" value={password} onChange={passwordHandler} placeholder="Enter Your Password"/><br/>
             <div className="w-full   h-auto flex justify-between">
		    	<div className="w-[20px] h-[20px] rounded-full border"></div>
	            <button className="text-white text-[1.2rem] bg-[#31363F] w-auto p-2 rounded  mr-11" onClick={submitHandler}>Login</button>
		    </div>
		</div>
	);
}

export default Login;
