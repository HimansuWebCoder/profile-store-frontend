import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../Navigation/Navbar";
import Profiles from "../../pages/Profiles/Profiles";
import Images from "../../components/posts/images/Images";
import CreatePost from "../../components/posts/create-posts/CreatePost";
import { ThemeContext } from "../../ThemeContext";
import "./Layout.css";

function Layout({ mode, setMode }) {
	const { isDarkMode, toggleTheme } = useContext(ThemeContext);

	return (
		<div className="h-auto">
			<Navbar mode={mode} setMode={setMode} />
			<div
				style={{
					background: isDarkMode ? "#31363F" : "#222831",
				}}
				// className="max-w-full h-auto border-2 border-white flex justify-center"
				className="flex max-w-[100vw] p-2 font-bold  justify-center items-center h-auto"
				// className="layout-block-box"
			>
				{/*<Profiles mode={mode} setMode={setMode} />*/}
				<Link className="border-r border-l mr-5 p-1"
					style={{
						color: isDarkMode ? "red" : "white",
						background: isDarkMode ? "white" : "#31363F",
						borderLeft: isDarkMode ? "1px solid white" : "1px solid white",
						borderRight: isDarkMode ? "1px solid white" : "1px solid white",
						textDecoration: "none",
					}}
					to="/home/profiles"
				>
					Profiles
				</Link>
				<Link
				    className="border-l border-r p-1"
					style={{
						color: isDarkMode ? "red" : "white",
						background: isDarkMode ? "white" : "#31363F",
						textDecoration: "none",
						borderLeft: isDarkMode ? "1px solid white" : "1px solid white",
						borderRight: isDarkMode ? "1px solid white" : "1px solid white"
					}}
					to="/home/posts"
				>
					Posts
				</Link>
				{/*<Images />*/}
				{/*<EditPost />*/}
			</div>
			<Outlet />
		</div>
	);
}

export default Layout;
