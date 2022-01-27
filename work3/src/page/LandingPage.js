import React from "react";
import landing from "../char-image/landing.png";
import { Link } from "react-router-dom";
import "./LandingPage.scss";

function LandingPage() {
  return (
    <div>
    <div className="landing-wrap">
      <div className="landing-container">
        <img src={landing} alt="landing" className="landing" />
        <div className="intro">InternGram에 오신걸 환영합니다 !</div>
        <Link to="/login">
          <button className="login-btn">로그인</button>
        </Link>
      </div>
    </div>
      </div>
  );
}

export default LandingPage;
