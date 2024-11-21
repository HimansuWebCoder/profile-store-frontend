import { useState, useEffect } from "react";
import { Link, Outlet, useParams, useLocation, useNavigate } from "react-router-dom";
import { upload } from "../../upload/Upload";
import { apiUrl } from "../../../utils/utils";
import "./EditPost.css";

function EditPost({ redirectTo }) {
	const [editPost, setEditPost] = useState("");
	const location = useLocation();
	const navigate = useNavigate();
	const { id } = useParams();
	// const id = location.pathname.split("/")[2];
	// useEffect(() => {
	// 	console.log(location.pathname.split("/")[2]);
	// }, []);

	function deletePost() {
		fetch(`${apiUrl}/api/posts/images/${id}`, {
			method: "delete",
			credentials: "include"
		}).then(() => {
			navigate("/home/posts");
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
		<div className="w-[200px] h-auto border  rounded-[4px] fixed top-[100px] bg-[#222831] text-black right-[10px] p-2">
			<div className="flex flex-col justify-center items-center">
				<div className="m-auto text-white mr-2">
					<Link className="no-underline" to="/home/posts">
						<img src="/assets/images/cancel.png" className="max-w-[20px]" />
					</Link>
				</div>
				<div className="flex justify-around items-center mb-2">
					<Link to={`/home/posts/edit/${id}`}>
						<img
							className="w-[30px] h-[30px] mr-1"
							src="/assets/images/edit1.png"
							alt="edit.png"
						/>
					</Link>
					<h4 className="text-white">Edit</h4>
				</div>
				<div className="flex justify-around items-center">
					<img
						onClick={deletePost}
						className="w-[30px] h-[30px] mr-1"
						src="/assets/images/delete.png"
						alt="delete.png"
					/>
					<h4 className="text-white">Delete</h4>
				</div>
			</div>
			<Outlet />
		</div>
	);
}

export default EditPost;
