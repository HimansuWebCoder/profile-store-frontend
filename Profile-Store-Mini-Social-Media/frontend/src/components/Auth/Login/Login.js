import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../../../utils/utils";
import CircularProgress from "@mui/material/CircularProgress";
import PopupEdit from "../../Popup-edit/PopupEdit";
import Box from "@mui/material/Box";
import "./Login.css";

function Login() {
	const [ loginInput, setLoginInput ] = useState("");
	const [input, setInput] = useState("");
	const [ password, setPassword ] = useState("");
	const [loader, setLoader] = useState(false);
	const [popupMessage, setPopupMessage] = useState(null);
    const navigate = useNavigate();
    const [ login, setLogin ] = useState("");


   

function submitHandler() {
	setLoader(true)
		fetch(`${apiUrl}/login`, {
			    method: "post",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({email: loginInput, password: password}),
				credentials: "include"
		})
		.then((response) => {
           if (response.ok) {
		        // navigate("/home/profiles");
           	setPopupMessage("Login Successfully!");
           	setLoader(false)
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
		<div className="max-w-[500px] m-auto mt-5  mb-5 h-auto bg-[#222831] flex justify-center flex-col text-center">
		<div className="w-full  h-5 flex justify-start">
		    	<div className="w-[20px] h-[20px] rounded-br-[50px] bg-white border"></div>
		    </div>
			<h1 className="text-white font-bold text-[2rem]">Login</h1>
			<p className="text-white bg-[#31363F] p-2 mb-2">Test user login: Email: Papu@gmail.com    Password: 123</p>
			 <h2 className="text-[1.5rem]">Email</h2>
            <input className="text-black w-[80%] m-auto p-2 rounded text-[1.2rem]"  type="text" value={loginInput} onChange={inputHandler} placeholder="Enter Your Email" /><br/>
			 <h2 className="text-[1.5rem]">Password</h2>
            <input className="text-black w-[80%] m-auto p-2 rounded text-[1.2rem]" type="text" value={password} onChange={passwordHandler} placeholder="Enter Your Password"/><br/>
             <div className="w-full h-auto flex justify-between  items-end">
	            <button className="text-white text-[1.2rem] bg-[#31363F] w-auto mb-2 p-2 rounded  m-[auto]" onClick={submitHandler}>Login</button>
		    	<div className="w-[20px] h-[20px] rounded-tl-[50px] bg-white border"></div>
		    </div>
		    {
				loader ? (
                      <Box
					sx={{
						display: "flex",
						justifyContent: "center",
						margin: "auto",
						width: "200px",
						height: "auto",
						position: "absolute",
						top:'200px'
					}}
				>
					<CircularProgress
						sx={{
							color: "primary", // Set the desired color here
						}}
					/>
				</Box>
					) : (
                     popupMessage && (
						<PopupEdit msg={popupMessage} redirect="/home/profiles" />
					)
					)
			}
		</div>
	);
}

export default Login;
