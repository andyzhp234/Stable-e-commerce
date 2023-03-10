import React from "react";

export default function BuyingInfo() {
  return (
    <div className="footer__buyingInfo">
      <div className="footer__buyingInfo__items">
        <div>Shipping & Delivery</div>
        <img
          className="icon-large"
          src="https://d2c0vv5h4nuw6w.cloudfront.net/icons/shipping.png"
          alt=""
        />
        <div className="footer__buyingInfo__items__description">
          Shipping only to USA and Canada
        </div>
        <div className="footer__buyingInfo__items__description">
          Large, heavy items and Same-day Delivery items are delivered by one of
          our delivery partner
        </div>
      </div>

      <div className="footer__buyingInfo__items">
        <div>Refund</div>
        <img
          className="icon-large"
          src="https://d2c0vv5h4nuw6w.cloudfront.net/icons/refund.png"
          alt=""
        />
        <div className="footer__buyingInfo__items__description">
          We accept returns only if the sold good is defective
        </div>
      </div>

      <div className="footer__buyingInfo__items">
        <div>Payment Methods</div>
        <img
          className="icon-large"
          src="https://d2c0vv5h4nuw6w.cloudfront.net/icons/payment.png"
          alt=""
        />
        <div className="footer__buyingInfo__items__description">
          We Accept Credit & Debit Card
        </div>
        <div>
          <img
            src="https://d2c0vv5h4nuw6w.cloudfront.net/icons/visa.png"
            alt="credit_card"
          />
          <img
            src="https://d2c0vv5h4nuw6w.cloudfront.net/icons/mastercard.png"
            alt="credit_card"
          />
          <img
            src="https://d2c0vv5h4nuw6w.cloudfront.net/icons/jcb.png"
            alt="credit_card"
          />
          <img
            src="https://d2c0vv5h4nuw6w.cloudfront.net/icons/american-express.png"
            alt="credit_card"
          />
        </div>
      </div>
    </div>
  );
}
