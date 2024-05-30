import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { host } from "../http";
import { TelegramProvider, useTelegram } from "../lib/TelegramProvider";
import CountUp from "react-countup";
import ProgressBarButton from "../components/ProgressBarButton";

const HomePageW = () => {
  const { user, webApp } = useTelegram();
  const [photo, setPhoto] = useState(null);
  const [referrer, setReferrer] = useState(null);
  const [mined_token, setMined_Token] = useState(0);
  const [mineStatus, setMineStatus] = useState("STOPPED");
  const [disableClaim, setDisableClaim] = useState(true);
  const [balance, setBalance] = useState(0);
  const [leftTime, setLeftTime] = useState(null);
  const [burn, setBurn] = useState(false);

  const claimTokens = () => {
    host
      .patch(`api/user/${user?.id}`, { current_bal: mined_token, mining_start: new Date(), ref: referrer })
      .then((response) => {
        setBurn(false);
        setDisableClaim(true)
        setMineStatus("ACTIVE");
        setBalance(response.data.data["current_bal"]);
        setMined_Token(0);
        setLeftTime(2 * 60 * 60 * 1000);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    host
      .get(`api/user/${user?.id}`)
      .then((response) => {
        setDisableClaim(true)
        setBalance(response.data[0]["current_bal"]);
        setPhoto(response.data[0]["photo"]);
        setReferrer(response.data[0]["referrer"]);
        let miningStart = new Date(response.data[0]["mining_start"]);
        let endDate = new Date(miningStart.getTime() + 2 * 60 * 60 * 1000); // End time is one hour from mining_start
        let currentDate = new Date();
        endDate - currentDate < 0 ? setLeftTime(0) : setLeftTime(endDate - currentDate);
        let minted = ((currentDate - miningStart) / 1000) * 0.00027777;
        setMined_Token(minted);
      })
      .catch((e) => console.log(e));
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (leftTime > 0) {
        setLeftTime((leftTime) => leftTime - 1000);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [leftTime]);

  useEffect(() => {
    if (leftTime < (2 * 60 * 60 * 1000) - (1000 * 60 * 15)) {
      setDisableClaim(false)
    }
    if (leftTime > 60 * 60 * 1000) {
      setMineStatus("ACTIVE");
      setMined_Token((mined_token) => mined_token + 0.00027777);
    } else if (leftTime <= 60 * 60 * 1000 && leftTime > 0) {
      setMined_Token(1);
      setMineStatus("STOPPED");
      setBurn(true);
    } else {
      setMined_Token((mined_token) => 0);
    }
  }, [leftTime]);

  return (
    <>
      <div className="bg-main-color h-screen w-screen flex items-center text-center justify-center">
        <div className="bg-main-color2 rounded-t-[3rem] mt-10 w-full h-5/6 shadow-20xl-inner flex flex-col justify-between items-center overflow-x-hidden">
          <div className="w-36 h-36 rounded-full bg-transparent border-2 border-shadow-color inline-flex items-center justify-center mb-2 mt-2 shadow-inner shadow-shadow-color font-['Bookman_Old_Style'] select-none">
            {photo ? <img src={photo} alt="" /> : <p>{user?.first_name}</p>}
          </div>
          <div>
            <span className="flex justify-center text-[1.3rem] py-2 font-bold font-['Bookman_Old_Style']">{user?.username}</span>
          </div>
          <div className="flex flex-col py-2 justify-center text-white px-10 rounded-[3rem] font-bold">
            <h3 className="text-1xl font-bold font-['Bookman_Old_Style'] select-none">LepreCoin Balance:</h3>
            <span className="flex justify-center text-2xl font-bold">
              <p className="flex font-bold text-4xl text-yellow-400 pt-2 font-['Bookman_Old_Style'] bg-[#2f2f2f] px-4 py-1 rounded-[3rem] select-none">
                <CountUp end={balance} duration={1.5} decimals={4} decimal="." />
              </p>
            </span>
          </div>
          <div className="flex justify-center items-center mt-[8rem] ">
            <span className="flex justify-center text-[1rem] font-bold font-['Bookman_Old_Style'] select-none">LepreCoin/hour 1.0000</span>
          </div>
          <div className="flex justify-center items-center">
            <ProgressBarButton value={mined_token.toFixed(4)} onClick={() => { !disableClaim ? alert("You can't claim tokens yet, try in a few minutes") :  claimTokens()}} />
          </div>
          <span className="flex justify-center text-[1.3rem] py-3 font-bold font-['Bookman_Old_Style'] select-none mb-4">
            {burn ? "🔥 Time to Burn:" : "⏳ Time Left:"}
            <p className="pl-2 font-['Bookman_Old_Style'] text-red-500">
              {Math.floor(leftTime / 1000 / 60 / 60) + "h:" + Math.floor((leftTime / 1000 / 60) % 60) + "m:" + Math.floor((leftTime / 1000) % 60) + "s"}
            </p>
          </span>
        </div>
      </div>
    </>
  );
};

const HomePage = () => {
  return (
    <TelegramProvider>
      <HomePageW />
    </TelegramProvider>
  );
};

export default HomePage;
