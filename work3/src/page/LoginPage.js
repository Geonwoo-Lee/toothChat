import React, { useState } from "react";
import "./LoginPage.scss";
import login from "../char-image/login.png";
import { useNavigate } from "react-router-dom";
import welcomeImg from "../char-image/welcome.png";

function LoginPage({isUserName,
  isUserId,
  setIsUserName,
  setIsUserId,}) {
  const navigate = useNavigate();
  const [isValidate, setIsValidate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [failModal, setIsFailModal] = useState(false)

  const failModalHandler = () => {
    if(failModal){
      setIsFailModal(!failModal)
    }else{
      return
    }
  }

  
  
  const userNameHandler = (e) => {
    setIsUserName(e.target.value);
  };
  const userIdHandler = (e) => {
    setIsUserId(e.target.value);
  };
  const loginHandler = () => {
    if (isUserName.length === 0) {
      setIsValidate("UserName을 입력하세요");
    } else if (isUserId.length === 0) {
      setIsValidate("ID Number를 입력하세요");
    } else if (!userNameLength(isUserName)) {
      setIsValidate("UserName은 15자 이하여야합니다");
    } else if (isNaN(parseInt(isUserId))) {
      setIsValidate("ID Number는 숫자여야 합니다");
    } else {
      fetch(`http://localhost:8443/checked?idx=${isUserId}`)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        if(res.checked === true) {
          setIsFailModal(true)
        }else{
          setIsModalOpen(!isModalOpen)
        }
      });

    }
  };

  const loginKeyboardSend = (e) => {
    if(e.key === 'Enter' || e.key === "NumpadEnter"){
      loginHandler()
    }
  }
  const gotoChatHandler = () => {
    navigate('/chatting')
    setIsModalOpen(false);
  };

  const modalBackControll = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
    } else {
      return;
    }
  };

  function userNameLength(value) {
    if (value.length > 15) {
      return false;
    } else {
      return true;
    }
  }
 const backTo = () => {
    navigate('/')
  }




  return (
    <div>
      <div className="login-total-wrap">
        <div className="login-wrap">
        <div className="login-back" onClick={backTo}>
              뒤로가기
            </div>
          <div className="login-header">login</div>
          <div className="login-container">
            <img src={login} className="login-Ago" alt="login" />
            <div className="login-form">
              <div className="input-area">
                <div className="input-area-text">UserName</div>
                <input
                  placeholder="Username"
                  className="email-input"
                  onChange={userNameHandler}
                  value={isUserName ||""}
                />
                <div className="input-area-text">Id-Number</div>
                <input
                  placeholder="Id-Number"
                  className="password-input"
                  onChange={userIdHandler}
                  value={isUserId ||""}
                  onKeyPress={loginKeyboardSend}
                />
              </div>
              <div className="validation">{isValidate}</div>
              <button className="submit-btn" onClick={loginHandler}>
                Login
              </button>
              {isModalOpen ? (
                <div className="Modal-back" onClick={modalBackControll}>
                  <div className="Modal-container">
                    <div className="Modal-view">
                      <div className="Modal-form">
                        <img
                          src={welcomeImg}
                          alt="welcome"
                          className="welcome-img"
                        />
                        <div className="welcom-text">
                          InternGram에 오신걸 환영합니다 !
                        </div>
                        <button
                          className="go-to-chatbtn"
                          onClick={gotoChatHandler}
                        >
                          채팅하러가기
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
             {failModal ? (
                <div className="Modal-back" onClick={failModalHandler}>
                  <div className="Modal-container">
                    <div className="Modal-view">
                      <div className="Modal-form">
                        <img
                          src={welcomeImg}
                          alt="welcome"
                          className="welcome-img"
                        />
                        <div className="welcom-text">
                          중복된 Number Id 입니다
                        </div>
                        <button
                          className="go-to-chatbtn"
                          onClick={failModalHandler}
                        >
                          다른 Id를 사용해주세요
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
