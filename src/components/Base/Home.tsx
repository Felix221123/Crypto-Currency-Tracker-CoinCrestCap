import BTC from "/assets/img/btc.jpg";
import USDT from "/assets/img/usdt.jpg";
import ETH from "/assets/img/eth-blue.jpg";
import ETHGREEN from "/assets/img/eth.jpg";
import BlackBtc from "/assets/svg/Group.svg";
// import "./styles/home.css";
import "./styles/home/home.css";


export const Home = () => {
  const pageContent = {
    paragraph:
      "Experience the pulse of the cryptocurrency world with our real-time 24-hour dashboard. Stay informed and seize opportunities as they arise, ensuring you're always ahead of the curve in this fast-paced market",
  };
  

  return (
    <>
      <div className="homeContainer">
        {/* text section */}
        <div className="heroTxtSection">
          <h1>
          Dynamic <span className="diffClr">Crypto Market </span>Updates Every Hour.
          </h1>
          
          <p className="paraGraphTxt font-normal">{pageContent.paragraph}</p>
          <button className="font-bold">Get started</button>
        </div>

        {/* btc formation section */}
        <div className="coinFormation">
          <img src={BTC} alt="bitcoin image" className="topBtc" />
          <img src={BTC} alt="bitcoin image" className="topMidBtc" />
          <img src={BTC} alt="bitcoin image" className="BottomBtc" />
          <img src={BTC} alt="bitcoin image" className="topright" />
          <img src={BlackBtc} alt="bitcoin black" className="blackBtc" />
          <img src={USDT} alt="usdt black" className="usdt" />
          <img src={ETH} alt="eth block" className="eth-block" />
          <img src={ETHGREEN} alt="eth block green" className="ethgreen" />
        </div>
      </div>
    </>
  );
};
