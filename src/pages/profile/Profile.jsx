import React, { useEffect, useState } from "react";
import "./profile.css";
import profile_banner from "../../assets/profile_banner.png";
import profile_pic from "../../assets/profile.jpg";
import Bids from "../../components/bids/Bids";
import { useGametContext } from "../../context";
import { useReadContract } from "thirdweb/react";
import axios from "axios";
import { Link } from "react-router-dom";

const Profile = () => {
  const { connectedUserDetails, contractObj, connectedAccount } =
    useGametContext();
  const [NftData, setNftData] = useState(null);
  const [CoinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(false);
  const getNftData = async (id) => {
    const data = await axios.get(
      `https://moccasin-many-grasshopper-363.mypinata.cloud/ipfs/QmcM2nyLjW8dpQH1ZKdnFifDKsr2mcfYD9nEDFLwTyHpfF/${id}.json`
    );
    return data;
  };

  const { data: NftBalances } = useReadContract({
    contract: contractObj,
    method: "balanceOfBatch",
    params: [
      [
        "0x437c34161c76906bffdCC4EF18969Cff4E571F94",
        "0x437c34161c76906bffdCC4EF18969Cff4E571F94",
        "0x437c34161c76906bffdCC4EF18969Cff4E571F94",
        "0x437c34161c76906bffdCC4EF18969Cff4E571F94",
        "0x437c34161c76906bffdCC4EF18969Cff4E571F94",
        "0x437c34161c76906bffdCC4EF18969Cff4E571F94",
        "0x437c34161c76906bffdCC4EF18969Cff4E571F94",
        "0x437c34161c76906bffdCC4EF18969Cff4E571F94",
        "0x437c34161c76906bffdCC4EF18969Cff4E571F94",
        "0x437c34161c76906bffdCC4EF18969Cff4E571F94",
      ],
      [1, 3, 5, 8, 10, 20, 30, 40, 50, 60],
    ],
  });

  const { data: CoinBalances } = useReadContract({
    contract: contractObj,
    method: "balanceOf",
    params: ["0x437c34161c76906bffdCC4EF18969Cff4E571F94", 2],
  });

  console.log(NftData);
  console.log(CoinData);
  console.log(NftBalances);
  console.log(CoinBalances);

  useEffect(() => {
    const contractIds = [1, 3, 5, 8, 10, 20, 30, 40, 50, 60];
    const data = [];
    const f = async () => {
      for (let i = 0; i < contractIds.length; i++) {
        if (Number(NftBalances[i]) != 0) {
          let d = await getNftData(contractIds[i]);
          data.push(d.data);
        }
      }
    };
    f();
    setNftData(data);
  }, []);

  useEffect(() => {
    const contractIds = 2;
    const data = [];
    if (Number(CoinBalances) != 0) {
      const f = async () => {
        const d = await getNftData(contractIds);
        data.push(d.data);
        setCoinData(data);
      };
      f();
    }
  }, []);

  useEffect(() => {}, [CoinData, NftData]);
  useEffect(() => {}, [NftData]);

  return (
    <div className="profile section__padding">
      <div className="profile-top">
        <div className="profile-banner">
          <img src={profile_banner} alt="banner" />
        </div>
        <div className="profile-pic">
          <img src={profile_pic} alt="profile" />
          <h3>{connectedUserDetails?.[0]}</h3>
        </div>
      </div>
      <div className="profile-bottom">
        <div className="bids section__padding">
          <div className="bids-container">
            <div className="bids-container-text">
              <h1>In Game Coins</h1>
            </div>
            {CoinData ? (
              <div className="bids-container-card">
                {CoinData.map((item, index) => (
                  <div key={index} className="card-column">
                    <div className="bids-card">
                      <div className="bids-card-top">
                        <img src={item.image} alt="" />
                        <Link to={`/post/123`}>
                          <p className="bids-title">{item.name}</p>
                        </Link>
                      </div>
                      <div className="bids-card-bottom">
                        <p className="text-xs">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white">Loading...</p>
            )}
          </div>
        </div>
        <div className="bids section__padding">
          <div className="bids-container">
            <div className="bids-container-text">
              <h1>In Game Achievements</h1>
            </div>
            {NftData ? (
              <div className="bids-container-card">
                {NftData.map((item, index) => (
                  <div key={index} className="card-column">
                    <div className="bids-card">
                      <div className="bids-card-top">
                        <img src={item.image} alt="" />
                        <Link to={`/post/123`}>
                          <p className="bids-title">{item.name}</p>
                        </Link>
                      </div>
                      <div className="bids-card-bottom">
                        <p className="text-xs">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white">Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
