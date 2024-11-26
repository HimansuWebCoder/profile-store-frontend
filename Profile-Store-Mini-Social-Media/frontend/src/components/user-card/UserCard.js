import {useContext, useState,useEffect } from "react";
import { Link, useLocation, useParams, Outlet } from "react-router-dom";
import { apiUrl } from "../../utils/utils";
import CircularProgress from "@mui/material/CircularProgress";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { ThemeContext } from "../../ThemeContext";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "./UserCard.css";

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
  p: 4,
};

function UserCard() {
	// const location = useLocation();
	// const id = location.pathname.split("/")[4]
	const { id } = useParams();
	const [ userCardInfo, setUserCardInfo ] = useState("");
	const [ users, setUsers ] = useState({});
	const [userImage, setUserImage] = useState([]);
	const [images, setImages] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const { isDarkMode, toggleTheme } = useContext(ThemeContext);

	 const [open, setOpen] = useState(false);
  	 const handleOpen = () => setOpen(true);
	 const handleClose = () => setOpen(false);
    console.log("user id", id)

	useEffect(() => {
		console.log("individual user id: ", id)
	},[])

	// useEffect(() => {
	// 	const fetchProfileInfo = async () => {
	// 		try {
	// 			const profileInfo = await fetch(`${apiUrl}/api/profile-info`, {
	// 				method: "get",
	// 		        credentials: "include"
	// 			});
	// 			const profileInfoData = await profileInfo.json();
	// 			// if (!profileInfoData.ok) {
	// 			// 	alert("You are Offline");
	// 			// }

	// 			console.log("profile info data", profileInfoData)
	// 			// console.log("profile info id ", location)
	// 			setTimeout(() => {
	// 				setImages(profileInfoData)
	// 				console.log("all my info data", profileInfoData)
	// 			}, 1000);
	// 		} catch (error) {
	// 			console.error("Error fetching profile-info:", error);
	// 		}
	// 	};
	// 	fetchProfileInfo();
	// }, []);

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
	}, []);

	useEffect(() => {
		fetch(`${apiUrl}/all-users/${id}`, {
			method: "get",
			credentials: "include",
		})
		.then(res => res.json())
		.then(user => {
			setUsers(user)
			setUserImage(user.posteImages)
			console.log("specific users info:", user)
			setLoading(false)
			// console.log(user)
			// if (user.length > 0) {
			// setUsers(user);
			// } else {
			// 	alert("user not found");
			// }

		})
	}, [id])

	return (
	       
	       	loading ? (
	       		<div className="flex justify-center items-center h-screen">
				  <CircularProgress size={64} />
				</div>
				) : (
			<div style={{background: isDarkMode ? "#ECF9FF" : ""}} className="max-w-[500px]  rounded-xl h-auto  mx-auto text-white mt-5 flex justify-start items-center flex-col text-center">
				<img src={users?.profilePhoto?.[0]?.image} alt="profile image" onClick={handleOpen} className="max-w-[180px] rounded-full border border-white aspect-square" />
				<h1 className="text-[2rem] w-[100%] bg-[#222831]">{users?.user?.[0]?.name}</h1>
				<h1 className="text-[1.5rem] w-[100%] bg-[#222831] mt-[5px]">{users?.user?.[0]?.headline}</h1>
				<h1 style={{color: isDarkMode ? "black" : "",}} className="text-[2rem] w-[100%] mt-2 bg-[#222831]-500 text-white font-[Caveat] break-words">{users?.about?.[0]?.description}</h1>
				<h1 className="text-[1.2rem] w-[100%] m-2 font-bold bg-[#222831] text-white">Your Posts</h1>
				{/*<p>Skills: {users?.skill?.[1]?.skill || "No skills available"}</p>*/}
				 <div className="w-full m-auto flex justify-center">
			         {
			         	loading ? (
			               <h1>Loading....</h1>
			         		) : (
			              <ImageList sx={{ maxWidth: 500, height: 300 }} cols={3} rowHeight={164}>
						      {userImage.length > 0 ? (
			                userImage.map(img => (
			                   <ImageListItem key={img.id}>
			                   	<img 
			                   	srcSet={`${img.image_url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
			                    src={`${img.image_url}?w=164&h=164&fit=crop&auto=format`}
			                    alt="images"
			                    loading="lazy"
			                   	 />
			                   </ImageListItem>
			                	))
						      	) : (
			                <h1 style={{color: isDarkMode ? "black" : "white"}} className="align-middle m-auto ">No images uploaded yet.</h1>
						      	)}

						    </ImageList>
			         		)
			         }
				
           </div>

            <div>
				      <Modal
				        open={open}
				        onClose={handleClose}
				        aria-labelledby="modal-modal-title"
				        aria-describedby="modal-modal-description"
				      >
				        <Box sx={style}>
				        <img src={users?.profilePhoto?.[0]?.image} alt="profile image" onClick={handleOpen} className="max-w-[300px] rounded-[10px] border border-white aspect-square" />
				        </Box>
				      </Modal>
				    </div>

                <div className="w-full h-[200px] overflow-auto mt-[20px] bg-[#222831] p-[5px]">
                
				    	<h1 className="text-[1.5rem] w-full bg-[#222831] mb-2 font-bold">My skills</h1>

				    {users?.skill?.length > 0 ? users.skill.map((item, index) => (
				    	<div className="w-full h-auto overflow-auto m-auto bg-[#31363F] rounded-[1px] text-white text-center text-[1.5rem] font-bold mb-[10px]">
				        <h1 className="m-1" key={index}>{item.skill}</h1>
				       </div>
				  )) : <p>No skills available</p>}
                </div>
			</div>
	       		)
	       
	)
}

export default UserCard;

