import { Link } from "react-router-dom";
import { apiUrl } from "../../utils/utils";
import { useState, useEffect } from "react";
import "./PopupEdit.css";

function PopupEdit({ msg, redirect }) {
	const [loader, setLoader] = useState(true);
	useEffect(() => {
		if (msg) {
			setTimeout(() => setLoader(false), 1000);
		}
	}, [msg]);

	// this is also working but above it better method because of msg coming and check condition
	// useEffect(() => {
	// 	setLoader(false);
	// }, 1000);

	return (
		<div className="w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.4)] text-white fixed top-0 left-0 text-center">
			{loader ? (
				<h2 id="popup-edit-header-loader">Loading...</h2>
			) : (
				<div className="max-w-[400px] h-auto bg-black text-white m-auto p-[10px] rounded-[20px] mt-[80px] flex items-center justify-between">
					<img
						className="max-w-[40px] h-[40px]"
						src="/assets/images/check.png"
						alt="check"
					/>
					<p>{msg}</p>
					<Link
						className="text-white no-underline bg-red-500 rounded-[50px]"
						to={redirect}
					>
						<img
							className="max-w-[40px] h-[40px]"
							src="/assets/images/cancel.png"
							alt="cancel popup"
						/>
					</Link>
				</div>
			)}
		</div>
	);
}

export default PopupEdit;
