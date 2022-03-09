import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './Header.css';
import logoLarge from '../../assets/logolarge.png'
import logo from '../../assets/logo.png'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Menu, MenuItem, ListItemIcon } from '@mui/material'; 

function Header(props) {
  const { loginWithRedirect, user, isAuthenticated, isLoading, logout } = useAuth0();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (newPage) => {
    setAnchorEl(null);
    if (typeof newPage === 'string') {
      props.changeDisplayPage(newPage)
      if(newPage === 'logout'){
        logout({ returnTo: window.location.origin })
      }
    }
  };

  return (
    <div className="Header">
      <img src={window.innerWidth > 1024 ? logoLarge : logo} className='header-logo' />
      <div className='header-right'>
        <h3>Blue Belt</h3>
        <h3>Curriculum Review</h3>
      </div>
      <div className='header-avatar'>
        {isAuthenticated ? <img src={user.picture} onClick={handleClick} style={{height: '60px', borderRadius: '30px'}}/> :
          <AccountCircleIcon sx={{ fontSize: 60 }} color="action" onClick={()=> loginWithRedirect()} />}
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => handleClose('dashboard')}>
          <ListItemIcon>
            <DashboardIcon fontSize="small" />
          </ListItemIcon>
          Dashboard</MenuItem>
        {/* <MenuItem onClick={() => handleClose('profile')}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          Profile</MenuItem>
        <MenuItem onClick={() => handleClose('students')}>
          <ListItemIcon>
            <PeopleOutlineIcon fontSize="small" />
          </ListItemIcon>
          Students</MenuItem> */}
        <MenuItem onClick={() => handleClose('help')}>
          <ListItemIcon>
            <HelpOutlineIcon fontSize="small" />
          </ListItemIcon>
          Help</MenuItem>
        <MenuItem onClick={() => handleClose('logout')}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout</MenuItem>
      </Menu>
    </div>
  );
} 

export default Header;