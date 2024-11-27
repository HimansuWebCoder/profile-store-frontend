import { useContext, useState, useEffect } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import ProfilePhoto from "../../components/Profile-photo/ProfilePhoto";
import ProfileInfo from "../../components/Profile-info/ProfileInfo";
import About from "../../components/add-sections/About/About";
import Skills from "../../components/add-sections/Skills/Skills";
import CircularProgress from "@mui/material/CircularProgress";
import { apiUrl } from "../../utils/utils";
import { ThemeContext } from "../../ThemeContext";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Modal from '@mui/material/Modal';
import Box from "@mui/material/Box";
import "./Admin.css";

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
  p: 0
};

function Admin() {
	const [profileImg, setProfileImg] = useState("");
	const [loading, setLoading] = useState(true);
	const [profilePhotoId, setProfilePhotoId] = useState("");
	const [images, setImages] = useState([]);
	const { isDarkMode, toggleTheme } = useContext(ThemeContext);
   const [ showImg, setShowImg ] = useState("");
	const navigate = useNavigate();
	const location = useLocation();


   const [open, setOpen] = useState(false);
  	 const handleOpen = () => setOpen(true);
	 const handleClose = () => setOpen(false);

	 const targetImg = (e) => {
   	console.log(e.target.src)
   	setShowImg(e.target.src);
   	setOpen(true);
   }

	useEffect(() => {
		const fetchProfileInfo = async () => {
			try {
				const profileInfo = await fetch(`${apiUrl}/api/profile-info`, {
					method: "get",
			        credentials: "include"
				});
				const profileInfoData = await profileInfo.json();
				// if (!profileInfoData.ok) {
				// 	alert("You are Offline");
				// }

				console.log("profile info data", profileInfoData)
			
						setImages(profileInfoData.userImages)
						console.log("all my info data", profileInfoData)
            setLoading(false)
				
			} catch (error) {
				console.error("Error fetching profile-info:", error);
				setImages([])
			}
		};
		fetchProfileInfo();
	}, [location]);

	useEffect(() => {
		fetch(`${apiUrl}/api/profile-photo`, {
			method: "get",
			credentials: "include"
		})
			.then((res) => res.json())
			.then((photo) => {
				if (photo.length > 0) {
				console.log("my profile", photo[0].id);
				console.log("profile-image", photo[photo.length - 1].image);
				setProfilePhotoId(photo[0].id);
				setTimeout(() => {
					setProfileImg(photo[0].image);
					setLoading(false);
				}, 2000);	
			  } else {
			  	alert("Login to see your admin")
			  	navigate("/")
			  }
			});
	}, [location]);

	return (
		<div
			style={{ backgroundColor: isDarkMode ? "#2D4356" : "#222831" }}
			className="admin-container"
		>
			<div className="admin-sub-container">
			<div className="max-w-full border-gray-500 p-1 border-b">
				<Link className="" to="/home/posts">
					<img className="max-w-[25px]  mt-1 ml-1" src="/assets/images/home2.png" />
				</Link>
			</div>
				<div className="flex justify-end border-b border-gray-500 p-1">
					<Link to={`/admin/file/${profilePhotoId}`}>
						<img
							className="max-w-[25px]"
							src="/assets/images/edit1.png"
							alt="Edit Profile Photo"
						/>
					</Link>
				</div>
				{/*Profile Photo Component*/}
				{loading ? (
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
						}}
					>
						<CircularProgress
							sx={{
								color: "primary", // Set the desired color here
							}}
						/>
					</Box>
				) : (
					<ProfilePhoto
						imgSrc={profileImg}
						alt="profile image"
						size="100px"
						bg="#31363F"
						// className="profile-photo-logo-container"
						className="border aspect-square rounded-full max-w-[150px]"
					/>
				)}
				<Outlet />
				<div className="sub-admin-container showinfo">
					<ProfileInfo />
				</div>
				{/*<div className="sub-admin-container add-section">
					<h3>Add-Section</h3>
					<img
						className="add-button"
						src="/assets/images/add-button.png"
						alt="section"
					/>
				</div>*/}
				<About />

				<div className="flex items-center justify-between bg-[#31363F] p-[5px] mt-[5px] border-b border-gray-500">
					<h3 className="text-[1.5rem]">Your Posts</h3>
					<Link to="/admin/create-post">
						<img
							className="add-button"
							src="/assets/images/add-button.png"
							alt="post"
						/>
					</Link>
				</div>

			{/*	<div className="w-full flex overflow-auto">
				    {images.length > 0 ? (
                 images.map((img, index) => (
                    <div key={index} className="w-[200px] h-auto flex items-center flex-row overflow-auto space-x-1 mr-2 bg-white flex-shrink-0">
                    	<img className="w-[800px] h-[200px]" src={img.image_url} alt="Image" />
                    </div>
                 	))
				    	) : (
                <p>No images uploaded yet. Add an image to make your post stand out!</p>
				    	)}
				</div>*/}

              

           <div className="w-full m-auto bg-[#31363F] flex justify-center">
         {
         	loading ? (
               <h1>Loading....</h1>
         		) : (
              <ImageList sx={{ maxWidth: 500, height: 300 , padding: "5px" }} cols={3} rowHeight={164}>
			      {images.length > 0 ? (
                images.map(img => (
                   <ImageListItem className="w-[200px] h-[400px]" key={img.id}>
                   	<img 
                   	onClick={targetImg}
                   	srcSet={`${img.image_url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                     src={`${img.image_url}?w=164&h=164&fit=crop&auto=format`}
                     alt="images"
                     loading="lazy"
                   	 />
                   </ImageListItem>
                	))
			      	) : (
                <h1 className="align-middle m-auto">No images uploaded yet. Add an image to make your post stand out!</h1>
			      	)}

			    </ImageList>
         		)
         }

         <div>
				      <Modal
				        open={open}
				        onClose={handleClose}
				        aria-labelledby="modal-modal-title"
				        aria-describedby="modal-modal-description"
				      >
				        <Box sx={style}>
				        <img src={showImg} alt="profile image"  className="max-w-[300px]  border border-white aspect-square" />
				        </Box>
				      </Modal>
				    </div>
				
           </div>
				<Skills />
			</div>
		</div>
	);
}

export default Admin;
