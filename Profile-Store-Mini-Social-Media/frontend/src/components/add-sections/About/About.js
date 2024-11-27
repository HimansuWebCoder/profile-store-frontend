import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { apiUrl } from "../../../utils/utils";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./About.css";

function About() {
	const [about, setAbout] = useState("");
	const [aboutId, setAboutId] = useState("");
	const [loading, setLoading] = useState(true);
	const location = useLocation();
	const pathname = location.pathname;
	useEffect(() => {
		fetch(`${apiUrl}/api/about`, {
			method: "get",
			credentials: "include"
		})
			.then((res) => res.json())
			.then((aboutData) => {
				console.log("about location", location);
				console.log("about data", aboutData);
				setTimeout(() => {
					setAbout(aboutData[0].description);
					setAboutId(aboutData[0].profile_id);
					setLoading(false);
				}, 1000);
			});
	});

	return (
		<div>
			<div className="sub-admin-container flex flex-col">
				<div className="flex justify-between items-start  p-2  bg-[#31363F] mt-[10px]">
					<h3 className="text-[1.5rem]">About</h3>
					<Link
						className="cursor-pointer"
						to={`/admin/about/${aboutId}`}
					>
						<img
							className="max-w-[25px]"
							src="/assets/images/edit1.png"
							alt="editinfo"
						/>
					</Link>
				</div>
				{/*<p>{about}</p>*/}

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
				<div className="">
					<p className="text-white bg-[#31363F] p-3 text-[1.2rem] break-words">
						{about}
					</p>
				</div>
				)}
			</div>
		</div>
	);
}

export default About;
