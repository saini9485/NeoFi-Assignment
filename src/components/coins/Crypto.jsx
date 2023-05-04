import axios from "axios";
import { SearchOutlined } from "@ant-design/icons"
import React, { useState, useEffect } from "react";

import Coin from "./Coin";

import "./Crypto.css";


export function Crypto() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
   const [lightDark , setLightDark] = useState(true)
   const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=40&page=1&sparkline=false`
      )
      .then((response) => {
        setCoins([...response.data]);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="coins_container" >
        <div className={lightDark ? "white" : "dark"}>
          <div className="coin-search-container">
        <div className="coin-search" >
          <form>
            <input
              className="coin-input"
              type="text"
              onChange={handleChange}
              placeholder="Search"
            />
            <button className="Search_Btn">
              <SearchOutlined />
            </button>
          </form>
        </div>
        <div className="top-toggle">
          {lightDark ? (
            <i
              class="fa-solid fa-moon mo" 
              onClick={() => setLightDark(!lightDark)}
            ></i>
          ) : (
            <i
              class="fa-solid fa-sun su" style = {{"color":"lightcoral"}}
              onClick={() => setLightDark(!lightDark)}
            ></i>
          )}
        </div>
       
        </div>
        <div className="explore_coins_header" >
          <h3 className="header_text" >NAME</h3>
          <h3 className="header_text">PRICE</h3>
          <h3 className="header_text">Status</h3>
        </div>

        {loading ? (
        <h1 className="Loader">
          <h3 style={{textAlign:"center"}}>Loading..</h3>
          <i className="fa fa-refresh fa-spin"></i>
        </h1>
      ) : (
        filteredCoins.map(
          ({
            id,
            name,
            current_price,
            image,
           
          }) => {
            return (
              <Coin
                key={id}
                name={name}
                price={current_price}
                 image={image}
                
              />
            );
        })
        )}
        </div>
      </div>
    </>
  );
}
