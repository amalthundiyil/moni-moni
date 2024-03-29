import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import lightbulb from "../../assets/light-bulb.png";
import "./styles.css";

const Error = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="body">
        <img src={lightbulb} className="image" />
        <div>
          <div className="dialog">
            <h1>Hey, who turned off the lights?</h1>
            <p>We were unable to find the page you were looking for.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;
