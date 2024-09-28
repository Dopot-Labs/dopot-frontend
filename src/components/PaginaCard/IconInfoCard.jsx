"";
import React from "react";

const IconInfoCard = (props) => {
  const { text, text2, img, investors } = props;

  const handleInvestorsSelectChange = (event) => {
    const selectedAddress = event.target.value;
    if (selectedAddress !== "default")
      window.open(
        `https://app.proofofhumanity.id/profile/${selectedAddress}`,
        "_blank"
      );
  };

  return investors ? (
    <div className="pc-hero-icon-grid-card ">
      <div style={{ maxWidth: "150px" }} className="dash-sel-opt-content">
        <select
          style={{ maxWidth: "100%" }}
          name="selInvestors"
          id="selInvestors"
          onChange={handleInvestorsSelectChange}
        >
          <option selected disabled hidden>
            {text} <br /> <span>{text2}</span>
          </option>
          {investors &&
            Object.keys(investors).map((key) => (
              <option value={key}>{key}</option>
            ))}
        </select>
      </div>
    </div>
  ) : (
    <div className="pc-hero-icon-grid-card ">
      <p style={{ margin: 0 }}>
        {text} <br /> <span>{text2}</span>
      </p>
    </div>
  );
};

export default IconInfoCard;
