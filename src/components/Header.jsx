/* eslint-disable @next/next/no-img-element */
"";
import React, { useState, useEffect } from "react";
import { MdMenu, MdClear } from "react-icons/md";

import { useTranslation } from "../i18n/client";
import { FaTimes } from "react-icons/fa";
import { getAddr } from "../utils/firebase/retriveInfo";
import { ethers } from "ethers";
import Link from "next/link";
import Dropdown from "./Dropdown";

async function isWalletConnected() {
  if (typeof window !== "undefined" && window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return provider && (await provider.send("eth_accounts", [])).length > 0;
  }
}

function deleteDatabase(dbName) {
  return new Promise((resolve, reject) => {
    const deleteRequest = indexedDB.deleteDatabase(dbName);
    deleteRequest.onsuccess = () => resolve(`Deleted ${dbName} successfully`);
    deleteRequest.onerror = (event) =>
      new Error(`Error deleting ${dbName}: ${event.target.errorCode}`);
  });
}

const DeleteCookiesAndReload = () => {
  localStorage.clear();
  // Delete all cookies
  if (typeof window !== "undefined") {
    document.cookie.split(";").forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    // Clear IndexedDB
    const indexedDB =
      window.indexedDB ||
      window.mozIndexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB;
    indexedDB
      .databases()
      .then((dbs) => {
        const deletePromises = dbs.map((db) => deleteDatabase(db.name));
        return Promise.all(deletePromises);
      })
      .then((results) => {
        console.log(results);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

const links = [
  {
    label: 'Twitter',
    href: 'https://x.com/Dopot_fi',
    icon: '/assets/img/social-x.svg',
  },
  // {
  //   label: 'Telegram',
  //   href: 'https://t.me/dopotfi',
  //   icon: '/assets/img/icons8-telegram.svg',
  // },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/dopotfi/',
    icon: '/assets/img/social-insta.svg',
  },
  {
    label: 'Discord',
    href: 'https://discord.com/invite/j8xxZFsyvd',
    icon: '/assets/img/icons8-discord.svg',
  },
];

const links2 = [
  {
    label: 'Whitepaper',
    href: '/assets/dopot.pdf',

  },
  {
    label: 'Business Plan',
    href: '/assets/bp.pdf',

  },
  {
    label: 'Pitch Deck',
    href: '/assets/pd.pdf',

  },
  {
    label: 'Financial Plan',
    href: '/assets/dopot.xlsx',

  },
  {
    label: 'Gitbook',
    href: 'https://dopot.gitbook.io/dopot',

  },
  {
    label: 'Audit',
    href: 'https://github.com/solidproof/projects/blob/main/2024/Dopot/SmartContract_Audit_Solidproof_DopotFi.pdf',

  },
];

const Header = (props) => {
  const { t } = useTranslation();
  const [isHeaderOpen, setIsHeaderOpen] = useState(false);
  const [walletText, setWalletText] = useState("Connect Wallet");
  const [walletState, setWalletState] = useState(false);
  useEffect(() => {
    (async () => {
      setWalletState(await isWalletConnected());
      if (walletState) getAddr(setWalletText, true, t);
    })();
  });
  return (
    <header>
      <div className="box">
        {/* Header for PC */}
        <div className="header-content">
          <div className="header-left flex items-center justify-center">
            <Link href="/">
              <img src={"/assets/img/Brand Logo.png"} alt="Dopot" />
            </Link>
          </div>
          <div className="header-right">
            <Link href="/">Home</Link>
            <Link href="/Learn">Learn</Link>
            <Link href="/DopotToken">Dopot Token</Link>


            {/* <div style={{ marginRight: "1.5rem" }} className="dropdown_menu">
              <button className="dropbtn">
                Community{" "}
                <span>
                  <img className="arrow-menu-dr" src={"/assets/img/arr-menu.svg"} alt="" />{" "}
                </span>
              </button>

              <div className="dropdown-content-menu">
                <button>
                  <SocialIcon
                    fgColor="white"
                    url="https://www.instagram.com/dopotfi"
                  />
                </button>
                <button>
                  <SocialIcon
                    fgColor="white"
                    url="https://twitter.com/Dopot_fi"
                  />
                </button>
                <button>
                  <SocialIcon
                    fgColor="white"
                    url="https://discord.gg/j8xxZFsyvd"
                  />
                </button>
                <button>
                  <SocialIcon fgColor="white" url="https://t.me/dopotfi" />
                </button>
              </div>
            </div> */}
            <div className="dropdown_menu">
              <button className="dropbtn flex items-center justify-center">
                Community{" "}
                <span>
                  <img
                    style={{ width: "7%" }}
                    className="arrow-menu-dr"
                    src={"/assets/img/arr-menu.svg"}
                    alt=""
                  />
                </span>
              </button>
              <div className="dropdown-content-menu">
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
                {/* <Link target="_blank" href="https://t.me/dopotfi">
                  <img
                    style={{ width: " 33px", height: "33px" }}
                    src="/assets/img/icons8-telegram.svg"
                    alt=""
                  />
                </Link> */}
                <Link
                  target="_blank"
                  href="https://discord.com/invite/j8xxZFsyvd"
                >
                  <img
                    style={{ width: " 33px", height: "33px" }}
                    src="/assets/img/icons8-discord.svg"
                    alt=""
                  />
                </Link>
              </div>
            </div>
            <div className="dropdown_menu">
              <button className="dropbtn flex items-center justify-center">
                Documents{" "}
                <span>
                  <img
                    style={{ width: "7%" }}
                    className="arrow-menu-dr"
                    src={"/assets/img/arr-menu.svg"}
                    alt=""
                  />
                </span>
              </button>
              <div className="dropdown-content-menu">
                <Link href="/assets/dopot.pdf">Whitepaper</Link>
                <Link href="/assets/bp.pdf">Business Plan</Link>
                <Link href="/assets/pd.pdf">Pitch Deck</Link>
                <Link href="/assets/dopot.xlsx">Financial Plan</Link>
                <Link href="https://dopot.gitbook.io/dopot">Gitbook</Link>
                <Link href="https://github.com/solidproof/projects/blob/main/2024/Dopot/SmartContract_Audit_Solidproof_DopotFi.pdf">
                  Audit
                </Link>
              </div>
            </div>
            <Link href="/FAQ">FAQ</Link>
            <Link href="/Blog">Blog</Link>
          </div>
          <div className="flex items-center justify-center gap-2">
            {walletState && (
              <Link href="/Profile">
                <button className="grd-btn dopot-btn-sm">Account</button>
              </Link>
            )}

            <button
              className="purple-border-btn dopot-btn-sm"
              onClick={() => getAddr(setWalletText, false, t)}
            >
              {walletText}
            </button>
            <Link href="/" onClick={DeleteCookiesAndReload}>
              <FaTimes />
            </Link>
          </div>
        </div>
        {/* Header for Mobile Devices */}
        <div className="header-mob">
          <Link href="/">
            <img
              className="logo"
              src={"/assets/img/Brand Logo.png"}
              alt="Dopot"
            />
          </Link>

          {isHeaderOpen ? (
            <button
              className="header-icon"
              onClick={() => {
                setIsHeaderOpen(false);
              }}
            >
              <MdClear />
            </button>
          ) : (
            <button
              className="header-icon"
              onClick={() => {
                setIsHeaderOpen(true);
              }}
            >
              <MdMenu />
            </button>
          )}

          {isHeaderOpen ? (
            <div className="header-mob-box">
              <Link href="/">Home</Link>
              <Link href="/Learn">Learn</Link>
              <Link href="/DopotToken">Dopot Token</Link>

              <Dropdown label="Community" links={links} />
              {/* <div  className="dropdown_menu">
              <button className="dropbtn" style={{ margin: "0" }}>
                Community{" "}
                <span>
                  <img
                    style={{ width: "7%" }}
                    className="arrow-menu-dr"
                    src={"/assets/img/arr-menu.svg"}
                    alt=""
                  />
                </span>
              </button>
              <div className="dropdown-content-menu">
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
                    style={{ width: " 33px", height: "33px" }}
                    src="/assets/img/icons8-telegram.svg"
                    alt=""
                  />
                </Link>
                <Link
                  target="_blank"
                  href="https://discord.com/invite/j8xxZFsyvd"
                >
                  <img
                    style={{ width: " 33px", height: "33px" }}
                    src="/assets/img/icons8-discord.svg"
                    alt=""
                  />
                </Link>
              </div>
              </div> */}
              <Dropdown label="Documents" links={links2} />
              {/* <div  className="dropdown_menu">
                <button className="dropbtn" style={{ margin: "0" }}>
                  Documents{" "}
                  <span>
                    <img
                      style={{ width: "7%" }}
                      className="arrow-menu-dr"
                      src={"/assets/img/arr-menu.svg"}
                      alt=""
                    />
                  </span>
                </button>
                <div className="dropdown-content-menu">
                  <Link href="/assets/dopot.pdf">Whitepaper</Link>
                  <Link href="https://dopot.gitbook.io/dopot/">Gitbook</Link>
                  <Link href="https://github.com/solidproof/projects/blob/main/2024/Dopot/SmartContract_Audit_Solidproof_DopotFi.pdf">
                    Audit
                  </Link>
                </div>
              </div> */}
              <Link href="/FAQ">FAQ</Link>
              <Link href="/Blog">Blog</Link>
              {walletState && (
                <Link href="/Profile">
                  <button className="grd-btn dopot-btn-lg">Account</button>
                </Link>
              )}
              <button className="purple-border-btn dopot-btn-lg">
                {walletState ? "Wallet" : "Connect Wallet"}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
