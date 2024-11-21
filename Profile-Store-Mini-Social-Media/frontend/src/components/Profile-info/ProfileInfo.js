import React, { useState, useEffect, Suspense } from "react";
import { useLocation, Link } from "react-router-dom";
import "./ProfileInfo.css";
import { apiUrl } from "../../utils/utils";
import ProfileLinks from "../Profile-links/ProfileLinks";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function ProfileInfo() {
	const [name, setName] = useState("");
	const [headline, setHeadline] = useState("");
	const [loader, setLoader] = useState(true);

	const [profileId, setProfileId] = useState(null);
	const location = useLocation();

	useEffect(() => {
		const fetchProfileInfo = async () => {
			try {
				const profileInfo = await fetch(`${apiUrl}/api/profile-info`, {
					method: "get",
					credentials: "include"
				});
				const profileInfoData = await profileInfo.json();
				// if (!profileInfoData.ok) {
				// 	alert("You are Offline");
				// }
				setTimeout(() => {
					setName(profileInfoData.userinfo[0].name);
					setHeadline(profileInfoData.userinfo[0].headline);
					setProfileId(profileInfoData.userinfo[0].profile_id);
					setLoader(false);
				}, 1000);
			} catch (error) {
				console.error("Error fetching profile-info:", error);
			}
		};
		fetchProfileInfo();
	}, [setProfileId, location]);

	return (
		<div className="w-full h-auto mt-2  text-center  text-[1.5rem] text-white break-words flex justify-center flex-col">
			<Link to={`/admin/profile-info/${profileId}/edit`}>
				<img
					className="max-w-[25px] m-auto "
					src="/assets/images/edit1.png"
					alt="editinfo"
				/>
			</Link>
			{loader ? (
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
				<>
					<h1 className="leading-[0.1] pt-7 text-4xl">{name}</h1>
					<h3 className="leading-[3]">{headline}</h3>
					{/*<ProfileLinks />*/}
				</>
			)}
		</div>
	);
}

export default ProfileInfo;
