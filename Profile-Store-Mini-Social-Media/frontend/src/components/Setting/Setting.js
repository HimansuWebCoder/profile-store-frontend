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
		<div className="setting-container">
			<img onClick={settingBoxOpen} src="/assets/images/setting.png" />
			{showSettingBox && (
				<div className="toggle-setting-box">
					<Mode /> {/* Assuming Mode is a defined component */}
					<h3>Feedback</h3>
					<h3><Link to="/">Logout</Link></h3>
				</div>
			)}
		</div>
	);
}

export default ProfileSetting;
