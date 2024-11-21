import { useContext, useState, useEffect } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import ProfilePhoto from "../../components/Profile-photo/ProfilePhoto";
import ProfileInfo from "../../components/Profile-info/ProfileInfo";
import About from "../../components/add-sections/About/About";
import Skills from "../../components/add-sections/Skills/Skills";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { apiUrl } from "../../utils/utils";
import { ThemeContext } from "../../ThemeContext";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import "./Admin.css";

function Admin() {
	const [profileImg, setProfileImg] = useState("");
	const [loading, setLoading] = useState(true);
	const [profilePhotoId, setProfilePhotoId] = useState("");
	const [images, setImages] = useState([]);
	const { isDarkMode, toggleTheme } = useContext(ThemeContext);
	const navigate = useNavigate();
	const location = useLocation();

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
				if (profileInfoData.length > 0) {
						setImages(profileInfoData.userImages)
						console.log("all my info data", profileInfoData)
				} else {
					setImages(profileInfoData.userImages)
					// console.log("not found")
					// setImages([])
				}
				
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
			style={{ backgroundColor: isDarkMode ? "#395B64" : "#222831" }}
			className="admin-container"
		>
			<div className="admin-sub-container">
				<Link id="home-link" to="/home">
					<img id="home-route" src="/assets/images/home.png" />
				</Link>
				<div className="sub-admin-container editProfilePhoto">
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
						className="profile-photo-logo-container"
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

				<div className="flex items-center justify-between bg-[#31363F] p-[5px] mt-[5px] mb-[5px]">
					<h3>My Posts</h3>
					<Link to="/admin/create-post">
						<img
							className="add-button"
							src="/assets/images/add-button.png"
							alt="post"
						/>
					</Link>
				</div>
				{/*<div className="w-full flex overflow-auto">*/}
{/*				{
  images.length > 0 ? (
    images.map((img, index) => (
      <div key={index} className="w-[200px] h-auto flex items-center flex-row overflow-auto space-x-1 mr-2 bg-white flex-shrink-0">
        {img?.image_url ? (
          <img className="w-[800px] h-[200px]" src={img.image_url} alt="Image" />
        ) : (
          <p>{img?.Status || "Image not yet posted"}</p>  
        )}
      </div>
    ))
  ) : (
    <p>No images found</p> 
  )
}
*/}
					

				
				{/*</div>*/}

              

               	{images.length > 0 ? (
				<ImageList sx={{ width: 500, height: 300 }} cols={3} rowHeight={164}>
			      {images.map((img) => (
			        <ImageListItem key={img.image_id}>
			        {img?.image_url ? (
			          <img
			            srcSet={`${img.image_url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
			            src={`${img.image_url}?w=164&h=164&fit=crop&auto=format`}
			            alt="image"
			            loading="lazy"
			          />
			        	) : (
                         <p>{img?.Status || "Image not yet posted"}</p>
			        	)}
			        </ImageListItem>
			      ))}
			    </ImageList>
			    ) : (
                 <p>Not posted yet!</p>
			    )
               }
				<Skills />
			</div>
		</div>
	);
}

export default Admin;
