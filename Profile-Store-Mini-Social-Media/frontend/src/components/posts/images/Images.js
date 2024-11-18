import { useContext, useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { apiUrl } from "../../../utils/utils";
import ProfilePhoto from "../../Profile-photo/ProfilePhoto";
import PopupEdit from "../../Popup-edit/PopupEdit";
import CommentBox from "../comments/CommentBox";
import { ThemeContext } from "../../../ThemeContext";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./Images.css";

const shareData = {
	title: "Profile-Store",
	url: "https://profile-store-mini-social-media.onrender.com",
};

function Images() {
	const [postImages, setPostImages] = useState([]);
	const { isDarkMode, toggleTheme } = useContext(ThemeContext);
	const [loader, setLoader] = useState(true);
	const [loader2, setLoader2] = useState(true);
	const location = useLocation();

	useEffect(() => {
		fetch(`${apiUrl}/api/posts/images`, {
			method: "get",
			credentials: "include"
		})
			.then((res) => res.json())
			.then((images) => {
				console.log("image posted", images);
				setTimeout(() => {
					setPostImages(images);
					setLoader(false);
				}, 1000);
			});
	}, [location]);

	useEffect(() => {
		setTimeout(() => {
			setLoader2(false);
		}, 1000);
	}, []);

	// function shareHandler() {
	// 	navigator.share(shareData);
	// }

	function handleShare() {
		if (navigator.share) {
			navigator
				.share(shareData)
				.then(() => console.log("Share successful"))
				.catch((error) => console.error("Error sharing:", error));
		} else {
			alert("Sharing is not supported on this device.");
		}
	}

	// useEffect(() => {
	// 	fetch(`${apiUrl}/api/profiles`, {
	// 		method: "get",
	// 		credentials: "include"
	// 	})
	// 		.then((res) => res.json())
	// 		.then((peopleLikes) => {
	// 			setLike(peopleLikes[1].likes_count);
	// 			console.log("peoples likes", peopleLikes)
	// 		});
	// }, []);

	function likebtn(id) {

		fetch(`${apiUrl}/api/posts/likes`, {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ like: 1, image_id: id }),
			credentials: "include"
		})
		.then(() => {
      // Refetch images to update likes_count from the database
      fetch(`${apiUrl}/api/posts/images`, {
        method: "get",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((images) => setPostImages(images));
     });
	}


	return (
		<div
			style={{ color: isDarkMode ? "black" : "white" }}
			// className="max-w-[400px] h-auto sm:max-w-[100%] sm:w-auto m-auto mt-[20px] p-[10px]"
			className="w-full sm:max-w-[400px] h-auto m-auto mt-[20px] p-[10px]"
		>
			<div
				style={{
					background: isDarkMode ? "#2C4E80" : "#00215E",
				}}
				className="max-w-full p-2 h-auto z-15000 border border-white rounded-[10px] flex justify-around items-center mb-[10px]"
			>
				<h1 className="text-[1.4rem]" style={{ color: isDarkMode ? "white" : "white" }}>
					Create Posts
				</h1>


				<Link
					className="text-white no-underline"
					to="/home/posts/create-post"
				>
					<img
						className="add-button"
						src="/assets/images/add-button.png"
						alt="create-img"
					/>
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
				<>
					{postImages.map((img) => (
						<div
							// style={{
							// 	border: isDarkMode
							// 		? "1px solid black"
							// 		: "1px solid white",
							// }}
							className="max-w-full h-full  mt-[20px]"
							key={img.image_id}
						>
							{loader2 ? (
								<Stack spacing={1}>
									<Skeleton
										animation="wave"
										variant="rectangular"
										maxWidth={400}
										height={400}
										sx={{
											borderRadius: "10px",
											background: isDarkMode
												? "primary"
												: "#E4E0E1",
										}}
									/>
								</Stack>
							) : (
								<div
									style={{
										background: isDarkMode
											? "white"
											: "white",
										color: isDarkMode ? "black" : "black",
									}}
									className="max-w-full h-auto mt-[20px]  shadow-[0.5px_0.5px_0.8px_0.5px_black] p-[10px]"
								>
									<div
										// style={{
										// 	background: isDarkMode ? "#31363F" : "#87A2FF",
										// }}
										className="max-w-full h-[50px] flex justify-between p-[10px] mb-[20px]"
									>
										<div className="max-w-[60px] h-auto">
										<Link to={`/home/user/photo/${img.profile_id}`}>
											<img style={{maxWidth: "50px", aspectRatio: "1 / 1", borderRadius: "50%"}} src={img.image} />
											{/*<UsersPhoto img={user.image} />*/}
										</Link>
										</div>
										<div style={{width:"60%"}}>
										<h3 style={{fontSize: "1rem"}}>{img.name}</h3>
										<p style={{fontSize: "0.9rem"}}>{img.headline}</p>
										</div>
										<div>
											<Link to={`/home/posts/${img.image_id}`}>
												<img
													className="w-[50px] max-h-[50px]"
													src="/assets/images/menu.png"
													alt="triple dot"
												/>
											</Link>
											
										</div>
									</div>
									<hr className="border border-black-900" />
									<div className="max-w-full h-auto">
										<img
											className="w-full h-[300px] border border-white rounded-[10px]"
											src={img.image_url}
											alt="posted image"
										/>
									</div>
									<hr className="border border-black-900" />
									<div
										// style={{
										// 	background: isDarkMode ? "#0B192C" : "#F5EFFF",
										// }}
										className="max-w-full h-auto flex justify-around"
									>
										<div className="flex justify-center flex-col items-center">
											<div className="flex justify-center items-center">
												<img
													onClick={() => likebtn(img.image_id)}
													className="max-w-[30px] h-[30px]"
													src="/assets/images/like.png"
													alt="like"
												/>
												<p className="ml-[10px] text-[1.3rem] text-shadow-[1px_5px_1px_yellow]">
													{img.likes_count}
												</p>
											</div>
											<h4>Like</h4>
										</div>
										<div className="flex justify-center flex-col items-center">
											<Link to="/home/posts/comments">
												<img
													className="max-w-[30px] h-[30px]"
													src="/assets/images/comment.png"
													alt="comment"
												/>
											</Link>
											<h4>Comment</h4>
										</div>
										<div className="flex justify-center flex-col items-center">
											<img
												onClick={handleShare}
												className="max-w-[30px] h-[30px]"
												src="/assets/images/share.png"
												alt="share"
											/>
											<h4>Share</h4>
										</div>
									</div>
								</div>
							)}
						</div>
					))}
				</>
			)}
			<Outlet />
		</div>
	);
}

export default Images;
