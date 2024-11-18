import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { apiUrl } from "../../../utils/utils";
import "./CommentBox.css";
function CommentBox() {
	const [comments, setComments] = useState([]);
	const [postComments, setPostComments] = useState("");
	const [loader, setLoader] = useState(true);
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		fetch(`${apiUrl}/api/posts/comments`, {
			method: "get",
			credentials: "include"
		})
			.then((res) => res.json())
			.then((comments) => {
				setComments(comments);
				setLoader(false);
			});
	}, [location]);

	function inputComent(e) {
		setPostComments(e.target.value);
	}

	function addComment() {
		fetch(`${apiUrl}/api/posts/comments`, {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ comment: postComments }),
			credentials: "include"
		})
			.then((res) => res.json())
			.then(() => {
				fetch(`${apiUrl}/api/posts/comments`)
					.then((res) => res.json())
					.then((commentsData) => {
						setComments(commentsData);
						setPostComments("");
					});
			});
	}

	return (
		<div className="w-[100vw] h-[100vh] fixed top-0 left-0 flex justify-center p-[20px]">
			<div className="max-w-[300px] h-[200px] m-auto mt-[300px] p-[10px] bg-[#1a1a1d] text-white overflow-y-auto rounded-[10px]">
				<div className="w-full h-auto bg-[#1a1a1d] p-[10px] text-[1.5rem]">
					<Link className="text-white no-underline" to="/posts">
						Cancel
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
						<ul>
							{comments.map((comment) => (
								<li key={comment.id}>{comment.comment}</li>
							))}
						</ul>
					)}
					<input
						type="text"
						value={postComments}
						onChange={inputComent}
						placeholder="send comment"
					/>
					<button onClick={addComment}>send</button>
				</div>
			</div>
		</div>
	);
}

export default CommentBox;
