import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiUrl } from "../../../utils/utils";
import PopupEdit from "../../Popup-edit/PopupEdit";
import "./ProfileInfoEdit.css";

function ProfileInfoEdit() {
	const [name, setName] = useState("");
	const [headline, setHeadline] = useState("");
	const [isUpdated, setIsUpdated] = useState(false);
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(true);
	const location = useLocation();
	const navigate = useNavigate();
	const id = location.pathname.split("/")[3];

	const handleSubmit = (e) => {
		e.preventDefault();
		fetch(`${apiUrl}/api/profile-info/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name, headline }),
			credentials: "include"
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setMessage(data.message);
				setLoading(false);
				if (data.success) {
					setIsUpdated(true);
				} else {
					// alert(data.message);
					navigate("/admin")
				}
			})
			.catch((error) => {
				console.error("Error updating profile:", error);
			});
	};

	const handleNavigate = () => {
		navigate("/admin");
	};

	return (
		<div className="w-screen bg-black bg-opacity-40 text-white h-screen z-100 fixed top-0 left-0">
			{isUpdated ? (
				<PopupEdit msg={message} redirect="/admin" />
			) : (
				<div className="max-w-[400px] h-[400px] mx-auto mt-[50px] bg-[#31363f] p-2 rounded-2xl flex flex-col">
					<div className="w-full flex justify-end">
						<button
							className="w-[80px] h-[30px] text-lg text-white cursor-pointer rounded-lg border-none bg-transparent color-white hover:bg-gray-700"
							onClick={handleNavigate}
						>
							Back
						</button>
					</div>
					<form
						className="flex justify-center flex-col"
						onSubmit={handleSubmit}
					>
						<label className="block w-[100px]">Name:</label>
						<input
							className="max-w-[250px] text-black h-[30px] m-1 border border-gray-300 rounded"
							type="text"
							value={name || ""}
							onChange={(e) => setName(e.target.value)}
						/>
						<br />
						<label>Headline:</label>
						<input
							className="max-w-[250px] text-black h-[30px] m-1 border border-gray-300 rounded"
							type="text"
							value={headline || ""}
							onChange={(e) => setHeadline(e.target.value)}
						/>
						<button
							className="max-w-[100px] h-[30px] rounded border-none m-1 bg-blue-600 text-white hover:bg-blue-700 "
							type="submit"
						>
							Update Profile
						</button>
					</form>
				</div>
			)}
		</div>
	);
}

export default ProfileInfoEdit;
