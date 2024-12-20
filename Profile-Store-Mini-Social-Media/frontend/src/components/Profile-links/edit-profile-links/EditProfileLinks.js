import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate, useParams } from "react-router-dom";
import PopupEdit from "../../Popup-edit/PopupEdit";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { apiUrl } from "../../../utils/utils";
import "./EditProfileLinks.css";

function EditProfileLinks() {
	const [socialLinks, setSocialLinks] = useState([]);

	// const [input, setInput] = useState("");
	const [linkedinUrlInput, setlinkedinUrlInput] = useState("");
	const [twitterUrlInput, setTwitterinUrlInput] = useState("");
	const [facebookUrlInput, setFacebookUrlInput] = useState("");
	const [instagramUrlInput, setInstagramUrlInput] = useState("");
	const [youtubeUrlInput, setYoutubeUrlInput] = useState("");
	const [githubUrlInput, setGithubUrlInput] = useState("");

	const [socialLinkId, setSocialLinksId] = useState("");
	const [popupMsg, setPopupMsg] = useState("");
	const [loader, setLoader] = useState("true");
	const location = useLocation();
	useEffect(() => {
		console.log("my edit location", location);
		fetch(`${apiUrl}/api/profile-links`, {
			method: "get",
			credentials: "include"
		})
			.then((res) => res.json())
			.then((profileLinks) => {
				setTimeout(() => {
					console.log("profile Links", profileLinks);
					console.log(profileLinks);
					setSocialLinks(profileLinks);
					setSocialLinksId(profileLinks[0].id);
					setLoader(false);
				}, 3000);
			});
	}, [location]);

	function editFacebookLink(e) {
		setFacebookUrlInput(e.target.value);
	}

	function editTwitterLink(e) {
		setTwitterinUrlInput(e.target.value);
	}

	function editLinkedinLink(e) {
		setlinkedinUrlInput(e.target.value);
	}

	function editYoutubeLink(e) {
		setYoutubeUrlInput(e.target.value);
	}

	function editGithubLink(e) {
		setGithubUrlInput(e.target.value);
	}

	function editInstagramLink(e) {
		setInstagramUrlInput(e.target.value);
	}

	function submitLink() {
		fetch(`${apiUrl}/api/profile-links/${socialLinkId}`, {
			method: "put",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				facebook_url: facebookUrlInput,
				linkedin_url: linkedinUrlInput,
				twitter_url: twitterUrlInput,
				instagram_url: instagramUrlInput,
				youtube_url: youtubeUrlInput,
				github_url: githubUrlInput,
			}),
		})
			.then((res) => res.json())
			.then((message) => {
				setPopupMsg(message.message);
				// setPopupMsg("link updated successfully!");
			});
	}

	return (
		<div className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.1)] flex justify-center z-1000">
			<div className="w-[400px] h-[600px] overflow-auto mx-auto border border-white bg-black text-white p-2 text-center">
				<div className="w-full h-auto bg-[rgba(200,22,250,0.5)] flex justify-around items-center">
					<h1>Edit profile links</h1>
					<Link to="/admin" className="text-white no-underline">
						<h3>Cancel</h3>
					</Link>
				</div>

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
					<div>
						{socialLinks.map((links) => (
							<div key={links.id}>
								<div>
									<h2>Linkedin</h2>
									<p>{links.linkedin_url}</p>
									<input
										type="text"
										value={linkedinUrlInput}
										onChange={editLinkedinLink}
									/>
								</div>

								<div>
									<h2>Twitter</h2>
									<p>{links.twitter_url}</p>
									<input
										type="text"
										value={twitterUrlInput}
										onChange={editTwitterLink}
									/>
								</div>

								<div>
									<h2>Facebook</h2>
									<p>{links.facebook_url}</p>
									<input
										type="text"
										value={facebookUrlInput}
										onChange={editFacebookLink}
									/>
								</div>

								<div>
									<h2>Instagram</h2>
									<p>{links.instagram_url}</p>
									<input
										type="text"
										value={instagramUrlInput}
										onChange={editInstagramLink}
									/>
								</div>

								<div>
									<h2>Youtube</h2>
									<p>{links.youtube_url}</p>
									<input
										type="text"
										value={youtubeUrlInput}
										onChange={editYoutubeLink}
									/>
								</div>

								<div>
									<h2>GitHub</h2>
									<p>{links.github_url}</p>
									<input
										type="text"
										value={githubUrlInput}
										onChange={editGithubLink}
									/>
								</div>
							</div>
						))}
						<button onClick={submitLink}>submit</button>
					</div>
				)}
				{popupMsg && <PopupEdit msg={popupMsg} redirect="/admin" />}
			</div>
		</div>
	);
}

export default EditProfileLinks;
