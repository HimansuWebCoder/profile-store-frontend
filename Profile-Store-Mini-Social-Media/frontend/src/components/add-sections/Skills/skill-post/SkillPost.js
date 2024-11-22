import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../../../utils/utils";
import PopupEdit from "../../../Popup-edit/PopupEdit";
import "./SkillPost.css";

function SkillPost() {
	const [skillInput, setSkillInput] = useState("");
	const [popupMessage, setPopupMessage] = useState(null);
	const navigate = useNavigate();
	const inputRef = useRef(null);

	useEffect(() => {
		inputRef.current.focus();
	}, []);

	function handleSubmit() {
		fetch(`${apiUrl}/api/skills`, {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ skillName: skillInput }),
			credentials: "include"
		})
			.then((res) => res.json())
			.then((skillData) => {
				setSkillInput("");
				inputRef.current.focus();
				// setPopupMessage(skillData.message);
				setTimeout(() => {
					setPopupMessage(skillData.message);
				}, 1000);
			});
	}

	return (
		<div className="fixed top-0 left-0 w-screen h-screen z-[100] rounded-[10px] bg-[rgba(0,20,50,0.4)] text-white flex justify-center items-center">
			<div className="w-[600px] h-[300px] bg-[#31363F] mt-[50px] text-center rounded-[20px]">
				<h1 className="text-white text-[1.5rem]">Post Skills</h1>
				<input
					className="w-[200px] text-black h-[30px] rounded-[10px] text-[1.2rem]"
					type="text"
					value={skillInput}
					placeholder="Add your skills"
					ref={inputRef}
					onChange={(e) => setSkillInput(e.target.value)}
				/>
				<button
					className="w-[60px] h-[30px] bg-[#222831] rounded-[5px] ml-[5px] text-[1.3rem]"
					onClick={handleSubmit}
				>
					add
				</button>
				<button
					className="w-[80px] h-[30px] bg-[#222831] rounded-[5px] ml-[5px] text-[1.3rem]"
					onClick={() => navigate("/admin")}
				>
					Cancel
				</button>
				{popupMessage && (
					<PopupEdit msg={popupMessage} redirect="/admin" />
				)}
			</div>
		</div>
	);
}

export default SkillPost;
