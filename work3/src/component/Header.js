import React from "react";
import "./Header.scss";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const moveToLanding = () => {
    navigate("/");
  };

  function switchTheme(e) {
    if (e.target.checked) {
      localStorage.setItem("theme", "dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.setAttribute("data-theme", "light");
    }
  }

  return (
    <div className="header-container">
      <div className="header-wrap">
        <div className="interngram" onClick={moveToLanding}>
          InternGram
        </div>
      </div>
      <div className="toggle-wrap">
        <input type="checkbox" className="checkbox" onClick={switchTheme} />
      </div>
    </div>
  );
}

export default Header;
