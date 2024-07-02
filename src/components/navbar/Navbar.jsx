import React, { useEffect, useState } from "react";
import "./navbar.css";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../../assets/coins.png";
import { Link } from "react-router-dom";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownLink,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import {
  Address,
  Avatar,
  Badge,
  Identity,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import { color } from "@coinbase/onchainkit/theme";
import { useGametContext } from "../../context";
import {
  ConnectButton,
  useReadContract,
  useSendTransaction,
} from "thirdweb/react";
import { baseSepolia } from "thirdweb/chains";
import { client } from "../../client";
import { prepareContractCall } from "thirdweb";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(null);
  const {
    connectedUserDetails,
    connectedUserHasAccount,
    setconnectedUserHasAccount,
    setconnectedUser,
    setconnectedUserDetails,
    connectedAccount,
    contractObj,
    smartAccountFunc,
  } = useGametContext();

  const sm = async () => {
    const t = await smartAccountFunc();
    setLoading(t.address);
  };

  console.log(loading);

  sm();

  const { data: readPlayerDataMap, isLoading } = useReadContract({
    contract: contractObj,
    method: "PlayerDataMap",
    params: [loading],
  });

  const { mutate: sendTransaction } = useSendTransaction();

  const seturi = async () => {
    const transaction = prepareContractCall({
      contract: contractObj,
      method: "setURI",
      params: [
        "https://moccasin-many-grasshopper-363.mypinata.cloud/ipfs/QmcM2nyLjW8dpQH1ZKdnFifDKsr2mcfYD9nEDFLwTyHpfF/{id}.json",
      ],
    });

    sendTransaction(transaction);
  };

  console.log(connectedUserDetails);

  const Menu = () => (
    <>
      <Link to="/explore">
        <p>Explore</p>{" "}
      </Link>
      {connectedUserHasAccount && (
        <Link to={`/profile/${connectedUserDetails?.[0]}`}>
          <p>My Items</p>
        </Link>
      )}
    </>
  );
  if (connectedUserDetails) {
    if (connectedUserDetails?.[0] != "") {
      setconnectedUserHasAccount(true);
    } else {
      setconnectedUserHasAccount(false);
    }
  }

  useEffect(() => {
    setconnectedUser(connectedAccount);
    setconnectedUserDetails(readPlayerDataMap);
  }, [readPlayerDataMap]);

  const handleLogout = () => {
    setUser(false);
  };
  const handleLogin = () => {
    setUser(true);
  };

  return (
    <div className="navbar">
      <div className="navbar-links">
        <div className="navbar-links_logo">
          <img src={logo} alt="logo" />
          <Link to="/">
            <h1>GAMET</h1>
          </Link>
        </div>
        <div className="navbar-links_container">
          <input type="text" placeholder="Search Item Here" autoFocus={true} />
          <Menu />
          {user && (
            <Link to="/">
              <p onClick={handleLogout}>Logout</p>
            </Link>
          )}
        </div>
      </div>
      <div className="navbar-sign">
        {user ? (
          <>
            <Link to="/create">
              <button type="button" className="primary-btn">
                Create
              </button>
            </Link>
            <button type="button" className="secondary-btn">
              Connect
            </button>
          </>
        ) : (
          <>
            <ConnectButton
              client={client}
              chain={baseSepolia}
              walletConnect={{ projectId: "7f49c7e89e54528522eef8334c58506e" }}
              connectButton={{
                className: "connect-button",
                label: "Sign in",
                style: {
                  display: "flex",
                  background: `linear-gradient(101.12deg,#eb1484 27.35%,#c91cc3 99.99%,#c81cc5 100%,#c81cc5 100%)`,
                  color: "white",
                  borderRadius: ".8rem",
                  height: "2.75rem",
                  width: "auto",
                  fontWeight: "bolder",
                },
              }}
            />
          </>
        )}
      </div>
      <div className="navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="navbar-menu_container scale-up-center">
            <div className="navbar-menu_container-links">
              <Menu />
            </div>
            <div className="navbar-menu_container-links-sign">
              {user ? (
                <>
                  <Link to="/create">
                    <button type="button" className="primary-btn">
                      Create
                    </button>
                  </Link>
                  <button type="button" className="secondary-btn">
                    Connect
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <button
                      type="button"
                      className="primary-btn"
                      onClick={handleLogin}
                    >
                      Sign In
                    </button>
                  </Link>
                  <Link to="/register">
                    <button type="button" className="secondary-btn">
                      Sign Up
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
