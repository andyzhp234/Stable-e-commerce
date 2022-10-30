import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {logout} from '../redux/action/apiUserAction';

export default function Header() {
  // Redux
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const {userInfo} = user;

  // React State
  const anchorEl = React.useRef(null)
  const [open, setOpen] = React.useState(false);

  function logoutHandler() {
    dispatch(logout())
  }


  const navigate = useNavigate();
  
  return (
    <div className='header'>
      <div className='header_name' onClick={() => navigate('/')}>Stable</div>
      <div className='header_pages'>
        <div 
          onClick={() => navigate('/')}
          style={window.location.pathname === "/"? {color: 'red'}:null}
        >
          - Home
        </div> 

        <div 
          onClick={() => navigate('/shop')}
          style={window.location.pathname === "/shop"? {color: 'red'}:null}
        >
          - All Products
        </div>

        <div 
          onClick={() => navigate('/faq')}
          style={window.location.pathname === "/faq"? {color: 'red'}:null}
        >
          - FAQ
        </div>
      </div>

      <div className='header_last_section'>
        <img
          src="https://img.icons8.com/pastel-glyph/2x/shopping-bags--v2.png"
          alt="cart_img"
          onClick={() => navigate('/cart')}
        />
        {userInfo?
          <div
            className='header_user_info'
            ref={anchorEl}
            onClick={() => setOpen(!open)}
          >
            {userInfo.name}
            <Menu
              anchorEl={anchorEl.current}
              open={open}
              onClose={() => setOpen(false)}
            >
              <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </Menu>
          </div>:
          <div
            className='header_user_info'
            onClick={() => navigate('/login')}
          >
            <img
              src="https://img.icons8.com/small/344/user.png"
              alt="user_img"
            />
            <div>
              Sign In
            </div>
          </div>
        }
      </div>

    </div>
  )
}
