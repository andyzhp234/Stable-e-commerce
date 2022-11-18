import React from "react";

export default function CompanyInfo() {
  return (
    <div className="footer__companyInfo">
      <div className="footer__companyInfo__items">
        <h1 className="footer__companyInfo__title">Stable</h1>
        <div className="footer__companyInfo__description">
          This is just a demo website. No real product is being sold. Thanks for
          scrolling this far!
        </div>
        <div className="footer__companyInfo__description">
          123 Avenue of Demo, City, USA 12345
        </div>
        <div className="footer__companyInfo__description">
          <div>Credit:</div>
          <div>
            Icons from <a href="https://icons8.com">icons8.com</a>
          </div>
          <div>
            Images from <a href="https://www.pexels.com">www.pexels.com</a> and{" "}
            <a href="https://unsplash.com/">unsplash.com</a>
          </div>
        </div>
      </div>

      <div className="footer__companyInfo__items">
        <h1 className="footer__companyInfo__title">Information</h1>
        <div className="footer__companyInfo__description">FAQ</div>
        <div className="footer__companyInfo__description">
          General terms and conditions
        </div>
        <div className="footer__companyInfo__description">
          Shop with an Expert
        </div>
        <div className="footer__companyInfo__description">Developers</div>
        <div className="footer__companyInfo__description">Contact Us</div>
      </div>

      <div className="footer__companyInfo__items">
        <h1 className="footer__companyInfo__title">Newsletter</h1>
        <div className="footer__companyInfo__description">
          Sign up and get the latest deals and more
        </div>
        <div className="footer__companyInfo__description">
          <input placeholder="Enter email address" />
        </div>
        <div className="footer__companyInfo__description">
          <button>Sign up</button>
        </div>
      </div>
    </div>
  );
}
