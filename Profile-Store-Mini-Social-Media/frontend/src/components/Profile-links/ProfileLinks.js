import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ProfileLinks.css";
import { apiUrl } from "../../utils/utils";

const socialMediaLinks = [
	{ name: "linkedin", icon: "/assets/images/linkedin.png" },
	// { name: "portfolio", icon: "/assets/images/portfolio.png" },
	{ name: "github", icon: "/assets/images/github.png" },
	{ name: "youtube", icon: "/assets/images/youtube.png" },
	{ name: "twitter", icon: "/assets/images/twitter.png" },
	{ name: "facebook", icon: "/assets/images/facebook.png" },
	{ name: "instagram", icon: "/assets/images/instagram.png" },
];

function ProfileLinks() {
	const [links, setLinks] = useState([]);

	useEffect(() => {
		fetch(`${apiUrl}/api/profile-links`, {
			method: "get",
			credentials: "include"
		})
			.then((res) => res.json())
			.then((profileLinks) => {
				console.log(profileLinks)
				setLinks(profileLinks);
			});
	}, []);

	return (
		<div className="w-full h-auto mx-auto">
			<div
				style={{
					maxWidth: "20px",
					height: "20px",
					margin: "auto",
					marginBottom: "10px",
				}}
			>
				<Link to="/admin/edit-profile-links">
					<img
						style={{ width: "100%", height: "100%" }}
						src="/assets/images/pencil.png"
						alt="edit pencil"
					/>
				</Link>
			</div>
			{links.map((linkData, index) => (
				<ul
					className="flex flex-wrap justify-center items-center w-full h-auto bg-[#fcf5ed] rounded-[10px] m-0 p-0 text-center"
					key={index}
				>
					{socialMediaLinks.map((socialmedia) => (
						<li
							className="list-none p-1"
							key={socialmedia.name}
							tabIndex="0"
						>
							<a
								className="inline-block text-center text-white no-underline"
								href={linkData[`${socialmedia.name}_url`]}
								target="_blank"
								rel="noreferrer"
							>
								<img
									className="w-[2rem] h-[1.4rem]"
									src={socialmedia.icon}
									alt={`${socialmedia.name} icon`}
								/>
							</a>
						</li>
					))}
				</ul>
			))}
		</div>
	);
}

export default ProfileLinks;
