import Logo from "../../components/Logo/Logo"
import Signup from "../../components/Auth/Signup/Signup"
import Login from "../../components/Auth/Login/Login"
import "./Welcome.css";

function Welcome() {
	return (
     <div className="max-w-[100%] h-auto p-1 text-white bg-black ">
     	<nav className="flex justify-between items-center bg-red-500 h-auto w-[100%]">
     	<div className='ml-5 w-[50%]'>
     		<Logo />
     	</div>
     		<div className="w-[100%]">
     			<ul className="flex justify-center flex-wrap items-center w-[100%]">
     				<li className="mr-5">About</li>
     				<li className="mr-5">Explore</li>
     				<li className="mr-5">
     				<button className="bg-blue-500 max-w-[auto] h-auto p-1 rounded">Signup</button>
     				</li>
     				<li className="mr-5">
     				<button className="bg-blue-500 max-w-[auto] p-1 rounded">Login</button>
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
     				<div className="m-auto w-[50px]">Or</div>
     				<Login/>
     			</div>
     </div>
	)
}


export default Welcome;
