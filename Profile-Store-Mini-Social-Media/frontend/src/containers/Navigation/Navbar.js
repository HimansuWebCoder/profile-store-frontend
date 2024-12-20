import { useContext } from "react";
import { Link } from "react-router-dom";
import Search from "../../components/Search/Search";
import Logo from "../../components/Logo/Logo";
import Setting from "../../components/Setting/Setting";
import Mode from "../../components/Mode/Mode";
import { ThemeContext } from "../../ThemeContext";

import "./Navbar.css";

function NavContainer({ mode, setMode }) {
	const { isDarkMode, toggleTheme } = useContext(ThemeContext);
	return (
		<div
			style={{ backgroundColor: isDarkMode ? "#35374B" : "#31363F" }}
			// style={{ backgroundColor: isDarkMode ? "#E2F1E7" : "#35374B" }}
			className=" p-[20px] max-w-full h-20 flex  shadow-xl justify-around items-center p-4 sticky top-0 z-800"
		>
			<Logo />
			<Search />
			{/*<Mode mode={mode} setMode={setMode} />*/}
			<Setting />
		</div>
	);
}

export default NavContainer;
