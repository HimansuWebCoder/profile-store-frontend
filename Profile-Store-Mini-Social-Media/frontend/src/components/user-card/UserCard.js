import { useState,useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { apiUrl } from "../../utils/utils";
import "./UserCard.css";

function UserCard() {
	const [ userCardInfo, setUserCardInfo ] = useState("");
	const [ users, setUsers ] = useState({});
	const location = useLocation();
	const userId = location.pathname.split("/")[2]


	useEffect(() => {
		console.log(userId)
	},[])

	useEffect(() => {
		fetch(`${apiUrl}/all-users/${userId}`, {
			method: "get",
			credentials: "include",
		})
		.then(res => res.json())
		.then(user => {
			setUsers(user)
			// console.log(user)
			// if (user.length > 0) {
			// setUsers(user);
			// } else {
			// 	alert("user not found");
			// }

		})
	}, [])

	return (
		<div className="usercard-container">
			<img src={users?.profilePhoto?.[0]?.image} alt="profile image" className="rounded-full aspect-square" />
			<h1 className="text-[2rem] bg-black">{users?.user?.[0]?.name}</h1>
			<h1 className="text-[1.5rem] bg-black mt-[5px]">{users?.user?.[0]?.headline}</h1>
			<h1 className="text-[1.2rem] bg-blue-500">{users?.about?.[0]?.description}</h1>
			{/*<p>Skills: {users?.skill?.[1]?.skill || "No skills available"}</p>*/}
			<p className="text-[1.2rem] bg-green-500 mt-[10px]">
			  Skills: {users?.skill?.length > 0 ? users.skill.map((item, index) => (
			    <span key={index}>{item.skill}{index < users.skill.length - 1 && ', '}</span>
			  )) : "No skills available"}
			</p>
		</div>
	)
}

export default UserCard;