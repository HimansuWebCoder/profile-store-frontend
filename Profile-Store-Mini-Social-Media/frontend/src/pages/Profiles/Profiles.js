import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "../../utils/utils";
import { ThemeContext } from "../../ThemeContext";
import "./Profiles.css";
import ProfilePhoto from "../../components/Profile-photo/ProfilePhoto";
import CircularProgress from "@mui/material/CircularProgress";
import UsersPhoto from "../../components/users-photos/UsersPhoto";


function Profiles({ mode, setMode }) {
	// const [profileName, setProfileName] = useState("");
	// const [profileIntro, setProfileIntro] = useState("");
		const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const { isDarkMode, toggleTheme } = useContext(ThemeContext);

	useEffect(() => {
		fetch(`${apiUrl}/api/profile-info`, {
			method: "get",
			credentials: "include"
		})
			.then((res) => res.json())
			.then((profilesData) => {
				console.log(profilesData);
				setTimeout(() => {
					// setProfileName(profilesData[0].name);
					// setProfileIntro(profilesData[0].headline);
					setUsers(profilesData);
					setLoading(false);
				}, 1000);
			});
	}, []);

	return (
		<div className="profiles-container">
			{loading ? (
				<CircularProgress />
			) : (
				<>
			{users.map(user => (
				<div
					style={{
						color: isDarkMode ? "white" : "white",
						background: isDarkMode ? "#1e3e62" : "#1F2544",
						marginTop: "10px"
					}}
					className="profiles-info-container"
				>
					<ProfilePhoto
						imgSrc={user.image} 
						alt="profile image"
						size="auto"
						bg="none"
						className="profile-main-img-container"
					/>
					<UsersPhoto />
					<div>
                      <h2 >{user.name}</h2>
                      <h2 >{user.headline}</h2>
                      <img src={user.image} alt="not found" />      
					</div>
				</div>
				))}
		  </>
			)}
		</div>
	);
}

export default Profiles;
