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
		fetch(`${apiUrl}/all-users`, {
			method: "get",
			credentials: "include"
		})
			.then((res) => res.json())
			.then((profilesData) => {
				console.log("all users data: ", profilesData);
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
						// background: isDarkMode ? "#1e3e62" : "#243642",
						// background: isDarkMode ? "#2C3333" : "#2F3645",
						background: isDarkMode ? "#31363F" : "#31363F",
						marginTop: "10px", 
						borderTop: "1px solid white",
						borderBottom: "1px solid white"
					}}
					className="profiles-info-container"
				>
				<Link to={`/home/user/photo/${user.profile_id}`}>
					<UsersPhoto img={user.image} />
				</Link>
					<div className="w-[300px] mr-[100]">
                      <h2 className="sm:text-[2rem]">{user.name}</h2>
                      <h2 >{user.headline}</h2>
					</div>
				</div>
				))}
		  </>
			)}
		</div>
	);
}

export default Profiles;
