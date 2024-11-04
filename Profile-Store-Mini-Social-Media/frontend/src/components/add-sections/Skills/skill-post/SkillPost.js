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
			body: JSON.stringify({ skill: skillInput }),
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
		<div className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.4)] flex justify-center">
			<div className="w-[600px] h-[300px] bg-[rgba(0,0,30,1)] mt-[50px] text-center rounded-[20px]">
				<h1 style={{ color: "white" }}>Post Skills</h1>
				<input
					className="w-[200px] h-[30px] rounded-[10px] text-[1.2rem]"
					type="text"
					value={skillInput}
					placeholder="Add your skills"
					ref={inputRef}
					onChange={(e) => setSkillInput(e.target.value)}
				/>
				<button
					className="w-[100px] h-[30px] rounded-[5px] ml-[5px] text-[1.3rem]"
					onClick={handleSubmit}
				>
					add
				</button>
				<button
					className="w-[100px] h-[30px] rounded-[5px] ml-[5px] text-[1.3rem]"
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
