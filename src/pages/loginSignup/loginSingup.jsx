import React from "react";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import Login from "../../components/login/login";
import "./style.scss";

const loginSignup = () => {
  return (
    <div className="login">
      <ContentWrapper>
        <Login></Login>
      </ContentWrapper>
    </div>
  );
};

export default loginSignup;
