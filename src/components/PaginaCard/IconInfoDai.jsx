"";
import React from "react";
import { useTranslation } from "../../i18n/client";

const IconInfoDai = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="pc-hero-icon-grid-card ">
      <p style={{ margin: 0 }}>
        {props.text} DAI <br />
        <span>Money Raised</span>
      </p>
    </div>
  );
};

export default IconInfoDai;
