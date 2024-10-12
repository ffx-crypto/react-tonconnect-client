import React from "react";
import { useTonWallet, useTonConnectUI } from "@tonconnect/ui-react";
import JSalesInput from "../components/JSalesInput/JSaleseInput";

const Sale = () => {
  const wallet = useTonWallet();
  // const [tonConnectUI, setOptions] = useTonConnectUI();
  return (
    <div>
      <h1 className="text-center mt-8 text-3xl font-semibold h-24 ">Welcome to the Sales Page</h1>
      

      {wallet ? (
        <JSalesInput />
      ) : (
        <div className=" flex flex-col h-32 justify-center">
          <h2 className="text-lg text-center text-2xl font-semibold">
            You should connect your wallet first to be able to buy jettons.
          </h2>
          {/* <button onClick={() => tonConnectUI.openModal()} className="p-4 bg-sky-500 w-[12em] rounded-full text-white font-semibold mx-auto">
            Connect Wallet
          </button> */}
        </div>
      )}
    </div>
  );
};

export default Sale;
