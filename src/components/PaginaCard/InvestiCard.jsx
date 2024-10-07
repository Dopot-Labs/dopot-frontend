"";
import React, { useEffect, useState } from "react";
import { addInvestment } from "../../utils/firebase/writeInfos";
import addressDopotReward from "../../abi/dopotReward/address.js";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "../../i18n/client";

const InvestiCard = (props) => {
  const { state, titolo, price, spec, currentSupply, supply } = props;
  let { img } = props;
  const { t } = useTranslation();
  async function invest() {
    try {
      await toast.promise(
        addInvestment(props.address, props.numTier, price, titolo, t),
        {
          pending: t("confirm"),
          success: t("invested"),
          error: t("error"),
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  const [imageSrc, setImageSrc] = useState(null);
  // const binaryString = img;

  // useEffect(() => {
  //   if (!binaryString) {
  //     return;
  //   }
  //   var reader = new FileReader();
  //   reader.readAsDataURL(binaryString);
  //   reader.onloadend = function () {
  //     var base64data = reader.result;
  //     setImageSrc(base64data);
  //   };
  // }, [binaryString]);

  return (
    <div className="investi-card">
      <input type="checkbox" id="click-invest" />
      <label
        htmlFor="click-invest"
        style={{ cursor: "pointer", display: "block" }}
      >
        {/* {imageSrc && <img src={imageSrc} alt="" />} */}

        <div className="investi-card-box">
          <div className="box-main-invest">
            <div>
              <h3 className="">Invest</h3>
              <p className="">{spec}</p>
            </div>
            <div
              style={{ backgroundImage: `url(${img})` }}
              className="bg-img-main-invest"
            ></div>
          </div>
          <div className="box-supply">
            <p>Supply</p>
            <p className="">
             {supply}
            </p>
          </div>

          <button
            onClick={() =>
              state === "Ongoing"
                ? invest()
                : (window.location.href = `https://opensea.io/assets/arbitrum/${addressDopotReward}`)
            }
            className="grd-btn dopot-btn-sm"
          >
            {state === "Ongoing" ? "Invest" : "Buy NFT"}
            {" " + "DAI " + price}
          </button>
          {/* <h5>{"DAI " + price}</h5> */}
        </div>
      </label>

      <div className="content-invest">
        <div className="content-invest-box">
          <img src={img} alt="BlogImg" />
          <div className="text-invest">
            <h3 className="">Invest</h3>
            <p className="">{spec}</p>

            <div className="box-supply">
              <p>Supply</p>
              <p className="">
                {supply}
              </p>
            </div>

            <button
              onClick={() =>
                state === "Ongoing"
                  ? invest()
                  : (window.location.href = `https://opensea.io/assets/arbitrum/${addressDopotReward}`)
              }
              className="grd-btn dopot-btn-sm"
            >
              {state === "Ongoing" ? "Invest" : "Buy NFT"}
              {" " + "DAI " + price}
            </button>
            <button className="grd-btn dopot-btn-sm cancel">
              <label for="click-invest" id="temp-invest">
                Cancel
              </label>
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default InvestiCard;
