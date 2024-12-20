import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../../../utils/utils";
import CircularProgress from "@mui/material/CircularProgress";
import PopupEdit from "../../Popup-edit/PopupEdit";
import Box from "@mui/material/Box";
import "./Signup.css";

function Signup() {
	const [ name, setName ] = useState("");
	const [ signupInput, setSignupInput ] = useState("");
	const [ password, setPassword ] = useState("");
	const [loader, setLoader] = useState(false);
	const [popupMessage, setPopupMessage] = useState(null);
	const [input, setInput] = useState("");
    const navigate = useNavigate();

function submitHandler() {
	setLoader(true)
		fetch(`${apiUrl}/signup`, {
			    method: "post",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({name: name, email: signupInput, password: password}),
				credentials: "include"
		})
		.then((response) => {
           if (response.ok) {
		        // navigate("/home/profiles");
           	setPopupMessage("Signup Successfully!");
		        setLoader(false)
		      } else {
		        console.error("Signup failed");
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
		<div className="max-w-[500px] m-auto mt-5  h-auto bg-[#222831] rounded-[5px] flex justify-center flex-col text-center ">
		    <div className="w-full  h-5 flex justify-end ">
		    	<div className="w-[20px] h-[20px] rounded-bl-[50px] bg-[#F4F6FF]"></div>
		    </div>
		    <h1 className="text-white font-bold text-[2rem]">Signup</h1>
		    <h2 className="text-[1.5rem]">Name</h2>
			    <input className="text-black w-[80%] m-auto p-2 rounded text-[1.2rem]" type="text" value={name} onChange={nameHandler} placeholder="Enter your Name " /><br/>
		    <h2 className="text-[1.5rem]">Email</h2>
	            <input className="text-black w-[80%] m-auto p-2 rounded text-[1.2rem]" type="text" value={signupInput} onChange={inputHandler} placeholder="Enter Your Email" /><br/>
		    <h2 className="text-[1.5rem]">Password</h2>
	            <input className="text-black w-[80%] m-auto p-2 rounded text-[1.2rem]" type="text" value={password} onChange={passwordHandler} placeholder="Enter your Password "/><br/>
	            <div className="w-full   h-auto flex items-end justify-between ">
		    	<div className="w-[20px] h-[20px] rounded-tr-[50px] bg-white border"></div>
	            <button className="text-white text-[1.2rem] bg-[#31363F] w-auto p-2 rounded  mr-11 mb-3" onClick={submitHandler}>submit</button>
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

export default Signup;
