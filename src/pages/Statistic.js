import React, { useEffect, useState } from "react";
import { TelegramProvider, useTelegram } from "../lib/TelegramProvider";
import { host } from "../http";

const StatisticW = () => {
  const { user, webApp } = useTelegram();
  const [allUsers, setAllUsers] = useState(0)
  const [allBalances, setAllBalances] = useState(0)
  const [mined_token, setMined_Token] = useState(0);
  const [totalBal, setTotalBal] = useState(0)
  const [exchanged, setExchanged] = useState(0);
  const [refs, setRefs] = useState(0);
  const [balance, setBalance] = useState(0);
  const [deeplink, setDeeplink] = useState(null);


  useEffect(() => {
    host
      .get(`api/user/`)
      .then((response) => {
        setAllUsers(response.data['allUsers']);
        setAllBalances(response.data['totalBalance']);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    host
      .get(`api/user/${user?.id}`)
      .then((response) => {
        setBalance(response.data[0]["current_bal"]);
        setTotalBal(response.data[0]["total_bal"])
        setExchanged(response.data[0]["total_bal"] - response.data[0]["current_bal"])
        setRefs(response.data[0]["my_refs"].length)
        let miningStart = new Date(response.data[0]["mining_start"]);
        let currentDate = new Date();
        let minted = ((currentDate - miningStart) / 1000) * 0.00027777;
        setMined_Token(minted);
      })
      .catch((e) => console.log(e));
  }, [user]);

  return (
    <div className="bg-main-color h-screen w-screen flex items-center text-center justify-center">
    <div className="bg-main-color2 flex flex-col justify-center mt-10 align-items-center rounded-t-[3rem] w-full h-5/6 shadow-20xl-inner overflow-x-hidden">
        <div className="flex flex-col py-2 justify-center text-white px-10 rounded-[3rem] font-bold mt-4 animate-slide-in">
          <span className="flex justify-center text-2xl font-bold">
            <p className="flex font-bold text-4xl text-yellow-400 pt-2 font-['Bookman_Old_Style'] bg-[#2f2f2f] px-4 py-1 mb-4 rounded-[3rem]">Statistic</p>
          </span>
          <span>Active Users: {allUsers}</span>
          <span>Total Mined Tokens: {allBalances?.toFixed(4)}</span>
        </div>

        <div className="flex justify-center items-center">
          <div className="flex flex-col justify-center w-80 h-60 text-white border-2 border-shadow-color bg-neutral-900 shadow-2xl font-bold rounded-[2rem] mt-10">
            <span>My Stat</span>
            <div className="m-3 flex flex-col text-left font-['Bookman_Old_Style']">
              <span>Mined Tokens: {mined_token > 1 ? 1 : mined_token?.toFixed(4)}</span>
              <span>Exchanged Tokens: {exchanged > 0 ? exchanged?.toFixed(4) : 0}</span>
              <span>My Current Balance: {balance?.toFixed(4)}</span>
              <span>My Referrals: {refs}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Statistic = () => {
  return (
    <TelegramProvider>
      <StatisticW />
    </TelegramProvider>
  );
};

export default Statistic;
