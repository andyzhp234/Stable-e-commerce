import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../redux/action/apiUserAction';
import { useSearchParams } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';


export default function LoginPage() {
  const navigate = useNavigate();
  // Redux
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.user);
  const {pending, error, errorMessage, userInfo} = userLogin;

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  // get query param
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') ? searchParams.get('redirect'):'';

  React.useEffect(() => {
    if (userInfo) {
      navigate(`/${redirect}`)
    }
  }, [navigate, userInfo, redirect])
  
  function handleLogin(e){
    e.preventDefault();
    dispatch(login(email, password))
  }

  return (
    <div className='login_container'>
      {pending? <div className='login_message'>loading...</div>:
        error?
          <div className='login_message error'>{errorMessage}</div>
          :
          null
      }
      <form className='login_input_container' onSubmit={handleLogin}>
        <div>Sign In to Stable</div>
        <input
          placeholder='Email Address'
          id="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder='Password'
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
        <div className='no_account_divider'>
          <Divider style={{width: '25%', backgroundColor: 'black'}}/>
          <div>Don't have an Account?</div>
          <Divider style={{width: '25%', backgroundColor: 'black'}}/>
        </div>
        <button
          id='create_account_button'
          onClick={(e) => navigate(`/register?redirect=${redirect}`)}
          type="button"
        >
          Create an Account
        </button>
      </form>
    </div>
  )
}
