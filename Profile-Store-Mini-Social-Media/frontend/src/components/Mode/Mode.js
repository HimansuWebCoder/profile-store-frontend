import { useContext, useState } from "react";
import { ThemeContext } from "../../ThemeContext";
import "./Mode.css";

function SystemMode({ mode, setMode }) {
	const { isDarkMode, toggleTheme } = useContext(ThemeContext);

	// let image;
	// const toggleMode = () => {
	// 	setMode(mode === "black" ? "white" : "black");
	// };

	// if (mode === "white") {
	// 	image = <img className="toggle-img" src="/assets/images/sun.png" />;
	// } else {
	// 	image = <img className="toggle-img" src="/assets/images/moon.png" />;
	// }

	return (
		<div className="max-w-[50px] h-[50px]">
			<button
				className="w-[50px] h-[50px] cursor-pointer bg-transparent border-none"
				onClick={toggleTheme}
			>
				{isDarkMode ? (
					<img
						className="w-full h-full"
						src="/assets/images/sun.png"
					/>
				) : (
					<img
						className="w-full h-full"
						src="/assets/images/moon.png"
					/>
				)}
			</button>
		</div>
	);
}

export default SystemMode;
