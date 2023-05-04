import React, { useState, useEffect } from "react";
import "../wallet/Wallet.css";

export function Wallet() {
  const [tokens, setTokens] = useState([]);
  const [selectedToken, setSelectedToken] = useState(null);
  const [prices, setPrices] = useState({});
  const [investmentAmount, setInvestmentAmount] = useState("");

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=40&page=1&sparkline=false"
    )
      .then((response) => response.json())
      .then((data) => {
        const tokenList = data.map((token) => ({
          id: token.id,
          name: token.name,
          symbol: token.symbol,
          logo: token.image,
          price: token.current_price,
        }));
        setTokens(tokenList);
        setSelectedToken(tokenList[0].id);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (selectedToken) {
      const ws = new WebSocket(
        `wss://stream.binance.com:9443/ws/${selectedToken.toLowerCase()}usdt@ticker`
      );
      ws.onmessage = (event) => {
        const tickerData = JSON.parse(event.data);
        setPrices((prevPrices) => ({
          ...prevPrices,
          [selectedToken]: tickerData.c,
        }));
      };
      return () => {
        ws.close();
      };
    }
  }, [selectedToken]);

  const handleTokenChange = (event) => {
    setSelectedToken(event.target.value);
  };

  const handleInvestmentAmountChange = (event) => {
    setInvestmentAmount(event.target.value);
  };

  const selectedTokenData = tokens.find((token) => token.id === selectedToken);

  const estimatedTokens =
    investmentAmount && selectedTokenData && prices[selectedToken]
      ? investmentAmount / (80 * prices[selectedToken])
      : "";

  return (
    <div className="container">
      <img
        className="Img"
        src={selectedTokenData && selectedTokenData.logo}
        alt={selectedTokenData && selectedTokenData.name}
      />
      <select
        value={selectedToken}
        onChange={handleTokenChange}
        className="Select"
      >
        {tokens.map((token) => (
          <option key={token.id} value={token.id}>
            {token.name}
          </option>
        ))}
      </select>

      <div className="Price">
        Price:{" "}
        {selectedTokenData && prices[selectedToken]
          ? prices[selectedToken]
          : "-"}
      </div>
      <div className="InvestMent">
        <label htmlFor="investmentAmount">Investment amount in INR:</label>
        <input
          type="number"
          id="investmentAmount"
          value={investmentAmount}
          onChange={handleInvestmentAmountChange}
        />
      </div>
      <div className="Token">Estimated tokens: {estimatedTokens}</div>
    </div>
  );
}
