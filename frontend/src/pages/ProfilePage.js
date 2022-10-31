import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import {updateUserInfo} from '../redux/action/apiUserAction'

export default function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user);
  const {pending, error, errorMessage, userInfo, updateSuccess} = user;

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [message, setMessage] = React.useState(null)
  
  function userUpdateHandler(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      // Dispatch Update User
      setMessage('')
      let tmpUser = {
        '_id' : userInfo._id,
        'token': userInfo.token,
        'name': name,
        'email': email,
        'password' : password
      }
      dispatch(updateUserInfo(tmpUser))
    }
  }

  React.useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      setName(userInfo.name)
      setEmail(userInfo.email)
    }
  }, [navigate, userInfo])


  return (
    <div className='profile_container'>
      {pending? <div>loading...</div>:
        message?<div style={{color:'red'}}>{message}</div>:
        error?<div style={{color:'red'}}>{errorMessage}</div>:
        updateSuccess?<div style={{color:'green'}}>Update Success!</div>:null
      }
      <form 
        className='signup_input_container' 
        style={{marginTop: '40px'}}
        onSubmit={userUpdateHandler}
      >
        <div className='signup_title'>User Profile</div>
        <label
          className='signup_label'
          htmlFor='register_name'
        >
          Name
        </label>
        <input
          id="register_name"
          placeholder='Enter name'
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />

        <label
          className='signup_label'
          htmlFor='register_email'
        >
          Email Address
        </label>
        <input
          id="register_email"
          placeholder='Enter email'
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />

        <label
          className='signup_label'
          htmlFor='register_password'
        >
          Password
        </label>
        <input
          id="register_password"
          placeholder='Enter password'
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />


        <label
          className='signup_label'
          htmlFor='register_confirm_password'
        >
          Confirm Password
        </label>
        <input
          id="register_confirm_password"
          placeholder='Confirm password'
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
        <button type="submit">Update</button>
      </form>
      
      <div className='user_orders'>
        <div className='user_orders_title'>
          My Orders
        </div>
        <Divider style={{width:'90%', backgroundColor:'black'}}/>
      </div>
    </div>
  )
}
