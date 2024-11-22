import Logo from "../../components/Logo/Logo"
import Signup from "../../components/Auth/Signup/Signup"
import Login from "../../components/Auth/Login/Login"
import { Link } from "react-router-dom";
import "./Welcome.css";

function Welcome() {
	return (
     <div className="max-w-[100%] h-auto p-1 text-white bg-[#1E201E] ">
     	<nav className="flex justify-between items-center bg-[#1E201E] border-b border-1 border-gray-500 h-auto w-[100%]">
     	<div className='ml-5 w-[50%]'>
     		{/*<Logo />*/}
     	    <img src="/assets/images/Profile_Logo.png" className="max-w-[80px] h-auto m-2" />
     	</div>
     		<div className="w-[100%]">
     			<ul className="flex justify-center flex-wrap items-center w-[100%]">
     				<li className="mr-5">About</li>
     				<li className="mr-5">Explore</li>
     				<li className="mr-5">
     				<button className="bg-[#31363F] max-w-[auto] h-auto p-1 rounded">Signup</button>
     				</li>
     				<li className="mr-5">
     				<button className="bg-[#31363F] max-w-[auto] p-1 rounded"><Link to="/home">Login</Link></button>
     				</li>
     			</ul>

     		</div>
     	</nav>
	     			{/*<div className="text-center text-[2rem] bg-violet-500 mt-2">
	     				<h1>Welcome To Profile-Store</h1>
	     				<h1>A Mini Social Media Site Fun Platform</h1>
	     			</div>*/}
     			<div>
     				<Signup/>
     				<div className="m-auto font-bold w-[50px]">OR</div>
     				<Login/>
     			</div>
     </div>
	)
}


export default Welcome;
