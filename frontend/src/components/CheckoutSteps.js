import React from 'react'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentsIcon from '@mui/icons-material/Payments';
import StoreIcon from '@mui/icons-material/Store';
import { useNavigate } from 'react-router-dom';

export default function CheckoutSteps(props) {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(props.currentStep);
  return (
    <div className='checkout_steps'>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          if (newValue < value) {
            setValue(newValue);
            if (newValue === 0) navigate('/shipping')
            else if (newValue === 1) navigate('/payment')
          } 
        }}
      >
        <BottomNavigationAction label="Shipping" icon={<LocalShippingIcon />} />
        <BottomNavigationAction label="Payment" icon={<PaymentsIcon />} />
        <BottomNavigationAction label="Place Order" icon={<StoreIcon />} />
      </BottomNavigation>
    </div>
  )
}
