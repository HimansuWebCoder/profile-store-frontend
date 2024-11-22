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
		<div className="w-[30%] h-[50px]   mt-[0px] flex-col">
			<img onClick={settingBoxOpen} src="/assets/images/setting.png" />
			{showSettingBox && (
				<div className="w-[100%] max-w-screen-sm max-w-sm max-w-screen-sm p-2 mt-2 flex justify-center flex-col items-center border rounded-[5px] text-white bg-[#222831]">
					<Mode /> 
					<h3 className="sm:text-[1.5rem] text-[0.7rem] text-base">Feedback</h3>
					<h3 className="sm:text-[1.5rem] text-[0.8rem]"><Link to="/">Logout</Link></h3>
				</div>
			)}
		</div>
	);
}

export default ProfileSetting;
