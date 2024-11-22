import { Link } from "react-router-dom";
import ProfilePhoto from "../Profile-photo/ProfilePhoto";
import "./Logo.css";

function ProfileLogo() {
	return (
		<div>
			<Link to="/admin">
				{/*<img
					className="max-w-[50px] h-[50px] rounded-[20px]\ aspect-square"
					src="/assets/images/user.png"
					alt="Profile_logo"
				/>*/}
			<ProfilePhoto className="max-w-[50px] rounded-full border aspect-square" />
			</Link>
		</div>
	);
}

export default ProfileLogo;
