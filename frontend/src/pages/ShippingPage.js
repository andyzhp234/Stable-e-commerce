import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {saveShippingAddress} from '../redux/action/apiCart';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps.js';

export default function ShippingPage() {
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart);
  const {shippingAddress} = cart;

  let [address, setAddress] = React.useState(shippingAddress.address);
  let [city, setCity] = React.useState(shippingAddress.city)
  let [postalCode, setPostalCode] = React.useState(shippingAddress.postalCode)
  let [country, setCountry] = React.useState(shippingAddress.country)

  const dispatch = useDispatch()

  function handleShipping(e) {
    e.preventDefault();
    dispatch(saveShippingAddress({
      address,
      city,
      postalCode,
      country
    }))
    navigate('/payment');
  }

  return (
    <div className='shipping_body'>
      <CheckoutSteps currentStep={0}/>
      <form className='shipping_container' onSubmit={handleShipping}>
        <div className='shipping_title'>Shipping</div>
        
        <div>
          <label htmlFor='shipping_address'>Address</label>
          <input
            id="shipping_address"
            type="text"
            placeholder='Enter address'
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            required
          />
        </div>
        <div>
          <label htmlFor='shipping_city'>City</label>
          <input 
            id="shipping_city"
            type="text"
            placeholder='Enter city'
            onChange={(e) => setCity(e.target.value)}
            value={city}
            required
          />
        </div>
        <div>
          <label htmlFor='shipping_postal_code'>Postal Code</label>
          <input 
            id="shipping_postal_code"
            type="text"
            placeholder='Enter postal code'
            onChange={(e) => setPostalCode(e.target.value)}
            value={postalCode}
            required
          />
        </div>
        <div>
          <label htmlFor='shipping_country'>Country</label>
          <input 
            id="shipping_country"
            type="text"
            placeholder='Enter country'
            onChange={(e) => setCountry(e.target.value)}
            value={country}
            required
          />
        </div>
        <button>Continue</button>
      </form>
    </div>
  )
}
