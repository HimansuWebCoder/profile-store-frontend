import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { apiUrl } from "../../../utils/utils";
import "./CommentBox.css";
function CommentBox(message) {
	const [comments, setComments] = useState([]);
	const [postComments, setPostComments] = useState("");
	const [loader, setLoader] = useState(true);
	const location = useLocation();
	const navigate = useNavigate();
	const imageId = location.pathname.split("/")[4];

console.log("comment image id", imageId)

	useEffect(() => {
		fetch(`${apiUrl}/api/posts/comments/${imageId}`, {
			method: "get",
			credentials: "include"
		})
			.then((res) => res.json())
			.then((comments) => {
				setComments(comments);
				setLoader(false);
				console.log("all comments data", comments)
			});
	}, [location]);

	function inputComent(e) {
		setPostComments(e.target.value);
	}

	// function addComment() {
	// 	fetch(`${apiUrl}/api/posts/comments/${imageId}`, {
	// 		method: "post",
	// 		headers: { "Content-Type": "application/json" },
	// 		body: JSON.stringify({ comment: postComments }),
	// 		credentials: "include"
	// 	})
	// 		.then((res) => res.json())
	// 		.then(() => {
	// 			fetch(`${apiUrl}/api/posts/comments/${imageId}`)
	// 				.then((res) => res.json())
	// 				.then((commentsData) => {
	// 					setComments(commentsData);
	// 					setPostComments("");
	// 					console.log("all comments data", commentsData)
	// 				});
	// 		});
	// }


	function addComment() {
		fetch(`${apiUrl}/api/posts/comments/${imageId}`, {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ comment: postComments }),
			credentials: "include"
		})
	}

	return (
		<div className="w-[100vw] h-[100vh] fixed top-0 left-0 flex justify-center p-[20px]">
			<div className="w-[500px] h-[500px] m-auto mt-[100px] p-[10px] bg-[#31363F] text-white overflow-y-auto rounded-[10px]">
				<div className="w-full flex justify-end items-end pr-1 h-[auto]  text-[1.5rem]">
					<Link className="text-white no-underline" to="/home/posts">
						{/*Cancel*/}
					<img src="/assets/images/cancel.png" className="max-w-[20px]" />
					</Link>
				</div>
				<div>
					<h1>Comment box</h1>

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
							{comments.map((comment) => (
								<div className="w-auto h-auto mt-3 mb-3 border-b border-gray-500 flex" key={comment.id}>
								<img className="w-[50px] h-[50px] rounded-full" src={comment.image} alt={comment.profile_email} />
								<div>
									{/*<p>{comment.profile_email}</p>*/}
									<p className="text-[0.8rem]">{comment.name}</p>
									<p className="text-[0.7rem]">{comment.headline}</p>
									<p>{comment.comment}</p>
								</div>
								</div>
							))}
						</div>
					)}
					<div className="w-full flex justify-between">
					<input
						type="text"
						value={postComments}
						onChange={inputComent}
						placeholder=" comment"
						className="text-black mt-1 rounded"
					/>

					<button className="ml-2" onClick={addComment}>
						<img src="/assets/images/send.png" className="max-w-[20px]" />
					</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CommentBox;
