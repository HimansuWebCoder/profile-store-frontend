import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PopupEdit from "../Popup-edit/PopupEdit";
import { apiUrl } from "../../utils/utils";
import Box from '@mui/material/Box';
import CircularProgress from "@mui/material/CircularProgress";
import "./Upload.css";

function Upload() {
	const [selectedFile, setSelectedFile] = useState(null);
	const [popupMessage, setPopupMessage] = useState(null);
	const [loader, setLoader] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();

	const updateProfilePhotoId = location.pathname.split("/")[3];

	useEffect(() => {
		console.log("upload location path", location.pathname);
	});

	const handleFileChange = (e) => {
		setSelectedFile(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setLoader(true)

		if (!selectedFile) {
			alert("Please select a file to upload");
			return;
		}

		const formData = new FormData();
		formData.append("avatar", selectedFile);

		// 51
		// 39
		try {
			const response = await fetch(
				`${apiUrl}/api/upload/${updateProfilePhotoId}`,
				{
					method: "put",
					body: formData,
					credentials: "include"
				},
			);

			if (response.ok) {
				const data = await response.json();
				console.log("File uploaded successfully:", data);
				setPopupMessage(data.message);
				setLoader(false)
				// Redirect or handle success as needed
			} else {
				console.error("Failed to upload file");
			}
		} catch (error) {
			console.error("Error during file upload:", error);
		}
	};

	return (
		<div className="w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.4)] fixed top-0 left-0 z-[100] flex justify-center items-center">
			<div className="w-[500px] h-[500px] bg-[rgba(10,0,0,0.3)] p-[10px] flex justify-center items-center rounded-[20px] text-center text-white">
				<form onSubmit={handleSubmit}>
					<input
						type="file"
						name="avatar"
						onChange={handleFileChange}
					/>
					<button
						className="w-[100px] h-[30px] m-[5px] text-blue-500 bg-white rounded-[5px]"
						type="submit"
					>
						Upload
					</button>
					<button className="w-[100px] h-[30px] m-[5px] text-blue-500 bg-white rounded-[5px]">
						<Link
							className="text-blue-500 no-underline"
							to="/admin"
						>
							Back
						</Link>
					</button>
				</form>
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
						<PopupEdit msg={popupMessage} redirect="/admin" />
					)
					)
			}
			</div>
		</div>
	);
}

export default Upload;
