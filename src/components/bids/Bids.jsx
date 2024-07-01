import React, { useEffect, useState } from "react";
import "./bids.css";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import bids1 from "../../assets/bids1.png";
import bids2 from "../../assets/bids2.png";
import bids3 from "../../assets/bids3.png";
import bids4 from "../../assets/bids4.png";
import bids5 from "../../assets/bids5.png";
import bids6 from "../../assets/bids6.png";
import bids7 from "../../assets/bids7.png";
import bids8 from "../../assets/bids8.png";
import { Link } from "react-router-dom";
import axios from "axios";

const Bids = ({ title, id }) => {
  const [NftData, setNftData] = useState(null);
  const getNftData = async (id) => {
    const data = await axios.get(
      `https://moccasin-many-grasshopper-363.mypinata.cloud/ipfs/QmcM2nyLjW8dpQH1ZKdnFifDKsr2mcfYD9nEDFLwTyHpfF/${id}.json`
    );
    return data;
  };
  console.log(NftData);
  useEffect(() => {
    if (id == 1) {
      const contractIds = [2];
      const data = [];
      const f = async () => {
        for (let i = 0; i < contractIds.length; i++) {
          let d = await getNftData(contractIds[i]);
          data.push(d.data);
        }
        setNftData(data);
      };
      f();
    } else {
      const contractIds = [1, 3, 5, 8, 10, 20, 30, 40, 50, 60];
      const data = [];
      const f = async () => {
        for (let i = 0; i < contractIds.length; i++) {
          let d = await getNftData(contractIds[i]);
          data.push(d.data);
        }
        setNftData(data);
      };
      f();
    }
  }, []);
  useEffect(() => {}, [NftData]);
  return (
    <div className="bids section__padding">
      <div className="bids-container">
        <div className="bids-container-text">
          <h1>{title}</h1>
        </div>
        <div className="bids-container-card">
          {NftData &&
            NftData.map((item, index) => (
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
      </div>
    </div>
  );
};

export default Bids;
