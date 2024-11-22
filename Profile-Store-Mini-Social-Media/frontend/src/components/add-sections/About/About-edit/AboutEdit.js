import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiUrl } from "../../../../utils/utils";
import PopupEdit from "../../../Popup-edit/PopupEdit";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./AboutEdit.css";

// Loading should be in util file it uses almost every component I will do it later DRY
function AboutEdit() {
	const [description, setDescription] = useState("");
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(true);
	const [popupMessage, setPopupMessage] = useState(null);
	const location = useLocation();
	const navigate = useNavigate();
	const id = location.pathname.split("/")[3];

	useEffect(() => {
		fetch(`${apiUrl}/api/about`, {
			method: "get",
			credentials: "include"
		})
			.then((res) => res.json())
			.then((aboutData) => {
				setTimeout(() => {
					setDescription(aboutData[0].description);
					setInput(aboutData[0].description);
					setLoading(false);
				}, 1000);
			});
	}, [id]);

	function editAboutHandler() {
		fetch(`${apiUrl}/api/about/${id}`, {
			method: "put",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ description: input }),
			credentials: "include"
		})
			.then((res) => res.json())
			.then((data) => {
				// alert(data.message);
				setPopupMessage(data.message);
			});
	}

	const handleNavigate = () => {
		navigate("/admin");
	};

	return (
		<div className="flex justify-center items-center">
			{loading ? (
				<Box
					className="absolute top-[250px]"
					sx={{
						display: "flex",
						justifyContent: "center",
					}}
				>
					<CircularProgress
						sx={{
							color: "primary", // Set the desired color here
						}}
					/>
				</Box>
			) : (
				<div className="max-w-[500px] h-[200px] bg-[#31363F] border z-2000 rounded-[10px] text-white absolute top-[200px] p-[10px] text-center">
					<textarea
						className="w-[90%] h-[80%] text-white text-2xl bg-[#021526]"
						value={input}
						onChange={(e) => setInput(e.target.value)}
					>
						{description}
					</textarea>
					<button
						className="w-[20%] h-[30px] bg-[#222831] rounded-[5px]"
						onClick={editAboutHandler}
					>
						Submit
					</button>
					<button
						className="w-[20%] h-[30px] bg-[#222831] ml-2 rounded-[5px]"
						onClick={() => navigate("/admin")}
					>
						Exit
					</button>
				</div>
			)}
			{popupMessage && <PopupEdit msg={popupMessage} redirect="/admin" />}
		</div>
	);
}

export default AboutEdit;
