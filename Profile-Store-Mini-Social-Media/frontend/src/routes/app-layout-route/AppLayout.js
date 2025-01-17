import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../../containers/Layout/Layout";
import Profiles from "../../pages/Profiles/Profiles";
import ImagePosts from "../../components/posts/images/Images";
import EditPost from "../../components/posts/edit-posts/EditPost";
import EditImagePost from "../../components/posts/edit-image-posts/EditImagePost";
import CreatePost from "../../components/posts/create-posts/CreatePost";
import CommentBox from "../../components/posts/comments/CommentBox";
import Login from "../../components/Auth/Login/Login";
import Signup from "../../components/Auth/Signup/Signup";
import UserCard from "../../components/user-card/UserCard";

import "./AppLayout.css";

function AppLayout({ mode, setMode }) {
	return (
		<div className="text-black" className="app_container">
			<Routes>
				<Route
					path="/"
					element={<Layout mode={mode} setMode={setMode} />}
				>
					<Route path="profiles" element={<Profiles />} />
					<Route path="login" element={<Login />} />
					<Route path="signup" element={<Signup />} />
					<Route path="user/photo/:id" element={<UserCard />} />
					<Route path="posts" element={<ImagePosts />}>
						<Route path=":id" element={<EditPost />} />
						<Route path="edit/:id" element={<EditImagePost />} />
						<Route path="create-post" element={<CreatePost />} />
						<Route path="comments/:id" element={<CommentBox />} />
					</Route>
				</Route>
			</Routes>
		</div>
	);
}

export default AppLayout;
