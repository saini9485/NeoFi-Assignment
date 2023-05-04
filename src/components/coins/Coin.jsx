import "./Coin.css";

const Coin = ({
  name,
  price,
  image,
}) => {
  return (
    <>
    <div className="coin-container">
      <div className="coin-row">
        <div className="coin" >
          <img src={image} alt="crypto" />
          <p style={{"font-size":"larger"}}>{name}</p>
          <p className="coin-price">${price}</p>
        </div>
        <div className="coin-data">
        <p></p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Coin;
