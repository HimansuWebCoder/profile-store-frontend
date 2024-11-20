import { useState,useEffect } from "react";
import { Link, useLocation, useParams, Outlet } from "react-router-dom";
import { apiUrl } from "../../utils/utils";
import CircularProgress from "@mui/material/CircularProgress";
import "./UserCard.css";

function UserCard() {
	// const location = useLocation();
	// const id = location.pathname.split("/")[4]
	const { id } = useParams();
	const [ userCardInfo, setUserCardInfo ] = useState("");
	const [ users, setUsers ] = useState({});
	const [images, setImages] = useState([]);
	const [ loading, setLoading ] = useState(true);
    console.log("user id", id)

	useEffect(() => {
		console.log("individual user id: ", id)
	},[])

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
				// console.log("profile info id ", location)
				setTimeout(() => {
					setImages(profileInfoData)
					console.log("all my info data", profileInfoData)
				}, 1000);
			} catch (error) {
				console.error("Error fetching profile-info:", error);
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
			<div className="max-w-[500px] border rounded-xl h-auto p-2 mx-auto text-white mt-5 flex justify-start items-center flex-col text-center">
				<img src={users?.profilePhoto?.[0]?.image} alt="profile image" className="rounded-full aspect-square" />
				<h1 className="text-[2rem] w-[100%] bg-black">{users?.user?.[0]?.name}</h1>
				<h1 className="text-[1.5rem] w-[100%] bg-black mt-[5px]">{users?.user?.[0]?.headline}</h1>
				<h1 className="text-[1.2rem] w-[100%] mt-2 bg-blue-500">{users?.about?.[0]?.description}</h1>
				<h1 className="text-[1.2rem] w-[100%] m-2 font-bold bg-white text-black">My Posts</h1>
				{/*<p>Skills: {users?.skill?.[1]?.skill || "No skills available"}</p>*/}
				<div className="w-full flex overflow-auto">
				  {
				    users?.posteImages?.length > 0 && users.posteImages.map((img, index) => (
				      <div key={index} className="w-[200px] h-auto flex items-center flex-row overflow-auto space-x-1 mr-2 bg-white flex-shrink-0">
				        <img className="w-[800px] h-[200px]" src={img.image_url} alt="images" />
				      </div>
				    ))
				  }
				</div>


				<p className="text-[1.2rem] w-[100%] bg-green-500 mt-[10px]">
				  Skills: {users?.skill?.length > 0 ? users.skill.map((item, index) => (
				    <span key={index}>{item.skill}{index < users.skill.length - 1 && ', '}</span>
				  )) : "No skills available"}
				</p>
			</div>
	       		)
	       
	)
}

export default UserCard;