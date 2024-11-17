import { useState,useEffect } from "react";
import { Link, useLocation, useParams, Outlet } from "react-router-dom";
import { apiUrl } from "../../utils/utils";
import CircularProgress from "@mui/material/CircularProgress";
import "./UserCard.css";

function UserCard() {
	const [ userCardInfo, setUserCardInfo ] = useState("");
	const [ users, setUsers ] = useState({});
	const [ loading, setLoading ] = useState(true);
	const location = useLocation();
	// const userId = location.pathname.split("/")[3]
	const {id} = useParams();


	useEffect(() => {
		console.log(id)
	},[])

	useEffect(() => {
		fetch(`${apiUrl}/all-users/${id}`, {
			method: "get",
			credentials: "include",
		})
		.then(res => res.json())
		.then(user => {
			setUsers(user)
			console.log(user)
			setLoading(false)
			// console.log(user)
			// if (user.length > 0) {
			// setUsers(user);
			// } else {
			// 	alert("user not found");
			// }

		})
	}, [])

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
				{/*<p>Skills: {users?.skill?.[1]?.skill || "No skills available"}</p>*/}
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