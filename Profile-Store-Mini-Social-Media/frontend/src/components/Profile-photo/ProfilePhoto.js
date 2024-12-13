import { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { apiUrl } from "../../utils/utils";
import { ThemeContext } from "../../ThemeContext";
import { ProfilePhotoContext } from "../../ProfilePhotoContext";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import "./ProfilePhoto.css";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // maxWidth: "370px",
  // bgcolor: 'background.paper',
  // border: '1px solid #222831',
  // borderRadius: "50px",
  // boxShadow: 24,
  p: 0,
};

function ProfilePhoto({ imgSrc, alt, size, bg, className }) {
	// const [profileImg, setProfileImg] = useState("");
	const { isDarkMode, toggleTheme } = useContext(ThemeContext);
	const { profilePhoto, loading } = useContext(ProfilePhotoContext);

	 const [open, setOpen] = useState(false);
  	 const handleOpen = () => setOpen(true);
	 const handleClose = () => setOpen(false);


	return (
		<div
			className=" flex justify-center  rounded-tl-3xl rounded-br-3xl mt-2"
			style={{ background: bg }}
		>
			<div className="mb-[1px]">
				<Link
					style={{ textDecoration: "none" }}
					id="admin-link-profile"
					to="/admin"
				>
					<img
					    onClick={handleOpen}
						className={`${className}`}
						src={profilePhoto}
						alt={alt}
						// style={{ width: size, height: size }}
					/>
				</Link>

				<Modal
				        open={open}
				        onClose={handleClose}
				        aria-labelledby="modal-modal-title"
				        aria-describedby="modal-modal-description"
				      >
				        <Box sx={style}>
				        <img
									className="max-w-[300px] h-auto rounded-[10px] aspect-square"
									src={profilePhoto}
									alt={alt}
						      // style={{ width: size, height: size }}
					/>
				        </Box>
				      </Modal>
			</div>
		</div>
	);
}

export default ProfilePhoto;
