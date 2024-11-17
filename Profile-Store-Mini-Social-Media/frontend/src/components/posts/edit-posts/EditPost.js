import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { upload } from "../../upload/Upload";
import { apiUrl } from "../../../utils/utils";
import "./EditPost.css";

function EditPost({ redirectTo }) {
	const [editPost, setEditPost] = useState("");
	const location = useLocation();
	const navigate = useNavigate();
	const id = location.pathname.split("/")[2];
	useEffect(() => {
		console.log(location.pathname.split("/")[2]);
	}, []);

	function deletePost() {
		fetch(`${apiUrl}/api/posts/images/${id}`, {
			method: "delete",
			credentials: "include"
		}).then(() => {
			navigate("/posts");
		});
	}

	function editImagePost() {
		fetch(`${apiUrl}/api/posts/images/${id}`, {
			method: "put",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ image_url: editPost }),
			credentials: "include"
		});
	}

	return (
		<div className="w-[200px] h-auto border border-black rounded-[10px] fixed top-[100px] bg-white text-black right-[10px]">
			<div className="flex flex-col justify-center items-around">
				<div className="m-auto">
					<Link className="no-underline" to="/posts">
						Cancel
					</Link>
				</div>
				<div className="flex justify-around items-center">
					<Link to={`/home/posts/edit/${id}`}>
						<img
							className="w-[40px] h-[40px]"
							src="/assets/images/pencil.png"
							alt="edit.png"
						/>
					</Link>
					<h4>Edit</h4>
				</div>
				<div className="flex justify-around items-center">
					<img
						onClick={deletePost}
						className="w-[40px] h-[40px]"
						src="/assets/images/delete.png"
						alt="delete.png"
					/>
					<h4>Delete</h4>
				</div>
			</div>
			<Outlet />
		</div>
	);
}

export default EditPost;
