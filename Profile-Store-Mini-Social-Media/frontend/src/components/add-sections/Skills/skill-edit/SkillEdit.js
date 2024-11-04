import { useState, useEffect } from "react";
import { apiUrl } from "../../../../utils/utils";
import { useLocation, useNavigate } from "react-router-dom";
import PopupEdit from "../../../Popup-edit/PopupEdit";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./SkillEdit.css";

function SkillEdit() {
	const [skills, setSkills] = useState([]);
	const [deleteSkill, setDeleteSkill] = useState("");
	const [loading, setLoading] = useState(true);
	const [skillId, setSkillId] = useState("");
	const [popupMessage, setPopupMessage] = useState(null);
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		fetch(`${apiUrl}/api/skills`)
			.then((res) => res.json())
			.then((skillsData) => {
				console.log("skills data:", skillsData);
				setTimeout(() => {
					setSkills(skillsData);
					setLoading(false);
				}, 1000);
			});
	}, [location]);

	function DeleteSkill(id) {
		fetch(`${apiUrl}/api/skills/${id}`, {
			method: "delete",
		})
			.then((res) => res.json())
			.then((deletedSkillData) => {
				setPopupMessage(deletedSkillData.message);
			});
	}

	return (
		<div className="fixed top-0 left-0 w-screen h-screen z-[100] rounded-[10px] bg-[rgba(0,20,50,0.4)] text-white flex justify-center items-center">
			{loading ? (
				<Box
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
				<div className="w-[500px] h-[400px] overflow-auto text-[1rem] text-center bg-[rgba(0,0,0,0.7)] p-[10px] rounded-[10px]">
					<h1>Edit your skills</h1>
					{skills.map((skill) => (
						<>
							<p className="text-[1.5rem]" key={skill.id}>
								{skill.skill}
							</p>
							<button
								className="w-[50px] h-[30px] ml-[10px] cursor-pointer rounded-[5px] border-none"
								onClick={() => DeleteSkill(skill.id)}
							>
								<img
									className="w-full h-full"
									src="/assets/images/delete.png"
									alt="delete skills"
								/>
							</button>
							<button
								className="w-[50px] h-[30px] ml-[10px] cursor-pointer rounded-[5px] border-none"
								onClick={() => navigate("/admin")}
							>
								<img
									className="w-full h-full"
									src="/assets/images/cancel1.png"
									alt="cancel"
								/>
							</button>
						</>
					))}
					{popupMessage && (
						<PopupEdit msg={popupMessage} redirect="/admin" />
					)}
				</div>
			)}
		</div>
	);
}

export default SkillEdit;
