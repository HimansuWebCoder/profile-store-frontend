import { useState } from "react";
import { Link } from "react-router-dom";
import Mode from "../Mode/Mode";
import "./Setting.css";

function ProfileSetting() {
	const [showSettingBox, setshowSettingBox] = useState(false);

	function settingBoxOpen() {
		setshowSettingBox((prev) => !prev);
	}

	return (
		<div className="max-w-[80px] h-[50px]">
			<img onClick={settingBoxOpen} src="/assets/images/setting.png" />
			{showSettingBox && (
				<div className="max-w-[150px] p-2 mt-2 flex justify-center flex-col items-center border rounded-[5px] text-white bg-[#222831]">
					<Mode /> 
					<h3>Feedback</h3>
					<h3><Link to="/">Logout</Link></h3>
				</div>
			)}
		</div>
	);
}

export default ProfileSetting;
