import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './Header.css';
// import logo from '../../assets/PSBJJAEmblem.png'
import logo from '../../assets/logolarge.png'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Header({login}) {
  const { loginWithRedirect, user, isAuthenticated, isLoading } = useAuth0();
  return (
    <div className="Header">
      <img src={logo} className='header-logo' />
      <div className='header-right'>
        <h3>Blue Belt</h3>
        <h3>Curriculum Review</h3>
      </div>
      <div className='header-avatar'>
        {isAuthenticated ? <img src={user.picture} style={{height: '60px', borderRadius: '23px'}}/> :
          <AccountCircleIcon sx={{ fontSize: 60 }} color="action" onClick={()=> loginWithRedirect()} />}
      </div>
    </div>
  );
} 

export default Header;