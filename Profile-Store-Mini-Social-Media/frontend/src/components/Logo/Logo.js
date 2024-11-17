import "./Logo.css";
import { Link } from "react-router-dom";

function ProfileLogo() {
	return (
		<div className="w-[50px] h-[50px]">
			<Link to="/admin">
				<img
					className="max-w-[40px] h-[50px] rounded-[20px]"
					src="/assets/images/user.png"
					alt="Profile_logo"
				/>
			</Link>
		</div>
	);
}

export default ProfileLogo;
