import React, { useEffect, useState, useRef } from "react";
import "./ChattingPage.scss";
import messageImage from "../char-image/signup.png";
import chat from "../char-image/chat.png";
import { useNavigate } from "react-router-dom";
import wellcome from "../char-image/welcome.png";

let ws = null;

function ChatingPage({ isUserName, isUserId }) {
  const [onChat, setOnchat] = useState(false);
  const [enterMsg, setEnterMsg] = useState([]);
  const navigate = useNavigate();
  const backTo = () => {
    navigate("/login");
  };
  const [sendMessage, setSendMessage] = useState("");
  const sendMessageHandler = (e) => {
    setSendMessage(e.target.value);
  };
  const messageRef = useRef();
  const enterChat = () => {
    if (!onChat) {
      setOnchat(!onChat);
    }
    ws = new WebSocket(
      `ws://localhost:8444/${100}/${isUserId}/${encodeURIComponent(isUserName)}`
    );
    fetchChatList();
  };
  const sendMsg = () => {
    ws.send(
      JSON.stringify({
        event: "message",
        message: sendMessage,
      })
    );
    ws.onmessage = function () {
      fetchChatList();
    };
    scrollToBottom();
    setSendMessage("");
    fetchChatList();
  };
  const fetchChatList = () => {
    fetch(`http://localhost:8443/chatlist?roomid=${100}`)
      .then((res) => res.json())
      .then((res) => {
        setEnterMsg(res);
      })
      .catch((err) => console.log("err: ", err));
  };

  const leaveChat = () => {
    if (onChat) {
      setOnchat(!onChat);
    }
    ws.close();
    ws = null;
  };

  function scrollToBottom() {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }

  const keyboardSend = (e) => {
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      sendMsg();
    }
  };

  useEffect(() => {
    fetchChatList();
  }, []);

  useEffect(() => {
    if (onChat) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [enterMsg]);

  return (
    <div>
      <div className="chat-wrap">
        <div className="chat-container">
          <div className="chat-list-form">
            <div className="back" onClick={backTo}>
              뒤로가기
            </div>
            <div className="chat-list-item">
              <div className="chat-list-header">채팅목록</div>
              <div className="chat-list">
                <div
                  className="chat-message"
                  onClick={() => {
                    enterChat();
                  }}
                >
                  <img
                    src={messageImage}
                    alt="messageImage"
                    className="message-image"
                  />
                  <div className="user-name">이건우</div>
                  <div className="user-message">안녕 ?</div>
                </div>
              </div>
            </div>
          </div>
          <div className="chat-view-form">
            {onChat ? (
              <div>
                <div className="chat-user-frame">
                  <img className="chat-user-image" src={chat} alt="chat-user" />
                  <div className="chat-user-name">이건우</div>
                  <div className="leave-chat" onClick={leaveChat}>
                    나가기
                  </div>
                  <div className="three-dot"></div>
                </div>
                <div className="message-area" ref={messageRef}>
                  <div className="messages">
                    {enterMsg.map((e, index) => (
                      <div className="message-container" key={index}>
                        <div
                          className={
                            e.idx == isUserId
                              ? "message-form"
                              : "another-message-form"
                          }
                        >
                          <img
                            className="message-img"
                            alt="message-img"
                            src={wellcome}
                          />
                          <div className="message-username">
                            {decodeURIComponent(e.name) === ""
                              ? "알 수없는 사용자"
                              : decodeURIComponent(e.name)}
                          </div>
                          <div className="message-message">
                            {decodeURIComponent(e.message)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="chat-input-frame">
                  <div className="chat-input-items">
                    <div className="icon">
                      <div className="camera9">
                        <span>
                          <input type="file" className="input-file" />
                        </span>
                      </div>
                      <input
                        className="message-input"
                        onChange={sendMessageHandler}
                        value={sendMessage}
                        onKeyPress={keyboardSend}
                      />
                      <button className="sendbtn" onClick={sendMsg}>
                        전송
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="not-on-chat-container">
                <div className="not-on-chat-text">
                  안녕하세요 {isUserName}님! 채팅을 시작해보세요
                </div>
                <img src={chat} alt="chat" className="not-on-chat-image" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatingPage;
