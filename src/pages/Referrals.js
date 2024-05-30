import React, { useEffect, useState } from "react";
import { host } from "../http";
import { TelegramProvider, useTelegram } from "../lib/TelegramProvider";

const ReferralsW = () => {
  const { user, webApp } = useTelegram();
  const [deeplink, setDeeplink] = useState(null);
  const [referrer, setReferrer] = useState(null);
  const [myrefs, setMyRefs] = useState();

  useEffect(() => {
    if (user) {
      setDeeplink(`https://t.me/leprechaun_rush_bot?start=${btoa(user.id)}`);
    }
  }, [user]);

  useEffect(() => {
    host
      .get(`api/user/${user?.id}`)
      .then((response) => {
        setReferrer(response.data[0]["referrer"]);
        setMyRefs(response.data[0]["my_refs"]);
      })
      .catch((e) => console.log(e));
  }, [user]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(deeplink);
    // alert("🔗 Referral link copied! \n\n" + deeplink);
  };

  return (
    <div className="bg-main-color h-screen w-screen flex items-center text-center justify-center">
      <div className="bg-main-color2 flex flex-col justify-center mt-10 align-items-center rounded-t-[3rem] w-full h-5/6 shadow-20xl-inner overflow-x-hidden">
        <div className="flex flex-col py-2 justify-center text-white px-10 rounded-[3rem] font-bold mt-4 animate-slide-in">
          <span className="flex text-center align-middle align-items-center justify-center text-2xl font-bold">
            <p className="flex text-center font-bold text-4xl text-yellow-400 pt-2 font-['Bookman_Old_Style'] bg-[#2f2f2f] px-4 py-1 rounded-[3rem]">Refferals</p>
          </span>
          <span className="font-['Bookman_Old_Style'] text-sm">Your referrer: {referrer}</span>
        </div>

        <div className="flex flex-col justify-center items-center">
          <span className="text-2xl font-['Bookman_Old_Style']">Refs Claimed: {myrefs && myrefs.map((ref) => ref.claimed).reduce((acc, value) => acc + value, 0).toFixed(4)}</span>
          <div className="flex flex-col align-items-center w-80 h-60 text-white border-2 border-shadow-color shadow-2xl font-bold rounded-[2rem] mt-2">
            {myrefs
              ? myrefs.map((ref) => {
                  return (
                    <div className="flex justify-between align-middle align-items-center w-[95%] m-2 p-2 bg-neutral-900 rounded-[1.5rem]">
                      <div className="ml-4">
                        <p className="text-xl text-green-500 text-left font-bold font-['Bookman_Old_Style']">{ref.name}</p>
                        <p className="text-sm font-thin text-left font-['Bookman_Old_Style']">ID: {ref.id}</p>
                      </div>
                      <span className="mr-5 text-xl font-['Bookman_Old_Style']">+{(ref.claimed).toFixed(4)}</span>
                    </div>
                  );
                })
              : null}
          </div>
        </div>

        <span className="opacity-50 text-[0.7rem] mt-4 font-italic font-['Bookman_Old_Style']">
          For each referral, you will receive <br></br> 5% of your referral's coins
        </span>
        <button className="flex justify-center border-2 w-[20rem] md:w-80 border-yellow-400 mx-10 p-4 align-middle mt-[1rem] mb-4 bg-green-500/20 rounded-3xl" onClick={copyToClipboard}>
          <span className="text-2xl font-bold font-['Bookman_Old_Style']">Invite a fren</span>
        </button>
      </div>
    </div>
  );
};

const Referrals = () => {
  return (
    <TelegramProvider>
      <ReferralsW />
    </TelegramProvider>
  );
};

export default Referrals;
