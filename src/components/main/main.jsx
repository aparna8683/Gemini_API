import React, { useContext } from "react";
import "./main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  return (
    <div className="main">
      {/* Top navbar */}
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="user" />
      </div>

      <div className="container">
        {/* Greeting section (only show when no result yet) */}
        {!showResult && (
          <div className="greet">
            <p>
              <span>Hello, Dev.</span>
            </p>
            <p>How can I help Today?</p>
          </div>
        )}

        {/* Default cards (hide when showing result) */}
        {!showResult && (
          <div className="cards">
            <div className="card">
              <p>Suggest beautiful places to see on upcoming road trip</p>
              <img src={assets.compass_icon} alt="compass" />
            </div>
            <div className="card">
              <p>Brainstorm new project ideas for coding</p>
              <img src={assets.bulb_icon} alt="bulb" />
            </div>
            <div className="card">
              <p>Write an email to my professor about project delay</p>
              <img src={assets.message_icon} alt="message" />
            </div>
            <div className="card">
              <p>Explain code in simple terms</p>
              <img src={assets.code_icon} alt="code" />
            </div>
          </div>
        )}

        {/* Show Result Section */}
        {showResult && (
          <div className="result">
            <h3> Prompt: {recentPrompt}</h3>

            {loading ? (
              <p className="loading">⏳ Loading...</p>
            ) : (
              <p className="result-text">{resultData}</p>
            )}
          </div>
        )}

        {/* Search / Input section */}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter Prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="gallery" />
              <img src={assets.mic_icon} alt="mic" />
              <img onClick={() => onSent()} src={assets.send_icon} alt="send" />
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
