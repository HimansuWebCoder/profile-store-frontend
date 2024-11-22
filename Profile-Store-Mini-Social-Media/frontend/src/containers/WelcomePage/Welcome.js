import {useState} from 'react';
import Logo from "../../components/Logo/Logo"
import Signup from "../../components/Auth/Signup/Signup"
import Login from "../../components/Auth/Login/Login"
import { Link } from "react-router-dom";
import "./Welcome.css";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';

function Welcome() {

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

   const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <div className="text-white flex justify-center flex-col  w-[200px] ">
                	<button className="bg-[#31363F] max-w-[auto]  h-auto p-1 rounded">About</button>
                	<button className="bg-[#31363F] max-w-[auto] mt-1  h-auto p-1 rounded">Explore</button>
                	<button className="bg-[#31363F] max-w-[auto] mt-1  h-auto p-1 rounded">Signup</button>
                	<button className="bg-[#31363F] max-w-[auto] mt-1 p-1 rounded"><Link to="/home">Login</Link></button>
                </div>
              </ListItemIcon>
              <ListItemText />
            </ListItemButton>
          </ListItem>
      
      </List>
    </Box>
  );


	return (
     <div className="max-w-[100%] h-auto p-1 text-white bg-[#1E201E] ">
     	<nav className="flex justify-between items-center bg-[#1E201E] border-b border-1 border-gray-500 h-auto w-[100%]">
     	<div className='ml-5 w-[50%]'>
     		{/*<Logo />*/}
     	    <img src="/assets/images/Profile_Logo.png" className="max-w-[80px] h-auto m-2" />
     	</div>
     		{/*<div className="w-[100%]">
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

     		</div>*/}

     		<Button sx={{color: "white"}} onClick={toggleDrawer(true)}>Menu</Button>

     		<Drawer 
     		sx={{
			    '& .MuiDrawer-paper': {
			      backgroundColor: 'lightblue', // Full background color
			    },
			  }} open={open} onClose={toggleDrawer(false)}>
	        {DrawerList}
	      </Drawer>
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
