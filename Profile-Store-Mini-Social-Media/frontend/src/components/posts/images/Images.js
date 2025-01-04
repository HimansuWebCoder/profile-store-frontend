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
import Modal from '@mui/material/Modal';
import "./Images.css";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // maxWidth: "370px",
  // bgcolor: 'background.paper',
  // border: '1px solid #222831',
  // borderRadius: "50px",
  // boxShadow: 24,
  p: 0,
};

const shareData = {
	title: "Profile-Store",
	url: "https://profile-store-mini-social-media.onrender.com",
};

function Images() {
	const [postImages, setPostImages] = useState([]);
	const { isDarkMode, toggleTheme } = useContext(ThemeContext);
	const [loader, setLoader] = useState(true);
	const [loader2, setLoader2] = useState(true);
	const [ showImg, setShowImg ] = useState("");
	const location = useLocation();
	// const [comment, setShowComment] = useState([]);
	const [comment, setShowComment] = useState({});
	const [toggleComment, setToggleComment] = useState(false);

	 const [open, setOpen] = useState(false);
   // const handleOpen = () => setOpen(true);
	 const handleClose = () => setOpen(false);

	const targetImg = (e) => {
       console.log(e.target.src);
       setShowImg(e.target.src);
       setOpen(true);
	}

	const targetImgId = (e) => {
		console.log(e.target)
	}

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

	function getComments(imageId) {
		fetch(`${apiUrl}/api/posts/comments/${imageId}`, {
			method: "get",
			credentials: "include"
		})
			.then((res) => res.json())
			.then((comments) => {
				console.log(comments);
				 setShowComment(comments);
				console.log({comment})
				 // setShowComment((prev) => ({ ...prev, [imageId]: comments }));
         // setToggleComment((prev) => !prev);
         // setToggleComment((prev) => ({ ...prev, [imageId]: !prev[imageId] }));
			});
	}

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
		className="max-w-full"
			style={{
			  color: isDarkMode ? "black" : "white",
			  background: isDarkMode ? "white" : "#31363F", 
			}}
			// className="max-w-[400px] h-auto sm:max-w-[100%] sm:w-auto m-auto mt-[20px] p-[10px]"
			className="max-w-[800px] sm:max-w-[500px] h-auto m-auto pb-3 mt-[20px]"
		>
			<div
				style={{
					// background: isDarkMode ? "#021526" : "#222831",
					background: isDarkMode ? "white" : "#222831",
					borderTop: isDarkMode ? "1px solid #222831" : "#222831",
					borderBottom: isDarkMode ? "1px solid #222831" : "#222831",
				}}
				className="max-w-full p-2 h-auto z-15000  flex justify-around items-center mb-[10px]"
			>
				<h1 className="text-[1.4rem] font-bold" style={{ color: isDarkMode ? "black" : "white" }}>
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
						alignItems: "center"
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
					{postImages.map((img, index) => (
						<div
							// style={{
							// 	border: isDarkMode
							// 		? "1px solid black"
							// 		: "1px solid white",
							// }}
							className="max-w-full h-full  mt-[5px]"
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
											: "#222831",
										color: isDarkMode ? "black" : "white",
										borderTop: isDarkMode ? "1px solid black" : "",
									}}
									className="max-w-full h-auto  p-[0px]"
								>
									<div
										// style={{
										// 	background: isDarkMode ? "#31363F" : "#87A2FF",
										// }}
										className="max-w-full h-[50px] flex justify-between p-[10px] mb-[20px]"
									>
										<div className="max-w-[60px] h-auto ">
										<Link to={`/home/user/photo/${img.profile_id}`}>
											<img className="max-w-[50px] aspect-square rounded-full border border-white" src={img.image} />
										</Link>
										</div>
										<div style={{width:"60%"}}>
										<h3 style={{fontSize: "1rem"}}>{img.name}</h3>
										<p style={{fontSize: "0.9rem"}}>{img.headline}</p>
										</div>
										<div>
											<Link onClick={targetImgId} to={`/home/posts/${img.image_id}`}>
											{isDarkMode ? <img
													className="max-w-[25px] "
													src="/assets/images/dot2.png"
													alt="triple dot"
												/> : <img
													className="w-[25px] max-h-[50px]"
													src="/assets/images/dot.png"
													alt="triple dot"
												/>}
												
											</Link>
											
										</div>
									</div>
									<Modal
						        open={open}
						        onClose={handleClose}
						        aria-labelledby="modal-modal-title"
						        aria-describedby="modal-modal-description"
						        // className="opacity-30"
						      >
						        <Box sx={style}>
						        <img
											className="max-w-[350px] h-[450px]  border aspect-square"
											src={showImg}
											alt="post images"
											// style={{ width: size, height: size }}
										/>
						        </Box>
						      </Modal>
									{/*<hr className="border-1 border-white-500" />*/}
									<div className="max-w-full h-auto">
										<img
										// onClick={handleOpen}
										  onClick={targetImg}
											className="w-full h-auto"
											src={img.image_url}
											alt="posted image"
										/>
									</div>
									{/*<hr className="border-1 border-white-500" />*/}
									<div
										// style={{
										// 	background: isDarkMode ? "#0B192C" : "#F5EFFF",
										// }}
										className="max-w-full h-auto flex justify-around  mt-2"
									>

										<div className="flex justify-center flex-col items-center">
											<div className="flex justify-center items-center">
											{
												isDarkMode ? <img
													onClick={() => likebtn(img.image_id)}
													className="max-w-[30px] h-[30px]"
													src="/assets/images/like2.png"
													alt="like"
												/> : <img
													onClick={() => likebtn(img.image_id)}
													className="max-w-[30px] h-[30px]"
													src="/assets/images/like4.png"
													alt="like"
												/>
											}
												
												<p className="ml-[10px] text-[1.3rem] text-shadow-[1px_5px_1px_yellow]">
													{img.likes_count}
												</p>
											</div>
											<h4>Like</h4>
										</div>
										<div className="flex justify-center flex-col items-center">
											<Link to="/home/posts/comments">
											{isDarkMode ? <img
													className="max-w-[30px] h-[30px]"
													src="/assets/images/comment2.png"
													alt="comment"
												/> : <img
													className="max-w-[30px] h-[30px]"
													src="/assets/images/comment4.png"
													alt="comment"
												/>

										  }
												
											</Link>
											<h4>Comment</h4>
											<p>{img.comment}</p>
											<button onClick={() => getComments(img.image_id)}>show comments</button>
											<Link onClick={() => getComments(img.image_id)} to={`/home/posts/comments/${img.image_id}`}>Get comments</Link>
                      

	                     <div>
	                            {comment[img.image_id]?.map((c, i) => (
							              <p key={i}>{c.comment}</p>  // Display the comment
							            ))}
	                        </div>
					             							
										</div>
										<div className="flex justify-center flex-col items-center">
										{
											isDarkMode ? <img
												onClick={handleShare}
												className="max-w-[30px] h-[30px]"
												src="/assets/images/share2.png"
												alt="share"
											/> : <img
												onClick={handleShare}
												className="max-w-[30px] h-[30px]"
												src="/assets/images/share3.png"
												alt="share"
											/>
										}
											
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
