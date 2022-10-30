import React from 'react'
import PlaceOrderSummary from '../components/PlaceOrderSummary';
import PlaceOrderMain from '../components/PlaceOrderMain';
import CheckoutSteps from '../components/CheckoutSteps';

export default function PlaceOrderPage() {
  return (
    <>
      <CheckoutSteps currentStep={2}/>
      <div className='place_order_page'>
        <PlaceOrderMain />
        <PlaceOrderSummary />
      </div>
    </>
  )
}
