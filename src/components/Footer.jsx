"";
import React from "react";
import { SocialIcon } from "react-social-icons";
import { useTranslation } from "../i18n/client";
import Link from "next/link";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer>
    <div className="box">
      <div className="footer-grid">
        <div className="footer-grid-box logo">
          <Link href="/">
            <img src={"/assets/img/Brand Logo.png"} alt="Dopot" />
          </Link>
        </div>
        <div className="footer-grid-box menu">
          <Link href="/">Home</Link>
          <Link href="/FaqEng">Learn</Link>
          <Link href="/DopotToken">Dopot Token</Link>
        </div>
        <div className="footer-grid-box social">
          <Link target="_blank" href="https://x.com/Dopot_fi">
            <img
              style={{ marginTop: "0.3rem" }}
              src="/assets/img/social-x.svg"
              alt=""
            />
          </Link>
          <Link target="_blank" href="https://www.instagram.com/dopotfi/">
            <img src="/assets/img/social-insta.svg" alt="" />
          </Link>
          <Link target="_blank" href="https://t.me/dopotfi">
            <img
              style={{ width: "33px", height: "33px" }}
              src="/assets/img/icons8-telegram.svg"
              alt=""
            />
          </Link>
          <Link target="_blank" href="https://discord.com/invite/j8xxZFsyvd">
            <img
              style={{ width: "33px", height: "33px" }}
              src="/assets/img/icons8-discord.svg"
              alt=""
            />
          </Link>
        </div>
        <div className="footer-grid-box partnerships">
          <p>Our Partners: </p>
          <Link target="_blank" href="https://push.org/">
            <img
              style={{ width: "120px", marginTop: "0.5rem" }}
              src="/assets/img/push-logo.png"
              alt="Push Protocol"
            />
          </Link>
        </div>
      </div>
    </div>
  </footer>
  
  );
};

export default Footer;
