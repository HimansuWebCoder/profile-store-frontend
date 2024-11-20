import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import PopupEdit from "../../Popup-edit/PopupEdit";
import { apiUrl } from "../../../utils/utils";
import "./EditImagePost.css";

function EditImagePost() {
	const [selectedFile, setSelectedFile] = useState(null);
	const [popupMessage, setPopupMessage] = useState(null);
	const [imgPublicId, setImgPublicId] = useState("");
	const location = useLocation();
	const navigate = useNavigate();
	// const imgPostId = location.pathname.split("/")[3];
	const { id } = useParams();
	// useEffect(() => {
	// 	console.log(imgPostId);
	// 	console.log("my editimage edit image id: ", id);
	// }, []);

	// function editImgPostHandler() {
	// 	fetch(`${apiUrl}/api/posts/images/${imgPostId}`, {
	// 		method: "put",
	// 		headers: {"Content-Type": "application/json"},
	// 		body: JSON.stringify({})
	// 	});
	// }

	useEffect(() => {
		fetch(`${apiUrl}/images/${id}`, {
			method: "get"
		})
		.then(res => res.json())
		.then(img => {
			console.log(img);
			console.log("image public id:", img[0].public_id)
			setImgPublicId(img[0].public_id)
		})
	}, [])

	const handleFileChange = (e) => {
		setSelectedFile(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!selectedFile) {
			alert("Please select a file to upload");
			return;
		}

		const formData = new FormData();
		formData.append("avatar", selectedFile);
		formData.append("imagePublicId", imgPublicId); 

		try {
			const response = await fetch(`${apiUrl}/api/posts/images/${id}`, {
				method: "put",
				body: formData,
				credentials: "include"
			});

			if (response.ok) {
				const data = await response.json();
				console.log("File uploaded successfully:", data);
				// setPopupMessage(data.message);
				setPopupMessage("Post Updated successfully!");
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
							to="/home/posts"
						>
							Back
						</Link>
					</button>
					{popupMessage && (
						<PopupEdit msg={popupMessage} redirect="/home/posts" />
					)}
				</form>
			</div>
		</div>
	);
}

export default EditImagePost;
